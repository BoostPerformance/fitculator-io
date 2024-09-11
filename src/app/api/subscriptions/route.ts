import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Request body:', body);

    const userInfo = await prisma.users.upsert({
      where: { email: body.user.email },
      update: {
        name: body.user.name,
        phone_number: body.user.phone_number,
      },
      create: {
        email: body.user.email,
        name: body.user.name,
        phone_number: body.user.phone_number,
      },
    });

    const serializedUserInfo = {
      ...userInfo,
      id: userInfo.id.toString(),
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
