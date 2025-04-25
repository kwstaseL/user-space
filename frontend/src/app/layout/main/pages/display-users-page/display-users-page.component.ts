import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { User } from '../../../../entities/user';
import { UserService } from '../../../../services/user.service';
import { PageResponse } from '../../../../types/PageResponse';
import { ButtonComponent } from '../../../../components/button.component';

interface SortingInterface {
  sortField: string;
  sortDirection: 'asc' | 'desc';
}

interface PaginationInterface {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface UserListConfig {
  pagination: PaginationInterface;
  sorting: SortingInterface;
}

@Component({
  selector: 'app-display-users-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './display-users-page.component.html',
  styleUrls: ['../../main.component.css', '../../../../../styles.css'],
})
export class DisplayUsersPage implements OnInit {
  users: User[] = [];
  errorMessage: string | null = null;
  isLoading = true;

  readonly userListConfig: UserListConfig = {
    pagination: {
      currentPage: 0,
      totalPages: 0,
      pageSize: 5,
    },
    sorting: {
      sortField: 'name',
      sortDirection: 'asc',
    },
  };

  constructor(private userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.isLoading = true;
    const { currentPage, pageSize } = this.pagination;
    const { sortField, sortDirection } = this.sorting;

    this.userService
      .getAllUsers(currentPage, pageSize, `${sortField},${sortDirection}`)
      .subscribe({
        next: (userPage: PageResponse<User>) => {
          this.users = userPage.content;
          this.pagination.totalPages = userPage.totalPages;
          this.pagination.currentPage = userPage.number;
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
          this.pagination.currentPage = 0;
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }

  toggleSort(field: string): void {
    if (this.sorting.sortField === field) {
      this.sorting.sortDirection =
        this.sorting.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sorting.sortField = field;
      this.sorting.sortDirection = 'asc';
    }

    this.loadUsers();
  }

  goToPage(page: number): void {
    this.pagination.currentPage = page;
    this.loadUsers();
  }

  previousPage(): void {
    if (this.pagination.currentPage > 0) {
      this.goToPage(this.pagination.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.pagination.currentPage < this.pagination.totalPages - 1) {
      this.goToPage(this.pagination.currentPage + 1);
    }
  }

  // Utils
  get pagination() {
    return this.userListConfig.pagination;
  }

  get sorting() {
    return this.userListConfig.sorting;
  }
}
