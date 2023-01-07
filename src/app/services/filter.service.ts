import { Injectable } from '@angular/core';
import { Filter } from '../models/filter';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  keyFilter = 'keyFilter';
  _filter!: BehaviorSubject<Filter>;

  constructor() {
    this._filter = new BehaviorSubject<Filter>({
      publisher: '',
      title: '',
      journals: []
    });
    localStorage.setItem(this.keyFilter, JSON.stringify(this.filter));
  }

  get filter() {
    return this._filter.getValue();
  }

  set filter(filter: Filter) {
    this._filter.next(filter);
  }
}
