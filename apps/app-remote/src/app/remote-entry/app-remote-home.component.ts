import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibSelectComponent, LibInputComponent } from '@ng-mf/my-lib';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CustomDatetimePickerComponent } from "../../../../my-lib/src/lib/components/custom-datetime-picker/custom-datetime-picker.component";

@Component({
  selector: 'app-remote-home',
  standalone: true,
  imports: [CommonModule, LibSelectComponent, LibInputComponent, ReactiveFormsModule, CustomDatetimePickerComponent],
  templateUrl: './app-remote-home.component.html',
  styleUrl: './app-remote-home.component.scss',
})
export class AppRemoteHomeComponent implements OnInit {
  errorMessages = { required: 'The name field is required' };

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl(null, Validators.required),
    dateTime: new FormControl(null, Validators.required),
  });

  options = [
    { key: '1', value: 'Option 1 123123 213123 123123 123123' },
    { key: '2', value: 'Option 2' },
    { key: '3', value: 'Option 3 123123123123' },
    { key: '4', value: 'Option 4' },
    { key: '5', value: 'Option 5' },
    { key: '6', value: 'Option 6' },
  ];

  ngOnInit(): void {
    // this.formGroup.controls.age.disable();
  }

  onChange(event: any) {
    console.log(event);
  }

  onInputValChange(event: any) {
    console.log(event);
  }

  onDateValChange(event: any) {
    console.log(event);
  }
}
