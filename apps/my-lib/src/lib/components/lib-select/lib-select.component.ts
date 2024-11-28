import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, Injector, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
export class LibSelectComponent<T> extends ControlValueAccessorDirective<T> implements AfterViewInit {
  @Input() options: any[] = [];
  @Input() label = '';
  @Input() selectId = `vcs-select-${Math.random().toString(36).substr(2, 9)}`;
  @Input() multiple = true;
  remainingItemsCount = 0;
  shouldShowCollapsed = false;
  @ViewChild('triggerContainer') triggerContainer!: ElementRef;

  constructor(
    @Inject(ChangeDetectorRef) private cdr: ChangeDetectorRef,
    @Inject(Injector) injector: Injector
  ) {
    super(injector);
    this.cdr = cdr;
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    const resizeObserver = new ResizeObserver(() => {
      this.checkContainerOverflow();
    });
    resizeObserver.observe(this.triggerContainer.nativeElement);
  }

  getFirstSelectedItem(): string {
    return this.control?.value?.[0]?.value || '';
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
      this.remainingItemsCount = this.control?.value?.length - 1;
    } else {
      this.shouldShowCollapsed = false;
    }
  }

  onInputChange(event: any) {
    console.log(event);
  }
}
