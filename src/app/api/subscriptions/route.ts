import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RequestItemsType {
  user: {
    name: string;
    email: string;
    phone_number: string;
    gender: '남성' | '여성' | '기타' | '비공개';
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const userInfo = await prisma.users.create({
      data: {
        email: body.users.email,
        name: body.users.name,
        phone_number: body.users.phone_number,
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
