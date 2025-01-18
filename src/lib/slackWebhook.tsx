export async function SlackWebhook(webhookUrl: string, data: any) {
  const formatDate = (date: Date) => {
    if (!date) return '베이직플랜';
    return date.toISOString().split('T')[0];
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
              text: `*핏큘레이터:*\n${data.programs.name}\n*신청:*`,
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*이름:*\n${data.users.name}`,
              },
              {
                type: 'mrkdwn',
                text: `*생년월일:*\n${formatDate(data.users.birth)}`,
              },
              {
                type: 'mrkdwn',
                text: `*연락처:*\n${data.users.phone_number}`,
              },
              {
                type: 'mrkdwn',
                text: `*이메일:*\n${data.users.email}`,
              },
              {
                type: 'mrkdwn',
                text: `*시작날짜:*\n${
                  formatDate(data.user_subscriptions.start_date) || '베이직플랜'
                }`,
              },
              {
                type: 'mrkdwn',
                text: `*결제금액:*\n${
                  data.payment_info?.amount && `${data.payment_info.amount}원`
                }`,
              },
            ],
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
