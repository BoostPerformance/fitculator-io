import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    //console.log('Request body:', body);
    //console.log('Payment information:', body.paymentInfo);

    const userInfo = await prisma.users.upsert({
      where: { email: body.user.email },
      update: {
        name: body.user.name,
        phone_number: body.user.phone_number,
      },
      create: {
        id: nanoid(),
        email: body.user.email,
        name: body.user.name,
        phone_number: body.user.phone_number,
        gender: body.user.gender,
        birthday: body.user.birthday,
      },
    });

    const exercisePreferenceInfo = await prisma.exercisepreferences.create({
      data: {
        id: nanoid(),
        user_id: userInfo.id,
        exercise_level: body.exercisePreferences.exercise_level,
        exercise_goal: body.exercisePreferences.exercise_goal,
        exercise_performance_level:
          body.exercisePreferences.exercise_performance_level,
        exercise_concern: body.exercisePreferences.exercise_concern || null,
        referral_source: body.exercisePreferences.referral_source || null,
        ldl_cholesterol: body.exercisePreferences.ldl_cholesterol || null,
        total_cholesterol: body.exercisePreferences.total_cholesterol || null,
      },
    });

    const programInfo = await prisma.programs.create({
      data: {
        id: nanoid(),
        type: body.programs.type,
        duration_in_months: body.programs.duration_in_months,
      },
    });

    let programBatchInfo;

    if (body.subscriptions.batch_id) {
      programBatchInfo = await prisma.programbatches.findUnique({
        where: { id: String(body.subscriptions.batch_id) },
      });
    }

    if (!programBatchInfo) {
      programBatchInfo = await prisma.programbatches.create({
        data: {
          id: nanoid(),
          program_id: programInfo.id,
          batch_number: body.subscriptions.id || 11,
        },
      });
    }

    const programStartDate = programInfo.start_date;
    const programEndDate = programInfo.end_date;

    const userSubscriptionInfo = await prisma.usersubscriptions.create({
      data: {
        id: nanoid(),
        users: { connect: { id: userInfo.id } },
        programs: { connect: { id: programInfo.id } },
        programbatches: { connect: { id: programBatchInfo.id } },
        start_date: programStartDate || null,
        end_date: programEndDate || null,
      },
    });

    let paymentDate = new Date(body.paymentInfo.payment_date);
    if (isNaN(paymentDate.getTime())) {
      paymentDate = new Date();
    }
    const paymentInfo = await prisma.paymentinfo.create({
      data: {
        id: nanoid(),
        user_subscription_id: userSubscriptionInfo.id,
        amount: body.paymentInfo.amount,
        payment_date: paymentDate,
        payment_key: body.paymentInfo.payment_key,
        order_id: body.paymentInfo.order_id,
        order_name: body.paymentInfo.order_name || null,
        card_type: body.paymentInfo.card_type || null,
        owner_type: body.paymentInfo.owner_type || null,
        currency: body.paymentInfo.currency || 'KRW',
      },
    });
    return Response.json({
      user: userInfo,
      exercisepreferences: exercisePreferenceInfo,
      programs: programInfo,
      usersubscriptions: userSubscriptionInfo,
      paymentinfo: paymentInfo,
    });
  } catch (error) {
    console.error('Prisma error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Error code:', error.code); // Prisma 관련 오류 코드 확인
      console.error('Meta:', error.meta); // 오류 메타 정보 확인
    }
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
