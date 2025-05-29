# Nicklytics Dashboard

A responsive, user-friendly analytics dashboard built with Next.js, React, Zustand, and Tailwind CSS. Features include user authentication, dynamic charts, pagination, dark mode, and clean code architecture.

---

## Features

- **User Authentication:** Role-based access for admin and editor users.
- **Responsive Sidebar & Header:** Includes mobile toggling and navigation.
- **Dynamic Analytics:** Interactive bar and pie charts with data fetched from JSONPlaceholder API.
- **Posts Management:** Paginated posts list with edit and delete modals.
- **Dark Mode:** Seamless light/dark theme toggle with tailored color palettes.
- **Custom Components:** Reusable Button, InputField, Modal, Pagination components.
- **State Management:** Global state managed with Zustand.
- **Route Protection:** Access control via `RouteProtector` component.
- **Toast Notifications:** User feedback with react-toastify.

---

## Tech Stack

- Next.js (App Router)
- React
- Zustand (State Management)
- Tailwind CSS
- Recharts (Charts)
- react-hook-form & Zod (Form Handling & Validation)
- react-toastify (Notifications)
- Axios (HTTP Requests)

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/nicklytics-dashboard.git
cd nicklytics-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Project Structure

- `/components` - Reusable UI components (Button, InputField, Modal, Pagination, Sidebar, DashboardHeader, DarkModeToggle).
- `/pages` - Next.js pages including Login and Dashboard pages.
- `/store` - Zustand state management.
- `/hooks` - Custom React hooks (e.g. `useBreakpoint`).
- `/api` - Utilities like `tokenManager` and `RouteProtector`.
- `/styles` - Global CSS and Tailwind setup.

---

## Usage

- Login with either:
  - Username: `admin` / Password: `Admin123.`
  - Username: `editor` / Password: `Editor123.`
- Explore dashboard analytics and posts.
- Toggle dark mode via the header button.
- Manage posts with pagination, edit and delete modals.
- Sidebar navigation for different dashboard pages.

---

## Contribution

Feel free to open issues or submit pull requests for improvements or bug fixes.

---

## License

This project is licensed under the MIT License.

---
