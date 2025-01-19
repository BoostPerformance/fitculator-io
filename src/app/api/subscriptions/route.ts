import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import { addDays } from 'date-fns';
import prisma from '@/lib/prisma';
import { SlackWebhook } from '@/lib/slackWebhook';

// 상수 정의
const TRANSACTION_TIMEOUT = 10000;
const TRANSACTION_MAX_WAIT = 7000;
const DEFAULT_CURRENCY = 'KRW';

// 유틸리티 함수
const calculateEndDate = (startDate: Date | string | null, programName: string): Date | null => {
  if (programName === 'Basic' || !startDate) {
    return null;
  }
  return addDays(new Date(startDate), 30);
};

const getSlackWebhookUrl = (programName: string): string | undefined => {
  const webhooks = {
    Basic: process.env.SLACK_WEBHOOK_URL_BASIC,
    PLUS: process.env.SLACK_WEBHOOK_URL_PLUS,
    PRO: process.env.SLACK_WEBHOOK_URL_PRO,
  };
  return webhooks[programName as keyof typeof webhooks];
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (!body.users) {
      return NextResponse.json(
        { error: 'User data is missing' },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. 사용자 생성
      const userInfo = await tx.users.create({
        data: {
          id: nanoid(),
          name: body.users.name,
          gender: body.users.gender.toLowerCase(),
          phone_number: body.users.phone_number,
          email: body.users.email,
          birth: new Date(body.users.birthday),
        },
      });

      // 2. 프로그램 생성
      const programInfo = await tx.programs.create({
        data: {
          id: nanoid(),
          name: body.programs.name,
        },
      });

      // 3. 운동 선호도 생성
      const exercisePreferencesInfo = await tx.exercise_preferences.create({
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

      // 4. 구독 정보 생성
      const startDate = body.programs.name !== 'Basic' ? body.users.start_date : null;
      const userSubscriptionInfo = await tx.user_subscriptions.create({
        data: {
          id: nanoid(),
          users: { connect: { id: userInfo.id } },
          programs: { connect: { id: programInfo.id } },
          start_date: startDate ? new Date(startDate).toISOString() : null,
          end_date: calculateEndDate(startDate, body.programs.name),
        },
      });

      // 5. 결제 정보 생성 (Basic이 아닌 경우)
      let paymentInfo = null;
      if (body.programs.name !== 'Basic' && body.payment_info) {
        paymentInfo = await tx.payment_info.create({
          data: {
            id: nanoid(),
            user_subscription_id: userSubscriptionInfo.id,
            amount: body.payment_info.amount,
            payment_date: body.payment_info.payment_date || Date.now(),
            payment_method: body.payment_info.payment_method,
            payment_key: body.payment_info.payment_key,
            status: body.payment_info.status,
            order_id: body.payment_info.order_id,
            order_name: body.payment_info.order_name || null,
            card_type: body.payment_info.card_type || null,
            owner_type: body.payment_info.owner_type || null,
            currency: body.payment_info.currency || DEFAULT_CURRENCY,
            approve_no: body.payment_info.approve_no,
          },
        });
      }

      return {
        users: userInfo,
        exercise_preferences: exercisePreferencesInfo,
        programs: programInfo,
        user_subscriptions: userSubscriptionInfo,
        payment_info: paymentInfo,
      };
    }, {
      timeout: TRANSACTION_TIMEOUT,
      maxWait: TRANSACTION_MAX_WAIT,
      isolationLevel: 'Serializable',
    });

    // Slack 알림 전송
    try {
      const webhookUrl = getSlackWebhookUrl(body.programs.name);
      if (webhookUrl) {
        await SlackWebhook(webhookUrl, result);
      }
    } catch (error) {
      console.error('[Slack Notification Error]:', error);
      // Slack 알림 실패는 전체 트랜잭션의 실패로 이어지지 않음
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('[Registration Error]:', error);
    
    let status = 500;
    let errorMessage = 'Internal server error';

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma 에러 처리
      switch (error.code) {
        case 'P2002':
          status = 409;
          errorMessage = 'Resource already exists';
          break;
        case 'P2025':
          status = 404;
          errorMessage = 'Record not found';
          break;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: errorMessage,
        code: error instanceof Prisma.PrismaClientKnownRequestError ? error.code : 'UNKNOWN',
      },
      { status }
    );
  } finally {
    await prisma.$disconnect();
  }
}