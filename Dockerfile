# 1. Base image (Node.js)
FROM node:20-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package files first
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy all project files
COPY . .

# 6. Expose Vite port
EXPOSE 5173

# 7. Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
