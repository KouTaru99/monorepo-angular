import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
export class VcsSelectComponent implements OnInit, OnChanges, AfterViewInit {
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
  @ViewChild('triggerContainer') triggerContainer!: ElementRef;
  remainingItemsCount = 0;
  shouldShowCollapsed = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr = cdr;
    this.toppings.valueChanges.subscribe(() => {
      this.checkContainerOverflow();
    });
  }

  ngOnInit() {
    this.updateFormControl();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected']) {
      this.updateFormControl();
    }
  }

  ngAfterViewInit() {
    const resizeObserver = new ResizeObserver(() => {
      this.checkContainerOverflow();
    });
    resizeObserver.observe(this.triggerContainer.nativeElement);
  }

  private updateFormControl() {
    setTimeout(() => {
      this.toppings.setValue(this.selected, { emitEvent: false });
    });
  }

  onSelectedChange(event: MatSelectChange) {
    const selectedValue = event.value;
    this.selectedChange.emit(selectedValue);

    // Đợi DOM cập nhật xong
    setTimeout(() => {
      this.checkContainerOverflow();
    });
  }

  compareWith(item1: any, item2: any): boolean {
    return item1?.key === item2?.key;
  }

  checkContainerOverflow() {
    if (!this.multiple || !this.triggerContainer?.nativeElement) return;

    const container = this.triggerContainer.nativeElement;
    const containerWidth = container.offsetWidth;
    const scrollWidth = container.scrollWidth;

    // Kiểm tra overflow thực tế
    if (scrollWidth > containerWidth) {
      this.shouldShowCollapsed = true;
      this.remainingItemsCount = this.toppings.value.length - 1;
    } else {
      this.shouldShowCollapsed = false;
    }
    this.cdr.detectChanges();
  }

  getFirstSelectedItem(): string {
    return this.toppings.value?.[0]?.value || '';
  }

}
