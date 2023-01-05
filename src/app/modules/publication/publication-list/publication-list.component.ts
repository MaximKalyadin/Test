import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_SHORT_PUBLICATION } from '../../../graphql/graphql.queries'
import { Publication } from '../../../models/publication';
import {map, Observable} from 'rxjs';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  countPublication = 10;
  publications: Publication[] = [];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_SHORT_PUBLICATION
    }).valueChanges.subscribe(({ data, error}: any) => {
      // this.publications = data.publications;
      console.log(data);
      console.log(error);
    })
    /*this.postsRef = this.apollo.watchQuery<any>({
      query: GET_SHORT_PUBLICATION,
      variables: {
        first: this.countPublication
      }
    });
    this.publications = this.postsRef.valueChanges.pipe(
      map(result => {
        console.log(result);
        return result.data.publications.edges.map((value: { node: any; }) => value.node);
      })
    );*/

  }

}
