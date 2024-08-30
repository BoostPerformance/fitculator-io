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
      exercise_level,
      exercise_goal,
      exercise_performance_level,
      referral_source,
      exercise_concern,
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

        const programInformation = await tx.program.findUnique({
          where: { id: program.id }, //여기가 헷갈림. 왜냐면 프로그램에서 배치로 내려가는것도 있어야 하는것 아니냐.그래야 배치넘버로 뭔가 관리할 수 있는것아닌가?
          select: { id: true },
        });

        if (!program.name) {
          throw new Error('Invalid program name');
        }

        if (program.name === 'pro') {
          const programBatch = await tx.programBatch.upsert({
            where: { id: program.id },
            create: {
              programId: program.id,
              batch_number: batch_number,
              start_date: new Date(), // 시작일 설정
              end_date: new Date(), // 종료일 설정
            },
            update: {
              batch_number: batch_number, // 기존 배치의 배치 번호 업데이트
            },
          });
        }

        const newSubscription = await tx.userSubscription.create({
          data: {
            userId: userInfo.id,
            programId: program.id,
            batchId: userSubscription.batchId,
            start_date: new Date(),
            end_date: userSubscription.end_date ? new Date() : null,
            status: 'active',
          },
        });

        // 결제 정보 생성
        const paymentInformation = await tx.paymentInfo.create({
          data: {
            payment_method: paymentInfo.payment_method,
            amount: paymentInfo.amount,
          },
        });

        // 운동 선호도 생성 또는 업데이트
        const exercisePref = await tx.exercisePreference.create({
          data: {
            userId: userInfo.id,
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
