import { useState } from "react";
import {
    Modal, // 2. Import SafeAreaView
    Platform, // 1. Import Modal
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type AddAppointmentFormProps = {
    visible: boolean; // 3. Add a prop to control visibility
    onBack: () => void;
    onClose: () => void;
};

export default function AddAppointmentForm({
    visible,
    onBack,
    onClose
}: AddAppointmentFormProps) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [professional, setProfessional] = useState("");

    const handleSave = () => {
        // Logic to save appointment would go here
        onClose();
    };

    return (
        /* 4. Wrap everything in a Modal */
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onClose} // Handles hardware back button on Android
            presentationStyle="pageSheet" // or "fullScreen" for total coverage
        >
            {/* 5. Use SafeAreaView to automatically handle notches and status bars */}
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Appointment</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.formContainer}>
                    {/* Date Field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={date}
                            onChangeText={setDate}
                        />
                    </View>

                    {/* Time Field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Time</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={time}
                            onChangeText={setTime}
                        />
                    </View>

                    {/* Professional Selection */}
                    <TouchableOpacity style={styles.selectButton}>
                        <Text style={styles.selectButtonText}>
                            Select healthcare Professional
                        </Text>
                    </TouchableOpacity>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        // paddingTop is handled by SafeAreaView now, but we can keep a little extra if needed
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20, // Moved padding here for better alignment
        marginBottom: 40,
        marginTop: 10, // Add a little breathing room from the top safe area
    },
    backButton: {
        padding: 5,
    },
    backArrow: {
        fontSize: 24,
        color: "#111827",
    },
    title: {
        fontSize: 36,
        fontWeight: "600",
        color: "#1E3A8A",
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20, // Apply horizontal padding to the body content
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: "#374151",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "transparent",
        borderBottomWidth: 1,
        borderBottomColor: "#D1D5DB",
        paddingVertical: 8,
        fontSize: 16,
        color: "#111827",
    },
    selectButton: {
        marginTop: 20,
        marginBottom: 60,
    },
    selectButtonText: {
        color: "#1E3A8A",
        fontSize: 18,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#3B82F6",
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 18,
    },
    saveButton: {
        flex: 1,
        backgroundColor: "#1E3A8A",
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 18,
    },
});