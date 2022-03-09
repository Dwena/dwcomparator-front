import { Crawler } from './../../models/crawler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrawlerService {

  constructor(private httpClient:HttpClient, private localStorageService: LocalStorageService) { }

  create(data: any): Observable<any>{
    return this.httpClient.post(environment.apiConfig.apiUrl, data);
  }

  /*public getCrawlerByPage(page:number,size:number, sortBy:string, descAsc:string, search:string ){
    return this.httpClient.get<Crawler[]>(`${environment.apiConfig.apiUrl}/api/crawlers/${page-1}/${size}/${sortBy}/${descAsc}/${search}`);
  }*/
  public getCrawlerByPage(page: number, size: number, search: string): Observable<Crawler[]>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.get<Crawler[]>(environment.apiConfig.apiUrl + '/api/crawlers/' + (page - 1) + '/' + size +  '/' + search, {headers});
  }

  public crawlTrainingCenter(id:number){
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.get<Crawler>(`${environment.apiConfig.apiUrl}/api/crawlers/trainingcenter/${id}`, {headers});
  }

  public updateNotCompletedCrawlers(){
    return this.httpClient.get<Crawler[]>(`${environment.apiConfig.apiUrl}/api/crawlers/update-not-completed`);
  }

  /*public countCrawler(search:string){
    return this.httpClient.get(`${environment.apiConfig.apiUrl}/api/crawlers/count/${search}`);
  }*/
  public countCrawler(search: string):Observable<any>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.get(`${environment.apiConfig.apiUrl}/api/crawlers/count`+ search ,{ headers});
  }

  /*public getCrawlerById(id){
    return this.httpClient.get<Crawler>(`${environment.apiConfig.apiUrl}/api/crawlers/${id}`);
  }*/
  public getCrawlerById(id): Observable<Crawler>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.get<Crawler>(`${environment.apiConfig.apiUrl}/api/crawlers/${id}`,{ headers});
  }

  public ifCrawlerInProgressByIdTrainingFormation(id){
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.get<Crawler>(`${environment.apiConfig.apiUrl}/api/ifcrawlerinprogress/${id}`,{ headers});
  }

}
