import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs-compat/operator/first';

@Component({
  selector: 'app-user-list',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UsersListComponent implements OnInit {
  loading = false;
  users: User[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchExpression: ['']
    });

    this.searchExpression = '';



    this.itemsPerPage = 2;
    this.currentPage = 1;

    this.refreshUsersList();
  }

    // convenience getter for easy access to form fields
    // tslint:disable-next-line: typedef
    get f() { return this.searchForm.controls;
  }

  refreshUsersList(): void{
    // update count
    this.userService.countUsers(this.searchExpression).pipe().subscribe(result => {
      this.loading = false;
      this.totalItems = result.nb;
    });
    // update list
    this.userService.getAll(this.currentPage, this.itemsPerPage, this.searchExpression).pipe().subscribe(users => {
            this.loading = false;
            this.users = users;
    });
  }

  pageChanged(event): void{
    this.currentPage = event;
    this.refreshUsersList();
  }

  onSubmit(): void {
        this.loading = false;
        this.searchExpression = this.f.searchExpression.value;
        this.refreshUsersList();
  }

  onDeleteUser(user): void{
    let conf = confirm('Etes vous sûre ?');
    if (conf) {
      this.userService.deleteUserById(user.id)
        .subscribe(data => {
          this.refreshUsersList();
        }, err => {
          console.log('error delete User ', err);
        });
    }
  }
  onAddUser(): void{
    this.router.navigateByUrl('/add-user');
  }

}
