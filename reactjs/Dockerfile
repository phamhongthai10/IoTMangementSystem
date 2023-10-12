# Sử dụng một hình ảnh cơ sở đã có Node.js
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép mã nguồn của ứng dụng vào container
COPY . .

# Xây dựng ứng dụng React
RUN npm run build

# Cổng mà ứng dụng React sẽ chạy trên
EXPOSE 3000

# Khởi chạy ứng dụng React khi container được khởi động
CMD ["npm", "start"]
