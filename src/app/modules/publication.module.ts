import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationsComponent } from "./publications/publications/publications.component";
import { PublicationComponent } from "./publication/publication/publication.component";
import { PublicationRoutingModule } from "./publication-routing.module";

@NgModule({
  declarations: [
    PublicationsComponent,
    PublicationComponent
  ],
  imports: [
    CommonModule,
    PublicationRoutingModule
  ],
  entryComponents: [
    PublicationsComponent
  ]
})

export class PublicationModule { }
