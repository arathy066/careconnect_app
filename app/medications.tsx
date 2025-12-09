import ChatBotFab from "@/components/chaatbotfab";
import CustomSwitch from "@/components/custom-switch";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
type MedStatus = "active" | "paused" | "deleted";
type BannerState = null | "paused" | "resumed" | "deleted";

type PillDropdownProps = {
  selected: string;
  options: string[];
  onChange: (value: string) => void;
};

const PillDropdown: React.FC<PillDropdownProps> = ({
  selected,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownPill}
        onPress={() => setOpen((prev) => !prev)}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownText}>{selected}</Text>
        <Text style={styles.dropdownArrow}>▾</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownMenu}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownItem}
              onPress={() => handleSelect(option)}
            >
              <Text style={styles.dropdownItemText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default function MedicationsScreen() {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  // NEW – full-screen sub-modals
  const [showSchedule, setShowSchedule] = useState(false);
  const [showStock, setShowStock] = useState(false);

  const [remindToRefill, setRemindToRefill] = useState(true);

  // Medication state machine
  const [medStatus, setMedStatus] = useState<MedStatus>("active");
  const [bannerState, setBannerState] = useState<BannerState>(null);

  // Confirmation modals
  const [pauseConfirmVisible, setPauseConfirmVisible] = useState(false);
  const [resumeConfirmVisible, setResumeConfirmVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const [intakeAdvice, setIntakeAdvice] = useState("None");
  const [frequency, setFrequency] = useState("Daily");
  const [duration, setDuration] = useState("No end date");

  const bannerOpacity = useRef(new Animated.Value(0)).current;

  const isPaused = medStatus === "paused";
  const isDeleted = medStatus === "deleted";

  useEffect(() => {
    if (bannerState) {
      // capture which banner triggered this animation
      const currentBanner = bannerState;

      bannerOpacity.setValue(1);

      Animated.timing(bannerOpacity, {
        toValue: 0,
        duration: 600, // fade duration
        delay: 2000, // how long it stays fully visible
        useNativeDriver: true,
      }).start(() => {
        // hide banner
        setBannerState(null);

        // if this was the "deleted" banner, close the details modal
        if (currentBanner === "deleted") {
          setShowDetails(false);
        }
      });
    }
  }, [bannerState, bannerOpacity]);

  const handlePausePress = () => {
    if (isDeleted) return;
    if (isPaused) {
      setResumeConfirmVisible(true);
    } else {
      setPauseConfirmVisible(true);
    }
  };

  const handleDeletePress = () => {
    if (isDeleted) return;
    setDeleteConfirmVisible(true);
  };

  const confirmPause = () => {
    setPauseConfirmVisible(false);
    setMedStatus("paused");
    setBannerState("paused");
  };

  const confirmResume = () => {
    setResumeConfirmVisible(false);
    setMedStatus("active");
    setBannerState("resumed");
  };

  const confirmDelete = () => {
    setDeleteConfirmVisible(false);
    setMedStatus("deleted");
    setBannerState("deleted");
  };

  const pauseButtonLabel = isDeleted
    ? "Pause Medication"
    : isPaused
    ? "Resume Medication"
    : "Pause Reminder";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Medications</Text>
        <TouchableOpacity>
          <Text style={styles.addText}>Add +</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* FIRST MEDICATION – opens details modal */}
        <TouchableOpacity onPress={() => setShowDetails(true)}>
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>💊</Text>
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.cardTitle}>
                D-Forte 5000 unit Capsules(Vitamin D2)
              </Text>
              <Text style={styles.cardSubtitle}>
                2 times daily - 8:00 AM and 8:00 PM
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* SECOND MEDICATION – static for now */}
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>💊</Text>
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.cardTitle}>Montelukast</Text>
            <Text style={styles.cardSubtitle}>Once in a week - 8:00 AM</Text>
          </View>
        </View>
      </ScrollView>

      {/* ChatBot bubble */}
      <ChatBotFab onPress={() => router.push("/chatbot")} />

      {/* Bottom Nav (main screen) */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push("/today")}>
          <Text style={styles.navItem}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/appointments")}>
          <Text style={styles.navItem}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.navItem, styles.activeNav]}>Medications</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.navItem}>Records</Text>
        </TouchableOpacity>
      </View>

      {/* ================== DETAILS MODAL ================== */}
      <Modal
        visible={showDetails}
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        onRequestClose={() => setShowDetails(false)}
      >
        <View style={styles.detailsScreen}>
          {/* Header inside modal */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowDetails(false)}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Medications</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
            {/* Image */}
            <TouchableOpacity
              style={styles.imageWrapper}
              onPress={() => setImageModalVisible(true)}
            >
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>Bottle Image</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.tapHint}>(tap image to enlarge)</Text>

            {/* Name & last taken */}
            <Text style={styles.medName}>
              D-Forte 5000 unit Capsules(Vitamin D2)
            </Text>
            <Text style={styles.lastTakenLabel}>Last Taken</Text>
            <Text style={styles.lastTakenValue}>Today, 8:10 AM</Text>

            {/* Light background with cards */}
            <View style={styles.sectionBackground}>
              {/* OPEN FULL-SCREEN SCHEDULE MODAL */}
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => setShowSchedule(true)}
              >
                <Text style={styles.actionIcon}>📅</Text>
                <Text style={styles.actionText}>Medication Schedule</Text>
              </TouchableOpacity>

              {/* OPEN FULL-SCREEN STOCK MODAL */}
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => setShowStock(true)}
              >
                <Text style={styles.actionIcon}>🔄</Text>
                <Text style={styles.actionText}>Update Stock</Text>
              </TouchableOpacity>
            </View>

            {/* Pause / delete buttons */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity
                style={[
                  styles.pauseButton,
                  isPaused && styles.resumeButton,
                  isDeleted && styles.disabledButton,
                ]}
                onPress={handlePausePress}
                disabled={isDeleted}
              >
                <Text
                  style={[
                    styles.pauseButtonText,
                    isPaused && styles.resumeButtonText,
                    isDeleted && styles.disabledButtonText,
                  ]}
                >
                  {pauseButtonLabel}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  isDeleted && styles.disabledDeleteButton,
                ]}
                onPress={handleDeletePress}
                disabled={isDeleted}
              >
                <Text
                  style={[
                    styles.deleteButtonText,
                    isDeleted && styles.disabledDeleteText,
                  ]}
                >
                  Delete medication
                </Text>
              </TouchableOpacity>
            </View>

            {bannerState === "paused" && (
              <Animated.View
                style={[
                  styles.statusBanner,
                  styles.pausedBanner,
                  { opacity: bannerOpacity },
                ]}
              >
                <Text style={styles.statusBannerText}>
                  Medicine paused until user changes
                </Text>
              </Animated.View>
            )}

            {bannerState === "resumed" && (
              <Animated.View
                style={[
                  styles.statusBanner,
                  styles.resumedBanner,
                  { opacity: bannerOpacity },
                ]}
              >
                <Text style={styles.statusBannerText}>Medication resumed</Text>
              </Animated.View>
            )}

            {bannerState === "deleted" && (
              <Animated.View
                style={[
                  styles.statusBanner,
                  styles.deletedBanner,
                  { opacity: bannerOpacity },
                ]}
              >
                <Text style={styles.statusBannerText}>Medicine deleted</Text>
              </Animated.View>
            )}
          </ScrollView>

          {/* Bottom Nav inside modal */}
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => {
                setShowDetails(false);
                router.push("/today");
              }}
            >
              <Text style={styles.navItem}>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowDetails(false);
                router.push("/appointments");
              }}
            >
              <Text style={styles.navItem}>Appointments</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={[styles.navItem, styles.activeNav]}>
                Medications
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.navItem}>Records</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================== IMAGE ENLARGE MODAL ================== */}
      <Modal
        visible={imageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.imageModalOverlay}>
          <View style={styles.imageModalContent}>
            <View style={styles.imagePlaceholderLarge}>
              <Text style={styles.imageText}>Bottle Image</Text>
            </View>
            <TouchableOpacity
              style={styles.imageModalClose}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles.imageModalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================== MEDICATION SCHEDULE FULL-SCREEN MODAL ================== */}
      <Modal
        visible={showSchedule}
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        onRequestClose={() => setShowSchedule(false)}
      >
        <View style={styles.subScreen}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowSchedule(false)}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Medication Schedule</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.subCard}>
            <View style={styles.subRow}>
              <Text style={styles.subLabel}>Intake advice</Text>
              <PillDropdown
                selected={intakeAdvice}
                options={[
                  "None",
                  "Before meal",
                  "With meal",
                  "After meal",
                  "Custom",
                ]}
                onChange={setIntakeAdvice}
              />
            </View>

            <View style={styles.subRow}>
              <Text style={styles.subLabel}>Frequency</Text>
              <PillDropdown
                selected={frequency}
                options={["Daily", "Every other day", "Custom"]}
                onChange={setFrequency}
              />
            </View>

            <View style={styles.subRow}>
              <Text style={styles.subLabel}>Duration</Text>
              <PillDropdown
                selected={duration}
                options={[
                  "No end date",
                  "7 days",
                  "14 days",
                  "30 days",
                  "Custom",
                ]}
                onChange={setDuration}
              />
            </View>

            <View style={styles.subRow}>
              <Text style={styles.subLabel}>Reminder time</Text>
              <Text style={styles.subValue}>8:00 AM • 8:00 PM ▾</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================== UPDATE STOCK FULL-SCREEN MODAL ================== */}
      <Modal
        visible={showStock}
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        onRequestClose={() => setShowStock(false)}
      >
        <View style={styles.subScreen}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowStock(false)}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Update Stock</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.subCard}>
            <View style={styles.subRow}>
              <Text style={styles.subLabel}>Intaking dose</Text>
              <Text style={styles.subValue}>− 1 +</Text>
            </View>
            <View style={styles.subRow}>
              <Text style={styles.subLabel}>Add New Inventory</Text>
              <Text style={styles.subLink}>Add</Text>
            </View>
            <View style={styles.subRow}>
              <Text style={styles.subLabel}>Remind me to refill inventory</Text>
              <CustomSwitch
                value={remindToRefill}
                onValueChange={setRemindToRefill}
              />
            </View>
            <View style={styles.subRow}>
              <Text style={styles.subLabel}>Remind me at</Text>
              <Text style={styles.subValue}>10 capsules ▾</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================== CONFIRMATION MODALS ================== */}

      {/* Pause */}
      <Modal
        visible={pauseConfirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPauseConfirmVisible(false)}
      >
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmText}>
              Are you sure you want to pause the medication?
            </Text>
            <View style={styles.confirmButtonsRow}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setPauseConfirmVisible(false)}
              >
                <Text style={styles.confirmNoText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmPause}
              >
                <Text style={styles.confirmYesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Resume */}
      <Modal
        visible={resumeConfirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setResumeConfirmVisible(false)}
      >
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmText}>
              Are you sure you want to resume the medication?
            </Text>
            <View style={styles.confirmButtonsRow}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setResumeConfirmVisible(false)}
              >
                <Text style={styles.confirmNoText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmResume}
              >
                <Text style={styles.confirmYesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete */}
      <Modal
        visible={deleteConfirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteConfirmVisible(false)}
      >
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmText}>
              Are you sure you want to delete the medication?
            </Text>
            <View style={styles.confirmButtonsRow}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setDeleteConfirmVisible(false)}
              >
                <Text style={styles.confirmNoText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmDelete}
              >
                <Text style={styles.confirmYesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // main screen container
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  addText: {
    color: "#1E3A8A",
    fontWeight: "600",
  },
  backArrow: {
    fontSize: 20,
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FDECEC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  textBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E3A8A",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
  },

  chatbotContainer: {
    position: "absolute",
    bottom: 80,
    right: 30,
    alignItems: "center",
  },
  chatbotBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  chatbotIcon: {
    fontSize: 24,
  },
  chatbotLabel: {
    fontSize: 12,
    color: "#374151",
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    fontSize: 14,
    color: "#6B7280",
  },
  activeNav: {
    color: "#FFFFFF",
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "600",
  },

  // full-screen details screen (inside modal)
  detailsScreen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  imageWrapper: {
    alignItems: "center",
    marginTop: 8,
  },
  imagePlaceholder: {
    width: 120,
    height: 140,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    fontSize: 12,
    color: "#4B5563",
  },
  tapHint: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
  },
  medName: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  lastTakenLabel: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    color: "#6B7280",
  },
  lastTakenValue: {
    textAlign: "center",
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },

  sectionBackground: {
    marginTop: 32,
    backgroundColor: "#F5F7FF",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  actionText: {
    fontSize: 14,
    color: "#1E3A8A",
    fontWeight: "600",
  },

  bottomButtons: {
    marginTop: 32,
    alignItems: "center",
  },
  pauseButton: {
    backgroundColor: "#E5E7FF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
    width: "70%",
    alignItems: "center",
  },
  pauseButtonText: {
    color: "#1E3A8A",
    fontWeight: "600",
  },
  resumeButton: {
    backgroundColor: "#DCFCE7",
  },
  resumeButtonText: {
    color: "#15803D",
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: "70%",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#B91C1C",
    fontWeight: "600",
  },

  disabledButton: {
    backgroundColor: "#E5E7EB",
  },
  disabledButtonText: {
    color: "#9CA3AF",
  },
  disabledDeleteButton: {
    backgroundColor: "#F3F4F6",
  },
  disabledDeleteText: {
    color: "#D1D5DB",
  },

  // image enlarge modal
  imageModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    width: "80%",
    alignItems: "center",
  },
  imagePlaceholderLarge: {
    width: 200,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  imageModalClose: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#111827",
  },
  imageModalCloseText: {
    fontSize: 12,
    color: "#111827",
  },

  // shared layout for Schedule / Stock full-screen components
  subScreen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  subCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginTop: 16,
    paddingHorizontal: 8,
    overflow: "visible",
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
    zIndex: 10,
  },
  subLabel: {
    fontSize: 14,
    color: "#4B5563",
  },
  subValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  subLink: {
    fontSize: 14,
    color: "#1E3A8A",
    fontWeight: "700",
  },

  // status banner
  statusBanner: {
    marginTop: 24,
    marginHorizontal: "5%",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "center",
    minWidth: "80%",
    alignItems: "center",
  },
  statusBannerText: {
    fontSize: 13,
    fontWeight: "500",
  },
  pausedBanner: {
    backgroundColor: "#FEF3C7",
  },
  resumedBanner: {
    backgroundColor: "#DCFCE7",
  },
  deletedBanner: {
    backgroundColor: "#FEE2E2",
  },

  // confirmation modals
  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmCard: {
    width: "75%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  confirmText: {
    textAlign: "center",
    fontSize: 14,
    color: "#111827",
    marginBottom: 16,
  },
  confirmButtonsRow: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  confirmNoText: {
    color: "#DC2626",
    fontWeight: "600",
  },
  confirmYesText: {
    color: "#16A34A",
    fontWeight: "600",
  },
  // pill dropdown
  dropdownContainer: {
    position: "relative",
    zIndex: 2, // <-- MOST IMPORTANT (iOS)
    elevation: 2, // <-- Android
  },
  dropdownPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    zIndex: 2, // <-- MOST IMPORTANT (iOS)
    elevation: 2, // <-- Android
  },
  dropdownText: {
    fontSize: 13,
    color: "#1E3A8A",
    fontWeight: "600",
  },
  dropdownArrow: {
    marginLeft: 6,
    fontSize: 12,
    color: "#6B7280",
  },
  dropdownMenu: {
    position: "absolute",
    top: 34,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 4,
    minWidth: 140,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    zIndex: 32, // <-- MOST IMPORTANT (iOS)
    elevation: 32, // <-- Android
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  dropdownItemText: {
    fontSize: 13,
    color: "#1E3A8A",
  },
});
