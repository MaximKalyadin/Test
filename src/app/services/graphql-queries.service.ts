import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphqlQueriesService {

  constructor() { }

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

  getPublicationsListQuery(first: number, cursor: string = ""): string {
    return `
      {
        publications(first:${first}, after:"${cursor}") {
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
