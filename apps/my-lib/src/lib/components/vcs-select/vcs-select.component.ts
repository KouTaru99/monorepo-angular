import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface SelectOption {
  key: string | number;
  value: string;
}

@Component({
  selector: 'vcs-select',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vcs-select.component.html',
  styleUrl: './vcs-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VcsSelectComponent implements OnInit, OnChanges {
  toppings:any = new FormControl('');
  @Input() options: SelectOption[] = [];
  @Input() multiple = false;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() hint = '';
  @Input() error = '';
  @Input() selected: string | string[] | number | number[] | SelectOption | SelectOption[] = [];
  @Output() selectedChange = new EventEmitter<string | string[] | number | number[]>();

  ngOnInit() {
    this.updateFormControl();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected']) {
      this.updateFormControl();
    }
  }

  private updateFormControl() {
    setTimeout(() => {
      this.toppings.setValue(this.selected, { emitEvent: false });
    });
  }

  onSelectedChange(event: MatSelectChange) {
    const selectedValue = event.value;
    this.selectedChange.emit(selectedValue);
  }

  compareWith(item1: any, item2: any): boolean {
    return item1?.key === item2?.key;
  }

}
