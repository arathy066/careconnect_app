import ChatBotFab from "@/components/chaatbotfab";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TodayScreen() {
  const router = useRouter();

  const tasks = [
    {
      id: "1",
      time: "8:00 AM",
      title: "D-Forte 5000 unit Capsules (Vitamin D2)",
      subtitle: "1 capsule(s)",
      icon: "💊",
      type: "medication",
      dose: "1 capsule(s)",
      medTime: "8 PM",
      available: "20 left",
    },
    {
      id: "2",
      time: "10:30 AM",
      title: "Dr William Jhones",
      subtitle: "Doctor’s Appointment",
      icon: "📅",
      type: "appointment",
      appointmentType: "Doctor’s Appointment",
    },
  ];

  const [selectedTask, setSelectedTask] = useState<
    (typeof tasks)[number] | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [skippedToday, setSkippedToday] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const [takenToday, setTakenToday] = useState(false);
  const takenFadeAnim = useState(new Animated.Value(1))[0];
  const [showConfirmTake, setShowConfirmTake] = useState(false);
  const [showConfirmSkip, setShowConfirmSkip] = useState(false);

  const handleTaskPress = (task: (typeof tasks)[number]) => {
    setSelectedTask(task);
    setShowModal(true);
    setSkippedToday(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setSkippedToday(false);
  };

  const handleSkipToday = () => {
    setSkippedToday(true);
    fadeAnim.setValue(1); // reset opacity

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600, // fade-out duration
        useNativeDriver: true,
      }).start(() => {
        setSkippedToday(false); // hide banner after fade completes
      });
    }, 2000); // stays visible for 5 seconds
  };

  const handleTookIt = () => {
    setTakenToday(true);
    takenFadeAnim.setValue(1); // reset opacity

    setTimeout(() => {
      Animated.timing(takenFadeAnim, {
        toValue: 0,
        duration: 500, // fade out smoothly
        useNativeDriver: true,
      }).start(() => {
        setTakenToday(false); // hide banner after fade
      });
    }, 2000); // visible for 2 seconds
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity>
          <Text style={styles.addText}>Add +</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        These are the tasks that you need to complete for today!
      </Text>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTaskPress(item)}>
            <View style={styles.card}>
              <Text style={styles.time}>{item.time}</Text>
              <View style={styles.cardContent}>
                <Text style={styles.icon}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.arrow}>{">"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Bottom Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push("/today")}>
          <Text style={[styles.navItem, styles.activeNav]}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/appointments")}>
          <Text style={styles.navItem}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/medications")}>
          <Text style={styles.navItem}>Medications</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.navItem}>Records</Text>
        </TouchableOpacity>
      </View>

      {/* Detail Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Top grey bar with header (to match your design) */}
            <View style={styles.modalTopBar}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Today</Text>
              <Text style={styles.modalAdd}>Add +</Text>
            </View>

            {selectedTask && selectedTask.type === "medication" && (
              <View style={styles.modalContent}>
                {/* Medicine title */}
                <Text style={styles.modalMedTitle}>{selectedTask.title}</Text>

                {/* Details */}
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Dose</Text>
                  <Text style={styles.detailValue}>
                    {selectedTask.dose ?? "1 capsule(s)"}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Time</Text>
                  <Text style={styles.detailValue}>
                    {selectedTask.medTime ?? selectedTask.time}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Available Capsules</Text>
                  <Text style={styles.detailValue}>
                    {selectedTask.available ?? "20 left"}
                  </Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.tookButton}
                    onPress={() => setShowConfirmTake(true)}
                  >
                    <Text style={styles.tookButtonText}>I took it</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => setShowConfirmSkip(true)}
                  >
                    <Text style={styles.skipButtonText}>Skip Today</Text>
                  </TouchableOpacity>
                </View>

                {/* Banner when skipped */}
                {skippedToday && (
                  <Animated.View
                    style={[styles.skipBanner, { opacity: fadeAnim }]}
                  >
                    <Text style={styles.skipBannerText}>
                      Medicine Skipped Today
                    </Text>
                    <Text style={styles.skipBannerIcon}>!</Text>
                  </Animated.View>
                )}

                {takenToday && (
                  <Animated.View
                    style={[styles.skipBanner, { opacity: takenFadeAnim }]}
                  >
                    <Text style={styles.skipBannerText}>Medicine Taken</Text>
                    <Text style={[styles.skipBannerIcon, { color: "green" }]}>
                      ✔
                    </Text>
                  </Animated.View>
                )}
              </View>
            )}

            {selectedTask && selectedTask.type === "appointment" && (
              <View style={styles.modalContent}>
                <Text style={styles.modalMedTitle}>{selectedTask.title}</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Time</Text>
                  <Text style={styles.detailValue}>{selectedTask.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Type</Text>
                  <Text style={styles.detailValue}>
                    {selectedTask.appointmentType ?? selectedTask.subtitle}
                  </Text>
                </View>

                <View style={[styles.buttonRow, { marginTop: 40 }]}>
                  <TouchableOpacity
                    style={styles.tookButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.tookButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
      <Modal visible={showConfirmTake} transparent animationType="fade">
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>
              Are you sure that{"\n"}you took the medicine?
            </Text>

            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={styles.noBtn}
                onPress={() => setShowConfirmTake(false)}
              >
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yesBtn}
                onPress={() => {
                  setShowConfirmTake(false);
                  handleTookIt();
                }}
              >
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={showConfirmSkip} transparent animationType="fade">
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>
              Are you sure that{"\n"}you want to skip?
            </Text>

            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={styles.noBtn}
                onPress={() => setShowConfirmSkip(false)}
              >
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yesBtn}
                onPress={() => {
                  setShowConfirmSkip(false);
                  handleSkipToday();
                }}
              >
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
            <ChatBotFab onPress={() => router.push("/chatbot")} />

    </View>
  );
}

