# Code Review Checklist

## 1. Tổng quan
- [ ] PR/MR có mô tả rõ ràng về các thay đổi
  > Ví dụ tốt:
  > ```
  > Thêm tính năng authentication với JWT
  > - Implement JWT service
  > - Thêm guard cho protected routes
  > - Thêm interceptor để handle token
  > ```
  > 📚 [Hướng dẫn viết PR description hiệu quả](https://www.pullrequest.com/blog/writing-a-great-pull-request-description/)

- [ ] Các commit messages có ý nghĩa và tuân theo format
  > Format: `<type>(<scope>): <subject>`
  > Ví dụ: `feat(auth): implement JWT authentication`
  > 📚 [Conventional Commits](https://www.conventionalcommits.org/)

- [ ] Branch được tạo từ nhánh chính xác
  > Ví dụ: `feature/auth-jwt` từ `develop`
  > 📚 [Git Branching Strategy](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## 2. Chức năng
- [ ] Code thực hiện đúng yêu cầu nghiệp vụ
  > Ví dụ: Authentication flow phải handle được:
  > - Login/Logout
  > - Token refresh
  > - Session timeout
  > 📚 [Angular Authentication Best Practices](https://angular.io/guide/security)

- [ ] Các case edge đã được xử lý
  > Ví dụ cho form validation:
  > - Empty input
  > - Invalid format
  > - Network error
  > 📚 [Error Handling Best Practices](https://angular.io/guide/rx-library#error-handling)

## 3. Code Quality
- [ ] Code dễ đọc và dễ hiểu
  > Bad:
  > ```typescript
  > const x = a ? b ? c : d : e;
  > ```
  > Good:
  > ```typescript
  > const isFirstCondition = a;
  > const isSecondCondition = b;
  > const result = isFirstCondition 
  >   ? (isSecondCondition ? c : d)
  >   : e;
  > ```
  > 📚 [Angular Style Guide](https://angular.io/guide/styleguide)

- [ ] Không có code trùng lặp
  > Ví dụ: Tách common logic thành shared service/component
  > 📚 [DRY Principle](https://angular.io/guide/styleguide#dry-principle)

- [ ] Magic numbers được chuyển thành constants
  > Bad:
  > ```typescript
  > if (status === 401) { ... }
  > ```
  > Good:
  > ```typescript
  > const HTTP_STATUS = {
  >   UNAUTHORIZED: 401
  > };
  > if (status === HTTP_STATUS.UNAUTHORIZED) { ... }
  > ```

## 4. Performance
- [ ] Không có memory leaks
  > Ví dụ: Unsubscribe từ observables
  > ```typescript
  > export class MyComponent implements OnDestroy {
  >   private destroy$ = new Subject<void>();
  >
  >   ngOnInit() {
  >     this.someObservable$
  >       .pipe(takeUntil(this.destroy$))
  >       .subscribe();
  >   }
  >
  >   ngOnDestroy() {
  >     this.destroy$.next();
  >     this.destroy$.complete();
  >   }
  > }
  > ```
  > 📚 [RxJS Memory Leaks](https://blog.angular-university.io/rxjs-memory-leaks/)

- [ ] Tối ưu việc gọi API và quản lý state
  > Ví dụ: Sử dụng caching và state management
  > ```typescript
  > @Injectable()
  > export class DataService {
  >   private cache = new Map<string, any>();
  >
  >   getData(key: string) {
  >     if (this.cache.has(key)) {
  >       return of(this.cache.get(key));
  >     }
  >     return this.http.get(`/api/${key}`).pipe(
  >       tap(data => this.cache.set(key, data))
  >     );
  >   }
  > }
  > ```
  > 📚 [Angular Performance Optimization](https://angular.io/guide/performance-optimization)

## 5. Security
- [ ] Validate đầy đủ input từ user
  > Ví dụ:
  > ```typescript
  > const nameRegex = /^[a-zA-Z ]{2,30}$/;
  > const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  > ```
  > 📚 [Angular Security Guide](https://angular.io/guide/security)

- [ ] Không có sensitive data bị lộ
  > Không commit các files như:
  > - .env
  > - private keys
  > - credentials
  > 📚 [Security Best Practices](https://owasp.org/www-project-top-ten/)

## 6. Testing
- [ ] Unit tests có ý nghĩa
  > Ví dụ:
  > ```typescript
  > describe('AuthService', () => {
  >   it('should authenticate valid credentials', () => {
  >     // Arrange
  >     const credentials = {...};
  >     // Act
  >     const result = service.login(credentials);
  >     // Assert
  >     expect(result).toBeTruthy();
  >   });
  > });
  > ```
  > 📚 [Angular Testing Guide](https://angular.io/guide/testing)

## 7. Documentation
- [ ] Comments cho code phức tạp
  > Ví dụ:
  > ```typescript
  > /**
  >  * Transforms raw data from API to match UI requirements
  >  * @param data Raw data from API
  >  * @returns Transformed data object
  >  */
  > transform(data: RawData): TransformedData {
  >   // transformation logic
  > }
  > ```
  > 📚 [JSDoc Documentation](https://jsdoc.app/)

## Lưu ý dành cho devs

### 1. Authentication & Authorization
- Kiểm tra việc implement JWT authentication service
- Đảm bảo xử lý refresh token đúng cách
- Kiểm tra role-based access control

### 2. State Management
- Project đang sử dụng BehaviorSubject cho state management
- Cần kiểm tra việc unsubscribe trong các components
- Xem xét việc implement store pattern nếu state phức tạp

### 3. Internationalization
- Đang sử dụng @ngx-translate
- Default language: 'vi'
- Kiểm tra các translation keys

### 4. UI Components
- Sử dụng kết hợp:
  - Angular Material
  - Bootstrap
- Lưu ý việc style conflict

### 5. Module Federation
- Project structure:
  - Host app: angular-monorepo
  - Remotes app: features có dạng app-feature-name
- Kiểm tra webpack configs cho module federation
- Đảm bảo shared dependencies được cấu hình đúng

### 6. Testing
- Jest configuration đã được setup
- Coverage reporting được enabled trong CI mode
- Kiểm tra test cases cho các shared services

### 7. Performance Considerations
- Bundle size limits:
  - Warning: 2MB
  - Error: 5MB
- Kiểm tra lazy loading implementation
- Xem xét việc implement caching strategy 
 > Ví dụ: Sử dụng caching và state management
  > ```typescript
  > @Injectable()
  > export class DataService {
  >   private cache = new Map<string, any>();
  >
  >   getData(key: string) {
  >     if (this.cache.has(key)) {
  >       return of(this.cache.get(key));
  >     }
  >     return this.http.get(`/api/${key}`).pipe(
  >       tap(data => this.cache.set(key, data))
  >     );
  >   }
  > }
  > ```
  > 📚 [Angular Performance Optimization](https://angular.io/guide/performance-optimization)
  > 📚 [RxJS Caching Strategies](https://blog.angular-university.io/angular-caching/)
  > 📚 [HTTP Caching in Angular](https://angular.io/guide/http#caching)

### 8. Development Guidelines
- Tuân thủ Angular style guide
- Sử dụng TypeScript strict mode
- Implement error handling consistently across services
- Sử dụng proper typing thay vì any

### 9. Build & Deployment
- Nx workspace setup
- Separate configs cho development và production
- Kiểm tra các environment variables

### 10. Libraries & Dependencies
- Angular version: 18.2.0
- Các UI libraries:
  - @angular/material
  - bootstrap
- Utility libraries:
  - ngx-mask
  - ngx-toastr

## Reviewer
- [ ] Đã review tất cả các files changed
- [ ] Đã test locally
- [ ] Approve
