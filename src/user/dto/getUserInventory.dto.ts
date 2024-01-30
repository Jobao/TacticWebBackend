import { Item } from 'src/item/schemas/item.schema';

export class GetUserInventoryDTO {
  constructor() {
    this.inventory = [];
  }
  inventory: ITupleInventory[];
}

type IInventory = {};

type ITupleInventory = {
  amount: number;
  item: Item;
};
