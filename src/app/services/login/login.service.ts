import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { PasswordResetDto } from 'src/app/models/password-reset';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  users: any;
  token?: string;
  info: any;


  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  //Authentification method
   async auth(email: string, password: string) {

     this.getToken(email, password).subscribe(
        async (val) => {
          console.log('POST call successful value returned in body', val);
          this.localStorageService.set("token", val);
          this.info = this.localStorageService.get("currentUser")
         this.users = this.localStorageService.get("users")
         var th = this;
         setTimeout(function(){ th.getByEmail(email); }, 1000);


        },
        (response) => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );


      //  then(() => {
      //  this.info = this.localStorageService.get("currentUser")
      //  this.users = this.localStorageService.get("users")
      //  this.getByEmail(email);

    //  });

  }
   logout(){
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
  }

  isAuthenticate(){
    if(localStorage.getItem('currentUser') != null)
        return true;
      else
        return false;

  }

   getToken(email: string, password: string) {
     return this.http
       .post<User>('http://localhost:8080/authenticate', {
         email: email,
         password: password,
       });

  }

  getAll(page: number = 0 , size: number = 25) {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    const url: string = `${environment.apiConfig.apiUrl}/api/users/${page}/${size}`;
    return  this.http.get<User>(url, { headers })
    //return this.users;
  }

  //Get by current user
  async getByEmail(email: string) {
    const token = this.localStorageService.get('token').token;
    const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    await this.http
      .get<User>(
        environment.apiConfig.apiUrl +
          '/api/users/search?email=' +
          email,
        { headers }
      )
      .subscribe(
        (val) => {
          //console.log('POST call successful value returned in body', val);
          this.localStorageService.set('currentUser', val);
        }
    );
  }

  public sendTokenByMail(email: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const passwordResetDto: PasswordResetDto = { email: email };
      const response = this.http.post<any>(
        `${environment.apiConfig.apiUrl}${environment.apiConfig.sendMailUrl}`,
        passwordResetDto
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
          resolve(apiErrorDto);
        });
    });
  }

  mdpOublie(email: String){
    return this.http.get(`${environment.apiConfig.apiUrl}/api/forgotten-password/${email}`);
  }

  newPassword(code: String, password: String){
    return  this.http.post<any>(`${environment.apiConfig.apiUrl}/api/forgotten-password/new-password`, { code, password });
  }

  refreshUser() {
    //user soit stoké dans localstorage > refresh
  }

}
