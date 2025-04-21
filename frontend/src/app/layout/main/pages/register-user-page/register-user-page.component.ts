import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../entities/user';
import { AddressType } from '../../../../utils/enums';
import { Address } from '../../../../entities/address';

@Component({
  selector: 'app-register-user-page',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './register-user-page.component.html',
  styleUrls: [
    '../../main.component.css',
    './register-users-page.component.css',
  ],
})
export class RegisterUserPage {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    workAddress: new FormControl(''),
    homeAddress: new FormControl(''),
  });

  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    const formData = this.userForm.value;
    const addresses: Address[] = [];

    if (formData.workAddress) {
      addresses.push({
        addressType: AddressType.WORK,
        addressText: formData.workAddress,
      });
    }

    if (formData.homeAddress) {
      addresses.push({
        addressType: AddressType.HOME,
        addressText: formData.homeAddress,
      });
    }

    const user: User = {
      name: formData.name,
      surname: formData.surname,
      gender: formData.gender,
      birthDate: formData.birthdate,
      addresses: addresses,
    };

    this.userService.createUser(user).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/users']);
      },
      error: (error) => this.handleError(error),
    });
  }

  private handleError(error: { status: number }) {
    this.isSubmitting = false;
    this.errorMessage = 'Failed to create user. Please try again.';
  }
}
