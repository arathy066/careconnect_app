import CustomSwitch from "@/components/custom-switch";
import { useState } from "react";
import {
    Modal, // Added
    Platform, // Added
    SafeAreaView,
    ScrollView, // Added
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type AddCaregiverFormProps = {
    visible: boolean; // Added prop
    onBack: () => void;
    onClose: () => void;
};

export default function AddCaregiverForm({ visible, onBack, onClose }: AddCaregiverFormProps) {
    const [fullName, setFullName] = useState("");
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [role, setRole] = useState("Full Access");

    // Permissions state
    const [viewSchedule, setViewSchedule] = useState(true);
    const [editMeds, setEditMeds] = useState(true);
    const [viewHealth, setViewHealth] = useState(true);
    const [manageEmergency, setManageEmergency] = useState(true);

    const handleSave = () => {
        // Logic to save caregiver
        onClose();
    };

    const handleReset = () => {
        setFullName("");
        setEmailOrPhone("");
        setRole("View only");
        setViewSchedule(false);
        setEditMeds(false);
        setViewHealth(false);
        setManageEmergency(false);
    };

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
            presentationStyle="pageSheet"
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Add A Trusted Friend</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Input Fields */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#9CA3AF"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email or Phone"
                            placeholderTextColor="#9CA3AF"
                            value={emailOrPhone}
                            onChangeText={setEmailOrPhone}
                        />
                    </View>

                    {/* Assign Role Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Assign Role</Text>

                        <TouchableOpacity style={styles.radioRow} onPress={() => setRole("View only")}>
                            <View style={[styles.radioOuter, role === "View only" && styles.radioSelected]}>
                                {role === "View only" && <View style={styles.radioInner} />}
                            </View>
                            <View style={styles.radioTextContainer}>
                                <Text style={styles.radioLabel}>View only</Text>
                                <Text style={styles.radioSubLabel}>Can view information but cannot make changes</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.radioRow} onPress={() => setRole("Care Manager")}>
                            <View style={[styles.radioOuter, role === "Care Manager" && styles.radioSelected]}>
                                {role === "Care Manager" && <View style={styles.radioInner} />}
                            </View>
                            <View style={styles.radioTextContainer}>
                                <Text style={styles.radioLabel}>Care Manager</Text>
                                <Text style={styles.radioSubLabel}>Can manage reminders and appointments</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.radioRow} onPress={() => setRole("Full Access")}>
                            <View style={[styles.radioOuter, role === "Full Access" && styles.radioSelected]}>
                                {role === "Full Access" && <View style={styles.radioInner} />}
                            </View>
                            <View style={styles.radioTextContainer}>
                                <Text style={styles.radioLabel}>Full Access</Text>
                                <Text style={styles.radioSubLabel}>Can view and manage everything</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Permissions Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Permissions</Text>

                        <View style={styles.permissionRow}>
                            <View style={styles.permissionTextContainer}>
                                <View style={styles.checkIconRow}>
                                    <View style={styles.blueCheck}><Text style={styles.checkText}>✓</Text></View>
                                    <Text style={styles.permissionLabel}>View medication schedule</Text>
                                </View>
                                <Text style={styles.permissionSubLabel}>See upcoming doses and missed medications</Text>
                            </View>
                            <CustomSwitch value={viewSchedule} onValueChange={setViewSchedule} activeColor="#3B82F6" />
                        </View>

                        <View style={styles.permissionRow}>
                            <View style={styles.permissionTextContainer}>
                                <View style={styles.checkIconRow}>
                                    <View style={styles.blueCheck}><Text style={styles.checkText}>✓</Text></View>
                                    <Text style={styles.permissionLabel}>Edit medications & reminders</Text>
                                </View>
                                <Text style={styles.permissionSubLabel}>Add, change, or delete medication reminders</Text>
                            </View>
                            <CustomSwitch value={editMeds} onValueChange={setEditMeds} activeColor="#3B82F6" />
                        </View>

                        <View style={styles.permissionRow}>
                            <View style={styles.permissionTextContainer}>
                                <View style={styles.checkIconRow}>
                                    <View style={styles.blueCheck}><Text style={styles.checkText}>✓</Text></View>
                                    <Text style={styles.permissionLabel}>View health notes & reports</Text>
                                </View>
                                <Text style={styles.permissionSubLabel}>Read doctor notes, lab results, and summaries</Text>
                            </View>
                            <CustomSwitch value={viewHealth} onValueChange={setViewHealth} activeColor="#3B82F6" />
                        </View>

                        <View style={styles.permissionRow}>
                            <View style={styles.permissionTextContainer}>
                                <View style={styles.checkIconRow}>
                                    <View style={styles.blueCheck}><Text style={styles.checkText}>✓</Text></View>
                                    <Text style={styles.permissionLabel}>Manage emergency contacts</Text>
                                </View>
                                <Text style={styles.permissionSubLabel}>Update who is contacted in emergencies</Text>
                            </View>
                            <CustomSwitch value={manageEmergency} onValueChange={setManageEmergency} activeColor="#3B82F6" />
                        </View>
                    </View>

                    <Text style={styles.pinHint}>Confirm with pin or face id</Text>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.resetButton}
                            onPress={handleReset}
                        >
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        // Handle android status bar overlap
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10,
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
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    inputGroup: {
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 18,
        color: "#111827",
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#1E3A8A",
        marginBottom: 12,
        textAlign: "center",
    },
    radioRow: {
        flexDirection: "row",
        marginBottom: 16,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#9CA3AF",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
        marginRight: 10,
    },
    radioSelected: {
        borderColor: "#3B82F6",
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#3B82F6",
    },
    radioTextContainer: {
        flex: 1,
    },
    radioLabel: {
        fontSize: 18,
        color: "#1F2937",
        marginBottom: 2,
    },
    radioSubLabel: {
        fontSize: 18,
        color: "#6B7280",
    },
    permissionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    permissionTextContainer: {
        flex: 1,
        paddingRight: 10,
    },
    checkIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    blueCheck: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#3B82F6",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    checkText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    permissionLabel: {
        fontSize: 18,
        color: "#1F2937",
        fontWeight: "500",
    },
    permissionSubLabel: {
        fontSize: 18,
        color: "#9CA3AF",
    },
    pinHint: {
        textAlign: "center",
        color: "#3B82F6",
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 20,
         fontSize: 18,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
    },
    resetButton: {
        flex: 1,
        backgroundColor: "#3B82F6",
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: "center",
    },
    resetButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 18,
    },
    saveButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: "center",
        backgroundColor: "#2563EB",
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 18,
    },
});