import { Product } from "./adminInterfaces";

export interface StorageCartItem {
  count: number;
  item: Product;
}

export type LocalStorageCart = StorageCartItem[];
