import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['../../styles.css'],
})
export class ButtonComponent {
  @Input() label = 'Default';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Input() active = false;
  @Input() disabled = false;
  @Input() disableStyle: string = '';
  @Output() onClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const classes = ['button'];

    classes.push(`button--${this.size}`);
    classes.push(`button--${this.variant}`);

    if (this.active) {
      classes.push('button--active');
    }

    if (this.disabled) {
      classes.push('button--disabled');
    }

    return classes.join(' ');
  }
}
