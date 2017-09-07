import { OrderItem } from './index';


export class Order {
  $key?: string;
  id: string; // same as $key but won't get deleted
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  createdAtUtc: string;
  status: 'new' | 'dispatched';
  active: boolean;
}
