import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './restaurants.service';
import { Restaurant } from './restaurant/restaurant.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import "rxjs/add/operator/switchMap"
import "rxjs/add/operator/do"
import "rxjs/add/operator/debounceTime"
import "rxjs/add/operator/catch"
import "rxjs/add/observable/from"
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('togleeSearch', [
      state('hidden', style({ opacity: 0, "max-height": "0px" })),
      state('visible', style({ opacity: 1, "max-height": "70px", "margin-top": "20px" })),
      transition("* => *", animate('250ms 0s ease-in-out'))
    ]),
  ]
})

export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];
  searchBarState = 'hidden';
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restauransService: RestaurantService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.restauransService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
    this.searchControl = this.formBuilder.control('');
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500)
      .do(searchTem => console.log(`q=${searchTem}`))
      .switchMap(searchteam => this.restauransService.restaurants(searchteam).catch(error => Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants)
  }

  togleSearch() {
    this.searchBarState = this.searchBarState == 'hidden' ? 'visible' : 'hidden';
  }
}
