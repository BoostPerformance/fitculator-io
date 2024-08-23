// pages/api/subscriptions.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        userId,
        programType,
        personalInfo,
        exercisePreference,
        subscription,
        payment,
      } = req.body;

      // 데이터베이스에 구독 정보 저장
      const newSubscription = await prisma.userSubscriptions.create({
        data: {
          user: { connect: { id: userId } },
          program: { connect: { name: programType } },
          startDate: new Date(subscription.startDate),
          endDate: new Date(subscription.endDate),
          status: 'active',
          batch:
            programType === 'PRO'
              ? { connect: { id: subscription.batchId } }
              : undefined,
        },
      });

      // 결제 정보 저장
      await prisma.paymentInfo.create({
        data: {
          userSubscription: { connect: { id: newSubscription.id } },
          paymentMethod: payment.method,
          amount: payment.amount,
          paymentDate: new Date(),
        },
      });

      // 운동 선호도 정보 저장 또는 업데이트
      await prisma.exercisePreferences.upsert({
        where: { userId: userId },
        update: {
          exerciseType: exercisePreference.exerciseType,
          exerciseLevel: exercisePreference.exerciseLevel,
          exerciseGoal: exercisePreference.exerciseGoal,
        },
        create: {
          user: { connect: { id: userId } },
          exerciseType: exercisePreference.exerciseType,
          exerciseLevel: exercisePreference.exerciseLevel,
          exerciseGoal: exercisePreference.exerciseGoal,
        },
      });

      res.status(200).json({
        message: 'Subscription created successfully',
        subscriptionId: newSubscription.id,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error creating subscription', message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
