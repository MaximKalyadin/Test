import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './container/full-layout/full-layout/full-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'publications/edition',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Publications list'
    },
    children: [{
      path: 'publications',
      loadChildren: () => import('./modules/publication.module').then(m => m.PublicationModule),
      data: {
        title: 'List'
      }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
