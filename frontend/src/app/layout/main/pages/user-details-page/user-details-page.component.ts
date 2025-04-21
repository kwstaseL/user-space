import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../entities/user';

@Component({
  selector: 'app-user-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details-page.component.html',
  styleUrls: ['../../main.component.css', './user-details-page.css'],
})
export class UserDetailsPage implements OnInit {
  userId: number | null = null;
  user: User | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.loadUserDetails();
      }
    });
  }

  loadUserDetails(): void {
    if (!this.userId) return;

    this.isLoading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
        this.error = 'Failed to load user details. Please try again.';
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
