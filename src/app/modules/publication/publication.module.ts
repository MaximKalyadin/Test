import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationCardComponent } from './publication-card/publication-card.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationRoutingModule } from './publication-routing.module';

@NgModule({
  declarations: [
    PublicationCardComponent,
    PublicationListComponent
  ],
  imports: [
    CommonModule,
    PublicationRoutingModule
  ]
})

export class PublicationModule { }
