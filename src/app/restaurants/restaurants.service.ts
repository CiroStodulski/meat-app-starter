import { Injectable } from "@angular/core";
import { Restaurant } from "./restaurant/restaurant.model";
import { MEATT_API } from "../app.api";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorHandler } from "../app.error-handler";
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantService {

    constructor(private http: HttpClient) {

    }

    restaurants(search?: string): Observable<Restaurant[]> {
        let params: HttpParams = undefined;
        if (search) {
            params = new HttpParams().append('q', search);
        }
        return this.http.get<Restaurant>(`${MEATT_API}/restaurants`, { params: params })
            .catch(ErrorHandler.handleError);
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEATT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEATT_API}/restaurants/${id}/reviews`)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${MEATT_API}/restaurants/${id}/menu`)
    }
}