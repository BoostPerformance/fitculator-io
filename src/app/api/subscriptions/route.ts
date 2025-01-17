import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { addDays } from 'date-fns';
import { SlackWebhookProPlus } from '@/lib/slackWebhookProPlus';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    //console.log('Received body:', body);
    //console.log('보이니?');
    if (!body.users) {
      throw new Error('User data is missing');
    }

    const result = await prisma.$transaction(
      async (tx) => {
        // User handling
        // const existingUser = await tx.users.findFirst({
        //   where: {
        //     OR: [{ name: body.user.name }, { birth: body.user.birth }],
        //   },
        // });

        const birthDate = new Date(`${body.users.birthday}`);
        //console.log(birthDate);
        const userInfo = await tx.users.create({
          data: {
            id: nanoid(),
            name: body.users.name,
            gender: body.users.gender.toLowerCase(),
            birth: birthDate,
          },
        });

        // Program creation
        const programInfo = await tx.programs.create({
          data: {
            id: nanoid(),
            name: body.programs.name,
          },
        });

        // Exercise preferences creation
        const exercise_preferencesInfo = await tx.exercise_preferences.create({
          data: {
            id: nanoid(),
            user_id: userInfo.id,
            wearable_device: body.exercise_preferences.wearable_device,
            exercise_level: body.exercise_preferences.exercise_level,
            exercise_goal: body.exercise_preferences.exercise_goal,
            exercise_concern:
              body.exercise_preferences.exercise_concern || null,
            referral_source: body.exercise_preferences.referral_source || null,
          },
        });

        const end_date = (
          start_date: Date | string,
          programs_name: string
        ): Date | null => {
          if (programs_name === 'Basic' && !start_date) {
            return null;
          }
          return addDays(new Date(start_date), 30);
        };

        const userSubscriptionInfo = await tx.user_subscriptions.create({
          data: {
            id: nanoid(),
            users: { connect: { id: userInfo.id } },
            programs: { connect: { id: programInfo.id } },
            start_date:
              body.users.start_date && new Date(body.users.start_date),
            end_date: end_date(body.users.start_date, body.programs.name),
          },
        });

        let paymentInfo = null;

        if (body.programs.name !== 'Basic') {
          //console.log('Creating payment_info with:', body.payment_info);

          const paymentDate = body.payment_info.payment_date || Date.now();

          //console.log('body', body);

          paymentInfo = await tx.payment_info.create({
            data: {
              id: nanoid(),
              user_subscription_id: userSubscriptionInfo.id,
              amount: body.payment_info.amount,
              payment_date: paymentDate,
              payment_method: body.payment_info.payment_method,
              payment_key: body.payment_info.payment_key,
              status: body.payment_info.status,
              order_id: body.payment_info.order_id,
              order_name: body.payment_info.order_name || null,
              card_type: body.payment_info.card_type || null,
              owner_type: body.payment_info.owner_type || null,
              currency: body.payment_info.currency || 'KRW',
            },
          });

          // console.log('paymentInfo:', paymentInfo);
        }

        return {
          users: userInfo,
          exercise_preferences: exercise_preferencesInfo,
          programs: programInfo,
          user_subscriptions: userSubscriptionInfo,
          payment_info: paymentInfo,
        };
      },
      {
        timeout: 10000, // 타임아웃을 10초로 증가
        maxWait: 7000, // 선택적: 트랜잭션 시작 대기 시간
        isolationLevel: 'Serializable',
      }
    );
    const SLACK_WEBHOOK_URL_PLUS = process.env.SLACK_WEBHOOK_URL_PLUS;
    const SLACK_WEBHOOK_UR_PRO = process.env.SLACK_WEBHOOK_UR_PRO;

    if (body.programs.name === 'PLUS') {
      console.log(SLACK_WEBHOOK_URL_PLUS);
      if (SLACK_WEBHOOK_URL_PLUS) {
        await SlackWebhookProPlus(SLACK_WEBHOOK_URL_PLUS, result);
      }
    } else if (body.programs.name === 'PRO') {
      console.log(SLACK_WEBHOOK_UR_PRO);
      if (SLACK_WEBHOOK_UR_PRO) {
        await SlackWebhookProPlus(SLACK_WEBHOOK_UR_PRO, result);
      }
    }

    return Response.json(result);
  } catch (error) {
    //console.error('Prisma error:', error);
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Error code:', error.code);
      console.error('Meta:', error.meta);
    }

    await prisma.$disconnect();
    return NextResponse.json(
      {
        error: 'Error creating user',
        details: errorMessage,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
