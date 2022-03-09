import { LoginService } from 'src/app/services/login/login.service';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { IFormations } from 'src/app/models/IFormations';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllFormationService {


  readonly url = 'http://localhost:8080/api/indexedpage';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private authentication: LoginService) { }
  public getHeaderToken(): { headers: HttpHeaders } {
    const token =  this.localStorageService.get('token');
    return { headers: new HttpHeaders({ authorization: `Bearer ${token}` }) };
  }

  count(search: string) {
        return this.http.get<any>(`${environment.apiConfig.apiUrl}/api/indexedpages/count/${search}`);
    }

  getByKeyword(page: number = 0, keyword = ''): Observable<IFormations[]>  {
        const token = this.localStorageService.get('token').token;
        const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);

        return this.http.get<IFormations[]>(environment.apiConfig.apiUrl + '/api/indexedpage/' + keyword + '/'+ page  + '/8/', {headers});

  }

  getAllByKeyword(keyword: string, page: number = 0, size: number = 8) : Observable<IFormations[]>  {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const url: string = `${environment.apiConfig.apiUrl}/indexed-pages/${keyword}/${page}/${size}`;
    return this.http.get<IFormations[]>(url, { headers });
  }



  public countAllFormation(){
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.get(`${environment.apiConfig.apiUrl}/api/indexedpage/count`, { headers});
  }

  countBy(published: number, httpParams: HttpParams) {

    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'bearer ' + token);
    return this.http.get<any>(`${environment.apiConfig.apiUrl}/api/indexedpages/count-by/${published}`,
                                    {headers, params: httpParams});
    }

  searchBy(page: number, size: number, published: number, httpParams: HttpParams) {

    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'bearer ' + token);

    return this.http.get<any>(`${environment.apiConfig.apiUrl}/api/indexedpages/search-by/${published}/${page - 1}/${size}`,
      { headers, params: httpParams});
    }
}
