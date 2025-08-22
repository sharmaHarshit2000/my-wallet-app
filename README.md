# 🪙 My Wallet App

A beautiful, minimal full-stack wallet app for transferring money between users using phone numbers. Built with **Next.js**, **Firebase Authentication**, **Prisma**, and **PostgreSQL**.

---

## 🌐 Live Demo

[Vercel Deployment Link](https://my-wallet-app-nu.vercel.app)

## 💻 GitHub Repository

[GitHub Repo](https://github.com/sharmaHarshit2000/my-wallet-app)

---

## 🧰 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** Prisma + PostgreSQL
- **Authentication:** Firebase Authentication
- **Notifications:** react-hot-toast
- **Icons:** lucide-react

---

## 📁 Folder Structure

```
my-wallet-app/
├─ prisma/
│  ├─ schema.prisma          # Prisma schema for User, Wallet, Payment
│  └─ migrations/            # Prisma migration files
│
├─ public/
│  ├─ favicon.ico            # Favicon for the app
│  └─ images/                # Any static images
│
├─ src/
│  ├─ app/
│  │  ├─ dashboard/
│  │  │  └─ page.tsx         # Dashboard page with wallet & transactions
│  │  ├─ login/
│  │  │  └─ page.tsx         # Login page
│  │  ├─ register/
│  │  │  └─ page.tsx         # Register page
│  │  └─ layout.tsx          # Root layout with navbar & toaster
│  │
│  ├─ components/
│  │  ├─ Navbar.tsx
│  │  ├─ TransferForm.tsx
│  │  ├─ TransactionHistory.tsx
│  │  └─ Footer.tsx
│  │
│  ├─ lib/
│  │  ├─ firebase.ts         # Firebase config
│  │  └─ prisma.ts           # Prisma client
│  │
│  └─ styles/
│     └─ globals.css
│
├─ .env                      # Environment variables
├─ package.json
└─ README.md
```

---

## 🔧 Setup Instructions

1. **Clone the repository**
    ```sh
    git clone https://github.com/sharmaHarshit2000/my-wallet-app.git
    cd my-wallet-app
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root and add:
    ```
    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

4. **Set up Prisma**
    ```sh
    npx prisma generate
    npx prisma migrate dev --name init
    ```

5. **Run the development server**
    ```sh
    npm run dev
    ```

6. **Open** [http://localhost:3000](http://localhost:3000) **to view the app.**

---

## 🚀 Features

- **User Authentication:** Firebase email/password login
- **Wallet Management:** View wallet balance
- **Money Transfer:** Send money using phone number with validation
- **Transaction History:** View recent transactions
- **Responsive UI:** Mobile and desktop friendly
- **Toast Notifications:** Success & error alerts

---

## 🎨 Screenshots

**Dashboard**  
![Dashboard Screenshot](./my-wallet-app/screenshots/dashboard.png)

**Login Page**  
![Login Screenshot](./my-wallet-app/screenshots/login.png)

**Register Page**  
![Register Screenshot](./my-wallet-app/screenshots/register.png)

**Transfer Form**  
![Transfer Form Screenshot](./my-wallet-app/screenshots/transfer.png)

---

## ⚡ How it Works

1. Users register using email, phone, and password.
2. Each new user gets ₹100 in their wallet.
3. Users can transfer money to another user using their phone number.
4. Transactions are atomic (debit and credit happen together).
5. Users can view their transaction history and
