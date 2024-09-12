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

    const userSubscriptionInfo = await prisma.usersubscriptions.create({
      data: {
        user_id: userInfo.id,
        program_id: programInfo.id,
        batch_id: body.batch?.id || null,
        event_id: body.event?.id || null,
        start_date: body.program.start_date,
        end_date: body.program.end_date,
        status: body.usersubScriptions.status,
      }, //이부분 어디서 데이터 가져올지 수정해야해. program batches 도 여기 이 파일에 작성해야하나.. ?
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
