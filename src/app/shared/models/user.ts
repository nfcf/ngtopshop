export class User {
  $key?: string;
  id: string; // same as $key but won't get deleted
  displayName: string;
  email: string;
  billingAddress: string;
  shippingAddress: string;
  role: 'user' | 'manager' | 'admin';
  active: boolean;
}
