import { OrderItem } from './index';


export class Order {
  $key?: string;
  id: string; // same as $key but won't get deleted
  userId: string;
  items: OrderItem[];
  createdAtUtc: string;
  status: 'new' | 'dispatched';
  active: boolean;
  get totalPrice(): number {
    this._totalPrice = 0;
    (this.items || []).forEach((item: OrderItem) => {
      this._totalPrice += item.quantity * item.price;
    });
    return this._totalPrice;
  }

  private _totalPrice: number;

  constructor(userId: string) {
    this.userId = userId;
    this.createdAtUtc = new Date().toISOString();
    this.active = true;
    this.status = 'new';
    this.items = [];
  }
}
