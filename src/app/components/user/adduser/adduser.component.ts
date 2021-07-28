import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UservalidationService } from './../../../services/user/uservalidation.service';
import { CustomValidators } from './../../../validators/custom-validators';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddUserComponent implements OnInit {

  firstNameField: FormControl;
  lastNameField: FormControl;
  emailField: FormControl;
  passwordField: FormControl;
  passwordConfirmField: FormControl;
  form: FormGroup;

user: User = {
  firstName: '',
  lastName: '',
  password: '',
  email: '',
  active: false
  };

passwordConfirm = '';
passwordLength = 4; //TODO changer la longueur minimal des mots de passe
submitted = false;

  constructor(
              private userService: UserService,
              private uservalidationService : UservalidationService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {

    this.firstNameField = new FormControl(null, [ Validators.required ]);
    this.lastNameField = new FormControl(null, [ Validators.required ]);
    this.emailField = new FormControl(null, [Validators.required,CustomValidators.email()]);
    this.passwordField = new FormControl(null, { updateOn: 'blur', validators: [
        Validators.required,
        Validators.minLength(this.passwordLength)
      ]});
    this.passwordConfirmField = new FormControl(null, [ Validators.required ]);

    this.form = this.fb.group({
      firstNameField : this.firstNameField,
      lastNameField : this.lastNameField,
      emailField: this.emailField,
      passwordField: this.passwordField,
      passwordConfirmField: this.passwordConfirmField,

    }, {
      validators: CustomValidators.matchPassword()
    });
  }

  public addUser(): void {

    for ( const key in this.form.controls ) {
      if ( this.form.contains(key) ) {
        this.form.get(key).markAsTouched();
        this.form.get(key).markAsDirty();
      }
    }

    if (this.form.valid) {

      this.saveUser();
      this.form.reset();

    }
  }

  saveUser(): void {
    const data = {
      firstName: this.user.firstName,
      version: 0,
      lastName: this.user.lastName,
      password: this.user.password,
      email: this.user.email,
      active: false
    };
    console.log(data);
    this.userService.addUser(data);
    this.router.navigate(['/userlist']);
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      active: false
    };
  }

  //#region Validation
  public controlFirstName(): string {
     return this.uservalidationService.controlRequiredfield(this.firstNameField);
  }
  public controlLastName(): string {
    return this.uservalidationService.controlRequiredfield(this.lastNameField);
  }
  public controlEmail(): string {
   return this.uservalidationService.controlEmailField(this.emailField);
  }

  public controlPassword(): string {
    return this.uservalidationService.controlPasswordField(this.passwordField);
  }

  public controlConfirm(): string {
   return this.uservalidationService.controlPasswordConfirmField(this.passwordConfirmField, this.form);
  }
  //#endregion

}