const styles = StyleSheet.create({
  // main screen
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
    marginBottom: 10,
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
  subtitle: {
    color: "#374151",
    fontSize: 15,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  time: {
    fontSize: 13,
    color: "#1E3A8A",
    fontWeight: "600",
    marginBottom: 6,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  cardTitle: {
    color: "#1E3A8A",
    fontSize: 15,
    fontWeight: "600",
  },
  cardSubtitle: {
    color: "#6B7280",
    fontSize: 13,
  },
  arrow: {
    fontSize: 18,
    color: "#9CA3AF",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
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
    color: "#1E3A8A",
    fontWeight: "600",
  },

  // modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  modalTopBar: {
    backgroundColor: "#9CA3AF",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backArrow: {
    fontSize: 20,
    color: "#111827",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  modalAdd: {
    color: "#1E3A8A",
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  modalMedTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: "#4B5563",
  },
  detailValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 40,
  },
  tookButton: {
    backgroundColor: "#BBF7D0", // light green
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 999,
  },
  tookButtonText: {
    fontWeight: "600",
    color: "#111827",
  },
  skipButton: {
    backgroundColor: "#FED7AA", // light orange
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 999,
  },
  skipButtonText: {
    fontWeight: "600",
    color: "#111827",
  },
  skipBanner: {
    marginTop: 40,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  skipBannerText: {
    fontSize: 14,
    marginRight: 8,
  },
  skipBannerIcon: {
    fontWeight: "700",
    fontSize: 16,
    color: "#F97316",
  },
  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  confirmBox: {
    width: "75%",
    backgroundColor: "#F8F8FC",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: "center",
  },

  confirmText: {
    fontSize: 16,
    textAlign: "center",
    color: "#1A1A1A",
    marginBottom: 15,
    fontWeight: "600",
  },

  confirmButtons: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
    width: "100%",
  },

  noBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#D1D5DB",
  },

  yesBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },

  noText: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },

  yesText: {
    fontSize: 16,
    color: "green",
    fontWeight: "600",
  },
});
