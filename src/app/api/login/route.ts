import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export type LoginResponseData = {
  username: string;
  accessToken: string;
  role: string;
  id: string;
};

const handler = async (req: NextRequest) => {
  const KEY = process.env.NEXTAUTH_SECRET as string;
  const data = await req.json();
  const { username, password, isAdmin } = data;
  if (!username || !password) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Request missing username or password',
      },
      {
        status: 400,
      },
    );
  }

  if (isAdmin === 'true' && username === 'admin' && password === 'admin') {
    const payload = {
      role: 'admin',
      username: username,
      id: '62642hhr38r838r38',
    };
    const token = jwt.sign(payload, KEY, { expiresIn: '1d' });
    return NextResponse.json(
      {
        status: 'success',
        message: 'User successfully logged in',
        data: {
          id: payload.id,
          role: payload.role,
          username: payload.username,
          accessToken: token,
        },
      },
      {
        status: 200,
      },
    );
  } else if (
    username === 'siswa' &&
    password === 'siswa' &&
    isAdmin === 'false'
  ) {
    const payload = {
      role: 'siswa',
      username: username,
      id: '43747373ru3r3r38r3',
    };
    const token = jwt.sign(payload, KEY, { expiresIn: '1d' });
    return NextResponse.json(
      {
        status: 'success',
        message: 'User successfully logged in',
        data: {
          id: payload.id,
          role: payload.role,
          username: payload.username,
          accessToken: token,
        },
      },
      {
        status: 200,
      },
    );
  } else {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Invalid username or password',
      },
      {
        status: 401,
      },
    );
  }
};

export { handler as POST };
