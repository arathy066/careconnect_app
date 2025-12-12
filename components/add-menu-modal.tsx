import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import AddAppointmentForm from "./add-forms/AddAppointmentForm";
import AddCaregiverForm from "./add-forms/AddCaregiverForm";
import AddMedicineForm from "./add-forms/AddMedicineForm";

type AddMenuModalProps = {
    visible: boolean;
    onClose: () => void;
};

const SCREEN_HEIGHT = Dimensions.get("window").height;

type ViewState = "menu" | "appointment" | "medicine" | "caregiver";

export default function AddMenuModal({ visible, onClose }: AddMenuModalProps) {
    const slideAnim = useRef(new Animated.Value(-SCREEN_HEIGHT)).current;
    const [showModal, setShowModal] = useState(visible);
    const [currentView, setCurrentView] = useState<ViewState>("menu");

    useEffect(() => {
        if (visible) {
            setShowModal(true);
            setCurrentView("menu"); // Reset to menu on open
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 0,
                speed: 12,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -SCREEN_HEIGHT,
                duration: 250,
                useNativeDriver: true,
            }).start(() => setShowModal(false));
        }
    }, [visible]);

    const handleClose = () => {
        onClose();
    };

    const handleBack = () => {
        setCurrentView("menu");
    };

    if (!showModal) return null;

    // Determine content and modal height based on current view
    let content = null;
    let modalHeight: any = "50%";
    let backgroundColor = "#0F3C85";

    if (currentView === "menu") {
        modalHeight = "50%";
        backgroundColor = "#0F3C85";
        content = (
            <>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>What would you like to add?</Text>
                    <TouchableOpacity
                        onPress={handleClose}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.closeIcon}>×</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.spacer} />

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => setCurrentView("appointment")}
                >
                    <Text style={styles.menuText}>Add Appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => setCurrentView("medicine")}
                >
                    <Text style={styles.menuText}>Add Medicine</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => setCurrentView("caregiver")}
                >
                    <Text style={styles.menuText}>Add A Trusted Friend</Text>
                </TouchableOpacity>
            </>
        );
    } else {
        // For forms, we use a larger height
        modalHeight = "92%";
        backgroundColor = "#F3F4F6"; // Match form backgrounds roughly, or generic

        if (currentView === "appointment") {
            content = <AddAppointmentForm onBack={handleBack} onClose={handleClose} />;
        } else if (currentView === "medicine") {
            content = <AddMedicineForm onBack={handleBack} onClose={handleClose} />;
        } else if (currentView === "caregiver") {
            content = <AddCaregiverForm onBack={handleBack} onClose={handleClose} />;
        }
    }

    return (
        <Modal
            visible={showModal}
            transparent
            animationType="none" // We handle animation manually
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={handleClose}>
                <View style={styles.overlay}>
                    {/* Prevent closing when tapping the menu itself */}
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.menuCard,
                                {
                                    transform: [{ translateY: slideAnim }],
                                    height: modalHeight,
                                    backgroundColor: backgroundColor,
                                    paddingTop: currentView === 'menu' ? 60 : 0,
                                },
                            ]}
                        >
                            {content}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-start", // Align to top
    },
    menuCard: {
        width: "100%",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingHorizontal: 24,
        paddingBottom: 30,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        // justifyContent: "center", // Removed to allow forms to fill space naturally
        overflow: 'hidden',
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },
    closeIcon: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "600",
    },
    spacer: {
        height: 20,
    },
    menuItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.1)",
    },
    menuText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

