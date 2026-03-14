export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  createdAt: Date;
}

export interface UserRow {
  id: string;
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  created_at: Date;
}
