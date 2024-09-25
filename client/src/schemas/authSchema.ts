import { z } from 'zod';

export enum UserStatusEnum {
  pending = 'pending',
  guest = 'guest',
  logged = 'logged',
}

export const userDataSchema = z.object({
  email: z.string(),
  name: z.string(),
  id: z.number(),
});

export type UserDataT = z.infer<typeof userDataSchema>;

export const backendAuthSchema = z.object({
  accessToken: z.string(),
  user: userDataSchema,
});

export type AuthT = {
  accessToken: string;
  user: UserT;
};

export type UserT =
  | { status: UserStatusEnum.pending }
  | { status: UserStatusEnum.guest }
  | ({
      status: UserStatusEnum.logged;
    } & UserDataT); // extends
// export type UserT =
//   | { loading: false }
//   | { loading: true; guest: true }
//   | {
//       loading: true;
//       email: string;
//       name: string;
//       id: number;
//     };

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginForm = z.infer<typeof loginFormSchema>;
