import { NextResponse } from 'next/server';

export async function POST(req: any, res: any) {
  try {
    const { orderId, paymentKey, amount } = req.query;
    console.log('쿼리가져옴');
    const secretKey = process.env.TOSS_SECRET_KEY;

    const url = 'https://api.tosspayments.com/v1/payments/confirm';
    const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString('base64');

    const paymentPost = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        amount,
        orderId,
        paymentKey,
      }),
      headers: {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'application/json',
      },
    });

    const paymentData = await paymentPost.json();
    console.log('Payment API Response Data:', paymentData); // 응답 내용 출력

    // TODO: DB 처리
    res.redirect(`/payment/complete?orderId=${orderId}`);
  } catch (error) {
    console.error('Payments error:', error);

    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
