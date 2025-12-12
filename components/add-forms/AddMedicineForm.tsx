import CustomSwitch from "@/components/custom-switch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Image,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type AddMedicineFormProps = {
  visible: boolean;
  onBack: () => void;
  onClose: () => void;
};

export default function AddMedicineForm({
  visible,
  onBack,
  onClose,
}: AddMedicineFormProps) {
  const [search, setSearch] = useState("");
  const [selectedMed, setSelectedMed] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [refillReminder, setRefillReminder] = useState(true);

  // SMART SEARCH (presentation-friendly)
  useEffect(() => {
    const q = search.trim().toLowerCase();

    // Prevent accidental triggers
    if (q.length < 3 || showDetails) return;

    const matchesDoloral =
      q.includes("dolo") ||
      q.includes("doloral") ||
      q.includes("syrup");

    if (matchesDoloral) {
      setSelectedMed("Doloral Syrup (Morphine Hydrochloride)");

      // subtle delay so transition feels intentional
      setTimeout(() => {
        setShowDetails(true);
      }, 250);
    }
  }, [search, showDetails]);

  const handleBackPress = () => {
    if (showDetails) {
      setShowDetails(false);
      setSelectedMed(null);
      setSearch("");
      return;
    }
    onBack();
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Add Medicine</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* SEARCH MODE (CLEAN — NO CARD) */}
        {!showDetails && (
          <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="magnify" size={18} color="#111827" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search your medicine.."
                placeholderTextColor="#9CA3AF"
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
            </View>

            <Text style={styles.description}>
              Type the name of the medication you want to add in the above search bar
            </Text>
          </View>
        )}

        {/* DETAILS MODE */}
        {showDetails && selectedMed && (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Medicine image */}
            <View style={styles.imageWrap}>
              <Image
                source={require("../../assets/images/dolo.png")}
                style={styles.medicineImg}
                resizeMode="contain"
              />
            </View>

            {/* Medicine name */}
            <Text style={styles.medicineName}>{selectedMed}</Text>

            {/* How Often */}
            <Text style={styles.sectionLabel}>How Often?</Text>
            <View style={styles.card}>
              <TouchableOpacity style={styles.optionRow}>
                <Text style={styles.optionText}>Once daily</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.optionRow}>
                <Text style={styles.optionText}>Twice Daily</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.optionRow}>
                <Text style={styles.optionText}>More Options</Text>
              </TouchableOpacity>
            </View>

            {/* Reminder */}
            <Text style={styles.sectionLabel}>
              When would you like to get reminded?
            </Text>
            <View style={styles.card}>
              <TouchableOpacity style={styles.optionRow}>
                <Text style={styles.optionText}>Time</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.optionRow}>
                <Text style={styles.optionText}>Number of dose</Text>
              </TouchableOpacity>
            </View>

            {/* Refill */}
            <Text style={styles.sectionLabel}>
              Do you want us to remind you to refill inventory?
            </Text>
            <View style={styles.refillRow}>
              <Text style={styles.refillText}>Remind Me</Text>
              <CustomSwitch
                value={refillReminder}
                onValueChange={setRefillReminder}
                activeColor="#3B82F6"
              />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 18,
  },
  backButton: { padding: 6 },
  backArrow: {
    fontSize: 18,
    color: "#111827",
  },
  title: {
    fontSize: 36, // ONLY heading
    fontWeight: "600",
    color: "#1E3A8A",
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: "#111827",
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    color: "#111827",
    paddingHorizontal: 20,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  imageWrap: {
    alignItems: "center",
    marginTop: 10,
  },
  medicineImg: {
    width: 120,
    height: 160,
  },
  medicineName: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#1E3A8A",
  },

  sectionLabel: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "500",
    color: "#111827",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  optionRow: {
    paddingVertical: 14,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1E3A8A",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEF2F7",
  },

  refillRow: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  refillText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1E3A8A",
  },
});
