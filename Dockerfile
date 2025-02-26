# Use Node.js LTS version as base image
FROM node:18-alpine

# Create app directory and set permissions
WORKDIR /app

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Set ownership and install dependencies
RUN chown -R appuser:appgroup /app
USER appuser

# Install dependencies
RUN npm install
RUN cd client && npm install
RUN cd server && npm install

# Copy project files
COPY --chown=appuser:appgroup . .

# Build client with explicit permissions
RUN cd client && npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]