export async function SlackWebhookProPlus(webhookUrl: string, data: any) {
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
                text: `*생년월일:*\n${data.users.birthday}`,
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
                  data.usersubscriptions.start_date || '미정'
                }`,
              },
              {
                type: 'mrkdwn',
                text: `*결제금액:*\n${
                  data.paymentinfo?.amount && `${data.paymentinfo.amount}원`
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
