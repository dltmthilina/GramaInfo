import COLORS from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// import { useAuth } from '@/context/AuthContext'; // Uncomment when you create auth context

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  // const { user, userProfile, logout } = useAuth(); // Uncomment when auth context is ready
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - replace with actual data from your auth context
  const user = {
    name: "John Officer",
    role: "VILLAGE_OFFICER",
    village: "Colombo 07",
  };

  const villageStats = {
    totalFamilies: 245,
    totalMembers: 892,
    newRegistrations: 12,
    pendingUpdates: 7,
  };

  const recentActivities = [
    {
      id: 1,
      action: "New family registered",
      family: "Silva Family",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Family data updated",
      family: "Perera Family",
      time: "5 hours ago",
    },
    {
      id: 3,
      action: "Member added",
      family: "Fernando Family",
      time: "1 day ago",
    },
  ];

  const quickActions = [
    {
      title: "Add Family",
      icon: "people-outline",
      color: COLORS.primary,
      route: "/add-family",
    },
    {
      title: "Search Family",
      icon: "search-outline",
      color: "#FF6B6B",
      route: "/search",
    },
    {
      title: "Reports",
      icon: "bar-chart-outline",
      color: "#4ECDC4",
      route: "/reports",
    },
    {
      title: "Settings",
      icon: "settings-outline",
      color: "#45B7D1",
      route: "/settings",
    },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Add logout logic here
          router.replace("/signin");
        },
      },
    ]);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color={COLORS.secondary} />
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>Welcome, {user.name}</Text>
                <Text style={styles.userRole}>
                  {user.role} • {user.village}
                </Text>
                <Text style={styles.currentTime}>
                  {currentTime.toLocaleDateString()}{" "}
                  {currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={24}
                color={COLORS.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Village Statistics Cards */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Village Overview</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: "#E8F5E8" }]}>
              <Ionicons name="home-outline" size={24} color="#4CAF50" />
              <Text style={styles.statNumber}>
                {villageStats.totalFamilies}
              </Text>
              <Text style={styles.statLabel}>Total Families</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="people-outline" size={24} color="#2196F3" />
              <Text style={styles.statNumber}>{villageStats.totalMembers}</Text>
              <Text style={styles.statLabel}>Total Members</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: "#FFF3E0" }]}>
              <Ionicons name="add-circle-outline" size={24} color="#FF9800" />
              <Text style={styles.statNumber}>
                {villageStats.newRegistrations}
              </Text>
              <Text style={styles.statLabel}>New This Month</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: "#FCE4EC" }]}>
              <Ionicons name="time-outline" size={24} color="#E91E63" />
              <Text style={styles.statNumber}>
                {villageStats.pendingUpdates}
              </Text>
              <Text style={styles.statLabel}>Pending Updates</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { borderLeftColor: action.color }]}
                onPress={() => router.push(action.route as any)}
              >
                <View
                  style={[
                    styles.actionIcon,
                    { backgroundColor: action.color + "20" },
                  ]}
                >
                  <Ionicons
                    name={action.icon as any}
                    size={24}
                    color={action.color}
                  />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.activitiesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesList}>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={COLORS.primary}
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityFamily}>{activity.family}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencyContainer}>
          <View style={styles.emergencyCard}>
            <Ionicons name="call-outline" size={24} color="#FF4757" />
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>Emergency Contact</Text>
              <Text style={styles.emergencyText}>
                District Office: +94 11 234 5678
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Spacing */}
        <View style={styles.footer} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary_600,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.secondary,
  },
  userRole: {
    fontSize: 14,
    color: COLORS.secondary,
    opacity: 0.9,
    marginTop: 2,
  },
  currentTime: {
    fontSize: 12,
    color: COLORS.secondary,
    opacity: 0.8,
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.black,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 4,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionsGrid: {
    gap: 12,
  },
  actionCard: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
    flex: 1,
  },
  activitiesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "500",
  },
  activitiesList: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  activityIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.black,
  },
  activityFamily: {
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  emergencyContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  emergencyCard: {
    backgroundColor: "#FFE5E5",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFB3B3",
  },
  emergencyContent: {
    marginLeft: 15,
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF4757",
  },
  emergencyText: {
    fontSize: 13,
    color: "#FF4757",
    marginTop: 2,
  },
  footer: {
    height: 100,
  },
});
