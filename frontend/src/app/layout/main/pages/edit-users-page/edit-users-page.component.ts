import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ROUTES } from '../../../../utils/constants';
import { AddressType } from '../../../../utils/enums';

import { User, UserDTO } from '../../../../entities/user';
import { Address } from '../../../../entities/address';

import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserService } from '../../../../services/user.service';
import { UserFormData } from '../../../../types/FormData';

@Component({
  selector: 'app-edit-users-page',
  imports: [CommonModule, ReactiveFormsModule, UserFormComponent],
  templateUrl: './edit-users-page.component.html',
  styleUrls: ['../../main.component.css', '../../../../../styles.css'],
})
export class EditUsersPage {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    workAddress: new FormControl(''),
    homeAddress: new FormControl(''),
  });

  userId: number | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.loadUserData();
      }
    });
  }

  private loadUserData(): void {
    if (!this.userId) return;

    this.isLoading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.loadBasicUserInfo(user);
        this.loadUserAddresses(user.addresses);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading user data:', err);
        this.errorMessage = 'Could not load user data.';
        this.isLoading = false;
      },
    });
  }

  handleSubmit(): void {
    if (!this.userForm.valid || !this.userId) {
      return;
    }

    const updatedUser: UserDTO = this.createUserFromForm();
    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: () => {
        this.router.navigate([ROUTES.USERS]);
      },
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  handleCancel(): void {
    this.router.navigate([ROUTES.USERS]);
  }

  private handleError(err: HttpErrorResponse) {
    console.error('Error updating user:', err);
    this.errorMessage = 'Failed to update user';
    this.isLoading = false;
  }

  // Utilities
  private loadBasicUserInfo(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      surname: user.surname,
      gender: user.gender,
      birthdate: user.birthDate,
    });
  }

  private loadUserAddresses(addresses?: Address[]): void {
    if (!addresses || addresses.length === 0) return;

    const workAddress = addresses.find(
      (addr: Address) => addr.addressType === AddressType.WORK
    );
    const homeAddress = addresses.find(
      (addr: Address) => addr.addressType === AddressType.HOME
    );

    this.userForm.patchValue({
      workAddress: workAddress?.addressText || '',
      homeAddress: homeAddress?.addressText || '',
    });
  }

  private createUserFromForm(): UserDTO {
    const formData = this.userForm.value;
    const addresses = this.createAddressesFromForm(formData);

    return {
      // userId will always be there
      // we have a condition in init to handle this case
      id: this.userId!,
      name: formData.name,
      surname: formData.surname,
      gender: formData.gender,
      birthDate: formData.birthdate,
      addresses: addresses,
    };
  }

  private createAddressesFromForm(formData: UserFormData): Address[] {
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
}
