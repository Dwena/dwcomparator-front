import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LoginService } from '../../services/login/login.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent  {
  public user: User[] = null;

  constructor(private _loginService: LoginService,
    private router: Router,
  private localStorageService: LocalStorageService) {
          console.log(this.user);

  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async submit() {

    if (this.form.valid) {
      await this._loginService.auth(this.form.value.username, this.form.value.password);
      var th = this;

      setTimeout(function () {

        th._loginService.getAll().subscribe((val) => {
        th.localStorageService.set("users", val);
        })
        th.user = th._loginService.info;
        th.router.navigate(['/allformations']);
      }, 1000);



      //console.log(this._loginService.users);
      //this.submitEM.emit(this.form.value);
  }

    }

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

}
