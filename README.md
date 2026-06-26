# Skincare Diary

A personal skincare tracking app where you can manage your product library, build morning and evening routines, write reviews, and get AI-powered skincare advice.

## Features

- **Product Library** — Add, browse, and delete skincare products with details like brand, type, price, and purchase count
- **Routines** — Build and manage morning and evening routines by selecting from your product library
- **Reviews** — Log reviews for your products
- **AI Chat** — Chat with an AI assistant for skincare advice
- **Authentication** — Email/password sign-up and login via Firebase Auth

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend/DB**: Firebase (Firestore, Authentication)
- **AI**: OpenAI API
- **Routing**: React Router v7

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Firestore and Authentication enabled
- An OpenAI API key

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file at the project root with your Firebase config and OpenAI key:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_OPENAI_API_KEY=...
```

### Firestore Security Rules

In the Firebase Console under **Firestore Database → Rules**, set:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{userId}/myProducts/{productId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /routines/{userId}/{routine}/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Running Locally

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```
