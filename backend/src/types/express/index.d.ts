import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user: User;
      clientIp?: string;
      geo?: {
        countryCode?: string
      }
    }
  }
}

export {};
