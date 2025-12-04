export interface LegacyUser {
  id: string; // UUID
  name: string; // min 2 char
  email: string; // valid email
  createdAt: string; // ISO Date
}

export interface NewUser extends LegacyUser {
  isActive: boolean; // active status
}

export type User = LegacyUser | NewUser;

export function isNewUser(user: User): user is NewUser {
  return "isActive" in user;
}
