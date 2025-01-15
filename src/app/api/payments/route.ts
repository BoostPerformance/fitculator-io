import { NextResponse } from 'next/server';

interface PaymentConfirmRequest {
  amount: string;
  paymetDate: string;
  method: string;
  paymentKey: string;
  status: string;
  orderId: string;
  orderName: string;
  cardType: string;
  ownerType: string;
  currency: string;
}

export async function POST(req: Request) {
  try {
    const {
      amount,
      paymetDate,
      method,
      paymentKey,
      status,
      orderId,
      orderName,
      cardType,
      ownerType,
      currency,
    }: PaymentConfirmRequest = await req.json();

    console.log('Request body:', {
      amount,
      paymetDate,
      method,
      paymentKey,
      status,
      orderId,
      orderName,
      cardType,
      ownerType,
      currency,
    });

    const secretKey = process.env.TOSS_SECRET_KEY;
    const url = 'https://api.tosspayments.com/v1/payments/confirm';
    const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString('base64');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        orderId,
        orderName,
      }),
    });
    console.log('리스폰스', response);

    const responseData = await response.json();

    if (!response.ok || responseData.status === 'FAILED') {
      return NextResponse.json(
        {
          message: responseData.message || '결제 확인 실패',
          code: response.status,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Payments error:', error);
    return NextResponse.json(
      { error: 'Error processing payment' },
      { status: 500 }
    );
  }
}
