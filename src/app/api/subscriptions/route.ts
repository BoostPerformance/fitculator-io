import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Request body:', body);

    const userInfo = await prisma.users.upsert({
      where: { email: body.user.email },
      update: {
        name: body.user.name,
        phone_number: body.user.phone_number,
        gender: body.user.gender,
      },
      create: {
        email: body.user.email,
        name: body.user.name,
        phone_number: body.user.phone_number,
        gender: body.user.gender,
      },
    });

    const exercisePreferenceInfo = await prisma.exercisepreferences.create({
      data: {
        user_id: userInfo.id,
        exercise_level: body.exercisePreferences.exercise_level,
        exercise_goal: body.exercisePreferences.exercise_goal,
        exercise_performance_level:
          body.exercisePreferences.exercise_performance_level,
        exercise_concern: body.exercisePreferences.exercise_concern || null,
        referral_source: body.exercisePreferences.referral_source || null,
      },
    });

    const programInfo = await prisma.programs.create({
      data: {
        type: body.programs.type,
        duration_in_months: body.programs.duration_in_months,
      },
    });

    let programBatchInfo;

    if (body.subscriptions.batch_id) {
      // 배치가 존재하면 연결
      programBatchInfo = await prisma.programbatches.findUnique({
        where: { id: body.subscriptions.batch_id },
      });
    }

    if (!programBatchInfo) {
      // 배치가 없으면 생성 (필요 시 batch_number 등 필수 값 추가)
      programBatchInfo = await prisma.programbatches.create({
        data: {
          program_id: programInfo.id, // 프로그램과 연결
          batch_number: body.subscriptions.id || 11, // batch_number가 필요하면 사용
        },
      });
    }

    const programStartDate = programInfo.start_date;
    const programEndDate = programInfo.end_date;

    const userSubscriptionInfo = await prisma.usersubscriptions.create({
      data: {
        users: { connect: { id: userInfo.id } },
        programs: { connect: { id: programInfo.id } },
        programbatches: { connect: { id: programBatchInfo.id } },
        start_date: programStartDate || null,
        end_date: programEndDate || null,
      },
    });

    return Response.json({
      user: userInfo,
      exercisepreferences: exercisePreferenceInfo,
      programs: programInfo,
      usersubscriptions: userSubscriptionInfo,
    });
  } catch (error) {
    console.error('Prisma error:', error);

    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
