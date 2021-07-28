import { LocalStorageService } from './../local-storage/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainingCenter } from './../../models/trainingCenter';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TraningCenterService {

  constructor(private httpClient:HttpClient, private localStorageService: LocalStorageService) { }

  create(data: any): Observable<any>{
    return this.httpClient.post(environment.apiConfig.apiUrl, data);
  }

  public getTrainingCenter(page: number, size: number, search: string): Observable<TrainingCenter[]>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.get<TrainingCenter[]>(environment.apiConfig.apiUrl + '/api/trainingcenters/' + (page - 1) + '/' + size + '/' + search, {headers});
  }

  public getAllTrainingCenter(): Observable<TrainingCenter[]>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.get<TrainingCenter[]>(environment.apiConfig.apiUrl +'/api/trainingcenters/', {headers});
  }


  public countTrainingCenter(search: string):Observable<any>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.get(`${environment.apiConfig.apiUrl}/api/trainingcenters/count/`+ search ,{ headers});
  }

  public deleteTrainingCenter(id: number): Observable<any>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.delete<TrainingCenter>(environment.apiConfig.apiUrl + '/api/trainingcenters/' + id, { headers });
  }

  public saveTrainingCenter(data){
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.post(`${environment.apiConfig.apiUrl}/api/trainingcenters`,data,{ headers});
  }

  public getTrainingCenterById(id): Observable<TrainingCenter>{
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.get<TrainingCenter>(`${environment.apiConfig.apiUrl}/api/trainingcenters/${id}`,{ headers});
  }

  public updateTrainingCenter(data){
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.httpClient.post(`${environment.apiConfig.apiUrl}/api/trainingcenters`,data, { headers});
  }

  public UpdateTrainingCenter(user: TrainingCenter) {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const body = user;
    return this.httpClient
      .put<TrainingCenter>(
        environment.apiConfig.apiUrl + '/api/trainingcenters', body, { headers })
            .pipe(map(tcSaved => {
                return tcSaved;
            }));
  }

  public editTrainingCenter(trainingCenter: TrainingCenter): Observable<TrainingCenter> {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const body = trainingCenter;
    return this.httpClient
      .put<TrainingCenter>(
        environment.apiConfig.apiUrl + '/api/trainingcenters', body, { headers });
  }

}
