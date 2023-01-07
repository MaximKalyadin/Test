import { Component, OnInit } from '@angular/core';
import { GraphqlQueriesService } from '../../../services/graphql-queries.service';
import { ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/publication';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-publication-card',
  templateUrl: './publication-card.component.html',
  styleUrls: ['./publication-card.component.scss']
})
export class PublicationCardComponent implements OnInit {

  publication!: Publication;

  constructor(private graphqlService: GraphqlQueriesService,
              private route: ActivatedRoute,
              private filterService: FilterService) { }

  ngOnInit(): void {
    const pubId = this.route.snapshot.paramMap.get('id');
    if (pubId) {
      this.getPublication(pubId);
    }
  }

  back() {
    history.back();
    this.filterService.filter = {...this.filterService.filter, isReload: false}
  }

  getPublication(pubId: string) {
    axios.post(environment.baseURL, {
        query: this.graphqlService.getPublicationQuery(pubId)
      }
    ).then(response => {
      this.publication = response.data.data.publications.edges[0]?.node;
      this.publication.authors = this.publication.authors ? JSON.parse(this.publication.authors).toString() : '';
      this.publication.tags = this.publication.tags ? JSON.parse(this.publication.tags).toString() : '';
    });
  }
}
