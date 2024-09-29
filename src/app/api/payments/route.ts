import { NextResponse } from 'next/server';

export async function POST(req: any) {
  try {
    const { orderId, paymentKey, amount } = await req.json(); // JSON 본문에서 데이터를 가져옵니다.
    console.log('쿼리가져옴');

    const secretKey = process.env.TOSS_SECRET_KEY;
    const url = 'https://api.tosspayments.com/v1/payments/confirm';
    const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString('base64');

    return fetch(url, {
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
    })
      .then((response) =>
        response.json().then((responseData) => {
          if (response.ok) {
            // 결제 성공시 처리 로직
            console.log('결제 성공:', responseData);
            return NextResponse.redirect(
              `/payment/complete?orderId=${orderId}`
            );
          } else {
            // 결제 실패시 처리 로직
            console.error('결제 실패:', responseData);
            return NextResponse.json(
              { error: responseData.message },
              { status: response.status }
            );
          }
        })
      )
      .catch((error) => {
        console.error('Payments error:', error);
        return NextResponse.json(
          { error: 'Error processing payment' },
          { status: 500 }
        );
      });
  } catch (error) {
    console.error('Payments error:', error);
    return NextResponse.json(
      { error: 'Error processing payment' },
      { status: 500 }
    );
  }
}
