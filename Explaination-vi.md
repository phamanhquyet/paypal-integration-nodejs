Đoạn code đang sử dụng framework Express và SDK PayPal để xây dựng một ứng dụng web đơn giản để thanh toán qua PayPal. Dưới đây là một giải thích từng phần của đoạn code:

1. Import các module cần thiết:

- express: Framework web để xây dựng ứng dụng.
- paypal-rest-sdk: SDK PayPal để tương tác với API PayPal.
- dotenv: Module để đọc các biến môi trường từ tệp .env.

2. Cấu hình PayPal SDK:

- Đặt chế độ là 'sandbox' (môi trường thử nghiệm).
- Sử dụng CLIENT_ID và CLIENT_SECRET từ biến môi trường để xác định thông tin xác thực PayPal.

3. Tạo ứng dụng Express:

- Khởi tạo đối tượng ứng dụng Express.
- Định nghĩa một route GET cho trang chủ ('/'), trả về tệp index.html.
- Định nghĩa một route POST cho '/pay', xử lý yêu cầu thanh toán PayPal.

4. Xử lý yêu cầu thanh toán PayPal:

- Tạo một đối tượng JSON create_payment_json đại diện cho thông tin thanh toán.
- Gửi yêu cầu tạo thanh toán thông qua phương thức paypal.payment.create.
- Nếu có lỗi, ném lỗi ra ngoài. Ngược lại, điều hướng người dùng đến trang xác nhận thanh toán PayPal.

5. Xử lý phản hồi từ PayPal sau khi người dùng xác nhận thanh toán:

- Trang /success được gọi sau khi người dùng xác nhận thanh toán thành công trên PayPal.
- Trang này lấy thông tin PayerID và paymentId từ truy vấn và sử dụng chúng để xác nhận thanh toán.
- Tạo một đối tượng JSON execute_payment_json đại diện cho yêu cầu xác nhận thanh toán.
- Gửi yêu cầu xác nhận thanh toán thông qua phương thức paypal.payment.execute.
- Nếu có lỗi, in ra lỗi và ném lỗi ra ngoài. Ngược lại, gửi phản hồi "Success" cho người dùng.

6. Xử lý hủy bỏ thanh toán:

- Trang /cancel được gọi khi người dùng hủy bỏ thanh toán trên PayPal.
- Trả về phản hồi "Cancelled".

7. Khởi động server:

- Xác định cổng PORT cho server là 3000 hoặc giá trị từ biến môi trường.
- Bắt đầu lắng nghe kết nối trên cổng PORT.
- In ra thông báo "Server started on" kèm cổng đang lắng nghe.
