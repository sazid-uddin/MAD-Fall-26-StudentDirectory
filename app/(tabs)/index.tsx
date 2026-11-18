import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import StudentItem from "@/components/student-item";
import { Student, STUDENTS } from "@/data/students";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/search-bar";
import { useState } from "react";
// NEW: import the StudentDetail component to show student details when selected
import StudentDetail from "@/components/student-detail";
// NEW: import the AddStudentForm component (Week 4)
import AddStudentForm from "@/components/add-student-form";

export default function HomeScreen() {
    // State 1: the current search query
    const [query, setQuery] = useState<string>("");

    // NEW (Week 4): local copy of the student list so we can add to it
    const [students, setStudents] = useState<Student[]>(STUDENTS);

    // NEW (Week 4): controls whether the form or the directory is shown
    const [showForm, setShowForm] = useState<boolean>(false);

    // NEW: State 2: the currently selected student (null = none selected)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // NEW: Toggle selection: tap same student to select and deselect
    const handleSelect = (student: Student) => {
        setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
    };

    // NEW (Week 4): lifting state up. The form hands the new student back
    // to this parent screen, which prepends it to the list.
    const handleNewStudent = (newStudent: Student) => {
        setStudents((prev) => [newStudent, ...prev]);
        setShowForm(false);
    };

    // NEW (Week 4): show the form instead of the directory
    if (showForm) {
        return <AddStudentForm onSubmitSuccess={handleNewStudent} />;
    }

    // Derived value: filter students based on query
    // This is NOT state — it is computed from state every render
    const filtered = students.filter((s) => {
        return (
            s.name.toLowerCase().includes(query.toLowerCase()) || // check if name matches query OR
            s.department.toLowerCase().includes(query.toLowerCase()) // check if department matches query
        );
    });

    return (
        // View is the container that contains the list of students.
        <SafeAreaView style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Student Directory</Text>
                {/* NEW (Week 4): button that opens the AddStudent form */}
                <Pressable style={styles.addButton} onPress={() => setShowForm(true)}>
                    <Text style={styles.addButtonText}>+ Add</Text>
                </Pressable>
            </View>

            {/* update the value and onChangeText function in the Search Bar */}
            <SearchBar value={query} onChangeText={setQuery} />

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                // NEW: update the onPress handler to toggle selection and pass isSelected prop to StudentItem
                // and the isSelected prop is used to conditionally style the selected student item in the list (e.g., highlight it)
                renderItem={({ item }) => <StudentItem student={item} onPress={handleSelect} isSelected={selectedStudent?.id === item.id} />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No students match "{query}"</Text>
                    </View>
                }
            />

            {/* NEW: Detail panel — only shown when a student is selected */}
            {selectedStudent && <StudentDetail student={selectedStudent} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#0D1F4E",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    addButton: {
        backgroundColor: "#0D9488",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 13,
    },
    count: {
        fontSize: 12,
        color: "#CCFBF1",
    },
    empty: {
        padding: 40,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 14,
        color: "#94A3B8",
    },
});
