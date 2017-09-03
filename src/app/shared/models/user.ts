export class User {
  $key?: string;
  displayName: string;
  billingAddress: string;
  shippingAddress: string;
  role: 'user' | 'manager' | 'admin';
  active: boolean;
}
