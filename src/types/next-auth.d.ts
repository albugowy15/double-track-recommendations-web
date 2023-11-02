import { LoginResponseData } from '@/app/api/login/route';

declare module 'next-auth' {
  interface Session {
    user: LoginResponseData;
  }
}
