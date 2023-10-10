import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { APIResponse } from '@/types/api';

export type LoginResponseData = {
  username: string;
  accessToken: string;
  role: string;
  id: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<LoginResponseData>>,
) {
  const KEY = process.env.NEXTAUTH_SECRET as string;
  if (req.method !== 'POST') {
    res.status(401).json({
      message: 'Method not allowed',
      status: 'error',
    });
  }
  const { username, password, isAdmin } = req.body;
  if (!username || !password) {
    res.status(400).json({
      status: 'error',
      message: 'Request missing username or password',
    });
  }

  if (isAdmin === 'true' && username === 'admin' && password === 'admin') {
    const payload = {
      role: 'admin',
      username: username,
      id: '62642hhr38r838r38',
    };
    const token = jwt.sign(payload, KEY, { expiresIn: '1d' });
    res.status(200).json({
      status: 'success',
      message: 'User successfully logged in',
      data: {
        id: payload.id,
        role: payload.role,
        username: payload.username,
        accessToken: token,
      },
    });
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
    res.status(200).json({
      status: 'success',
      message: 'User successfully logged in',
      data: {
        id: payload.id,
        role: payload.role,
        username: payload.username,
        accessToken: token,
      },
    });
  } else {
    res.status(401).json({
      status: 'error',
      message: 'Invalid username or password',
    });
  }
}
