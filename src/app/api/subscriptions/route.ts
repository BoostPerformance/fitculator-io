import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { RequestItemsType } from '@/types/types';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      programType,
      subscription,
      payment,
      exerciseLevel,
      exerciseGoal,
      referralSource,
      exerciseConcern,
    }: RequestItemsType = await req.json();

    const exerciseGoalsArray = exerciseGoal
      .split(',')
      .map((goal) => goal.trim());

    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const newSubscription = await tx.userSubscription.create({
          data: {
            userId,
            programId: programType === 'PRO' ? 1 : 2,
            batchId: programType === 'PRO' ? subscription.batchId : null,
            start_date: new Date(subscription.startDate),
            end_date: new Date(subscription.endDate),
            status: 'active',
          },
        });

        const paymentInfo = await tx.paymentInfo.create({
          data: {
            userSubscriptionId: newSubscription.id,
            payment_method: payment.method,
            amount: payment.amount,
            payment_date: new Date(), // 결제 날짜를 현재 날짜로 설정
          },
        });

        const exercisePref = await tx.exercisePreference.upsert({
          where: { id: userId },
          update: {
            exercise_level: exerciseLevel,
            exercise_goal: exerciseGoalsArray.join(','),
            referral_source: referralSource,
            exercise_concern: exerciseConcern,
          },
          create: {
            userId,
            exercise_level: exerciseLevel,
            exercise_goal: exerciseGoalsArray.join(','),
            referral_source: referralSource,
            exercise_concern: exerciseConcern,
          },
        });

        return { newSubscription, paymentInfo, exercisePref };
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
