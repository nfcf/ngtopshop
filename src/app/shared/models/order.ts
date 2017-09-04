import { OrderItem } from './index';


export class Order {
  $key?: string;
  userId: string;
  items: OrderItem[];
  createdAtUtc: Date;
  status: 'new' | 'dispatched';
  active: boolean;
}
