# Tahap 1: Build Stage - Menginstal depedensi dan membangun aplikasi
FROM node:18-alpine AS builder

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Salin package .json dan package-lock.json
COPY package*.json ./

# Instal depedensi produksi
RUN npm install --omit=dev

# Salin file prisma schema
COPY prisma ./prisma/

# Melakukan generate prisma client (optional jika sudah ada di node_modules)
RUN npx prisma generate

# Salin sisa kode aplikasi
COPY . .

# (Opsional) Jika perlu menjalankan migrasi saat build
# RUN npx prisma migrate deploy

# ---

# Tahap 2: Production Stage - Menjalankan aplikasi
FROM node:18-alpine

WORKDIR /app

# Salin dependensi dari tahap builder
COPY --from=builder /app/node_modules ./node_modules
# Salin file prisma schema dari tahap builder
COPY --from=builder /app/prisma ./prisma/
# Salin folder .prisma yang berisi hasil generate
# Salin kode aplikasi yang sudah dibangun dari tahap builder
COPY --from=builder /app .

# Expose port yang digunakan oleh server
EXPOSE 4000

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD ["node", "index.js"]