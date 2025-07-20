import COLORS from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Mock data - replace with Firebase data later
const mockFamilies = [
  {
    id: "1",
    familyId: "FAM001",
    headOfFamily: "Mr. Kamal Silva",
    address: "No. 45, Galle Road, Colombo 07",
    phoneNumber: "+94 77 123 4567",
    members: 4,
    registeredDate: "2024-01-15",
    lastUpdated: "2024-12-10",
    status: "active",
    category: "standard",
  },
  {
    id: "2",
    familyId: "FAM002",
    headOfFamily: "Mrs. Nimalasiri Perera",
    address: "No. 23, Temple Road, Colombo 07",
    phoneNumber: "+94 71 234 5678",
    members: 6,
    registeredDate: "2024-02-20",
    lastUpdated: "2024-12-12",
    status: "active",
    category: "large",
  },
  {
    id: "3",
    familyId: "FAM003",
    headOfFamily: "Mr. Sunil Fernando",
    address: "No. 67, Park Street, Colombo 07",
    phoneNumber: "+94 76 345 6789",
    members: 2,
    registeredDate: "2024-03-10",
    lastUpdated: "2024-11-28",
    status: "pending_update",
    category: "small",
  },
  {
    id: "4",
    familyId: "FAM004",
    headOfFamily: "Ms. Chamari Wickramasinghe",
    address: "No. 12, Lake View, Colombo 07",
    phoneNumber: "+94 78 456 7890",
    members: 3,
    registeredDate: "2024-04-05",
    lastUpdated: "2024-12-14",
    status: "active",
    category: "standard",
  },
];

