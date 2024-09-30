import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Request body:', body);
    console.log('Payment information:', body.paymentInfo);

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
      programBatchInfo = await prisma.programbatches.findUnique({
        where: { id: body.subscriptions.batch_id },
      });
    }

    if (!programBatchInfo) {
      programBatchInfo = await prisma.programbatches.create({
        data: {
          program_id: programInfo.id,
          batch_number: body.subscriptions.id || 11,
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

    const paymentInfo = await prisma.paymentinfo.create({
      data: {
        user_subscription_id: userSubscriptionInfo.id,
        amount: body.paymentInfo.amount,
        payment_date: new Date(body.paymentInfo.payment_date),
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

    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
