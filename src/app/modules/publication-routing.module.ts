import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PublicationComponent} from "./publication/publication/publication.component";
import {PublicationsComponent} from "./publications/publications/publications.component";

const routes: Routes = [{
  path: '',
  data: {
    title: 'Publications'
  },
  children: [
    {
      path: 'edition',
      component: PublicationsComponent,
      data: {
        title: 'Publication list'
      },
    },
    {
      path: 'edition/:id',
      component: PublicationComponent,
      data: {
        title: 'Publication'
      },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationRoutingModule { }
