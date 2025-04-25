import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../../services/user.service';
import { User } from '../../../../entities/user';
import { ROUTES } from '../../../../utils/constants';
import { ButtonComponent } from '../../../../components/button.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-details-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './user-details-page.component.html',
  styleUrls: ['../../main.component.css', '../../../../../styles.css'],
})
export class UserDetailsPage implements OnInit {
  userId: number | null = null;
  user: User | null = null;
  error: string | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const parsedId = +id;
        if (isNaN(parsedId)) {
          this.error = 'Invalid user ID';
          this.isLoading = false;
        } else {
          this.userId = parsedId;
          this.loadUserDetails();
        }
      }
    });
  }

  private loadUserDetails(): void {
    if (!this.userId) return;

    this.isLoading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        this.user = user;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  goBack(): void {
    this.router.navigate([ROUTES.USERS]);
  }

  private handleError(err: HttpErrorResponse) {
    console.error('Error fetching user details:', err);
    this.error = 'Could not find user with the given id.';
    this.isLoading = false;
  }
}
