import COLORS from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { useAuth } from '@/context/auth_context/AuthContext'; // Uncomment when auth context is ready
import { logoutUser } from "@/service/authService";

export default function ProfileScreen() {
  const router = useRouter();
  // const { user, userProfile, logout } = useAuth(); // Uncomment when auth context is ready

  // Mock user data - replace with actual data from auth context
  const [userProfile, setUserProfile] = useState({
    name: "Grama Niladhari Officer",
    email: "officer@gramainfo.gov.lk",
    role: "VILLAGE_OFFICER",
    village: "Colombo 07 - Ward 15",
    district: "Colombo",
    province: "Western Province",
    joinedDate: "2024-01-15",
    phoneNumber: "+94 77 123 4567",
    employeeId: "GN-COL07-001",
    isVerified: true,
  });

  const [statistics, setStatistics] = useState({
    familiesRegistered: 245,
    dataUpdatesThisMonth: 32,
    reportsGenerated: 8,
    lastSyncDate: "2024-12-15 14:30",
  });

  const menuItems = [
    {
      icon: "person-outline",
      title: "Edit Profile",
      subtitle: "Update your personal information",
      action: () => handleEditProfile(),
    },
    {
      icon: "shield-checkmark-outline",
      title: "Security",
      subtitle: "Password and security settings",
      action: () => handleSecurity(),
    },
    {
      icon: "settings-outline",
      title: "App Settings",
      subtitle: "Notifications and preferences",
      action: () => handleSettings(),
    },
    {
      icon: "location-outline",
      title: "Village Management",
      subtitle: "Manage your assigned village",
      action: () => handleVillageManagement(),
    },
    {
      icon: "document-text-outline",
      title: "Data Export",
      subtitle: "Export village data and reports",
      action: () => handleDataExport(),
    },
    {
      icon: "help-circle-outline",
      title: "Help & Support",
      subtitle: "Get help and contact support",
      action: () => handleHelp(),
    },
    {
      icon: "information-circle-outline",
      title: "About",
      subtitle: "App version and information",
      action: () => handleAbout(),
    },
  ];

  const handleEditProfile = () => {
    Alert.alert(
      "Coming Soon",
      "Profile editing feature will be available soon!"
    );
  };

  const handleSecurity = () => {
    Alert.alert("Coming Soon", "Security settings will be available soon!");
  };

  const handleSettings = () => {
    // Navigate to a separate settings screen
    Alert.alert("Coming Soon", "Settings screen will be available soon!");
    // router.push('/settings'); // When you create the settings screen
  };

  const handleVillageManagement = () => {
    Alert.alert(
      "Coming Soon",
      "Village management features will be available soon!"
    );
  };

  const handleDataExport = () => {
    Alert.alert("Coming Soon", "Data export feature will be available soon!");
  };

  const handleHelp = () => {
    Alert.alert(
      "Help & Support",
      "For technical support, contact:\nEmail: support@gramainfo.gov.lk\nPhone: +94 11 234 5678"
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About GramaInfo",
      "Version: 1.0.0\nDeveloped for Digital Sri Lanka Initiative\n\nA comprehensive village management system for Grama Niladhari officers."
    );
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logoutUser();
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color={COLORS.text_inverse} />
              </View>
              {userProfile.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={COLORS.success}
                  />
                </View>
              )}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userProfile.name}</Text>
              <Text style={styles.userRole}>
                {userProfile.role.replace(/_/g, " ")}
              </Text>
              <Text style={styles.userVillage}>{userProfile.village}</Text>
              <Text style={styles.userEmail}>{userProfile.email}</Text>
            </View>
          </View>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Performance</Text>
          <View style={styles.statsGrid}>
            <View
              style={[
                styles.statCard,
                { backgroundColor: COLORS.statistics_green },
              ]}
            >
              <Ionicons
                name="people-outline"
                size={20}
                color={COLORS.success_dark}
              />
              <Text style={styles.statNumber}>
                {statistics.familiesRegistered}
              </Text>
              <Text style={styles.statLabel}>Families Registered</Text>
            </View>
            <View
              style={[
                styles.statCard,
                { backgroundColor: COLORS.statistics_blue },
              ]}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color={COLORS.info_dark}
              />
              <Text style={styles.statNumber}>
                {statistics.dataUpdatesThisMonth}
              </Text>
              <Text style={styles.statLabel}>Updates This Month</Text>
            </View>
            <View
              style={[
                styles.statCard,
                { backgroundColor: COLORS.statistics_orange },
              ]}
            >
              <Ionicons
                name="document-outline"
                size={20}
                color={COLORS.warning_dark}
              />
              <Text style={styles.statNumber}>
                {statistics.reportsGenerated}
              </Text>
              <Text style={styles.statLabel}>Reports Generated</Text>
            </View>
          </View>
          <View style={styles.lastSyncContainer}>
            <Ionicons
              name="sync-outline"
              size={16}
              color={COLORS.text_secondary}
            />
            <Text style={styles.lastSyncText}>
              Last sync: {statistics.lastSyncDate}
            </Text>
          </View>
        </View>

        {/* User Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Employee ID</Text>
              <Text style={styles.detailValue}>{userProfile.employeeId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone Number</Text>
              <Text style={styles.detailValue}>{userProfile.phoneNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>District</Text>
              <Text style={styles.detailValue}>{userProfile.district}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Province</Text>
              <Text style={styles.detailValue}>{userProfile.province}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Joined Date</Text>
              <Text style={styles.detailValue}>
                {new Date(userProfile.joinedDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Account Options</Text>
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.lastMenuItem,
                ]}
                onPress={item.action}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuItemIcon}>
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>GramaInfo v1.0.0</Text>
          <Text style={styles.footerText}>Digital Sri Lanka Initiative</Text>
        </View>
      </ScrollView>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text_inverse,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: COLORS.text_inverse,
    opacity: 0.9,
    marginBottom: 2,
  },
  userVillage: {
    fontSize: 13,
    color: COLORS.text_inverse,
    opacity: 0.8,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: COLORS.text_inverse,
    opacity: 0.7,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text_primary,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text_primary,
    marginTop: 5,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.text_secondary,
    textAlign: "center",
  },
  lastSyncContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  lastSyncText: {
    fontSize: 12,
    color: COLORS.text_secondary,
    marginLeft: 5,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.text_secondary,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.text_primary,
    fontWeight: "400",
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary_50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text_primary,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: COLORS.text_secondary,
    marginTop: 2,
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.error_light,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.error,
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: COLORS.text_tertiary,
    textAlign: "center",
  },
});
