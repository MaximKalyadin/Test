import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment'
import { GraphqlQueriesService } from 'src/app/services/graphql-queries.service'
import { PublicationPage } from '../../../models/publication-page';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  publicationPage: PublicationPage[] = [];

  countPublicationsOnPage = 10;

  constructor(private graphqlService: GraphqlQueriesService) { }

  ngOnInit(): void {
    this.getShortPublications("");
  }

  getShortPublications(cursor: string) {
    axios.post(environment.baseURL, {
        query: this.graphqlService.getShortPublication(this.countPublicationsOnPage)
      }
    ).then(response => {
      this.publicationPage.push({
       publications: response.data.data.publications.edges.map((edge: { node: any; }) => edge.node),
       page: 1,
       totalCount: response.data.data.publications.totalCount,
       pages: response.data.data.publications.pageInfo
      });
      console.log(this.publicationPage)
    });
  }

}
