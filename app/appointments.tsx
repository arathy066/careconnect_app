import ChatBotFab from "@/components/chaatbotfab";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CalendarEventCellProps = {
  day: number;
  title: string;
  subtitle: string;
  onPress: () => void;
};

type EventDetail = {
  id: string;
  doctor: string;
  specialty: string;
  dateTime: string;
  location: string;
  mapsQuery: string;
};


// Small reusable cell for calendar events (date + black badge)
function CalendarEventCell({ day, title, subtitle, onPress }: CalendarEventCellProps) {  return (
    <View style={styles.calendarCell}>
      <Text style={styles.dateText}>{day}</Text>
      <TouchableOpacity style={styles.eventBadge} onPress={onPress}>
        <Text style={styles.eventText}>
          {title}
          {"\n"}
          {subtitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function AppointmentsScreen() {
  const router = useRouter();
  const [showCalendar, setShowCalendar] = useState(false);
const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  const openMaps = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Appointments</Text>
        <TouchableOpacity>
          <Text style={styles.addText}>Add +</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Nav (main screen) */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push("/today")}>
          <Text style={styles.navItem}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/appointments")}>
          <Text style={[styles.navItem, styles.activeNav]}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/medications")}>
          <Text style={[styles.navItem]}>Medications</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.navItem}>Records</Text>
        </TouchableOpacity>
      </View>

      {/* Doctor Card */}
      <View style={styles.card}>
        <View style={styles.doctorIcon}>
          <Text style={styles.doctorIconText}>👨‍⚕️</Text>
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>Dr William Jhones</Text>
          <Text style={styles.doctorSpecialty}>Cardiologist</Text>
          <Text style={styles.doctorLocation}>Toronto General Hospital</Text>
        </View>
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>

        <View style={styles.appointmentRow}>
          <Text style={styles.appointmentDate}>3 October</Text>
          <Text style={styles.appointmentTime}>10:30 AM</Text>
        </View>

        <View style={styles.appointmentRow}>
          <Text style={styles.appointmentDate}>25 October</Text>
          <Text style={styles.appointmentTime}>9:30 AM</Text>
        </View>
      </View>

      {/* View in Calendar Button */}
      <TouchableOpacity
        style={styles.calendarButton}
        onPress={() => setShowCalendar(true)}
      >
        <Text style={styles.calendarButtonText}>View In Calendar</Text>
      </TouchableOpacity>

      {/* Chatbot bubble (static for now) */}
     
      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.calendarOverlay}>
          <View style={styles.calendarCard}>
            {/* Top row with back arrow */}
            <View style={styles.calendarTopRow}>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
            </View>

            {/* Calendar body */}
            <View style={styles.calendarInner}>
              {/* Month header */}
              <View style={styles.monthHeader}>
                <Text style={styles.monthNav}>{'<'}</Text>
                <Text style={styles.monthTitle}>October</Text>
                <Text style={styles.monthNav}>{'>'}</Text>
              </View>

              {/* Days of week */}
              <View style={styles.daysRow}>
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                  <Text key={d} style={styles.dayLabel}>
                    {d}
                  </Text>
                ))}
              </View>

              <ScrollView>
                {/* Row 1: previous month + 1 */}
                <View style={styles.calendarRow}>
                  <View style={styles.calendarCellMuted}>
                    <Text style={styles.dateMuted}>26</Text>
                  </View>
                  <View style={styles.calendarCellMuted}>
                    <Text style={styles.dateMuted}>27</Text>
                  </View>
                  <View style={styles.calendarCellMuted}>
                    <Text style={styles.dateMuted}>28</Text>
                  </View>
                  <View style={styles.calendarCellMuted}>
                    <Text style={styles.dateMuted}>29</Text>
                  </View>
                  <View style={styles.calendarCellMuted}>
                    <Text style={styles.dateMuted}>30</Text>
                  </View>
                  <View style={styles.calendarCellMuted}>
                    <Text style={styles.dateMuted}>31</Text>
                  </View>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>1</Text>
                  </View>
                </View>

                {/* Row 2: includes October 3rd with event */}
                <View style={styles.calendarRow}>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>2</Text>
                  </View>

                  <CalendarEventCell
                    day={3}
                    title="Dr. William Jhones"
                    subtitle="Cardiology"
                    onPress={() =>
                      setSelectedEvent({
                        id: "oct-3",
                        doctor: "Dr. William Jhones",
                        specialty: "Cardiology",
                        dateTime: "October 3, 10:30 AM",
                        location: "Toronto General Hospital",
                        mapsQuery: "Toronto General Hospital",
                      })
                    }
                  />

                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>4</Text>
                  </View>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>5</Text>
                  </View>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>6</Text>
                  </View>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>7</Text>
                  </View>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>8</Text>
                  </View>
                </View>

                {/* Empty rows (for spacing like a real calendar) */}
                <View style={styles.calendarRow}>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <View key={i} style={styles.calendarCell} />
                  ))}
                </View>

                <View style={styles.calendarRow}>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <View key={i} style={styles.calendarCell} />
                  ))}
                </View>

                {/* Row with October 25th event */}
                <View style={styles.calendarRow}>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>23</Text>
                  </View>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>24</Text>
                  </View>

                  <CalendarEventCell
                    day={25}
                    title="Dr. Ben Thomson"
                    subtitle="Cardiology"
                    onPress={() =>
                      setSelectedEvent({
                        id: "oct-25",
                        doctor: "Dr. Ben Thomson",
                        specialty: "Cardiology",
                        dateTime: "October 25, 9:30 AM",
                        location: "Toronto General Hospital",
                        mapsQuery: "Toronto General Hospital",
                      })
                    }
                  />

                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>26</Text>
                  </View>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>27</Text>
                  </View>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>28</Text>
                  </View>
                  <View style={styles.calendarCell}>
                    <Text style={styles.dateText}>29</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>

          {/* Expanded event overlay */}
          {selectedEvent && (
            <View style={styles.eventOverlay}>
              <View style={styles.eventCard}>
                <Text style={styles.eventSmallText}>
                  {selectedEvent.doctor} – {selectedEvent.specialty}
                </Text>

                <View style={{ height: 16 }} />

                <Text style={styles.eventMainText}>
                  {selectedEvent.doctor} –
                </Text>
                <Text style={styles.eventMainText}>
                  {selectedEvent.specialty}
                </Text>
                <Text style={styles.eventMainText}>
                  {selectedEvent.dateTime}
                </Text>

                <View style={{ height: 20 }} />

                <Text style={styles.eventLocation}>
                  {selectedEvent.location}
                </Text>

                <TouchableOpacity
                  onPress={() => openMaps(selectedEvent.mapsQuery)}
                >
                  <Text style={styles.eventLink}>Open in Maps</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.eventClose}
                  onPress={() => setSelectedEvent(null)}
                >
                  <Text style={styles.eventCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
    marginBottom: 20,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  doctorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5EDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  doctorIconText: {
    fontSize: 22,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#4B5563",
  },
  doctorLocation: {
    fontSize: 12,
    color: "#6B7280",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E3A8A",
    marginBottom: 10,
    textAlign: "center",
  },
  appointmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  appointmentDate: {
    fontSize: 14,
    color: "#111827",
  },
  appointmentTime: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  calendarButton: {
    backgroundColor: "#E5EDFF",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  calendarButtonText: {
    color: "#1E3A8A",
    fontWeight: "600",
  },
  chatbotContainer: {
    position: "absolute",
    bottom: 40,
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

  // calendar modal
  calendarOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarCard: {
    width: "90%",
    height: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  calendarTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backArrow: {
    fontSize: 18,
    color: "#111827",
  },
  calendarInner: {
    flex: 1,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  monthHeader: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  monthTitle: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  monthNav: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  daysRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  dayLabel: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 6,
    fontSize: 10,
    fontWeight: "600",
    color: "#6B7280",
  },
  calendarRow: {
    flexDirection: "row",
  },
  calendarCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    height: 60,
    padding: 3,
  },
  calendarCellMuted: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    height: 60,
    padding: 3,
    backgroundColor: "#F9FAFB",
  },
  dateText: {
    fontSize: 12,
    color: "#111827",
  },
  dateMuted: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  eventBadge: {
    marginTop: 4,
    backgroundColor: "#000000",
    borderRadius: 2,
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  eventText: {
    fontSize: 7,
    color: "#FFFFFF",
  },

  // expanded event overlay card
  eventOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  eventCard: {
    width: "80%",
    backgroundColor: "#000000",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  eventSmallText: {
    color: "#FFFFFF",
    fontSize: 10,
    textAlign: "center",
  },
  eventMainText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 2,
  },
  eventLocation: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
  eventLink: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    textDecorationLine: "underline",
  },
  eventClose: {
    marginTop: 16,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  eventCloseText: {
    color: "#FFFFFF",
    fontSize: 12,
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
});
