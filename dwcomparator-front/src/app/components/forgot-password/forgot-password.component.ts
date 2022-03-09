import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;
  error: string;

  constructor(private formBuilder: FormBuilder,private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['',Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid)
      return;

    this.loginService.mdpOublie(this.f.email.value).subscribe(data =>{
      if(data == true)
        this.router.navigate(['mdp-oublie/new-mdp']);
      },err=>{
        this.error = err
      });

  }
}
