import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { User } from '../../../../entities/user';
import { UserService } from '../../../../services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-display-users-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-users-page.component.html',
  styleUrls: ['../../main.component.css'],
})
export class DisplayUsersPage implements OnInit {
  users: User[] = [];
  errorMessage: string | null = null;
  isLoading = true;

  readonly config = {
    page: 0,
    pageSize: 20,
    sortField: 'name',
    sortDirection: 'asc',
  };

  constructor(private userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // this.isLoading = true;
    this.userService
      .getAllUsers(
        this.config.page,
        this.config.pageSize,
        `${this.config.sortField},${this.config.sortDirection}`
      )
      .subscribe({
        next: (data) => {
          this.users = data.content;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          this.errorMessage = 'Could not load users.';
          this.isLoading = false;
        },
      });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }

  toggleSort(field: string): void {
    if (this.config.sortField === field) {
      this.config.sortDirection =
        this.config.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.config.sortField = field;
      this.config.sortDirection = 'asc';
    }

    this.loadUsers();
  }
}
