# Sử dụng hình ảnh cơ sở có Node.js
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép mã nguồn của ứng dụng vào container
COPY . .


# Cổng mà ứng dụng Node.js sẽ chạy trên
EXPOSE 3001

# Khởi chạy ứng dụng Node.js khi container được khởi động
CMD ["npm", "start"]
