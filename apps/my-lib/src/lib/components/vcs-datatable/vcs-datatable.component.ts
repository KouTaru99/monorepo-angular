import {SelectionModel} from '@angular/cdk/collections';
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { VcsEllipsisDirective } from './ellipsis.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

export interface ColumnDef {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  format?: (value: any, row: any) => string;
}

export interface Action {
  name: string;
  label: string;
  handler: (item: any) => void;
}

@Component({
  selector: 'vcs-datatable',
  templateUrl: './vcs-datatable.component.html',
  styleUrls: ['./vcs-datatable.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    VcsEllipsisDirective,
    MatTooltipModule,
    TranslateModule
  ]
})
export class VcsDatatableComponent implements OnInit {
  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];
  @Input() actions: Action[] = [];
  @Input() searchable = true;

  @Output() rowSelected = new EventEmitter<any[]>();
  @Output() search = new EventEmitter<string>();

  displayedColumns: string[] = ['select'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  searchValue = '';

  ngOnInit() {
    this.displayedColumns = ['select', ...this.columns.map(col => col.key)];
    if (this.actions.length > 0) {
      this.displayedColumns.push('actions');
    }
    this.dataSource = new MatTableDataSource(this.data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
    this.emitSelectedRows();
  }

  toggleRow(row: any) {
    this.selection.toggle(row);
    this.emitSelectedRows();
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  emitSelectedRows() {
    this.rowSelected.emit(this.selection.selected);
  }

  handleSearch() {
    this.search.emit(this.searchValue);
  }

  formatCellValue(row: any, column: ColumnDef) {
    if (column.format) {
      return column.format(row[column.key], row);
    }
    return row[column.key];
  }

  handleAction(action: Action, item: any) {
    action.handler(item);
  }
}
