import { OrderItem } from './index';


export class Order {
  $key?: string;
  userId: string;
  items: OrderItem[];
  createdAtUtc: string;
  status: 'new' | 'dispatched';
  active: boolean;
}
