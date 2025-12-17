# 🏦 LedgerLoop : Banking Service

A modern, full-stack banking application built with **Spring Boot** backend and **React TypeScript** frontend. This project implements core banking operations including deposits, withdrawals, and transaction history with a clean, professional UI.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Testing](#-testing)
- [Troubleshoting](#-troubleshooting)

## ✨ Features

### Backend
- ✅ **Deposit & Withdrawal Operations** - Secure transaction processing
- ✅ **Account Statement Generation** - Complete transaction history
- ✅ **Input Validation** - JSR-303 Bean Validation
- ✅ **Exception Handling** - Global exception handler with custom exceptions
- ✅ **RESTful API** - Clean REST endpoints with proper HTTP methods
- ✅ **Logging** - SLF4J logging for debugging and monitoring
- ✅ **CORS Configuration** - Configured for frontend integration
- ✅ **Unit & Integration Tests** - Comprehensive test coverage

### Frontend
- ✅ **Modern UI/UX** - Clean, minimalist design
- ✅ **Real-time Updates** - Instant transaction updates
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Loading States** - Visual feedback during operations
- ✅ **Statement Download** - Export transactions as text file
- ✅ **Form Validation** - Client-side validation

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
  - Spring Web
  - Spring Validation
- **Lombok** - Reduce boilerplate code
- **Maven** - Dependency management
- **JUnit 5** - Testing framework
- **Mockito** - Mocking framework

### Frontend
- **React 18.2.0**
- **TypeScript 5.2.2**
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Pure CSS styling
- **ESLint** - Code linting

## 📁 Project Structure

```
skypay-banking/
│
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/skypay/banking/
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   ├── service/         # Business Logic
│   │   │   │   ├── repository/      # Data Access
│   │   │   │   ├── model/           # Domain Models
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── exception/       # Custom Exceptions
│   │   │   │   └── config/          # Configuration
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   └── test/                    # Unit & Integration Tests
│   └── pom.xml
│
└── frontend/                         # React TypeScript Frontend
    ├── src/
    │   ├── api/                     # API Client & Endpoints
    │   ├── components/              # React Components
    │   │   ├── layout/
    │   │   ├── account/
    │   │   ├── transaction/
    │   │   └── ui/
    │   ├── hooks/                   # Custom React Hooks
    │   ├── types/                   # TypeScript Types
    │   ├── utils/                   # Utility Functions
    │   ├── styles/                  # CSS Styles
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 17+**
  ```bash
  java -version
  ```

- **Maven 3.6+**
  ```bash
  mvn -version
  ```

- **Node.js 18+ and npm**
  ```bash
  node -version
  npm -version
  ```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/skypay-banking.git
cd skypay-banking
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
mvn clean install

# Run tests
mvn test
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:8080/api" > .env
```

## 🎯 Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The frontend will start on **http://localhost:3000**

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api/accounts
```

### Endpoints

#### 1. Deposit Money
```http
POST /api/accounts/deposit
Content-Type: application/json

{
  "amount": 1000
}
```

**Response:**
```json
{
  "message": "Deposit successful",
  "amount": 1000,
  "currentBalance": 1000
}
```

#### 2. Withdraw Money
```http
POST /api/accounts/withdraw
Content-Type: application/json

{
  "amount": 500
}
```

**Response:**
```json
{
  "message": "Withdrawal successful",
  "amount": 500,
  "currentBalance": 500
}
```

#### 3. Get Account Statement
```http
GET /api/accounts/statement
```

**Response:**
```json
{
  "currentBalance": 2500,
  "transactions": [
    {
      "date": "2025-12-17",
      "type": "WITHDRAWAL",
      "amount": 500,
      "balance": 2500
    },
    {
      "date": "2025-12-17",
      "type": "DEPOSIT",
      "amount": 2000,
      "balance": 3000
    },
    {
      "date": "2025-12-17",
      "type": "DEPOSIT",
      "amount": 1000,
      "balance": 1000
    }
  ],
  "totalDeposits": 3000,
  "totalWithdrawals": 500
}
```

#### 4. Get Balance
```http
GET /api/accounts/balance
```

**Response:**
```json
{
  "balance": 2500
}
```

### Error Responses

#### Insufficient Funds
```json
{
  "timestamp": "2025-12-17T10:30:00",
  "status": 400,
  "error": "Insufficient Funds",
  "message": "Insufficient funds. Available: 100, Requested: 500",
  "path": "/api/accounts/withdraw"
}
```

#### Invalid Amount
```json
{
  "timestamp": "2025-12-17T10:30:00",
  "status": 400,
  "error": "Invalid Amount",
  "message": "Amount must be greater than zero",
  "path": "/api/accounts/deposit"
}
```

#### Validation Error
```json
{
  "timestamp": "2025-12-17T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Amount is required, Amount must be greater than zero",
  "path": "/api/accounts/deposit"
}
```

## 🏗️ Architecture

### Backend Architecture

```
┌─────────────────────────────────────────────┐
│           REST Controller Layer              │
│  (AccountController, GlobalExceptionHandler) │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│            Service Layer                     │
│      (AccountService, AccountServiceImpl)    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│          Repository Layer                    │
│       (TransactionRepository)                │
└─────────────────────────────────────────────┘
```

**Key Principles:**
- **Separation of Concerns** - Each layer has a specific responsibility
- **Dependency Injection** - Loose coupling via Spring IoC
- **Single Responsibility** - Each class has one reason to change
- **Open/Closed Principle** - Open for extension, closed for modification

### Frontend Architecture

```
┌─────────────────────────────────────────────┐
│          Components Layer                    │
│    (Header, BalanceCard, TransactionForm)    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│           Hooks Layer                        │
│    (useAccount, useNotification)             │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│            API Layer                         │
│      (apiClient, accountApi)                 │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│          Spring Boot Backend                 │
└─────────────────────────────────────────────┘
```

**Key Principles:**
- **Component Composition** - Build complex UIs from small components
- **Custom Hooks** - Encapsulate and reuse stateful logic
- **Type Safety** - TypeScript for compile-time error checking
- **Centralized API** - Single source of truth for API calls

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=AccountServiceTest

# Run with coverage
mvn test jacoco:report
```

**Test Coverage:**
- Unit Tests: Service layer logic
- Integration Tests: Controller endpoints
- Mock Tests: Repository interactions

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start
```bash
# Check if port 8080 is already in use
lsof -i :8080

# Kill the process
kill -9 <PID>
```

#### Frontend can't connect to backend
- Verify backend is running on port 8080
- Check CORS configuration in `WebConfig.java`
- Verify `.env` file has correct API URL

#### Build failures
```bash
# Clear Maven cache
mvn clean

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```


### Quick Start Commands

```bash
# Backend
cd backend && mvn spring-boot:run

# Frontend
cd frontend && npm run dev

# Access app at http://localhost:3000
```


⭐ **Star this repository if you find it helpful!**
