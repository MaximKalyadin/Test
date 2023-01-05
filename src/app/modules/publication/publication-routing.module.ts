import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationCardComponent } from './publication-card/publication-card.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Publications'
  },
  children: [
    {
      path: '',
      component: PublicationListComponent,
      data: {
        title: 'Publication list'
      },
    },
    {
      path: ':id',
      component: PublicationCardComponent,
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
