import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColumnDef, VcsDatatableComponent, VcsSidenavComponent, VcsDatePickerComponent, VcsToastComponent, VcsToastService, VcsDialogService, CustomDatetimePickerComponent, CustomToastFromMaterialService, CustomDialogService, VcsSelectComponent, VcsPaginationComponent, VcsFileUploadComponent } from '@ng-mf/my-lib';
import { Observable, of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatetimeModalComponent } from './components/datetime-modal/datetime-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
    VcsPaginationComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
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
    private vcsDialogService: VcsDialogService,
    private customToastService: CustomToastFromMaterialService,
    private customDialogService: CustomDialogService,
    private dialog: MatDialog
  ) {
    this.fakeData$ = of([
      { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com' },
      { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com' },
      { id: 3, name: 'Lê Văn C', email: 'levanc@example.com' },
      { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com' },
      { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@example.com' },
    ]);
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

  openSimpleDialog() {
    this.vcsDialogService.showDialog({
      title: 'Thông báo đơn giản',
      content: 'Đây là một thông báo đơn giản từ VcsDialogService.',
      okText: 'Đồng ý',
      cancelText: 'Hủy bỏ',
      onOk: () => console.log('Người dùng đã đồng ý'),
      onCancel: () => console.log('Người dùng đã hủy bỏ')
    });
  }

  openCustomDialog() {
    this.vcsDialogService.showDialog({
      title: 'Dialog tùy chỉnh',
      content: this.customDialogContent,
      okText: 'Xác nhận',
      cancelText: 'Đóng',
      onOk: () => console.log('Người dùng đã xác nhận'),
      onCancel: () => console.log('Người dùng đã đóng dialog')
    });
  }

  openConfirmDialog() {
    this.vcsDialogService.showConfirm({
      title: 'Xác nhận hành động',
      content: 'Bạn có chắc chắn muốn thực hiện hành động này không?',
      okText: 'Có',
      cancelText: 'Không',
      onOk: () => console.log('Người dùng đã xác nhận hành động'),
      onCancel: () => console.log('Người dùng đã hủy hành động')
    });
  }

  openToast() {
    this.customToastService.showSuccess('Thành công', 'Đây là một thông báo thành công', 'Thực hiện', () => console.log('Thực hiện hành động'));
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
}
