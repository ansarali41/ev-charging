# EV Charging Station Web Application

A modern Next.js web application for managing electric vehicle charging stations, bookings, and cost calculations.

## 🚀 Features

- **Authentication**
  - Google Sign-In integration
  - Secure user sessions
  - Protected routes

- **Booking System**
  - Create and manage charging station bookings
  - View booking history
  - Real-time availability updates
  - Pagination for booking lists

- **Scheme Calculator**
  - Cost calculation for different charging schemes
  - Off-grid, hybrid, and CEB options
  - Dynamic pricing based on battery capacity
  - Irradiance level adjustments

- **Modern UI/UX**
  - Responsive design for all devices
  - Glassmorphic UI elements
  - Intuitive navigation
  - Loading states and animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 13
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **State Management**: React Context
- **Deployment**: Vercel (recommended)

## 📦 Prerequisites

- Node.js 16.x or later
- npm or yarn
- Firebase account
- Git

## 🚀 Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ev-charging.git
   cd ev-charging
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Firebase Setup**

   a. Create a Firebase Project:
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Note down the project ID

   b. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google sign-in
   - Add your domain to authorized domains

   c. Setup Firestore:
   - Go to Firestore Database
   - Create database in production mode
   - Choose your preferred region

   d. Get Firebase Config:
   - Go to Project Settings
   - Find the Web App configuration
   - Copy the config object

4. **Environment Setup**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ev-charging/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── booking/        # Booking creation
│   │   ├── bookings/       # Bookings list
│   │   ├── scheme/         # Cost calculator
│   │   └── about/          # About page
│   ├── components/         # Reusable components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI components
│   ├── context/           # React context
│   └── firebase/          # Firebase config
├── public/                # Static assets
└── tailwind.config.js    # Tailwind configuration
```

## 🔒 Security Rules

Add these rules to your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{booking} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting

## 🔧 Troubleshooting

### Common Issues

1. **Firebase Authentication Issues**
   - Verify Google Sign-in is enabled
   - Check authorized domains
   - Validate environment variables

2. **Build Errors**
   - Clear `.next` cache directory
   - Reinstall dependencies
   - Update Node.js version

3. **Database Connection Issues**
   - Verify Firestore rules
   - Check project configuration
   - Ensure proper initialization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Firebase for authentication and database
- Tailwind CSS for styling
- All contributors and users

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.
