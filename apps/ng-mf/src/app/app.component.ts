import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewContainerRef, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColumnDef, VcsDatatableComponent, VcsSidenavComponent, VcsDatePickerComponent, VcsToastComponent, VcsToastService, CustomDatetimePickerComponent, CustomDialogService, VcsSelectComponent, VcsPaginationComponent, VcsFileUploadComponent, VcsTextFieldComponent, VcsTopbarComponent, DateTimeRange } from '@ng-mf/my-lib';
import { Observable, of, Subscription, tap, interval } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatetimeModalComponent } from './components/datetime-modal/datetime-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface FakeData {
  id: number;
  name: string;
  email: string;
}

@Component({
  standalone: true,
  imports: [CommonModule,
    VcsSidenavComponent,
    RouterModule, VcsDatatableComponent,
    AsyncPipe, VcsDatePickerComponent, VcsToastComponent,
    MatFormFieldModule,
    MatInputModule,
    CustomDatetimePickerComponent,
    VcsSelectComponent,
    VcsPaginationComponent,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    VcsTextFieldComponent,
    VcsTopbarComponent,
    TranslateModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  dateTimeControl = new FormControl();
  minDate = new Date(2020, 0, 1); // 01/01/2020
  maxDate = new Date(2025, 11, 31); // 31/12/2025

  onDateRangeChange(range: DateTimeRange) {
    if (range.fromDate && range.toDate) {
      console.log('From:', range.fromDate);
      console.log('To:', range.toDate);
    } else {
      console.log('Invalid date range');
    }
  }




  form!: FormGroup;
  selectedOption = '';
  errorMessage = 'trường bắt buộc';

  onSelectionChangeToError() {
    switch (this.selectedOption) {
      case 'one':
        this.form.get('inputControl')?.setErrors({ custom: true });
        this.errorMessage = 'Error for option one';
        break;
      case 'two':
        this.form.get('inputControl')?.setErrors({ custom: true });
        this.errorMessage = 'Error for option two';
        break;
      default:
        this.form.get('inputControl')?.setErrors(null);
        break;
    }
  }

  refreshInterval: Subscription | null = null;

  handleRefresh() {
    // Hủy subscription cũ nếu có
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
      this.refreshInterval = null;
    }

    // Nếu selectedOption là null thì không làm gì
    if (this.selectedOption === 'null') {
      return;
    }

    // Tạo interval mới dựa trên selectedOption (đơn vị là giây)
    const intervalTime = parseInt(this.selectedOption) * 1000;
    this.refreshInterval = interval(intervalTime)
      .pipe(
        tap(() => {
          console.log('Refreshing data...', intervalTime);
          // Thêm logic refresh data ở đây
        })
      )
      .subscribe();
  }












  @ViewChild('customDialogContent') customDialogContent!: TemplateRef<void>;

  duration = 3000;
  fakeData$: Observable<FakeData[]>;
  columns: ColumnDef[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' }
  ];

  isDisabled = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private vcsToastService: VcsToastService,
    private customDialogService: CustomDialogService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.fakeData$ = of([
      { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmm' },
      { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com' },
      { id: 3, name: 'Lê Văn C', email: 'levanc@example.com' },
      { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com' },
      { id: 5,  name: 'Hoàng Văn E', email: 'hoangvane@example.com' },
    ]);
    this.translate.use('en');
    this.translate.setDefaultLang('en');
  }

  onRowSelected(event: FakeData[]) {
    console.log(event);
  }

  onSearch(event: string) {
    console.log(event);
  }

  onBirthdayChange(event: any): void {
    console.log('Birthday changed:', event);
  }


  openConfirmDialog1() {
    this.customDialogService.confirm('Confirm Action', 'Are you sure you want to proceed?')
      .subscribe(result => {
        if (result) {
          console.log('User confirmed');
        } else {
          console.log('User cancelled');
        }
      });
  }

  openActionDialog() {
    this.customDialogService.action('Choose an Action', 'Select one of the following options:', [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 }
    ]).subscribe(result => {
      console.log('User selected:', result);
    });
  }

  openInformationDialog() {
    this.customDialogService.information('Information', 'This is an informational message.')
      .subscribe(() => {
        console.log('User acknowledged the information');
      });
  }

  yourOptions  = [
    { key: 1, value: 'Option 1' },
    { key: 2, value: 'Option 2' },
    { key: 3, value: 'Option 3' }
  ];;
  initialSelectedValue = [{ key: 2, value: 'Option 2' }] // or ['Mushroom', 'Onion'] for multiple

  onSelectionChange(newValue: any) {
    console.log('New selection:', newValue);
  }

  openDatetimeDialog() {
    this.dialog.open(DatetimeModalComponent, {
      data: { title: 'Chọn ngày giờ' }
    });
  }

  openFileUploadDialog() {
    this.dialog.open(VcsFileUploadComponent, {
      data: { accept: 'image/*', multiple: true }
    }).afterClosed().subscribe(result => {
      console.log('File upload result:', result);
    });
  }

  paramObj = {
    id: 1,
    name: 'test',
    sorts: ['name,DESC', 'id,ASC'],
    page: null,
    size: null,
    query: '',
    another: ['test', 'test2']
  };

  convertParamToQueryString(paramObj: any): string {
    const queryString = Object.entries(paramObj)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(item => `${key}=${item}`).join('&');
        }
        return `${key}=${value}`;
      })
      .join('&');
    return queryString;
  }

  ngOnInit(): void {
    const queryString = this.convertParamToQueryString(this.paramObj);
    // console.log(queryString);
    this.form = this.formBuilder.group({
      inputControl: new FormControl('', [Validators.required])
    });
  }
}
