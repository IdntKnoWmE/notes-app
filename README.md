# 📝 SecureNotes - React Notes Application

SecureNotes is a client-side note-taking application built with **React 19**, **Vite**, and **Tailwind CSS**. It features full user authentication workflows, profile lifecycle management, global multi-state tracking, and optimized note sorting—all fully persisted inside local storage using a soft-delete architecture.

---

## 🚀 Features

### 👤 User & Profile Lifecycle
*   **Authentication**: Complete Sign Up, Log In, and Log Out workflows.
*   **Session Management**: Implements a rolling 30-minute session expiry window.
*   **Profile Control**: Users can update their credentials or choose to **Soft-Delete** their profile.
*   **Automated Cleanup**: Deleting a profile automatically cascades and wipes all associated note entries and sequence counters from local storage.

### 📝 Note-Taking Dashboard
*   **Dynamic Views**: Three independent screen displays:
    *   📂 **All Notes**: Active logs and daily thoughts.
    *   ⭐ **Favourite Notes**: High-priority bookmarked entries.
    *   🗑️ **Deleted Notes**: A temporary trash bin keeping soft-deleted materials.
*   **Operations**: Full CRUD capability (Add, Update, Search) along with option to **Permanently Delete** items directly out of the Trash view.
*   **Data Integrity**: Data isolation enforced through a dynamic local key binding architecture (`${userId}_notes`).

---

## 🛠️ Architecture & Hook Usage

The project utilizes specialized React hooks to separate rendering concerns from data management operations:

*   **`Context API`**: Houses global session variables, the core user indexing engine, and links state modifiers to prevent configuration drift across deep component trees.
*   **`useState`**: Drives individual forms, modal visibility flags, active filter strings, and input toggles.
*   **`useRef`**: Handles input field focus operations and tracks ongoing session expiry timers without triggering unnecessary element re-renders.
*   **`useMemo`**: Optimises data computing operations by recalculating the search engine array index results *only* when the parent text input query or active view properties mutate.
*   **`useEffect`**: Monitors memory arrays and automatically flushes new states into structural `localStorage` streams on every mutation.

---

## 📦 Tech Stack

*   **Framework**: [React 19](https://react.dev)
*   **Build Tool**: [Vite](https://vite.dev)
*   **Styling Engine**: [Tailwind CSS](https://tailwindcss.com)
*   **Icon Library**: [Lucide React](https://lucide.dev)

---

## 💾 Storage Mapping Schema

The application structures offline user configurations inside individual buckets:

| Storage Key | Data Structure Type | Functional Utility |
| :--- | :--- | :--- |
| `userDatabase` | `Array<Object>` | Global system log tracking soft-deleted status (`isDeleted: true`). |
| `currentUser` | `Object` | Active session metadata block wrapping validation stamps. |
| `${userId}_notes` | `Array<Object>` | User-scoped note arrays containing text elements and tags. |
| `${userId}_notesId` | `Number` | Monotonically increasing sequencing key tracking accurate ID states. |

---

## 🔧 Installation & Setup

Follow these simple steps to spin up the codebase locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com
   cd securenotes
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Boot up the Development Server**
   ```bash
   npm run dev
   ```

4. **Compile Production Optimised Builds**
   ```bash
   npm run build
   ```

---

## 🔒 Security Best Practices Handled

*   **Form Protection**: Custom inline context operations filter target data strings cleanly without object mutations (`{ ...prev }`).
*   **Input Handling**: Visibility indicators (`type="button"`) prevent unwanted browser form submissions during password lookups.
*   **State Alignment**: Profile record mutations seamlessly broadcast modifications to live states using synchronous local context overrides.
