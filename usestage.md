# Tài liệu hướng dẫn phát triển

## 1. Tổng quan dự án

### Kiến trúc
- Dự án sử dụng Angular Micro Frontend với Module Federation
- Gồm 2 phần chính:
  - Shell application (ng-mf): Ứng dụng chính
  - Shared library (my-lib): Thư viện components dùng chung

### Tech Stack
- Angular 18.2.0
- Angular Material & ng-zorro-antd cho UI components
- NgRx cho state management 
- i18n với ngx-translate
- Nx workspace để quản lý monorepo

## 2. Cài đặt và Chạy

### Yêu cầu hệ thống
- Node.js 18+
- npm

### Các bước cài đặt
```bash
# Clone repository
git clone <repository-url>

# Cài đặt dependencies 
npm install

# Chạy ứng dụng development
npx nx serve ng-mf

# Build production
npx nx build ng-mf --prod
```

### Cấu hình Docker
```bash
docker-compose -f docker-compose.prod.yaml up --build
```

## 3. Cấu trúc dự án

### Thư mục chính
```
/apps
  /ng-mf          # Shell application
  /app-remote     # Remote application  
  /my-lib         # Shared component library
```

### Shared Components (my-lib)
Library cung cấp các components dùng chung:

- **VcsSidenav**: Sidebar navigation
- **VcsTopbar**: Top navigation bar
- **VcsDataTable**: Data table component  
- **VcsDatePicker**: Date picker component
- **VcsDialog**: Dialog/Modal component
- **VcsToast**: Toast notification
- **VcsFileUpload**: File upload component
- **VcsTextField**: Text input component
- **LanguageSwitcher**: Component chuyển đổi ngôn ngữ

## 4. Tính năng chính

### 4.1. Đa ngôn ngữ (i18n)
- Sử dụng ngx-translate
- File ngôn ngữ trong `assets/i18n/`
- Hỗ trợ Tiếng Việt và Tiếng Anh

### 4.2. Theming
- Custom theme với SCSS
- Có thể tùy chỉnh màu sắc và styles qua CSS variables

### 4.3. Components API

#### VcsDataTable
- Hiển thị dữ liệu dạng bảng
- Hỗ trợ sorting, filtering, pagination
- Custom templates cho cells

#### VcsDatePicker
- Chọn ngày/giờ
- Hỗ trợ range picker
- Custom format

#### VcsFileUpload
- Upload files với drag & drop
- Preview files
- Progress tracking
- Validation

## 5. Hướng dẫn phát triển

### Quy tắc viết code
- Tuân thủ hướng dẫn về phong cách code của Angular
- Sử dụng chế độ nghiêm ngặt của TypeScript
- Đặt tên CSS theo chuẩn BEM

### Kiểm thử
- Unit tests sử dụng Jest
- E2E tests sử dụng Cypress
- Chạy kiểm thử: `npx nx test`

### Build & Triển khai
- Build phiên bản production: `npx nx build --prod`
- Triển khai bằng Docker với nginx
- Cấu hình trong các file `nginx.conf` và `Dockerfile`

## 6. Tài liệu API

### TranslationService
- Quản lý đa ngôn ngữ
- Chuyển đổi ngôn ngữ
- Lưu trữ ngôn ngữ hiện tại

## 7. Xử lý sự cố

### Các vấn đề thường gặp
- Lỗi tải Module Federation
- Thiếu bản dịch i18n
- Xung đột về styles

### Giải pháp
- Xóa bộ nhớ cache của trình duyệt
- Kiểm tra cấu hình webpack
- Rà soát độ ưu tiên của CSS

## 8. Đóng góp code
1. Fork repository về tài khoản cá nhân
2. Tạo nhánh tính năng mới
3. Gửi yêu cầu pull request
4. Tuân thủ quy trình review code

> **Lưu ý**: Tài liệu này cần được cập nhật thường xuyên khi có thay đổi về tính năng hoặc cấu trúc của dự án.
