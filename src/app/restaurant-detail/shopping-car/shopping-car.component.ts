import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'mt-shopping-car',
  templateUrl: './shopping-car.component.html',
  animations: [
    trigger('row', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        animate('300ms 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-30px)', offset: 0 }),
          style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
          style({ opacity: 1, transform: 'translateX(0px)', offset: 1 })
        ]))
      ]),
      transition('ready => void', [
        animate('300ms 0s ease-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0px)', offset: 0 }),
          style({ opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
          style({ opacity: 0, transform: 'translateX(30px)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class ShoppingCarComponent implements OnInit {

  constructor(private shoppingCarService: ShoppingCartService) { }

  rowState = 'ready'

  ngOnInit() {
  }

  itens(): any {
    return this.shoppingCarService.items;
  }

  clear() {
    this.shoppingCarService.clear();
  }

  removeItem(item: any) {
    this.shoppingCarService.removeItem(item);
  }

  addItem(item: any) {
    this.shoppingCarService.addItem(item);
  }

  total(): number {
    return this.shoppingCarService.total();
  }


}
