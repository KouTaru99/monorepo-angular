# Mục đích của Cấu Hình Budgets
- **Budgets**: Đây là một tính năng của Angular CLI cho phép bạn đặt giới hạn kích thước cho các bundle của ứng dụng. Mục tiêu là để cảnh báo hoặc ngăn chặn khi kích thước bundle vượt quá một ngưỡng nhất định, giúp bạn duy trì hiệu suất tốt hơn.
## Cấu Hình Chi Tiết

```typescript
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "2mb",
      "maximumError": "5mb"
    }
  ]
}
```

- **type**: Loại bundle cần được kiểm soát. Có thể là "initial" (bundle chính) hoặc "lazy" (bundle lazy load).
- **maximumWarning**: Kích thước tối đa cho phép trong trường hợp cảnh báo.
- **maximumError**: Kích thước tối đa cho phép trong trường hợp lỗi.

## Tại Sao Lại Quan Trọng?
- **Thời gian tải trang**: Kích thước bundle lớn có thể làm tăng thời gian tải trang, đặc biệt là trên các kết nối mạng chậm hoặc thiết bị có hiệu suất thấp.
- **Trải nghiệm người dùng**: Người dùng thường không kiên nhẫn với các ứng dụng tải chậm, điều này có thể dẫn đến tỷ lệ thoát cao.
- **SEO và Tìm kiếm**: Các công cụ tìm kiếm có thể đánh giá thấp các trang web tải chậm, ảnh hưởng đến thứ hạng tìm kiếm.

## Cách Tối Ưu Hóa
- **Lazy Loading**: Chỉ tải các module khi cần thiết.
- **Tree Shaking**: Loại bỏ mã không sử dụng trong quá trình build.
- **Code Splitting**: Chia nhỏ mã thành các phần nhỏ hơn để tải dần.
Bằng cách sử dụng cấu hình budgets, bạn có thể kiểm soát tốt hơn kích thước của ứng dụng và đảm bảo rằng nó hoạt động hiệu quả trên nhiều loại thiết bị và kết nối mạng.

## Các bundle của ứng dụng là gì?

Trong bối cảnh ứng dụng web, đặc biệt là với các framework như Angular, "bundle" là một thuật ngữ dùng để chỉ các tệp JavaScript đã được đóng gói lại để có thể được tải và thực thi bởi trình duyệt. Dưới đây là một số điểm chính về bundles:

# Bundle là gì?
- **Bundle**: Là một tệp hoặc một tập hợp các tệp JavaScript được tạo ra từ quá trình build của ứng dụng. Nó bao gồm tất cả mã nguồn, thư viện, và các tài nguyên cần thiết để ứng dụng có thể chạy trên trình duyệt.

## Tại sao cần Bundle?
1. **Tối ưu hóa hiệu suất**:
   - Giảm số lượng yêu cầu HTTP: Thay vì tải nhiều tệp nhỏ, các tệp được gộp lại thành một hoặc vài tệp lớn hơn, giảm số lượng yêu cầu HTTP cần thiết.
   - Tối ưu hóa kích thước: Quá trình bundling thường đi kèm với minification (giảm kích thước mã) và tree shaking (loại bỏ mã không sử dụng), giúp giảm kích thước tổng thể của ứng dụng.
2. **Quản lý phụ thuộc**:
   - Bundling giúp quản lý và đóng gói tất cả các phụ thuộc của ứng dụng, đảm bảo rằng tất cả các phần của ứng dụng có thể hoạt động cùng nhau một cách nhất quán.
3. **Tương thích trình duyệt**:
   - Các công cụ bundling thường bao gồm các bước để chuyển đổi mã ES6+ thành mã ES5, đảm bảo rằng mã có thể chạy trên các trình duyệt cũ hơn.

## Các loại Bundle trong Angular
- **Initial Bundle**:
  - Đây là bundle chính được tải khi ứng dụng khởi động. Nó thường bao gồm mã cần thiết để khởi tạo ứng dụng và các phần quan trọng nhất của ứng dụng.
