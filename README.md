# StudentDirectory

A searchable, scrollable list of student profile cards with a tappable detail view and an "Add Student" form with live validation, built with **React Native**, **Expo**, and **TypeScript**.

This is the Week 4 project for _Mobile Application Development with React Native & Expo_ at the Department of Computer Science, Faculty of Science and Technology, American International University-Bangladesh (AIUB). It extends the Week 2 StudentDirectory and follows the Week 4 lab manual, "useState, useEffect & Forms — Adding Yourself to StudentDirectory".

## Features

- **Dynamic list:** students render in a `FlatList` with `keyExtractor`, `renderItem`, and an empty-state message.
- **Live search:** a `TextInput` filters the list by name or department as you type.
- **Avatars:** each row shows a remote avatar using `Image` with `resizeMode="cover"`.
- **Tap to select:** tapping a row highlights it and shows a detail card below the list. Tapping the same row again deselects it.
- **Detail view:** the card shows the student's bio and skill badges. It uses conditional rendering with `useState`, so there is no navigation.
- **Typed props:** component props are described with TypeScript interfaces.
- **Add Student form:** five controlled fields held in one combined `useState` object (`name`, `studentId`, `department`, `bio`, `skillsText`).
- **Live validation:** a `useEffect` with the dependency array `[formData]` re-validates the whole form on every keystroke. Student ID must match `NN-NNNNN-N`.
- **Touched fields:** errors only appear after a field is blurred, or after a submit attempt.
- **Fake async submit:** a `setTimeout` simulates a 1.5 second network call, and its `useEffect` cleanup cancels it if the screen unmounts.
- **Lifting state up:** the form hands the new student back to the home screen through the `onSubmitSuccess` callback.

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
│       └── index.tsx          # main screen: state, filtering, FlatList, form toggle
├── components/
│   ├── search-bar.tsx         # controlled search input
│   ├── student-item.tsx       # single row in the list
│   ├── student-detail.tsx     # expanded detail card
│   ├── form-field.tsx         # reusable labeled input + error text
│   └── add-student-form.tsx   # the full Add Student form
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
- **`FormField`** pairs a labeled `TextInput` with an optional inline error message. It accepts an `onBlur` callback.
- **`AddStudentForm`** owns the form state, validation, touched tracking, and the fake submit. It calls `onSubmitSuccess(newStudent)` when the submit finishes.
- **`HomeScreen`** (`app/(tabs)/index.tsx`) holds four pieces of state: `query`, `selectedStudent`, `students` (a local copy of `STUDENTS` that can grow), and `showForm`. It computes `filtered` from `students` and `query` on every render.

### Key concepts covered

- `FlatList` with `data`, `keyExtractor`, `renderItem`, and `ListEmptyComponent`
- Derived values versus state: `filtered` is computed, not stored
- Controlled inputs and lifting state up
- Conditional rendering: `{selectedStudent && <StudentDetail ... />}`
- Optional chaining (`selectedStudent?.id`) and nullish coalescing (`??`)
- Flexbox layout: `flexDirection`, `alignItems`, `flex`, and `alignSelf`
- Combined versus separate `useState`, and `keyof` typed field updaters
- `useEffect` with a dependency array, and cleanup functions
- Regex validation, touched state, and derived values such as `isFormValid`

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
git commit -m "Add FormField reusable component"
git commit -m "Add AddStudentForm with combined state and live validation"
git commit -m "Add fake async submit with cleanup, wire up touched state"
git commit -m "Integrate AddStudentForm into StudentDirectory screen"
```

## Branches

Each branch holds the finished code at the end of one lab session. Start a new lab from the branch of the previous session.

| Branch | State of the project |
| --- | --- |
| `week-02` | Directory list with search and tap-to-select detail card |
| `week-04` | Week 2 plus the AddStudent form (controlled inputs, live validation, fake async submit) |
| `week-05` | Week 4 plus global state with `useReducer` + `useContext`, an `add-student` route, and Remove Student |
| `week-06` | Starter for the Week 6 lab. Identical code to `week-05` |

Week 3 builds a separate app (NewsReader), so there is no `week-03` branch here.

Switch with `git checkout week-05`. The graded Lab Task of each week is not included in these branches.

## Course Information

- **Course:** Mobile Application Development with React Native & Expo
- **Instructor:** Md. Sazid Uddin
- **Department:** Computer Science, Faculty of Science and Technology, AIUB
- **Semester:** Fall 26-27
- **Session:** Week 4
