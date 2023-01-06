import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationCardComponent } from './publication-card/publication-card.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationRoutingModule } from './publication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    PublicationCardComponent,
    PublicationListComponent
  ],
  imports: [
    CommonModule,
    PublicationRoutingModule,
    SharedModule,
    MatListModule,
    MatIconModule
  ],
  providers: []
})

export class PublicationModule { }
