import { Injectable } from '@angular/core';
import { Filter } from '../models/filter';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  _filter!: BehaviorSubject<Filter>;

  constructor() {
    this._filter = new BehaviorSubject<Filter>({
      publisher: '',
      title: '',
      journals: [],
      isReload: false
    });
  }

  get filter() {
    return this._filter.getValue();
  }

  set filter(filter: Filter) {
    this._filter.next(filter);
  }
}
