import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { RequestItemsType } from '@/types/types';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone_number,
      gender,
      userId,
      programType,
      subscription,
      payment,
      exercise_level,
      exercise_goal,
      referral_source,
      exercise_concern,
    }: RequestItemsType = await req.json();

    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const user = await tx.user.create({
          data: {
            id: 0,
            name: name,
            email: email,
            phone_number: phone_number,
            gender: gender,
            discord_id: 'defaultDiscordId', // 실제 데이터로 대체해야 함
            nickname: 'defaultNickname', // 실제 데이터로 대체해야 함
          },
        });

        // 생성된 사용자 ID를 사용하여 구독 생성
        const newSubscription = await tx.userSubscription.create({
          data: {
            userId: user.id,
            programId: programType === 'PRO' ? 1 : 2,
            batchId: programType === 'PRO' ? subscription.batchId : null,
            start_date: new Date(),
            end_date: new Date(),
            status: 'active',
          },
        });

        const paymentInfo = await tx.paymentInfo.create({
          data: {
            userSubscriptionId: newSubscription.id,
            payment_method: payment.method,
            amount: payment.amount,
            payment_date: new Date(),
          },
        });

        const exercisePref = await tx.exercisePreference.upsert({
          where: { id: user.id },
          update: {
            exercise_level: exercise_level,
            exercise_goal: exercise_goal,
            referral_source: referral_source,
            exercise_concern: exercise_concern,
          },
          create: {
            userId: user.id,
            exercise_level: exercise_level,
            exercise_goal: exercise_goal,
            referral_source: referral_source,
            exercise_concern: exercise_concern,
          },
        });

        return { user, newSubscription, paymentInfo, exercisePref };
      }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Error creating subscription' },
      { status: 500 }
    );
  }
}
