# 📚 Learning Activities Platform

A modern, cross-platform learning management interface built with Expo and React Native. This project provides a unified view of educational activities across multiple learning programs including AI, Machine Learning, and Cloud Computing.

![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile-blue)
![Framework](https://img.shields.io/badge/Framework-Expo-000020?logo=expo)
![UI](https://img.shields.io/badge/UI-React%20Native%20Paper-6200EE)

## 🎯 Project Overview

This project was developed as part of a Hands-On Round Problem Statement to design and develop a core learner-facing screen for an online learning platform. It helps users view and manage their learning activities with a clean, responsive, and accessible interface powered by a single Expo codebase that works seamlessly on both Web and Mobile platforms.

## ✨ Features

- **📋 Unified Activity Listing** - Displays all activities (Classes, Assignments, Quizzes, and Discussions) in a scrollable, card-based layout
- **⚡ Cross-Platform Support** - Built with Expo + React Native + React Native Paper, runs on both Web and Mobile
- **🧭 Contextual Actions** - Activities show relevant "Next Steps" based on status (Start, Continue, Review)
- **🧩 Filter & Sort Controls** - Quickly find activities by type
- **🌓 Light / Dark Mode** - Adapts to user preference or system theme
- **📱 Responsive Design** - Optimized layouts for phones, tablets, and browsers
- **🧪 Testing Ready** - Basic setup included for Jest / React Native Testing Library

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Expo (React Native) |
| **UI Library** | React Native Paper |
| **Animations** | React Native Reanimated |
| **State Management** | React Hooks / Context API |
| **Routing** | Expo Router / React Navigation |
| **Theming** | React Native Paper ThemeProvider |
| **Data** | Local mock JSON / API support |
| **Platform** | Web, Android (via Expo) |

## 📁 Project Structure

```
learning-activities/
├── components/          # Reusable UI elements
│   ├── ActivityCard.js  # Individual activity card component
│   └── FilterBar.js     # Filter and sort controls
├── screens/             # Core application screens
│   └── ActivityListScreen.js
├── data/                # Mock data or API handlers
├── themes/              # Light/Dark mode configuration
├── App.js               # Root entry point
└── package.json         # Dependencies and scripts
```

## 🔄 Application Flow

1. **Activities Load** - From local mock data or public API
2. **UI Render** - Activities displayed in cards with details like title, type, status, and due date
3. **Next Action** - Button changes dynamically: `"Start"`, `"Continue"`, or `"Review"`
4. **Filter Application** - Users can filter activities by type of activity
5. **Interaction** - Selecting an activity navigates to detail or action page

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mank25/learning-activities.git
cd learning-activities
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your preferred platform:
   - Press `w` for web
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app on your mobile device

## 📱 Platform-Specific Instructions

### Web
```bash
npx expo start --web
```

### Android
```bash
npx expo start --android
```

### iOS
```bash
npx expo start --ios
```

## 🧪 Testing

Run tests using:
```bash
npm test
# or
yarn test
```

## 🎨 Features in Detail

### Activity Types
- **Online Classes** 
- **Assignments** 
- **Quizzes** 
- **Discussions** 

### Status Indicators
- **Not Started** - Shows "Start" button
- **In Progress** - Shows "Continue" button
- **Completed** - Shows "Review" button


## 👤 Author

**mank25**

- GitHub: [@mank25](https://github.com/mank25)

---

⭐ Star this repository if you find it helpful!
