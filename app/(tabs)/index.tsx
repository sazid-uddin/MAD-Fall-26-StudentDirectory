import { StyleSheet, View, Text } from "react-native";
// Importing our custom StudentItem component to display each student in the list
import StudentItem from "@/components/student-item";
// Importing the list of students from our data file
import { STUDENTS } from "@/data/students";
// Importing SafeAreaView to ensure content is displayed within the safe area boundaries of a device
import { SafeAreaView } from "react-native-safe-area-context";
// NEW: Importing the SearchBar component to allow users to search for students
import SearchBar from "@/components/search-bar";
// NEW: Importing useState to manage the state of the search input
import { useState } from "react";

export default function HomeScreen() {
    // State 1: the current search query
    const [query, setQuery] = useState<string>("");

    return (
        // View is the container that contains the list of students.
        <SafeAreaView style={styles.container}>
            {/* NEW: Add a page title for the student list */}
            <View style={styles.titleBar}>
                <Text style={styles.title}>Student Directory</Text>
            </View>

            {/* // NEW: Search Bar */}
            <SearchBar value="" onChangeText={() => {}} />

            {/* We map over the STUDENTS array and render a StudentItem for each student. */}
            {STUDENTS.map((student) => (
                <StudentItem key={student.id} student={student} onPress={() => {}} isSelected={false} />
            ))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    // NEW: styles for the title bar
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
});
