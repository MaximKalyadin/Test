import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';
import { fromEvent, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  journals = new FormControl('');
  journalList = ['ChemCatChem', 'Scientific Data', 'Nature Energy']
  publisherCheck: string = 'Wiley Online Library';
  publisherList: string[] = ['Wiley Online Library', 'Springer', 'APS'];

  constructor(public filterService: FilterService) { }

  ngOnInit(): void {
    this.initSearch();
    this.publisherCheck = this.filterService.filter.publisher;
  }

  private initSearch() {
    const search = document.getElementById('search');
    if (search) {
      fromEvent(search, 'input')
        .pipe(
          map((event: any) => event.target.value),
          switchMap((query: string) => {
            this.filterService.filter = {...this.filterService.filter, title: query, isReload: true}
            return '';
          })
        )
        .subscribe();
    }
  }

  setPublisher(publisher: string) {
    this.filterService.filter = {...this.filterService.filter, publisher: publisher, isReload: true}
  }

  setJournals() {
    this.filterService.filter = {...this.filterService.filter, journals: this.journals.value, isReload: true}
  }

}
