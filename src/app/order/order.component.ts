import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { CartItem } from '../restaurant-detail/shopping-car/cart-item.model';
import { OrderService } from './order.service';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {


  orderForm: FormGroup;
  delivery: number = 8;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  numberPattern = /^[0-9]*$/;

  paymentOptions: RadioOption[] = [
    { label: 'dinheiro', value: 'MON' },
    { label: 'cartão de debito', value: 'DEB' },
    { label: 'cartão refeição', value: 'REF' }
  ];

  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailContfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, { validator: OrderComponent.equalsTo });

  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailContfirmation = group.get('emailContfirmation');

    if (!email || !emailContfirmation)
      return undefined;
    if (email.value !== emailContfirmation.value)
      return { emailNotMatch: true }

  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  carItems(): CartItem[] {
    return this.orderService.carItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }


  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.carItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        this.orderService.clear();
        this.router.navigate(['/order-summary']);
      });
  }

}
