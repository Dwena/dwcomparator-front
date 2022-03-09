import { map } from 'rxjs/operators';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/models/login-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

   create(data: any): Observable<any>{
    return this.http.post(environment.apiConfig.apiUrl, data);
  }

   public countUsers(search: string): Observable<any> {
        const token = this.localStorageService.get('token').token;
        const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
        return this.http.get<any>(environment.apiConfig.apiUrl + '/api/users/count/' + search, {headers});
    }

   public getAll(page: number, size: number, search: string): Observable<User[]>{
        const token = this.localStorageService.get('token').token;
        const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
        return this.http.get<User[]>(environment.apiConfig.apiUrl + '/api/users/' + (page - 1) + '/' + size + '/' + search, {headers});
    }


  public getById(id: number) {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http
      .get<User>(
        environment.apiConfig.apiUrl +
          '/api/users/' +
          id, { headers });
  }


  public addUser(user: User) {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const body = user;
    return this.http
      .post<User>(
        environment.apiConfig.apiUrl + '/api/users', body, { headers }).subscribe(data => {
          user.id = data.id;
      });
  }
  public UpdateUser(user: User) {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const body = user;
    return this.http
      .put<User>(
        environment.apiConfig.apiUrl + '/api/users', body, { headers })
            .pipe(map(userSaved => {
                return userSaved;
            }));
  }

  public editUser(user: User): Observable<User> {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const body = user;
    return this.http
      .put<User>(
        environment.apiConfig.apiUrl + '/api/users', body, { headers });
  }

  public deleteUserById(id: number): Observable<any> {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http
      .delete<any>(environment.apiConfig.apiUrl + '/api/users/' + id, { headers });
  }
  public getAllUser(page: number = 0 , size: number = 10): Observable<User[]> {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const url = `${environment.apiConfig.apiUrl}/api/users/${page}/${size}`;
    return this.http.get<User[]>(url, { headers });
  }
  public countAll(): Observable<any> {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http
      .get<any>(environment.apiConfig.apiUrl + '/api/users/count', { headers });
  }


  //Get by current user
  public getByEmail(email: string): Observable<User> {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http
      .get<User>(
        environment.apiConfig.apiUrl +
          '/api/users/search?email=' +
          email, { headers });
  }
  async resetPassword(
    email: string,
    password: string,
    token: string
  ): Promise<any> {
    return new Promise<any>((resolve) => {
      const loginDto: LoginUser = { email: email, password };
      const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
      const response = this.http.post<any>(
        `${environment.apiConfig.apiUrl}${environment.apiConfig.passwordResetUrl}`,
        loginDto,
        { headers }
      );
      response
        .toPromise()
        .then((loginResponse) => {
          resolve(loginResponse);
        })
        .catch((responseBody) => {
          const apiErrorDto = {
            message: responseBody.error.message,
            status: responseBody.error.status,
          };
          resolve(apiErrorDto.message + ' ' + apiErrorDto.status);
        });
    });
  }

}
