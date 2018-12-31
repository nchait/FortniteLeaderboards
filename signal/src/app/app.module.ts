import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';


import {
  MatButtonModule, 
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
  
} from '@angular/material';

import { AppComponent } from './app.component';
import { DenialModalComponent } from './denial-modal/denial-modal.component';
import { FortniteApiService } from './services/fortnite-API/fortnite-api.service'
import { FortniteStatsService } from './services/fortniteStats/fortnite-stats.service'
import { MainComponent } from './main/main.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProfileModalComponent,
    DenialModalComponent,
    FooterComponent,
    BannerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule
  ],
  providers: [
    FortniteStatsService
  ],
  entryComponents: [
    ProfileModalComponent,
    DenialModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
