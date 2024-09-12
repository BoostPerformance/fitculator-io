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
      },
      create: {
        email: body.user.email,
        name: body.user.name,
        phone_number: body.user.phone_number,
      },
    });

    const exercisePreferenceInfo = await prisma.exercisepreferences.create({
      data: {
        user_id: userInfo.id,
        exercise_level: body.exercisePreferences.exercise_level,
        exercise_goal: body.exercisePreferences.exercise_goal,
        exercise_performance_level:
          body.exercisePreferences.exercise_performance_level,
        exercise_concern: body.exercisePreferences.exercise_concern,
        referral_source: body.exercisePreferences.referral_source,
      },
    });

    return Response.json({
      user: userInfo,
      exercisepreferences: exercisePreferenceInfo,
    });
  } catch (error) {
    console.error('Prisma error:', error);

    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
