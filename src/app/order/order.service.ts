import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ShoppingCartService } from "../restaurant-detail/shopping-car/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-car/cart-item.model";
import { Order, OrderItem } from "./order.model";
import { Observable } from "rxjs/Observable";
import { MEATT_API } from "../app.api";

@Injectable()

export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: Http) {

    }

    itemsValue(): number {
        return this.cartService.total();
    }

    carItems(): CartItem[] {
        return this.cartService.items;
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item);
    }


    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem): any {
        this.cartService.removeItem(item);
    }

    clear() {
        this.cartService.clear();
    }

    checkOrder(order: Order): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${MEATT_API}/orders`, JSON.stringify(order), new RequestOptions({ headers: headers }))
            .map((res) => res.json())
            .map((order) => order.id);
    }
}