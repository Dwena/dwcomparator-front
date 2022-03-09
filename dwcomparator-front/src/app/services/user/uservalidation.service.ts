import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UservalidationService {

  constructor() { }
  passwordLength = 4;

  public controlRequiredfield(field : FormControl): string {
    if ( field.touched ) {
      if (field.getError('required')) {
        return `Le champ est obligatoire`;
      }
    }
    return null;
  }

  public controlEmailField(emailField: FormControl): string {
    if ( emailField.touched ) {
      if (emailField.getError('required')) {
        return `L'adresse email est obligatoire`;
      }
      if (emailField.getError('error_email')) {
        return `L'adresse email n'est pas valide`;
      }
    }
    return null;
  }

  public controlPasswordField(passwordField : FormControl): string {
    if (passwordField.touched ) {
      if (passwordField.getError('required')) {
        return `Le mot de passe est obligatoire`;
      }
      if (passwordField.getError('minlength')) {
        return `Le mot de passe doit contenir au moins ${this.passwordLength} caractères`;
      }
    }

    return null;
  }

  public controlPasswordConfirmField(passwordConfirmField : FormControl, form : FormGroup): string {
    if ( passwordConfirmField.touched ) {
      if (passwordConfirmField.getError('required')) {
        return `La confirmation est obligatoire`;
      }

      /*if (this.confirm.getError('error_match_password')) {
        return `Le mot de passe et la confirmation sont différents`;
      }*/

      if (form.getError('error_match_password')) {
        return `Le mot de passe et la confirmation sont différents`;
      }
    }

    return null;
  }

}
