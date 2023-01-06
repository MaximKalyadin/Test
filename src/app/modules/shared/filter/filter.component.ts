import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

}
