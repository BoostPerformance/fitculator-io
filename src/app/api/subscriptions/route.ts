import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { RequestItemsType } from '@/types/types';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {
      user,
      userSubscription,
      program,
      paymentInfo,
      batch_number,
      exercisePreference,
    }: RequestItemsType = await req.json();
    //지금 내가 리퀘스트에서 필요한것
    // 1. 아이디, 고유넘버
    // 2. 기존 고객이면, 수정된 내용. 새로운 고객이면, 1

    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const userInfo = await tx.user.upsert({
          where: { email: user.email }, // 유저는 이메일을 기준으로 확인
          update: {
            name: user.name,
            phone_number: user.phone_number,
            gender: user.gender,
          },
          create: {
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            gender: user.gender,
          },
        });
        // program은 일단 lite면 batch가 없고, pro면 여러개batch 생김. program에서 programbatch갈일은 없는가?

        const programId = program.name === 'LITE' ? 1 : 2;
        let batchId: bigint | null = null;

        if (programId === 2) {
          const programBatch = await tx.programBatch.create({
            data: {
              programId: programId,
              batch_number: batch_number,
              start_date: userSubscription.start_date,
              end_date: userSubscription.end_date,
            },
          });
          batchId = programBatch.id;
        }

        const newSubscription = await tx.userSubscription.create({
          data: {
            userId: userInfo.id,
            programId: program.id,
            batchId: batchId,
            start_date: userSubscription.start_date,
            end_date: userSubscription.end_date ? new Date() : null,
            status: 'active',
          },
        });

        // 결제 정보 생성
        // const paymentInformation = await tx.paymentInfo.create({
        //   data: {
        //     userSubscriptionId: newSubscription.id,
        //     payment_method: paymentInfo.payment_method,
        //     amount: paymentInfo.amount,
        //     payment_date: new Date(),
        //   },
        // });

        // 운동 선호도 생성 또는 업데이트
        const exercisePref = await tx.exercisePreference.create({
          data: {
            userId: userInfo.id,
            exercise_level: exercisePreference.exercise_level,
            exercise_goal: exercisePreference.exercise_goal,
            exercise_concern: exercisePreference.exercise_concern,
            exercise_performance_level:
              program.name === 'PRO'
                ? exercisePreference.exercise_performance_level
                : null,
            referral_source:
              program.name === 'LITE'
                ? exercisePreference.referral_source
                : null,
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
