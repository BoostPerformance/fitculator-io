import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const existingUser = await prisma.users.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const userInfo = await prisma.users.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    const serializedUserInfo = {
      ...userInfo,
      id: userInfo.id.toString(), // BigInt 필드를 문자열로 변환
    };
    return Response.json(serializedUserInfo);
  } catch (error) {
    console.error('Prisma error:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const user = searchParams.get('user');
//   const email = searchParams.get('email');

//   if (!user || !email) {
//     return NextResponse.json(
//       { message: 'User and email are required' },
//       { status: 400 }
//     );
//   }
//   console.log(NextResponse.json);

//   return NextResponse.json(
//     {
//       message: 'Subscription fetched successfully',
//       user,
//       email,
//     },
//     { status: 200 }
//   );
// }
