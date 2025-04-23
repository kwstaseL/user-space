import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UserService } from '../../../../services/user.service';
import { User } from '../../../../entities/user';
import { AddressType } from '../../../../utils/enums';
import { Address } from '../../../../entities/address';
import { Router } from '@angular/router';
import { ROUTES } from '../../../../utils/constants';

@Component({
  selector: 'app-register-user-page',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './register-user-page.component.html',
  styleUrls: ['../../main.component.css'],
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

    const user = this.createUserFromForm();
    this.saveUser(user);
  }

  private createUserFromForm(): User {
    const formData = this.userForm.value;
    const addresses = this.createAddressesFromForm(formData);

    return {
      name: formData.name,
      surname: formData.surname,
      gender: formData.gender,
      birthDate: formData.birthdate,
      addresses: addresses,
    };
  }

  private createAddressesFromForm(formData: any): Address[] {
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

    return addresses;
  }

  private saveUser(user: User): void {
    this.userService.createUser(user).subscribe({
      next: () => this.handleSuccess(),
      error: (error) => this.handleError(error),
    });
  }

  private handleSuccess(): void {
    this.isSubmitting = false;
    this.router.navigate([ROUTES.USERS]);
  }

  private handleError(error: { status: number }): void {
    this.isSubmitting = false;
    console.error('Error while trying to create user ', error);
    this.errorMessage = 'Could not register user.';
  }
}
