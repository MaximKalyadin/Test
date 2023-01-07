import { Injectable } from '@angular/core';
import { Filter } from '../models/filter';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public keyFilter = 'keyFilter';

  _filter: BehaviorSubject<Filter> = new BehaviorSubject<Filter>({
    publisher: '',
    title: '',
    journals: []
  });

  constructor() { }

  get filter() {
    return this._filter.getValue();
  }

  set filter(filter: Filter) {
    this._filter.next(filter);
  }
}
