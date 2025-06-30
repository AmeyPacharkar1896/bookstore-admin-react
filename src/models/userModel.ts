export type UserRole = 'admin' | 'customer';

export interface AdminUser {
  id: string;
  email: string;
  display_name?: string;
  role: UserRole;
}
