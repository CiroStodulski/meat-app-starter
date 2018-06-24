import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../restaurant-detail/shopping-car/cart-item.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html',
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CartItem[];
  @Output() increaseQty = new EventEmitter<CartItem>();
  @Output() decreaseQty = new EventEmitter<CartItem>();
  @Output() remove = new EventEmitter<CartItem>();

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    console.log(this.items)
  }

  emitIncreaseQty(item: CartItem) {
    this.increaseQty.emit(item);
  }

  emitDecreaseQty(item: CartItem) {
    this.decreaseQty.emit(item);
  }

  emitRemove(item: CartItem) {
    this.remove.emit(item);
  }

  
}
