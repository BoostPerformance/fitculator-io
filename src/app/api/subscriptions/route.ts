import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import { parse } from 'date-fns';
import { addDays } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received body:', body);
    console.log('보이니?');
    if (!body.user) {
      // users가 아닌 user인지 확인
      throw new Error('User data is missing');
    }

    const result = await prisma.$transaction(async (tx) => {
      // User handling
      // const existingUser = await tx.users.findFirst({
      //   where: {
      //     OR: [{ name: body.user.name }, { birth: body.user.birth }],
      //   },
      // });

      enum Gender {
        male = 'male',
        female = 'female',
        other = 'other',
        undisclosed = 'undisclosed',
      }

      const birthDate = new Date(`${body.user.birthday}`);

      console.log(birthDate);

      const userInfo = await tx.users.create({
        data: {
          id: nanoid(),
          name: body.user.name,
          gender: body.user.gender as Gender, // enum 타입으로 캐스팅
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
          exercise_concern: body.exercise_preferences.exercise_concern || null,
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
          start_date: body.user.start_date || null,
          end_date: end_date(body.user.start_date, body.programs.name),
        },
      });

      let paymentInfo = null;
      if (body.programs.name !== 'Basic') {
        const paymentDate = new Date(
          body.paymentInfo.payment_date || Date.now()
        );
        paymentInfo = await tx.payment_info.create({
          data: {
            id: nanoid(),
            user_subscription_id: userSubscriptionInfo.id,
            amount: body.paymentInfo.amount,
            payment_date: paymentDate,
            payment_method: body.paymentInfo.payment_method,
            payment_key: body.paymentInfo.payment_key,
            status: body.paymentInfo.status,
            order_id: body.paymentInfo.order_id,
            order_name: body.paymentInfo.order_name || null,
            card_type: body.paymentInfo.card_type || null,
            owner_type: body.paymentInfo.owner_type || null,
            currency: body.paymentInfo.currency || 'KRW',
          },
        });
      }

      return {
        user: userInfo,
        exercisepreferences: exercise_preferencesInfo,
        programs: programInfo,
        usersubscriptions: userSubscriptionInfo,
        paymentinfo: paymentInfo,
      };
    });

    return Response.json(result);
  } catch (error) {
    console.error('Prisma error:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Error code:', error.code);
      console.error('Meta:', error.meta);
    }
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
