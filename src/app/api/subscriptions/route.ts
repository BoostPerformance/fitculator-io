import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { addDays } from 'date-fns';
import { supabase } from '@/lib/supabse';
import { SlackWebhook } from '@/lib/slackWebhook';

// 상수 정의
const DEFAULT_CURRENCY = 'KRW';

// 유틸리티 함수
const calculateEndDate = (
  startDate: Date | string | null,
  programName: string
): Date | null => {
  if (programName === 'Basic' || !startDate) {
    return null;
  }
  return addDays(new Date(startDate), 30);
};

const getSlackWebhookUrl = (programName: string): string | undefined => {
  console.log('slackhook 함수동작');
  const webhooks = {
    Basic: process.env.SLACK_WEBHOOK_URL_BASIC,
    PLUS: process.env.SLACK_WEBHOOK_URL_PLUS,
    PRO: process.env.SLACK_WEBHOOK_URL_PRO,
  };
  return webhooks[programName as keyof typeof webhooks];
};

const sendErrorToSlack = async (error: any, requestBody?: any) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL_TEST;
  if (!webhookUrl) return;

  const errorMessage = {
    text: '❌ 등록 프로세스 에러 발생',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*❌ 등록 프로세스 에러 발생*',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*에러 메시지:*\n${error.message || error}`,
        },
      },
    ],
  };

  // Supabase 에러 처리
  if (error.code) {
    errorMessage.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Supabase 에러 코드:* ${
          error.code
        }\n*메타 정보:* ${JSON.stringify(error.details || error.hint || {})}`,
      },
    });
  }

  if (requestBody) {
    errorMessage.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*요청 데이터:*\n\`\`\`${JSON.stringify(
          requestBody,
          null,
          2
        )}\`\`\``,
      },
    });
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorMessage),
    });
  } catch (slackError) {
    console.error('Error sending to Slack:', slackError);
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.users) {
      await sendErrorToSlack(new Error('User data is missing'), body);
      return NextResponse.json(
        { error: 'User data is missing' },
        { status: 400 }
      );
    }

    // 1. 사용자 생성
    const userId = nanoid();
    const { data: userInfo, error: userError } = await supabase
      .from('users')
      .insert({
        id: userId,
        name: body.users.name,
        gender: body.users.gender.toLowerCase(),
        phone_number: body.users.phone_number,
        email: body.users.email,
        birth: new Date(body.users.birthday).toISOString(),
        os: body.users.os,
      })
      .select()
      .single();

    if (userError) throw userError;

    // 2. 프로그램 생성
    const programId = nanoid();
    const { data: programInfo, error: programError } = await supabase
      .from('programs')
      .insert({
        id: programId,
        name: body.programs.name,
      })
      .select()
      .single();

    if (programError) throw programError;

    // 3. 운동 선호도 생성
    const exercisePreferenceId = nanoid();
    const { data: exercisePreferencesInfo, error: exerciseError } =
      await supabase
        .from('exercise_preferences')
        .insert({
          id: exercisePreferenceId,
          user_id: userId,
          wearable_device: body.exercise_preferences.wearable_device,
          exercise_level: body.exercise_preferences.exercise_level,
          exercise_goal: body.exercise_preferences.exercise_goal,
          exercise_concern: body.exercise_preferences.exercise_concern || null,
          referral_source: body.exercise_preferences.referral_source || null,
        })
        .select()
        .single();

    if (exerciseError) throw exerciseError;

    // 4. 구독 정보 생성
    const subscriptionId = nanoid();
    const startDate =
      body.programs.name !== 'Basic' ? body.users.start_date : null;
    const endDate = calculateEndDate(startDate, body.programs.name);

    const { data: userSubscriptionInfo, error: subscriptionError } =
      await supabase
        .from('user_subscriptions')
        .insert({
          id: subscriptionId,
          user_id: userId,
          program_id: programId,
          start_date: startDate ? new Date(startDate).toISOString() : null,
          end_date: endDate ? endDate.toISOString() : null,
        })
        .select()
        .single();

    if (subscriptionError) throw subscriptionError;

    // 5. 결제 정보 생성 (Basic이 아닌 경우)
    let paymentInfo = null;
    if (body.programs.name !== 'Basic' && body.payment_info) {
      const paymentId = nanoid();
      const { data: paymentData, error: paymentError } = await supabase
        .from('payment_info')
        .insert({
          id: paymentId,
          user_subscription_id: subscriptionId,
          amount: body.payment_info.amount,
          payment_date:
            body.payment_info.payment_date || new Date().toISOString(),
          payment_method: body.payment_info.payment_method,
          payment_key: body.payment_info.payment_key,
          status: body.payment_info.status,
          order_id: body.payment_info.order_id,
          order_name: body.payment_info.order_name || null,
          card_type: body.payment_info.card_type || null,
          owner_type: body.payment_info.owner_type || null,
          currency: body.payment_info.currency || DEFAULT_CURRENCY,
          approve_no: body.payment_info.approve_no,
        })
        .select()
        .single();

      if (paymentError) throw paymentError;
      paymentInfo = paymentData;
    }

    const result = {
      users: userInfo,
      exercise_preferences: exercisePreferencesInfo,
      programs: programInfo,
      user_subscriptions: userSubscriptionInfo,
      payment_info: paymentInfo,
    };

    try {
      const webhookUrl = getSlackWebhookUrl(body.programs.name);
      console.log('웹훅 URL 확인:', webhookUrl ? '존재함' : '없음');

      if (webhookUrl) {
        // 데이터 구조를 로깅하여 확인
        console.log(
          'Slack으로 전송될 데이터:',
          JSON.stringify(result, null, 2)
        );

        // 데이터 구조 검증 및 변환
        const slackPayload = {
          users: userInfo,
          exercise_preferences: exercisePreferencesInfo,
          programs: programInfo,
          user_subscriptions: {
            ...userSubscriptionInfo,
            users: { id: userId },
            programs: { id: programId },
          },
          payment_info: paymentInfo,
        };

        // 웹훅 URL 로깅
        console.log('사용 중인 웹훅 URL:', webhookUrl);

        // 변환된 데이터로 슬랙 웹훅 호출
        await SlackWebhook(webhookUrl, slackPayload);
      } else {
        console.warn(
          `⚠️ Slack 웹훅 URL 없음! 프로그램 이름: ${body.programs.name}`
        );
      }
    } catch (error) {
      console.error('[Slack Notification Error]:', error);
      // 에러 발생 시 전체 에러 객체 로깅
      console.error(
        '상세 에러:',
        JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
      );
      await sendErrorToSlack(error, {
        slackWebhookError: true,
        programName: body.programs.name,
        // 슬랙 페이로드 데이터도 포함
        slackPayload: result,
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[Registration Error]:', error);
    await sendErrorToSlack(error, req.body);

    let status = 500;
    let errorMessage = 'Internal server error';

    // Supabase 에러 처리
    if (error.code) {
      // PostgreSQL 에러 코드 또는 Supabase 에러 코드 처리
      switch (error.code) {
        case '23505': // 중복 키 충돌 (PostgreSQL)
          status = 409;
          errorMessage = 'Resource already exists';
          break;
        case 'PGRST116': // 레코드 없음 (PostgREST)
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
        code: error.code || 'UNKNOWN',
      },
      { status }
    );
  }
}
