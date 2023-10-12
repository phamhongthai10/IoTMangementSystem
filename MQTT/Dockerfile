# Sử dụng hình ảnh cơ sở có Debian
FROM debian:buster-slim

# Cài đặt MongoDB
RUN apt-get update && apt-get install -y mongodb-org 

# Tạo thư mục cho cơ sở dữ liệu MongoDB
RUN mkdir -p /data/db

# Cổng mặc định MongoDB
EXPOSE 27017

# Khởi động MongoDB
CMD ["mongod"]
