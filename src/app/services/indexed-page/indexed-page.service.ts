import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { IndexedPage } from './../../models/indexed-page';

@Injectable({
  providedIn: 'root',
})
export class IndexedPageService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  /*public getAllIndexedPage(page: number = 0, size: number = 25) {

    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const url: string = `${environment.apiConfig.apiUrl}/api/indexedpages/${page}/${size}`;
    this.pages = await this.http.get(url, { headers }).subscribe((val) => {

      this.localStorageService.set("page", val);
      console.log(val);
      return val;
    });
    return this.pages;
  }*/
  public getAllIndexedPage(page: number , size: number): Observable<IndexedPage[]>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.get<IndexedPage[]>(environment.apiConfig.apiUrl + '/api/indexedpage/' + page + '/' + size, { headers});
  }

  public getAllByKeyword(keyword: string= '', page: number , size: number = 10): Observable<IndexedPage[]> {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const url = environment.apiConfig.apiUrl + '/api/indexedpage/' + keyword + '/' + page + '/' + size;
    return this.http.get<IndexedPage[]>(url, { headers });
  }

  public getIndexedPageById(id): Observable<IndexedPage>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.get<IndexedPage>(environment.apiConfig.apiUrl + '/api/indexedpage/' + id, { headers});

  }

  public deleteIndexedPage(id){
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.delete(environment.apiConfig.apiUrl + '/api/indexedpage/' + id, { headers});
  }

  public countIndexedPage(a: string){
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.get<any>(environment.apiConfig.apiUrl + '/api/indexedpage/count/' + a, { headers});
  }
  countBy(published: number, httpParams: HttpParams) {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.get<any>(`${environment.apiConfig.apiUrl}/api/indexedpages/count-by/${published}`, { params: httpParams, headers});
    }

  searchBy(page: number, size: number, published: number, httpParams: HttpParams) {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.get<any>(`${environment.apiConfig.apiUrl}/api/indexedpages/search-by/${published}/${page }/${size}`,
                                    { params: httpParams, headers });
    }
}
