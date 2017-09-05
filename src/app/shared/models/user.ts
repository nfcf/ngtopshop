export class User {
  $key?: string;
  id: string; // sema as $key but won't get deleted
  displayName: string;
  billingAddress: string;
  shippingAddress: string;
  role: 'user' | 'manager' | 'admin';
  active: boolean;
}
