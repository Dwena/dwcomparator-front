import { AddUserComponent } from './components/user/adduser/adduser.component';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AllFormationComponent } from './components/all-formation/all-formation.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrainingCenterComponent } from './components/training-center/traning-center/traning-center.component';
import { UsersListComponent } from './components/user/userlist/userlist.component';
import { UserdetailsComponent } from './components/user/userdetails/userdetails.component';
import { AddUrlToCrawlComponent } from './components/urlToCrawl/add-url-to-crawl/add-url-to-crawl.component';
import { DetailsUrlToCrawlComponent } from './components/urlToCrawl/details-url-to-crawl/details-url-to-crawl.component';
import { ListUrlToCrawlComponent } from './components/urlToCrawl/list-url-to-crawl/list-url-to-crawl.component';
import { NewTrainingCenterComponent } from './components/training-center/new-traning-center/new-traning-center.component';
import {  EditTrainingCenterComponent } from './components/training-center/edit-traning-center/edit-traning-center.component';
import {  EditUserComponent } from './components/user/edituser/edituser.component';
import { IndexedPagesComponent } from './components/indexed-pages/indexed-pages.component';
import { DetailsTrainingCenterComponent } from './components/training-center/details-training-center/details-training-center.component';
import { IndexedpageDetailsComponent } from './components/indexed-pages/indexedpage-details/indexedpage-details.component';
import { EditUrlToCrawlComponent } from './components/urlToCrawl/edit-url-to-crawl/edit-url-to-crawl.component';
import { CrawlerComponent } from './components/crawler/crawler/crawler.component';
import { LaunchCrawlerComponent } from './components/crawler/launch-crawler/launch-crawler.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AllFormationComponent,
    LoginComponent,
    LoginPageComponent,
    TrainingCenterComponent,
    UsersListComponent,
    UserdetailsComponent,
    AddUserComponent,
    AddUrlToCrawlComponent,
    DetailsUrlToCrawlComponent,
    ListUrlToCrawlComponent,
    NewTrainingCenterComponent,
    EditTrainingCenterComponent,
    EditUserComponent,
    IndexedPagesComponent,
    DetailsTrainingCenterComponent,
    IndexedpageDetailsComponent,
    EditUrlToCrawlComponent,
    CrawlerComponent,
    LaunchCrawlerComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