export default function FamiliesScreen() {
  const router = useRouter();
  const [families, setFamilies] = useState(mockFamilies);
  const [filteredFamilies, setFilteredFamilies] = useState(mockFamilies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  const filterOptions = [
    { key: "all", label: "All Families", count: families.length },
    {
      key: "active",
      label: "Active",
      count: families.filter((f) => f.status === "active").length,
    },
    {
      key: "pending_update",
      label: "Pending Updates",
      count: families.filter((f) => f.status === "pending_update").length,
    },
    {
      key: "small",
      label: "Small (1-2 members)",
      count: families.filter((f) => f.category === "small").length,
    },
    {
      key: "standard",
      label: "Standard (3-5 members)",
      count: families.filter((f) => f.category === "standard").length,
    },
    {
      key: "large",
      label: "Large (6+ members)",
      count: families.filter((f) => f.category === "large").length,
    },
  ];

  const sortOptions = [
    { key: "name", label: "Family Head Name" },
    { key: "familyId", label: "Family ID" },
    { key: "members", label: "Number of Members" },
    { key: "registeredDate", label: "Registration Date" },
    { key: "lastUpdated", label: "Last Updated" },
  ];

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchQuery, selectedFilter, sortBy]);

  const applyFiltersAndSort = () => {
    let filtered = [...families];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (family) =>
          family.headOfFamily
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          family.familyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          family.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          family.phoneNumber.includes(searchQuery)
      );
    }

    // Apply category/status filter
    if (selectedFilter !== "all") {
      if (["active", "pending_update"].includes(selectedFilter)) {
        filtered = filtered.filter(
          (family) => family.status === selectedFilter
        );
      } else if (["small", "standard", "large"].includes(selectedFilter)) {
        filtered = filtered.filter(
          (family) => family.category === selectedFilter
        );
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.headOfFamily.localeCompare(b.headOfFamily);
        case "familyId":
          return a.familyId.localeCompare(b.familyId);
        case "members":
          return b.members - a.members;
        case "registeredDate":
          return (
            new Date(b.registeredDate).getTime() -
            new Date(a.registeredDate).getTime()
          );
        case "lastUpdated":
          return (
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
          );
        default:
          return 0;
      }
    });

    setFilteredFamilies(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return COLORS.success;
      case "pending_update":
        return COLORS.warning;
      default:
        return COLORS.gray;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "pending_update":
        return "Pending Update";
      default:
        return "Unknown";
    }
  };

  const handleAddFamily = () => {
    router.push("/add-family");
  };

  const handleFamilyPress = (family: any) => {
    Alert.alert(
      "Family Details",
      `Family ID: ${family.familyId}\nHead: ${family.headOfFamily}\nMembers: ${
        family.members
      }\nStatus: ${getStatusLabel(family.status)}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "View Details", onPress: () => handleViewFamily(family) },
        { text: "Edit", onPress: () => handleEditFamily(family) },
      ]
    );
  };

  const handleViewFamily = (family: any) => {
    Alert.alert("Coming Soon", "Family details view will be available soon!");
    // router.push(`/family/${family.id}`); // When you create the family details screen
  };

  const handleEditFamily = (family: any) => {
    Alert.alert(
      "Coming Soon",
      "Family editing feature will be available soon!"
    );
    // router.push(`/edit-family/${family.id}`); // When you create the edit family screen
  };

  const renderFamilyCard = ({ item: family }: { item: any }) => (
    <TouchableOpacity
      style={styles.familyCard}
      onPress={() => handleFamilyPress(family)}
    >
      <View style={styles.familyCardHeader}>
        <View style={styles.familyIdContainer}>
          <Text style={styles.familyId}>{family.familyId}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(family.status) + "20" },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(family.status) },
              ]}
            >
              {getStatusLabel(family.status)}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={16} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <Text style={styles.headOfFamily}>{family.headOfFamily}</Text>
      <Text style={styles.address} numberOfLines={2}>
        {family.address}
      </Text>

      <View style={styles.familyCardInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="people-outline" size={16} color={COLORS.primary} />
          <Text style={styles.infoText}>{family.members} members</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={16} color={COLORS.primary} />
          <Text style={styles.infoText}>{family.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.familyCardFooter}>
        <Text style={styles.dateText}>
          Registered: {new Date(family.registeredDate).toLocaleDateString()}
        </Text>
        <Text style={styles.dateText}>
          Updated: {new Date(family.lastUpdated).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Families</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Ionicons name="close" size={24} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterOption,
                  selectedFilter === option.key && styles.filterOptionSelected,
                ]}
                onPress={() => {
                  setSelectedFilter(option.key);
                  setShowFilterModal(false);
                }}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedFilter === option.key &&
                      styles.filterOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.filterOptionCount,
                    selectedFilter === option.key &&
                      styles.filterOptionTextSelected,
                  ]}
                >
                  {option.count}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderSortModal = () => (
    <Modal
      visible={showSortModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowSortModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity onPress={() => setShowSortModal(false)}>
              <Ionicons name="close" size={24} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterOption,
                  sortBy === option.key && styles.filterOptionSelected,
                ]}
                onPress={() => {
                  setSortBy(option.key);
                  setShowSortModal(false);
                }}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    sortBy === option.key && styles.filterOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {sortBy === option.key && (
                  <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Family Management</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddFamily}
            >
              <Ionicons name="add" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Manage and track family information in your village
          </Text>
        </View>

        {/* Search and Filters */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={COLORS.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search families..."
              placeholderTextColor={COLORS.input_placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowFilterModal(true)}
            >
              <Ionicons name="filter" size={16} color={COLORS.primary} />
              <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowSortModal(true)}
            >
              <Ionicons name="swap-vertical" size={16} color={COLORS.primary} />
              <Text style={styles.filterButtonText}>Sort</Text>
            </TouchableOpacity>

            <View style={styles.resultsCount}>
              <Text style={styles.resultsText}>
                {filteredFamilies.length} families
              </Text>
            </View>
          </View>
        </View>

        {/* Family List */}
        <FlatList
          data={filteredFamilies}
          renderItem={renderFamilyCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="people-outline"
                size={64}
                color={COLORS.gray_light}
              />
              <Text style={styles.emptyTitle}>No families found</Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery
                  ? "Try adjusting your search or filters"
                  : "Start by adding your first family"}
              </Text>
              {!searchQuery && (
                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={handleAddFamily}
                >
                  <Text style={styles.emptyButtonText}>Add First Family</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />

        {/* Modals */}
        {renderFilterModal()}
        {renderSortModal()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray_100,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: COLORS.text_primary,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary_50,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  filterButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "500",
  },
  resultsCount: {
    flex: 1,
    alignItems: "flex-end",
  },
  resultsText: {
    fontSize: 14,
    color: COLORS.text_secondary,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  familyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  familyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  familyIdContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  familyId: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  moreButton: {
    padding: 4,
  },
  headOfFamily: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text_primary,
    marginBottom: 6,
  },
  address: {
    fontSize: 14,
    color: COLORS.text_secondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  familyCardInfo: {
    flexDirection: "row",
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text_primary,
    marginLeft: 6,
  },
  familyCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.text_tertiary,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text_primary,
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.text_secondary,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text_primary,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterOptionSelected: {
    backgroundColor: COLORS.primary_50,
  },
  filterOptionText: {
    fontSize: 16,
    color: COLORS.text_primary,
  },
  filterOptionTextSelected: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  filterOptionCount: {
    fontSize: 14,
    color: COLORS.text_secondary,
    backgroundColor: COLORS.gray_100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 30,
    textAlign: "center",
  },
});
