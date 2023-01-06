import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphqlQueriesService {

  constructor() { }

  getShortPublication(first: number, cursor: string = ""): string {
    return `
      {
        publications(first:${first}, after:"${cursor}") {
          totalCount
          edges {
            node {
              id
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
