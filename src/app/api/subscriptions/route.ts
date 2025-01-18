import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { addDays } from 'date-fns';
import { SlackWebhook } from '@/lib/slackWebhook';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received body:', body);
    console.log('보이니?');
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
        console.log(body);

        const userInfo = await tx.users.create({
          data: {
            id: nanoid(),
            name: body.users.name,
            gender: body.users.gender.toLowerCase(),
            phone_number: body.users.phone_number,
            email: body.users.email,
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
              body.programs.name !== 'Basic' && body.users.start_date
                ? body.users.start_date
                : null,
            end_date: end_date(body.users.start_date, body.programs.name),
          },
        });

        let paymentInfo = null;

        if (body.programs.name !== 'Basic') {
          // console.log('Creating payment_info with:', body.payment_info);

          const paymentDate = body.payment_info.payment_date || Date.now();

          console.log('body', body);

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

          //   console.log('paymentInfo:', paymentInfo);
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
    // const SLACK_WEBHOOK_URL_BASIC = process.env.SLACK_WEBHOOK_URL_BASIC;
    // const SLACK_WEBHOOK_URL_PLUS = process.env.SLACK_WEBHOOK_URL_PLUS;
    // const SLACK_WEBHOOK_URL_PRO = process.env.SLACK_WEBHOOK_URL_PRO;
    // console.log('Webhook URLs:', {
    //   basic: SLACK_WEBHOOK_URL_BASIC,
    //   plus: SLACK_WEBHOOK_URL_PLUS,
    //   pro: SLACK_WEBHOOK_URL_PRO,
    // });

    const SLACK_WEBHOOK_URL_TEST = process.env.SLACK_WEBHOOK_URL_BASIC;
    try {
      // switch (body.programs.name) {
      //   case 'Basic':
      //     if (SLACK_WEBHOOK_URL_BASIC) {
      //       console.log('webhook', SLACK_WEBHOOK_URL_BASIC);
      //       await SlackWebhook(SLACK_WEBHOOK_URL_BASIC, result);
      //     }
      //     break;
      //   case 'PLUS':
      //     if (SLACK_WEBHOOK_URL_PLUS) {
      //       console.log('webhook', SLACK_WEBHOOK_URL_PLUS);
      //       await SlackWebhook(SLACK_WEBHOOK_URL_PLUS, result);
      //     }
      //     break;
      //   case 'PRO':
      //     if (SLACK_WEBHOOK_URL_PRO) {
      //       await SlackWebhook(SLACK_WEBHOOK_URL_PRO, result);
      //     }
      //     break;
      //   default:
      //     console.log('Unknown program name:', body.programs.name);
      //     console.log(result);
      // }

      console.log(SLACK_WEBHOOK_URL_TEST);
      if (SLACK_WEBHOOK_URL_TEST) {
        console.log(SLACK_WEBHOOK_URL_TEST);
        await SlackWebhook(SLACK_WEBHOOK_URL_TEST, result);
      } else {
        console.log('Webhook URL is not defined');
      }
    } catch (error) {
      console.log(error, '웹훅 작동안됨');
    }

    const response = Response.json(result);
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('Prisma error:', error);
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
