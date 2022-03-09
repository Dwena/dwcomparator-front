import { IndexedpageDetailsComponent } from './components/indexed-pages/indexedpage-details/indexedpage-details.component';
import { EditUserComponent } from './components/user/edituser/edituser.component';
import { UserdetailsComponent } from './components/user/userdetails/userdetails.component';
import { UsersListComponent } from './components/user/userlist/userlist.component';
import { AddUserComponent } from './components/user/adduser/adduser.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllFormationComponent } from './components/all-formation/all-formation.component';
import { HomeComponent } from './components/home/home.component';
// import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TrainingCenterComponent } from './components/training-center/traning-center/traning-center.component';
import { ListUrlToCrawlComponent} from './components/urlToCrawl/list-url-to-crawl/list-url-to-crawl.component';
import { EditUrlToCrawlComponent} from './components/urlToCrawl/edit-url-to-crawl/edit-url-to-crawl.component';

import { NewTrainingCenterComponent } from './components/training-center/new-traning-center/new-traning-center.component';
import { EditTrainingCenterComponent } from './components/training-center/edit-traning-center/edit-traning-center.component';
import { IndexedPagesComponent } from './components/indexed-pages/indexed-pages.component';
import { DetailsTrainingCenterComponent } from './components/training-center/details-training-center/details-training-center.component';
import { AddUrlToCrawlComponent } from './components/urlToCrawl/add-url-to-crawl/add-url-to-crawl.component';

import { CrawlerComponent } from './components/crawler/crawler/crawler.component';
import { LaunchCrawlerComponent } from './components/crawler/launch-crawler/launch-crawler.component';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DetailsUrlToCrawlComponent } from './components/urlToCrawl/details-url-to-crawl/details-url-to-crawl.component';



const routes: Routes = [
  { path: '', component: AllFormationComponent },
  { path: 'allformations', component: AllFormationComponent },
  // { path: 'login', component: LoginComponent},
  { path: 'login-page', component: LoginPageComponent},
  { path: 'trainingCenter', component: TrainingCenterComponent},
  { path : 'add-user', component: AddUserComponent},
  { path: 'add-trainingcenter', component: NewTrainingCenterComponent},
  {path : 'crawler', component: ListUrlToCrawlComponent},
  { path : 'edit-trainingcenter/:id', component: EditTrainingCenterComponent},
  { path: 'listUrlToCrawl', component: ListUrlToCrawlComponent },
  { path : 'addUrlToCrawl', component: AddUrlToCrawlComponent},
  { path : 'editUrlToCrawl/:id', component: EditUrlToCrawlComponent},
  { path : 'detailUrlToCrawl/:id', component: DetailsUrlToCrawlComponent},
  { path: 'userlist', component: UsersListComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'user-details/:id', component: UserdetailsComponent},
  { path: 'indexedpage', component: IndexedPagesComponent},
  { path: 'detail-trainingcenter/:id', component: DetailsTrainingCenterComponent},
  { path: 'indexedpage/details/:id', component: IndexedpageDetailsComponent},
  { path: 'crawlers', component: CrawlerComponent},
  { path: 'launch-crawler', component: LaunchCrawlerComponent},
  { path: 'mdp-oublie', component: ForgotPasswordComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
