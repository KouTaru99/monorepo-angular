import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, Injector, Input, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Định nghĩa interface cho option
export interface SelectOption {
  key: string | number;
  value: string;
  [key: string]: any; // cho phép thêm các property khác
}

@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './lib-select.component.html',
  styleUrl: './lib-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibSelectComponent),
      multi: true,
    },
  ],
})
export class LibSelectComponent<T extends SelectOption> extends ControlValueAccessorDirective<T> implements AfterViewInit, OnDestroy {
  @Input() options: T[] = [];
  @Input() label = '';
  @Input() selectId = `vcs-select-${Math.random().toString(36).substr(2, 9)}`;
  @Input() multiple = true;
  @Input() searchable = true;
  @Input() externalSearch = false;

  remainingItemsCount = 0;
  shouldShowCollapsed = false;
  searchTerm = '';
  @ViewChild('triggerContainer') triggerContainer!: ElementRef;
  filteredOptions: T[] = [];
  private checkContainerTimeoutId: any;
  private maxWidth = 300; // hoặc bất kỳ giá trị max-width nào bạn muốn
  private readonly MAX_DISPLAY_LENGTH = 50; // Có thể điều chỉnh số này

  constructor(
    @Inject(ChangeDetectorRef) private cdr: ChangeDetectorRef,
    @Inject(Injector) injector: Injector
  ) {
    super(injector);
    this.cdr = cdr;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.filteredOptions = this.options;
  }

  ngAfterViewInit() {
    // const resizeObserver = new ResizeObserver(() => {
    //   this.checkContainerOverflow();
    // });
    // resizeObserver.observe(this.triggerContainer?.nativeElement);
  }

  getFirstSelectedItem(): string {
    return this.control?.value?.[0]?.value || '';
  }

  compareWith(item1: any, item2: any): boolean {
    return item1?.key === item2?.key;
  }

  getVisibleItems(): T[] {
    if (!this.control?.value) return [];
    if (!this.shouldShowCollapsed) return this.control.value;

    // Nếu đang ở trạng thái collapsed, chỉ trả về số item có thể hiển thị
    const visibleCount = this.control.value.length - this.remainingItemsCount;
    return this.control.value.slice(0, visibleCount);
  }

  checkContainerOverflow() {
    if (!this.multiple || !this.triggerContainer?.nativeElement) return;

    const selectedValues = this.control?.value || [];
    if (selectedValues.length === 0) return;

    const container = this.triggerContainer.nativeElement;
    const containerWidth = container.offsetWidth;

    // Thêm type annotation cho item
    const fullText = selectedValues
      .map((item: T) => item.value)
      .join(', ');

    // Tạo temporary element để đo độ rộng thực tế của text
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.innerText = fullText;
    document.body.appendChild(tempSpan);

    const textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);

    // Nếu text quá dài
    if (textWidth > containerWidth - 40) { // trừ đi padding và buffer
      // Hiển thị item đầu tiên + more
      this.shouldShowCollapsed = true;
      this.remainingItemsCount = selectedValues.length - 1;
    } else {
      this.shouldShowCollapsed = false;
      this.remainingItemsCount = 0;
    }

    this.cdr.detectChanges();
  }

  getDisplayText(): string {
    const selectedValues = this.control?.value || [];
    if (selectedValues.length === 0) return '';

    // Tạo chuỗi hiển thị đầy đủ
    const fullText = selectedValues
      .map((item: T) => item.value)
      .join(', ');

    // Nếu text quá dài, hiển thị dạng rút gọn
    if (fullText.length > this.MAX_DISPLAY_LENGTH) {
      const firstItem = selectedValues[0].value;
      const remainingCount = selectedValues.length - 1;
      return `${firstItem}${remainingCount > 0 ? `, +${remainingCount} more` : ''}`;
    }

    return fullText;
  }

  onInputChange(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.handleInternalSearch(term);
  }

  handleInternalSearch(term: string) {
    if (!term) {
      this.filteredOptions = this.options;
      return;
    }

    this.filteredOptions = this.options.filter(option =>
      option.value.toLowerCase().includes(term.toLowerCase())
    );
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.stopPropagation();
    }
  }
  clearSearchTerm() {
    this.searchTerm = '';
    this.handleInternalSearch('');
  }

  ngOnDestroy() {
    if (this.checkContainerTimeoutId) {
      clearTimeout(this.checkContainerTimeoutId);
    }
  }
}
