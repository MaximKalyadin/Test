import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PublicationComponent} from "./publication/publication/publication.component";
import {PublicationsComponent} from "./publications/publications/publications.component";

const routes: Routes = [{
  path: '',
  data: {
    title: 'Playlist'
  },
  children: [{
    path: ':id',
    component: PublicationComponent,
    data: {
      title: 'Publication'
    },
  }, {
    path: '',
    component: PublicationsComponent,
    data: {
      title: 'Publication list'
    },
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationRoutingModule { }
