import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function MedicationsScreen() {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

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
            <Text style={styles.cardSubtitle}>
              Once in a week - 8:00 AM
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ChatBot bubble */}
      <View style={styles.chatbotContainer}>
        <View style={styles.chatbotBubble}>
          <Text style={styles.chatbotIcon}>💬</Text>
        </View>
        <Text style={styles.chatbotLabel}>ChatBot</Text>
      </View>

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

      {/* FULL-SCREEN MEDICATION DETAILS MODAL */}
      <Modal
        visible={showDetails}
        animationType="slide"             // slides from bottom
        transparent={false}              // full opaque screen
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
            <View style={{ width: 40 }} />{/* spacer instead of Add+ */}
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
            {/* Image */}
            <TouchableOpacity
              style={styles.imageWrapper}
              onPress={() => setImageModalVisible(true)}
            >
              <View style={styles.imagePlaceholder}>
                {/* Replace this with <Image /> later */}
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
              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionIcon}>📅</Text>
                <Text style={styles.actionText}>Medication Schedule</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionIcon}>🔄</Text>
                <Text style={styles.actionText}>Update Stock</Text>
              </TouchableOpacity>
            </View>

            {/* Pause / delete buttons */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity style={styles.pauseButton}>
                <Text style={styles.pauseButtonText}>Pause Reminder</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete medication</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Bottom Nav inside modal (covers everything below) */}
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => { setShowDetails(false); router.push("/today"); }}>
              <Text style={styles.navItem}>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setShowDetails(false); router.push("/appointments"); }}>
              <Text style={styles.navItem}>Appointments</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={[styles.navItem, styles.activeNav]}>Medications</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.navItem}>Records</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* IMAGE ENLARGE MODAL (still overlay, on top of details) */}
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
});
