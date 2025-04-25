// user-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../entities/user';
import { ButtonComponent } from '../../../../components/button.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['../../main.component.css'],
})
export class UserFormComponent {
  @Input() userForm!: FormGroup;
  @Input() submitButtonText = 'Default';
  @Input() isSubmitting = false;
  @Input() errorMessage: string | null = null;
  @Input() showCancelButton = false;

  @Output() formSubmit = new EventEmitter<void>();
  @Output() cancelClick = new EventEmitter<void>();

  onSubmit(): void {
    this.formSubmit.emit();
  }

  onCancel(): void {
    this.cancelClick.emit();
  }
}
