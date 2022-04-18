export type User = {
  uid: string;
  name?: string;
  avatarURL?: string;
  email?: string;
  createdAt: Date;
  isAdmin: boolean;
};
