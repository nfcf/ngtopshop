export class Product {
  $key?: string;
  id: string; // same as $key but won't get deleted
  name: string;
  description: string;
  price: number;
  active: boolean;
}
