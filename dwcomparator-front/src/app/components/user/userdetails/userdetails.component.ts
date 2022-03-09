import { first } from 'rxjs-compat/operator/first';
import { UserService } from './../../../services/user/user.service';
import { User } from './../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
 user: User = {} as User;
  id: number;
  error = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.id = params.id;
        this.userService.getById(this.id)
          .subscribe({
            next: (foundUser) => {
              this.user = foundUser;
            },
            error: error => {
              this.error = error;
              this.loading = false;
            }
          });
      }
      );
  }
}
