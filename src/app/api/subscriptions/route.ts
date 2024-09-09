import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user } = body;

    if (!user) {
      return NextResponse.json(
        { message: 'User data is required' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: 'Subscription created successfully',
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Invalid JSON payload',
        error: (error as Error).message,
      },
      { status: 400 }
    );
  }
}
