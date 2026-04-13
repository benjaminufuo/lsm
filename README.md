# 🎓 TalentFlow LMS

Welcome to **TalentFlow**, a modern Learning Management System (LMS) designed to unlock full potential through seamless course management and student learning journeys.

## 🚀 Features

- **Secure Authentication:** JWT-based email/password login and Google OAuth integration.
- **Role-Based Access Control:** Distinct dashboards for Students and Administrators.
- **Course Management:** Browse, enroll, and track progress across 500+ courses.
- **Responsive Design:** Fully responsive UI built with Tailwind CSS.
- **Interactive UI:** Toast notifications, loading states, and form validation.

## 🛠️ Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Authentication:** `@react-oauth/google`
- **UI Components:** React Icons, React Toastify

## 📋 Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v16 or higher)
- npm, yarn, or pnpm

## ⚙️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/talentflow-lms.git
   cd talentflow-lms
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the necessary variables:

   ```env
   VITE_BASE_URL=http://localhost:5000/api/v1/
   # Add your Google Client ID if applicable
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app:**
   Navigate to `http://localhost:5173` in your browser.

## 📂 Project Structure

```text
src/
├── assets/        # Static assets like images and icons
├── auth/          # Authentication components (SignIn, SignUp, etc.)
├── global/        # Redux store and slices
├── shared/        # Reusable UI components (Button, Input, etc.)
├── App.tsx        # Main application component
└── main.tsx       # React entry point
```

## 📜 Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Compiles the TypeScript code and bundles the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
