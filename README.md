# 🧭 Activity Listing App

### 📱 A Cross-Platform Learning Activity Dashboard (Web + Mobile)

This project is built as part of a **Hands-On Round Problem Statement** — to design and develop a **core learner-facing screen** for an online learning platform that helps users view and manage their learning activities across programs like AI, Machine Learning, and Cloud Computing.

The app lists all **learning activities** (Online Classes, Assignments, Quizzes, and Discussions) in a clean, responsive, and accessible interface — powered by a **single Expo codebase** that works seamlessly on **both Web and Mobile**.

---

## 🚀 Features

- 📋 **Unified Activity Listing**  
  Displays all activities (Class, Assignment, Quiz, Discussion) in a scrollable, card-based layout.

- ⚡ **Cross-Platform Codebase**  
  Built with **Expo + React Native + React Native Paper**, runs on both **Web** and **Mobile**.

- 🧭 **Contextual Actions**  
  Activities show relevant "Next Steps" based on status — *Start, Continue, Review*.

- 🧩 **Filter & Sort Controls**  
  Allows learners to quickly find activities by type, status, or due date.

- 🌓 **Light / Dark Mode Support**  
  Adapts to user preference or system theme.

- 📱 **Responsive Design**  
  Optimized layouts for phones, tablets, and browsers.

- 🧪 **Component & Unit Testing Ready**  
  Basic setup included for Jest / React Native Testing Library.

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | **Expo (React Native)** |
| UI Library | **React Native Paper** |
| Animations | **React Native Reanimated** |
| State Management | React Hooks / Context API |
| Routing | Expo Router or React Navigation |
| Theming | React Native Paper ThemeProvider |
| Data | Local mock JSON / API support |
| Platform | Web, Android (via Expo) |

---

## 🧠 Architecture Overview

- **components/** → Reusable UI elements (e.g., `ActivityCard`, `FilterBar`)  
- **screens/** → Core screens (e.g., `ActivityListScreen`)  
- **data/** → Mock data or API handlers  
- **themes/** → Light/Dark mode configuration  
- **App.js** → Root entry point  
- **package.json** → Dependencies and scripts  

---

## 🧩 Activity Flow Summary

1. **Activities Load**
   - From local mock data or public API.  
2. **UI Render**
   - Activities displayed in cards with details like title, type, status, and due date.  
3. **Next Action**
   - Button changes dynamically: `"Start"`, `"Continue"`, or `"Review"`.  
4. **Filter Application**
   - User can filter activities by status/type.  
5. **Interaction**
   - Selecting an activity navigates to detail or action page.

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
