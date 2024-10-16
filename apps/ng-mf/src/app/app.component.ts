import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColumnDef, VcsDatatableComponent, VcsSidenavComponent, VcsDatePickerComponent, VcsToastComponent } from '@ng-mf/my-lib';
import { Observable, of } from 'rxjs';

interface FakeData {
  id: number;
  name: string;
  email: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, VcsSidenavComponent, RouterModule, VcsDatatableComponent, AsyncPipe, VcsDatePickerComponent, VcsToastComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  duration = 3000;
  fakeData$: Observable<FakeData[]>;
  columns: ColumnDef[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' }
  ];

  isDisabled = false; // Add this line

  constructor(private viewContainerRef: ViewContainerRef) {
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
    // Handle the date change event here
    console.log('Birthday changed:', event);
  }

  onToastClick() {
    console.log('Toast clicked');
    const toastComponent = this.viewContainerRef.createComponent(VcsToastComponent);
    toastComponent.instance.message = 'Hello World';
    toastComponent.instance.type = 'info';
    toastComponent.instance.duration = this.duration;
    toastComponent.instance.show();
  }
}
