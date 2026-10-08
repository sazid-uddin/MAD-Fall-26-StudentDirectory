# StudentDirectory

A searchable, scrollable list of student profile cards with a tappable detail view, built with **React Native**, **Expo**, and **TypeScript**.

This is the Week 2 project for _Mobile Application Development with React Native & Expo_ at the Department of Computer Science, Faculty of Science and Technology, American International University-Bangladesh (AIUB). It follows the Week 2 lab manual, "React Native Core UI & Building a Student Directory".

## Features

- **Dynamic list:** students render in a `FlatList` with `keyExtractor`, `renderItem`, and an empty-state message.
- **Live search:** a `TextInput` filters the list by name or department as you type.
- **Avatars:** each row shows a remote avatar using `Image` with `resizeMode="cover"`.
- **Tap to select:** tapping a row highlights it and shows a detail card below the list. Tapping the same row again deselects it.
- **Detail view:** the card shows the student's bio and skill badges. It uses conditional rendering with `useState`, so there is no navigation.
- **Typed props:** component props are described with TypeScript interfaces.

## Tech Stack

- [Expo](https://expo.dev/) (SDK 54) with Expo Router
- [React Native](https://reactnative.dev/)
- TypeScript
- `react-native-safe-area-context`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS) and npm
- The [Expo Go](https://expo.dev/go) app on a phone, or a web browser

### Installation

```bash
git clone https://github.com/<your-username>/StudentDirectory.git
cd StudentDirectory
npm install
```

### Run the app

```bash
npx expo start
```

Then either:

- scan the QR code with Expo Go (Android) or the Camera app (iOS), or
- press `w` in the terminal to open the app in your web browser.

> Most features work in the browser. Platform-specific props such as `elevation` and `shadow*` may look slightly different there.

### Creating the project from scratch

```bash
npx create-expo-app@latest StudentDirectory --template default@sdk-54
cd StudentDirectory
```

Then add `"jsx": "react-native"` under `compilerOptions` in `tsconfig.json`.

## Project Structure

```
StudentDirectory/
├── app/
│   └── (tabs)/
│       └── index.tsx          # main screen: state, filtering, FlatList
├── components/
│   ├── search-bar.tsx         # controlled search input
│   ├── student-item.tsx       # single row in the list
│   └── student-detail.tsx     # expanded detail card
├── data/
│   └── students.ts            # Student interface + static STUDENTS array
└── ...
```

## How It Works

### Data model

`data/students.ts` exports a `Student` interface and a static `STUDENTS` array of 10 students.

```ts
export interface Student {
    id: string;
    name: string;
    studentId: string;
    department: string;
    bio: string;
    skills: string[];
    avatarUrl: string;
}
```

Avatars come from [pravatar.cc](https://pravatar.cc/), a free placeholder image service. It needs no sign-up and is served over HTTPS.

### Components

- **`StudentItem`** renders one row: avatar, name, department, and ID. It uses a Flexbox row, with `flex: 1` on the text column so it fills the space between the avatar and the chevron. It is wrapped in a `TouchableOpacity`. Props are `student`, `onPress`, and `isSelected`.
- **`SearchBar`** is a controlled `TextInput`. The parent owns the state and passes `value` and `onChangeText`. The `placeholder` prop is optional and defaults to "Search students...".
- **`StudentDetail`** shows the selected student's name, department, ID badge, bio, and skill badges.
- **`HomeScreen`** (`app/(tabs)/index.tsx`) holds two pieces of state: `query` and `selectedStudent`. It computes `filtered` from `STUDENTS` and `query` on every render.

### Key concepts covered

- `FlatList` with `data`, `keyExtractor`, `renderItem`, and `ListEmptyComponent`
- Derived values versus state: `filtered` is computed, not stored
- Controlled inputs and lifting state up
- Conditional rendering: `{selectedStudent && <StudentDetail ... />}`
- Optional chaining (`selectedStudent?.id`) and nullish coalescing (`??`)
- Flexbox layout: `flexDirection`, `alignItems`, `flex`, and `alignSelf`

## Common Issues

- **Image renders but is invisible:** give the `Image` style an explicit `width` and `height`.
- **`Element type is invalid`:** you imported a default export with braces. Use `import StudentItem from "..."`.
- **`Cannot find module '../../data/students'`:** the `data/` folder must be in the project root, not inside `app/`.
- **`selectedStudent.id` is possibly null:** use optional chaining, `selectedStudent?.id`.
- **`VirtualizedList` warning:** don't nest a `FlatList` inside a `ScrollView`. Use `ListHeaderComponent` instead.

## Practice Exercises

Optional extensions to try:

1. **FlatList header:** add a `ListHeaderComponent` showing the total number of students and how many match the current search.
2. **Sort toggle:** add a button to the title bar that switches between A→Z and Z→A by name. Copy the array before sorting (`[...filtered].sort(...)`) so you never mutate state.
3. **Output tracing:** predict what `filtered` contains for different queries, without running the code.

## Git Workflow

Commit after each major section instead of all at once. Suggested commit points:

```bash
git commit -m "Add student data file and TypeScript interface"
git commit -m "Add StudentItem component with Flexbox row layout and Image"
git commit -m "Add SearchBar, StudentDetail, and wire up index.tsx"
```

## Course Information

- **Course:** Mobile Application Development with React Native & Expo
- **Instructor:** Md. Sazid Uddin
- **Department:** Computer Science, Faculty of Science and Technology, AIUB
- **Semester:** Fall 26-27
- **Session:** Week 2
