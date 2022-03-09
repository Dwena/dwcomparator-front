import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlToCrawl } from 'src/app/models/urlToCrawl'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlToCrawlService {

    readonly url = `${environment.apiConfig.apiUrl}/api/urlToCrawl`;
    headers: HttpHeaders;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.headers = new HttpHeaders()
    this.headers = this.headers.set('content-type','application/json')
    this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
   }

  urls: any;
    newList: any;

   getAllUrl() : Observable<urlToCrawl[]>{

    const token = this.localStorageService.get('token').token;
    console.log(token);
    const headers = this.headers.set('Authorization', 'bearer ' + token);
    return  this.http.get<urlToCrawl[]>(this.url + "/0/10", { headers });
  }

  getByTrainingCenterId(id) : Observable<urlToCrawl[]>{

    const token = this.localStorageService.get('token').token;
    console.log(token);
    const headers = this.headers.set('Authorization', 'bearer ' + token);
    return  this.http.get<urlToCrawl[]>(this.url + "/trainingCenter/" + id, { headers });
  }

  public getAllUrlToCrawl(page: number, size: number, search: string): Observable<urlToCrawl[]>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.get<urlToCrawl[]>(environment.apiConfig.apiUrl + '/api/urlToCrawl/' + (page - 1) + '/' + size + '/' + search, {headers});
  }


  public countUrlToCrawl(search: string):Observable<any>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.get(`${environment.apiConfig.apiUrl}/api/urlToCrawl/count/`+ search ,{ headers});
  }

   getOneUrl(id)  : Observable<urlToCrawl>{
    const token = this.localStorageService.get('token').token;
    console.log(token);
    const headers = this.headers.set('Authorization', 'bearer ' + token);
    return this.http.get<urlToCrawl>(this.url + "/" + id, { headers });

  }

   addUrl(datas: urlToCrawl) {
    const token = this.localStorageService.get('token').token;
     const headers = this.headers.set('Authorization', 'bearer ' + token);
     console.log(datas)
     const body = datas;
     console.log(body)
    this.http.post<urlToCrawl>( this.url, body, { headers}).pipe().subscribe((value) => {

    console.log(value)
    })
  }

  editUrl(datas: urlToCrawl) {
    const token = this.localStorageService.get('token').token;
    const headers = this.headers.set('Authorization', 'bearer ' + token);
    const body = datas;
    return this.http.put<urlToCrawl>(this.url, body, { headers })

  }

  deleteUrlById(id: number): Observable<urlToCrawl> {
    const token = this.localStorageService.get('token').token;
    const headers = this.headers.set('Authorization', 'bearer ' + token);
    return this.http.delete<urlToCrawl>(this.url + '/' + id, { headers })
  }
}
