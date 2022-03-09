import { first } from 'rxjs-compat/operator/first';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UservalidationService } from './../../../services/user/uservalidation.service';
import { CustomValidators } from './../../../validators/custom-validators';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EditUserComponent implements OnInit {
 user: User = {} as User;
  id: number;
  error = '';
  loading = false;
  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.updateEditForm();
    this.route.params
      .subscribe(params => {
        this.id = params.id;
        this.userService.getById(this.id)
          .subscribe({
            next: (foundUser) => {
              this.user = foundUser;
              this.updateEditForm();
            },
            error: error => {
              this.error = error;
              this.loading = false;
            }
          });
      }
      );
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  updateEditForm(): void {
    this.editForm = this.formBuilder.group({
      lastname: [this.user.lastName, Validators.required],
      firstname: [this.user.firstName, Validators.required],
      email: [this.user.email, Validators.email],
      password: [
        this.user.password,
        Validators.required
      ],
      id: [this.user.id],
      version: [this.user.version],
      active: [this.user.active, Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    this.loading = true;
    this.user.id = this.f.id.value;
    this.user.version = this.f.version.value;
    this.user.firstName = this.f.firstname.value;
    this.user.lastName = this.f.lastname.value;
    this.user.email = this.f.email.value;
    this.user.password = this.f.password.value;
    this.user.active = this.f.active.value;

    this.userService.UpdateUser(this.user)
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/users'
          const returnUrl = this.route.snapshot.queryParams.returnUrl || '/userlist';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

}


