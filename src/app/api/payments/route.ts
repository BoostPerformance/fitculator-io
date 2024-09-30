import { NextResponse } from 'next/server';

export async function POST(req: any) {
  try {
    const { amount, orderId, paymentKey } = await req.json();

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
        paymentKey,
      }),
    });

    const responseData = await response.json();
    // console.log('POST Api 리스폰스', responseData);

    if (response.ok) {
      // 결제 성공 시 클라이언트에 성공 응답 반환
      console.log('결제 성공:', responseData);
      return NextResponse.json(responseData, { status: 200 });
    } else {
      // 결제 실패 시 클라이언트에 실패 응답 반환
      console.error('결제 실패:', responseData);
      return NextResponse.json(
        { message: responseData.message, code: response.status },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Payments error:', error);
    return NextResponse.json(
      { error: 'Error processing payment' },
      { status: 500 }
    );
  }
}
