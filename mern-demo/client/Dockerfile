# Sử dụng Node.js
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn frontend
COPY . .

# Mở port cho React (5173 đối với Vite)
EXPOSE 5173

# Chạy React Dev Server với --host 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]