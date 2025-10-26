# Tahap 1: Build Stage - Menginstal dependensi dan membangun aplikasi React
FROM node:18-alpine AS builder

WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal depedensi
RUN npm install

# Salin sisa kode aplikasi
COPY . . 

# Bangun aplikasi React untuk produksi
RUN npm run build

# ---

# Tahap 2: Production Stage - Menyajikan file statis dengan Nginx
FROM nginx:stable-alpine

# Salin file build dari tahap builder ke direktori default Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# (Opsional) Salin konfigurasi Nginx kustom jika diperlukan
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port default Nginx
EXPOSE 80

# Perintah default untuk menjalankan Nginx
CMD ["nginx", "-g", "daemon off;"]