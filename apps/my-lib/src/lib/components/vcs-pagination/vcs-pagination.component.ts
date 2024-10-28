import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vcs-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vcs-pagination.component.html',
  styleUrl: './vcs-pagination.component.scss',
})
export class VcsPaginationComponent {
  @Input() totalPages = 1;
  @Input() currentPage = 1;
  @Output() currentPageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 3; // Số trang hiển thị tối đa

    if (this.totalPages <= maxVisiblePages + 2) { // +2 cho trang đầu và cuối
      // Hiển thị tất cả các trang
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Luôn thêm trang đầu
      pages.push(1);

      if (this.currentPage <= 3) {
        // Ở đầu: 1 2 3 ... 10
        pages.push(2, 3);
      } else if (this.currentPage >= this.totalPages - 2) {
        // Ở cuối: 1 ... 8 9 10
        pages.push(this.totalPages - 2, this.totalPages - 1);
      } else {
        // Ở giữa: 1 ... 4 5 6 ... 10
        pages.push(this.currentPage - 1, this.currentPage, this.currentPage + 1);
      }

      // Luôn thêm trang cuối
      if (!pages.includes(this.totalPages)) {
        pages.push(this.totalPages);
      }
    }

    return pages;
  }

  get showLeftEllipsis(): boolean {
    return this.currentPage > 3;
  }

  get showRightEllipsis(): boolean {
    return this.currentPage < this.totalPages - 2;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  onPageChange(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.currentPageChange.emit(page);
    }
  }
}
