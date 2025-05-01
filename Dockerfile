# Use the official Golang image as the build environment
FROM golang:1.23.1 AS build

# Set the working directory inside the container
WORKDIR /app/src/meramoney/backend

# Install tzdata and set the timezone to Asia/Ho_Chi_Minh
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    echo "Asia/Ho_Chi_Minh" > /etc/timezone && \
    go build -o meramoney.bin .

# Use a minimal base image for the final container
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /root/

# Copy the built binary from the build stage
COPY ./meramoney.bin .
COPY /.env .

# Make the binary executable
RUN chmod +x meramoney.bin

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["./meramoney.bin"]