import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label = 'Default';
  @Input() variant: 'primary' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Input() active = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const classes = ['button'];

    classes.push(`button--${this.size}`);
    classes.push(`button--${this.variant}`);

    if (this.active) {
      classes.push('button--active');
    }

    return classes.join(' ');
  }
}
