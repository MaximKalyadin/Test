import { Injectable } from '@angular/core';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root'
})
export class GraphqlQueriesService {

  constructor(private filterService: FilterService) { }

  getPublicationQuery(pubId: string): string {
    return `
      {
        publications(pubId:"${pubId}") {
          totalCount
          edges {
            node {
              pubId
              id
              journal
              title
              volume
              number
              pages
              year
              publisher
              tags
              authors
            }
          }
        }
      }
    `
  }

  getPublicationsListQuery(first: number, cursor: string = ''): string {



    return `
      {
        publications(first:${first}, publisher:"~${this.filterService.filter.publisher}",
        title:"~${this.filterService.filter.title}", after:"${cursor}") {
          totalCount
          edges {
            node {
              id
              pubId
              journal
              publisher
              authors
              title
              year
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    `
  }

}
