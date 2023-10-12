const nodemailer = require('nodemailer');

// Tạo một đối tượng vận chuyển (transporter)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Sử dụng dịch vụ Gmail. Bạn có thể sử dụng các dịch vụ email khác.
  auth: {
    user: 'tnphamhongthai@gmail.com', // Địa chỉ email của bạn
    pass: 'Hongthai10',  // Mật khẩu email của bạn
  },
});

// Thiết lập thông tin email
const mailOptions = {
  from: 'tnphamhongthai.com', // Địa chỉ email người gửi
  to: 'thai.phamhongthai10@hcmut.edu.vn', // Địa chỉ email người nhận
  subject: 'Test Email', // Tiêu đề email
  text: 'Hello, this is a test email from your Node.js app!', // Nội dung email
};

// Gửi email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Lỗi khi gửi email:', error);
  } else {
    console.log('Email đã được gửi thành công:', info.response);
  }
});
