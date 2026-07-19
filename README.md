# BB 8th Sibu Management System

A role-based management system built with React and Node.js.

# Features

## Authentication
- User login
- User registration
- Password recovery

## Role-Based Access Control (RBAC)
- Members
- NCOs
- Officers

## Management Dashboard
- Inventory order management
- Attendance tracking
- Member management
- Order monitoring

## AI Assistant
- Integrated RAG-based Uniform Manual Chatbot

# Setup

## Prerequisites

Make sure you have installed:

- Node.js
- Python 3.12+
- Microsoft SQL Server
- SQL Server Management Studio (SSMS) (optional, for database management)

The system requires three running services:
- React frontend
- Node.js backend
- Python RAG chatbot service
## Installation

### 1. Clone the repository

```bash
git clone https://github.com/stupidFLOWERch/bb8thsibu_management.git

cd bb8thsibu_management
```

### 2. Configure environment variables
Create a `.env` file inside `python_backend`:
```env
GEMINI_API_KEY=your_gemini_api_key
```
Create a `.env` file inside `backend`:
```env
RESEND_API_KEY=your_resend_api_key
```

### 3. Database Setup
Import `BB8thSibu_database.sql` into Microsoft SQL Server

Make sure your SQL Server connection configuration matches your local SQL Server instance.

### 4. Setup and run the AI Chatbot Service
```bash
cd python_backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python gen_ai_api.py
```

### 5. Install and run the frontend
Open new terminal:
```bash
cd frontend
npm install
npm run dev
```

### 6. Install and run the backend
Open new terminal:
```bash
cd backend
npm install
npm run dev
```

### 7. Open the website
Open your browser and visit
http://localhost:5173/