FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN yarn

# Copy the rest of the project files
COPY . .

# Generate Prisma client
RUN yarn run prisma generate

# Build the TypeScript files
RUN yarn build

EXPOSE 5000

# Start the application
CMD ["yarn", "start:dev"]