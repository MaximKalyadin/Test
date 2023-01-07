import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment'
import { GraphqlQueriesService } from 'src/app/services/graphql-queries.service'
import { PublicationPage } from 'src/app/models/publication-page';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';

const KEY_PAGE = 'keyPage';
const KEY_PUBLICATION_ARRAY = 'keyPublications';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  publicationPage: PublicationPage[] = [];
  countPublicationsOnPage = 5;
  page: number = 0;
  disableNextButton = false;

  constructor(private graphqlService: GraphqlQueriesService,
              private router: Router,
              private filterService: FilterService) { }

  ngOnInit(): void {
    const publicationJsonFromLocaleStorage = localStorage.getItem(KEY_PUBLICATION_ARRAY);
    if (publicationJsonFromLocaleStorage) {
      this.publicationPage = JSON.parse(publicationJsonFromLocaleStorage);
      const pageJsonFromLocalStorage = localStorage.getItem(KEY_PAGE);
      this.page = pageJsonFromLocalStorage ? +JSON.parse(pageJsonFromLocalStorage) : 0;
    } else {
      this.getPublicationsList('');
    }

    this.filterService._filter.subscribe(value => {
      if (value.isReload) {
        this.page = 0;
        this.publicationPage = [];
        this.getPublicationsList('');
      }
    });
  }

  getPublicationsList(cursor: string) {
    axios.post(environment.baseURL, {
        query: this.graphqlService.getPublicationsListQuery(this.countPublicationsOnPage, cursor)
      }
    ).then(response => {
      this.publicationPage.push({
       publications: response.data.data.publications.edges.map((edge: { node: any; }) => edge.node),
       totalCount: response.data.data.publications.totalCount,
       pages: response.data.data.publications.pageInfo
      });
      this.disableNextButton = !response.data.data.publications.pageInfo.hasNextPage;
      this.page = this.page + 1;
    });
  }

  nextPage(cursor: string) {
    if (this.page < this.publicationPage.length) {
      this.page = this.page + 1;
    } else {
      this.getPublicationsList(cursor)
    }
  }

  previousPage() {
    this.page = this.page - 1;
  }

  getItem(pubId: string) {
    localStorage.setItem(KEY_PAGE, JSON.stringify(this.page));
    localStorage.setItem(KEY_PUBLICATION_ARRAY, JSON.stringify(this.publicationPage));
    this.router.navigate(['/publication', pubId])
  }

}
