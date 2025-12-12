// app/records.tsx
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

export default function RecordsScreen() {
  const router = useRouter();

  // full-screen modals
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [showLabReports, setShowLabReports] = useState(false);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);

  // segmented control inside Medical History modal
  const [activeTab, setActiveTab] = useState<"all" | "prescriptions" | "labs">(
    "all" // 🔹 default = ALL FILES
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Records</Text>
        <TouchableOpacity>
          <Text style={styles.addText}>Add +</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Prescriptions card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => setShowPrescriptions(true)}
        >
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>📄</Text>
          </View>
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardTitle}>Prescriptions</Text>
            <Text style={styles.cardSubtitle}>
              You can see all your prescriptions here
            </Text>
          </View>
        </TouchableOpacity>

        {/* Lab Reports card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => setShowLabReports(true)}
        >
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>🧪</Text>
          </View>
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardTitle}>Lab Reports</Text>
            <Text style={styles.cardSubtitle}>
              You can see all your lab reports here
            </Text>
          </View>
        </TouchableOpacity>

        {/* Medical History card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => setShowMedicalHistory(true)}
        >
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>🩺</Text>
          </View>
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardTitle}>Medical History</Text>
            <Text style={styles.cardSubtitle}>
              You can see all your medical history here
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* ChatBot bubble */}
      <View style={styles.chatbotContainer}>
        <View style={styles.chatbotBubble}>
          <View style={styles.chatIconInner}>
            <Text style={styles.chatIconLines}>▔▔</Text>
          </View>
        </View>
        <Text style={styles.chatbotLabel}>ChatBot</Text>
      </View>

      {/* Bottom Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push("/today")}>
          <Text style={styles.navItem}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/appointments")}>
          <Text style={styles.navItem}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/medications")}>
          <Text style={styles.navItem}>Medications</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.navItem, styles.activeNav]}>Records</Text>
        </TouchableOpacity>
      </View>

      {/* ===================== PRESCRIPTIONS MODAL ===================== */}
      <Modal
        visible={showPrescriptions}
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        onRequestClose={() => setShowPrescriptions(false)}
      >
        <View style={styles.modalScreen}>
          {/* header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowPrescriptions(false)}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Prescriptions</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
            {/* prescription cards */}
            <View style={styles.recordCard}>
              <Text style={styles.recordTitle}>Vitamin D Deficiency</Text>
              <Text style={styles.recordDate}>Date: May 02 2025</Text>
              <View style={styles.actionRow}>
                <Text style={styles.actionLink}>View</Text>
                <Text style={styles.actionLink}>Export</Text>
                <Text style={styles.actionDelete}>Delete</Text>
              </View>
            </View>

            <View style={styles.recordCard}>
              <Text style={styles.recordTitle}>Allergy & Asthma Control</Text>
              <Text style={styles.recordDate}>Date: October 03 2025</Text>
              <View style={styles.actionRow}>
                <Text style={styles.actionLink}>View</Text>
                <Text style={styles.actionLink}>Export</Text>
                <Text style={styles.actionDelete}>Delete</Text>
              </View>
            </View>

            {/* buttons */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>
                  Upload New Prescription
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Export All</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Chatbot + Nav inside modal */}
          <View style={styles.chatbotContainer}>
            <View style={styles.chatbotBubble}>
              <View style={styles.chatIconInner}>
                <Text style={styles.chatIconLines}>▔▔</Text>
              </View>
            </View>
            <Text style={styles.chatbotLabel}>ChatBot</Text>
          </View>

          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => router.push("/today")}>
              <Text style={styles.navItem}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/appointments")}>
              <Text style={styles.navItem}>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/medications")}>
              <Text style={styles.navItem}>Medications</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.navItem, styles.activeNav]}>Records</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ===================== LAB REPORTS MODAL ===================== */}
      <Modal
        visible={showLabReports}
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        onRequestClose={() => setShowLabReports(false)}
      >
        <View style={styles.modalScreen}>
          {/* header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowLabReports(false)}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Lab Reports</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
            {/* lab cards */}
            <View style={styles.recordCard}>
              <Text style={styles.recordTitle}>Complete Blood Count Test</Text>
              <Text style={styles.recordDate}>Date: May 02 2025</Text>
              <View style={styles.actionRow}>
                <Text style={styles.actionLink}>View</Text>
                <Text style={styles.actionLink}>Export</Text>
                <Text style={styles.actionDelete}>Delete</Text>
              </View>
            </View>

            <View style={styles.recordCard}>
              <Text style={styles.recordTitle}>Lipid Panel Test</Text>
              <Text style={styles.recordDate}>Date: October 03 2025</Text>
              <View style={styles.actionRow}>
                <Text style={styles.actionLink}>View</Text>
                <Text style={styles.actionLink}>Export</Text>
                <Text style={styles.actionDelete}>Delete</Text>
              </View>
            </View>

            {/* buttons */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>
                  Upload New Lab Report
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Export All</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Chatbot + Nav */}
          <View style={styles.chatbotContainer}>
            <View style={styles.chatbotBubble}>
              <View style={styles.chatIconInner}>
                <Text style={styles.chatIconLines}>▔▔</Text>
              </View>
            </View>
            <Text style={styles.chatbotLabel}>ChatBot</Text>
          </View>

          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => router.push("/today")}>
              <Text style={styles.navItem}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/appointments")}>
              <Text style={styles.navItem}>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/medications")}>
              <Text style={styles.navItem}>Medications</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.navItem, styles.activeNav]}>Records</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ===================== MEDICAL HISTORY MODAL ===================== */}
      <Modal
        visible={showMedicalHistory}
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        onRequestClose={() => setShowMedicalHistory(false)}
      >
        <View style={styles.modalScreen}>
          {/* header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowMedicalHistory(false)}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Medical History</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
            {/* search bar */}
            <View style={styles.searchBar}>
              <Text style={styles.searchPlaceholder}>Search your file..</Text>
            </View>

            {/* segmented tabs - All / Prescriptions / Lab Reports */}
            <View style={styles.segmentRow}>
              <TouchableOpacity
                onPress={() => setActiveTab("all")}
                style={[
                  styles.segmentPill,
                  activeTab === "all" && styles.segmentPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentPillText,
                    activeTab === "all" && styles.segmentPillActiveText,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveTab("prescriptions")}
                style={[
                  styles.segmentPill,
                  activeTab === "prescriptions" && styles.segmentPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentPillText,
                    activeTab === "prescriptions" &&
                      styles.segmentPillActiveText,
                  ]}
                >
                  Prescriptions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveTab("labs")}
                style={[
                  styles.segmentPill,
                  activeTab === "labs" && styles.segmentPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentPillText,
                    activeTab === "labs" && styles.segmentPillActiveText,
                  ]}
                >
                  Lab Reports
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>
              Your Records from this year
            </Text>

            {/* ALL FILES VIEW (default) */}
            {activeTab === "all" && (
              <>
                {/* Prescriptions */}
                <View style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyTitle}>
                      Allergy and Asthma Control
                    </Text>
                    <Text style={styles.historyDate}>Date: May 02 2025</Text>
                  </View>
                  <Text style={styles.moreDots}>⋮</Text>
                </View>

                <View style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyTitle}>Vitamin Deficiency</Text>
                    <Text style={styles.historyDate}>Date: May 02 2025</Text>
                  </View>
                  <Text style={styles.moreDots}>⋮</Text>
                </View>

                {/* Lab Reports */}
                <View style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyTitle}>
                      Complete Blood Count
                    </Text>
                    <Text style={styles.historyDate}>Date: May 02 2025</Text>
                  </View>
                  <Text style={styles.moreDots}>⋮</Text>
                </View>

                <View style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyTitle}>Lipid Panel Test</Text>
                    <Text style={styles.historyDate}>Date: May 02 2025</Text>
                  </View>
                  <Text style={styles.moreDots}>⋮</Text>
                </View>
              </>
            )}

            {/* PRESCRIPTIONS ONLY */}
            {activeTab === "prescriptions" && (
              <>
                <View style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyTitle}>
                      Allergy and Asthma Control
                    </Text>
                    <Text style={styles.historyDate}>Date: May 02 2025</Text>
                  </View>
                  <Text style={styles.moreDots}>⋮</Text>
                </View>

                <View style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyTitle}>Vitamin Deficiency</Text>
                    <Text style={styles.historyDate}>Date: May 02 2025</Text>
                  </View>
                  <Text style={styles.moreDots}>⋮</Text>
                </View>
              </>
            )}

            {/* LAB REPORTS ONLY */}
            {activeTab === "labs" && (
              <>
                <View style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyTitle}>
                      Complete Blood Count
                    </Text>
                    <Text style={styles.historyDate}>Date: May 02 2025</Text>
                  </View>
                  <Text style={styles.moreDots}>⋮</Text>
                </View>

                <View style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyTitle}>Lipid Panel Test</Text>
                    <Text style={styles.historyDate}>Date: May 02 2025</Text>
                  </View>
                  <Text style={styles.moreDots}>⋮</Text>
                </View>
              </>
            )}
          </ScrollView>

          {/* Chatbot + Nav */}
          <View style={styles.chatbotContainer}>
            <View style={styles.chatbotBubble}>
              <View style={styles.chatIconInner}>
                <Text style={styles.chatIconLines}>▔▔</Text>
              </View>
            </View>
            <Text style={styles.chatbotLabel}>ChatBot</Text>
          </View>

          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => router.push("/today")}>
              <Text style={styles.navItem}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/appointments")}>
              <Text style={styles.navItem}>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/medications")}>
              <Text style={styles.navItem}>Medications</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.navItem, styles.activeNav]}>Records</Text>
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

  // header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    color: "#052263ff", // matches Today/Medications style
  },
  addText: {
    fontSize: 20,
    color: "#1E3A8A",
    fontWeight: "600",
  },

  // cards
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#E5EDF9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  cardTextBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B3B78",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 18,
    color: "#6B7280",
  },

  // chatbot
  chatbotContainer: {
    position: "absolute",
    bottom: 80,
    right: 24,
    alignItems: "center",
  },
  chatbotBubble: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#E4E8FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  chatIconInner: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#0B3B78",
    alignItems: "center",
    justifyContent: "center",
  },
  chatIconLines: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  chatbotLabel: {
    fontSize: 16,
    color: "#374151",
  },

  // nav bar
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
    fontSize: 16,
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

  // common modal layout
  modalScreen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backArrow: {
    fontSize: 22,
    color: "#111827",
    marginRight: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E3A8A",
  },

  // record cards
  recordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B3B78",
    marginBottom: 4,
  },
  recordDate: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
  },
  actionLink: {
    fontSize: 18,
    color: "#1E3A8A",
    fontWeight: "600",
  },
  actionDelete: {
    fontSize: 18,
    color: "#B91C1C",
    fontWeight: "600",
  },

  bottomButtons: {
    marginTop: 24,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
  },

  // medical history
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchPlaceholder: {
    fontSize: 18,
    color: "#9CA3AF",
  },
  segmentRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  segmentPill: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  segmentPillActive: {
    backgroundColor: "#1E3A8A",
  },
  segmentPillText: {
    color: "#1E3A8A",
    fontSize: 18,
    fontWeight: "600",
  },
  segmentPillActiveText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  historyRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0B3B78",
  },
  historyDate: {
    fontSize: 18,
    color: "#6B7280",
  },
  moreDots: {
    fontSize: 20,
    color: "#6B7280",
  },
});