- **Lazy-loaded Bundles**:
  - Các bundle này được tải khi cần thiết, ví dụ khi người dùng điều hướng đến một phần cụ thể của ứng dụng. Điều này giúp giảm kích thước của initial bundle và cải thiện thời gian tải trang đầu tiên.
- **Vendor Bundle**:
  - Chứa các thư viện bên thứ ba mà ứng dụng sử dụng, như Angular, RxJS, v.v.
## Công cụ Bundling
- **Webpack**:
  - Angular CLI sử dụng Webpack để thực hiện quá trình bundling. Webpack là một công cụ mạnh mẽ cho phép cấu hình chi tiết về cách mã được đóng gói, tối ưu hóa và tải.
## Kết luận
Bundles là một phần quan trọng trong việc triển khai ứng dụng web hiện đại, giúp tối ưu hóa hiệu suất và quản lý mã nguồn một cách hiệu quả. Việc hiểu rõ về bundles và cách chúng hoạt động có thể giúp bạn tối ưu hóa ứng dụng của mình tốt hơn.

# Tại sao lại là 5mb và 2mb có công thức nào để chọn size cho phù hợp hay không?

Việc chọn kích thước cho các ngưỡng cảnh báo và lỗi (như 2MB và 5MB) trong cấu hình bundle size thường không dựa trên một công thức cụ thể, mà phụ thuộc vào nhiều yếu tố khác nhau của dự án và yêu cầu người dùng. Dưới đây là một số yếu tố cần xem xét khi quyết định kích thước phù hợp:

## Đối tượng người dùng và điều kiện mạng
   - Tốc độ mạng: Nếu ứng dụng của bạn chủ yếu được sử dụng ở các khu vực có tốc độ mạng chậm, bạn nên đặt ngưỡng thấp hơn để đảm bảo thời gian tải trang nhanh hơn.
   - Thiết bị người dùng: Nếu người dùng chủ yếu sử dụng thiết bị di động hoặc các thiết bị có cấu hình thấp, kích thước bundle nhỏ hơn sẽ giúp cải thiện hiệu suất.
## Loại ứng dụng
   - Ứng dụng đơn giản: Các ứng dụng có chức năng đơn giản thường có thể giữ kích thước bundle nhỏ hơn.
   - Ứng dụng phức tạp: Các ứng dụng có nhiều tính năng, sử dụng nhiều thư viện bên thứ ba có thể cần kích thước bundle lớn hơn.
## Thực tiễn tốt nhất và khuyến nghị
   - Thực tiễn tốt nhất: Nhiều tổ chức và chuyên gia khuyến nghị giữ kích thước bundle dưới 1-2MB để tối ưu hóa thời gian tải trang đầu tiên.
   - Khuyến nghị của Google: Google khuyến nghị rằng thời gian tải trang đầu tiên nên dưới 3 giây, và kích thước bundle nhỏ hơn sẽ giúp đạt được điều này.
## Công cụ và phân tích
   - Phân tích hiệu suất: Sử dụng các công cụ như Google Lighthouse để phân tích hiệu suất ứng dụng và xác định các vấn đề về kích thước bundle.
   - Kiểm tra người dùng thực tế: Thực hiện kiểm tra với người dùng thực tế để hiểu rõ hơn về trải nghiệm của họ và điều chỉnh kích thước bundle cho phù hợp.
## Cân nhắc về tương lai
   - Tính mở rộng: Đặt ngưỡng sao cho có thể mở rộng ứng dụng trong tương lai mà không cần thay đổi cấu hình quá nhiều.
   - Cập nhật và bảo trì: Đảm bảo rằng các ngưỡng này có thể dễ dàng điều chỉnh khi ứng dụng phát triển và có thêm tính năng mới.
## Kết luận
Không có một công thức cụ thể nào để chọn kích thước bundle tối ưu, nhưng việc xem xét các yếu tố trên sẽ giúp bạn đưa ra quyết định phù hợp với nhu cầu của dự án và người dùng. Thường xuyên đánh giá và điều chỉnh các ngưỡng này là một phần quan trọng của quá trình phát triển và tối ưu hóa ứng dụng.
