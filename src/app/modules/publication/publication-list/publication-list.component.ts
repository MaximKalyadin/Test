import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment'
import { GraphqlQueriesService } from 'src/app/services/graphql-queries.service'
import { PublicationPage } from 'src/app/models/publication-page';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';

const isEqual = require('lodash.isequal');

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
  // я бы мог использовать свойство у pageInfo: hasNextPage, но браузер ругается на
  // Cannot read properties of undefined (reading 'pages')
  disableNextButton = false;

  constructor(private graphqlService: GraphqlQueriesService,
              private router: Router,
              private filterService: FilterService) { }

  ngOnInit(): void {

    // состояние списка и фильтра хранится в localStorage для простоты, так как реализуем простой список
    // и его одно состояние его.
    // хочу еще отметить, что верстка выполнялась в основном на px так как не было задания делать его на адаптив
    const publicationJsonFromLocaleStorage = localStorage.getItem(KEY_PUBLICATION_ARRAY);
    if (publicationJsonFromLocaleStorage) {
      this.publicationPage = JSON.parse(publicationJsonFromLocaleStorage);
      const pageJsonFromLocalStorage = localStorage.getItem(KEY_PAGE);
      this.page = pageJsonFromLocalStorage ? +JSON.parse(pageJsonFromLocalStorage) : 0;
      this.disableNextButton = !this.publicationPage[this.page - 1].pages.hasNextPage;
    } else {
      this.getPublicationsList('');
    }

    this.filterService._filter.subscribe(value => {
      let filter = localStorage.getItem(this.filterService.keyFilter);
      if (filter) {
        filter = JSON.parse(filter);
      }
      // можно было бы сделать приложение на состояниях, но я знаком с ними очень поверхностно
      if (!isEqual(filter, value)) {
        this.page = 0;
        this.publicationPage = [];
        this.getPublicationsList('');
      }
    });
  }

  getPublicationsList(cursor: string) {
    this.disableNextButton = true;
    // axios используется вместо apollo только потому что нам нужно лишь 2 запроса
    // а не получать различные данные и состояния
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
      this.disableNextButton = !this.publicationPage[this.page - 1].pages.hasNextPage;
    } else {
      this.getPublicationsList(cursor)
    }
  }

  previousPage() {
    this.page = this.page - 1;
    this.disableNextButton = !this.publicationPage[this.page - 1].pages.hasNextPage;
  }

  getItem(pubId: string) {
    localStorage.setItem(KEY_PAGE, JSON.stringify(this.page));
    localStorage.setItem(KEY_PUBLICATION_ARRAY, JSON.stringify(this.publicationPage));
    localStorage.setItem(this.filterService.keyFilter, JSON.stringify(this.filterService.filter));
    this.router.navigate(['/publication', pubId])
  }

}
