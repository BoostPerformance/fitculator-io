export async function SlackWebhook(webhookUrl: string, data: any) {
  const formatDate = (date: Date | string | null) => {
    if (!date) return '베이직플랜';

    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return 'Invalid Date';

    return dateObj.toISOString().split('T')[0];
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*플랜:* ${data.programs.name}\n*이름:* ${
                data.users.name
              }\n*생년월일:* ${formatDate(data.users.birth)}\n*연락처:* ${
                data.users.phone_number
              }\n*이메일:* ${data.users.email}\n*OS:* ${
                data.users.os
              }\n*시작날짜:* ${
                data.programs.name === 'Basic'
                  ? new Date().toISOString().split('T')[0]
                  : formatDate(data.user_subscriptions.start_date)
              }\n*결제금액:* ${
                data.payment_info?.amount
                  ? `${data.payment_info.amount}원`
                  : '0원'
              }`,
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('Slack notification failed:', await response.text());
    }
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
}
