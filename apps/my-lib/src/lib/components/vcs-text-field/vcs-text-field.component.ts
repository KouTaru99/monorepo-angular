import { CommonModule } from '@angular/common';
import { Component, Input, inject, OnInit } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'vcs-text-field',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  templateUrl: './vcs-text-field.component.html'
})
export class VcsTextFieldComponent implements OnInit {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() required = false;
  @Input() errorMessage = '';

  parentContainer = inject(ControlContainer);

  get control() {
    return this.parentContainer.control?.get(this.controlKey);
  }
  ngOnInit() {

  }

  onInput(e: Event) {
    console.log(e);
  }
}
