import { Injectable } from "@angular/core";
import { Restaurant } from "./restaurant/restaurant.model";
import { MEATT_API } from "../app.api";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorHandler } from "../app.error-handler";
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantService {

    constructor(private http: Http) {

    }

    restaurants(): Observable<Restaurant[]> {
        return this.http.get(`${MEATT_API}/restaurants`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError);
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http.get(`${MEATT_API}/restaurants/${id}`)
            .map(res => res.json())
            .catch(ErrorHandler.handleError);
    }

    reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEATT_API}/restaurants/${id}/reviews`)
            .map(res => res.json())
            .catch(ErrorHandler.handleError);
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get(`${MEATT_API}/restaurants/${id}/menu`)
            .map(res => res.json())
            .catch(ErrorHandler.handleError);
    }
}