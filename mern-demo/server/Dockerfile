# Sử dụng Node.js phiên bản lightweight
FROM node:18-alpine

# Thiết lập thư mục làm việc trong Container
WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn backend vào Container
COPY . .

# Mở port cho Backend (ví dụ port 5002)
EXPOSE 5002

# Lệnh khởi chạy server
CMD ["npm", "start"]S