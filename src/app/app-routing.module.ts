import { InjectionToken, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { FullLayoutComponent } from './container/full-layout/full-layout/full-layout.component';
import {PublicationModule} from "./modules/publication.module";

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const deactivateGuard = new InjectionToken('deactivateGuard');

const routes: Routes = [
  {
    path: '',
    redirectTo: 'publications',
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
  providers: [{
    provide: externalUrlProvider,
    useValue: (route: ActivatedRouteSnapshot) => {

      const externalUrl = route.paramMap.get('externalUrl');
      // @ts-ignore
      window.open(externalUrl, '_self');
    }
  }, {
    provide: deactivateGuard,
    useValue: () => {
      return false;
    }
  }],
})

export class AppRoutingModule {}
