import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";

const { width } = Dimensions.get("window");

export default function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [reportData, setReportData] = useState({
    totalFamilies: 245,
    totalMembers: 892,
    newRegistrations: 12,
    pendingUpdates: 7,
    activeFamilies: 238,
    inactiveFamilies: 7,
    averageFamilySize: 3.6,
    maleMembers: 445,
    femaleMembers: 447,
    children: 198,
    adults: 694,
    seniors: 89,
  });

  const [monthlyData, setMonthlyData] = useState([
    { month: "Jan", families: 42, members: 165 },
    { month: "Feb", families: 38, members: 142 },
    { month: "Mar", families: 35, members: 128 },
    { month: "Apr", families: 41, members: 156 },
    { month: "May", families: 39, members: 148 },
    { month: "Jun", families: 50, members: 189 },
  ]);

  const periodOptions = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "quarter", label: "This Quarter" },
    { key: "year", label: "This Year" },
  ];

  const reportTypes = [
    {
      id: 1,
      title: "Family Demographics",
      description: "Detailed family composition and demographics report",
      icon: "people-outline",
      color: COLORS.primary,
      action: () => handleGenerateReport("demographics"),
    },
    {
      id: 2,
      title: "Population Statistics",
      description: "Age groups, gender distribution, and population trends",
      icon: "bar-chart-outline",
      color: COLORS.info,
      action: () => handleGenerateReport("population"),
    },
    {
      id: 3,
      title: "Registration Summary",
      description: "New registrations and updates for selected period",
      icon: "document-text-outline",
      color: COLORS.success,
      action: () => handleGenerateReport("registration"),
    },
    {
      id: 4,
      title: "Village Overview",
      description: "Complete village statistics and summary",
      icon: "location-outline",
      color: COLORS.warning,
      action: () => handleGenerateReport("overview"),
    },
    {
      id: 5,
      title: "Data Quality Report",
      description: "Missing information and data completeness",
      icon: "checkmark-circle-outline",
      color: COLORS.nature_green,
      action: () => handleGenerateReport("quality"),
    },
    {
      id: 6,
      title: "Monthly Trends",
      description: "Monthly registration and update trends",
      icon: "trending-up-outline",
      color: COLORS.sunset_orange,
      action: () => handleGenerateReport("trends"),
    },
  ];

  const quickStats = [
    {
      title: "Total Families",
      value: reportData.totalFamilies,
      icon: "home-outline",
      color: COLORS.primary,
      change: "+5.2%",
      changeType: "increase",
    },
    {
      title: "Total Members",
      value: reportData.totalMembers,
      icon: "people-outline",
      color: COLORS.info,
      change: "+3.8%",
      changeType: "increase",
    },
    {
      title: "New This Month",
      value: reportData.newRegistrations,
      icon: "add-circle-outline",
      color: COLORS.success,
      change: "+12.5%",
      changeType: "increase",
    },
    {
      title: "Pending Updates",
      value: reportData.pendingUpdates,
      icon: "time-outline",
      color: COLORS.warning,
      change: "-8.3%",
      changeType: "decrease",
    },
  ];

  const demographicBreakdown = [
    {
      category: "Gender Distribution",
      data: [
        {
          label: "Male",
          value: reportData.maleMembers,
          percentage: 49.9,
          color: COLORS.info,
        },
        {
          label: "Female",
          value: reportData.femaleMembers,
          percentage: 50.1,
          color: COLORS.primary,
        },
      ],
    },
    {
      category: "Age Groups",
      data: [
        {
          label: "Children (0-17)",
          value: reportData.children,
          percentage: 22.2,
          color: COLORS.success,
        },
        {
          label: "Adults (18-59)",
          value: reportData.adults,
          percentage: 77.8,
          color: COLORS.warning,
        },
        {
          label: "Seniors (60+)",
          value: reportData.seniors,
          percentage: 10.0,
          color: COLORS.sunset_orange,
        },
      ],
    },
  ];

  const handleGenerateReport = (type: string) => {
    Alert.alert(
      "Generate Report",
      `Generate ${type} report for ${selectedPeriod}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Generate", onPress: () => processReport(type) },
      ]
    );
  };

  const processReport = (type: string) => {
    // Simulate report generation
    Alert.alert(
      "Report Generated",
      `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } report has been generated successfully. You can view it in the downloads section.`,
      [
        { text: "OK" },
        {
          text: "View Report",
          onPress: () =>
            Alert.alert("Coming Soon", "Report viewer will be available soon!"),
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert("Export Data", "Choose export format:", [
      { text: "Cancel", style: "cancel" },
      {
        text: "PDF",
        onPress: () =>
          Alert.alert("Coming Soon", "PDF export will be available soon!"),
      },
      {
        text: "Excel",
        onPress: () =>
          Alert.alert("Coming Soon", "Excel export will be available soon!"),
      },
    ]);
  };

  const renderQuickStat = (stat: any, index: number) => (
    <View
      key={index}
      style={[styles.statCard, { borderLeftColor: stat.color }]}
    >
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: stat.color + "20" }]}>
          <Ionicons name={stat.icon} size={20} color={stat.color} />
        </View>
        <View
          style={[
            styles.changeIndicator,
            {
              backgroundColor:
                stat.changeType === "increase"
                  ? COLORS.success_light
                  : COLORS.error_light,
            },
          ]}
        >
          <Ionicons
            name={
              stat.changeType === "increase" ? "trending-up" : "trending-down"
            }
            size={12}
            color={
              stat.changeType === "increase" ? COLORS.success : COLORS.error
            }
          />
          <Text
            style={[
              styles.changeText,
              {
                color:
                  stat.changeType === "increase"
                    ? COLORS.success
                    : COLORS.error,
              },
            ]}
          >
            {stat.change}
          </Text>
        </View>
      </View>
      <Text style={styles.statValue}>{stat.value.toLocaleString()}</Text>
      <Text style={styles.statTitle}>{stat.title}</Text>
    </View>
  );

  const renderDemographicSection = (section: any, index: number) => (
    <View key={index} style={styles.demographicSection}>
      <Text style={styles.demographicTitle}>{section.category}</Text>
      <View style={styles.demographicData}>
        {section.data.map((item: any, itemIndex: number) => (
          <View key={itemIndex} style={styles.demographicItem}>
            <View style={styles.demographicItemHeader}>
              <View
                style={[
                  styles.demographicColor,
                  { backgroundColor: item.color },
                ]}
              />
              <Text style={styles.demographicLabel}>{item.label}</Text>
              <Text style={styles.demographicPercentage}>
                {item.percentage}%
              </Text>
            </View>
            <View style={styles.demographicBar}>
              <View
                style={[
                  styles.demographicBarFill,
                  { width: `${item.percentage}%`, backgroundColor: item.color },
                ]}
              />
            </View>
            <Text style={styles.demographicValue}>
              {item.value.toLocaleString()} people
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderReportType = (report: any) => (
    <TouchableOpacity
      key={report.id}
      style={styles.reportCard}
      onPress={report.action}
    >
      <View
        style={[styles.reportIcon, { backgroundColor: report.color + "20" }]}
      >
        <Ionicons name={report.icon} size={24} color={report.color} />
      </View>
      <View style={styles.reportContent}>
        <Text style={styles.reportTitle}>{report.title}</Text>
        <Text style={styles.reportDescription}>{report.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Reports & Analytics</Text>
            <Text style={styles.headerSubtitle}>
              Generate comprehensive reports and analyze village data
            </Text>
          </View>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExportData}
          >
            <Ionicons name="download-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Period Selection */}
        <View style={styles.periodContainer}>
          <Text style={styles.sectionTitle}>Report Period</Text>
          <View style={styles.periodButtons}>
            {periodOptions.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.key && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod(period.key)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === period.key &&
                      styles.periodButtonTextActive,
                  ]}
                >
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Statistics */}
        <View style={styles.quickStatsContainer}>
          <Text style={styles.sectionTitle}>Quick Statistics</Text>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => renderQuickStat(stat, index))}
          </View>
        </View>

        {/* Demographics */}
        <View style={styles.demographicsContainer}>
          <Text style={styles.sectionTitle}>Demographics Breakdown</Text>
          {demographicBreakdown.map((section, index) =>
            renderDemographicSection(section, index)
          )}
        </View>

        {/* Report Types */}
        <View style={styles.reportsContainer}>
          <Text style={styles.sectionTitle}>Generate Reports</Text>
          <View style={styles.reportsGrid}>
            {reportTypes.map((report) => renderReportType(report))}
          </View>
        </View>

        {/* Monthly Trends Chart Placeholder */}
        <View style={styles.trendsContainer}>
          <Text style={styles.sectionTitle}>Monthly Trends</Text>
          <View style={styles.chartPlaceholder}>
            <Ionicons
              name="bar-chart-outline"
              size={48}
              color={COLORS.gray_light}
            />
            <Text style={styles.chartPlaceholderText}>
              Interactive charts coming soon
            </Text>
            <Text style={styles.chartPlaceholderSubtext}>
              View registration and update trends over time
            </Text>
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
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  periodContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text_primary,
    marginBottom: 15,
  },
  periodButtons: {
    flexDirection: "row",
    backgroundColor: COLORS.gray_100,
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodButtonText: {
    fontSize: 14,
    color: COLORS.text_secondary,
    fontWeight: "500",
  },
  periodButtonTextActive: {
    color: COLORS.white,
    fontWeight: "600",
  },
  quickStatsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  changeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  changeText: {
    fontSize: 10,
    fontWeight: "600",
    marginLeft: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text_primary,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: COLORS.text_secondary,
  },
  demographicsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  demographicSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  demographicTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text_primary,
    marginBottom: 12,
  },
  demographicData: {
    gap: 12,
  },
  demographicItem: {
    marginBottom: 8,
  },
  demographicItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  demographicColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  demographicLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text_primary,
    fontWeight: "500",
  },
  demographicPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text_primary,
  },
  demographicBar: {
    height: 6,
    backgroundColor: COLORS.gray_200,
    borderRadius: 3,
    marginBottom: 4,
  },
  demographicBarFill: {
    height: 6,
    borderRadius: 3,
  },
  demographicValue: {
    fontSize: 12,
    color: COLORS.text_secondary,
  },
  reportsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  reportsGrid: {
    gap: 12,
  },
  reportCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text_primary,
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 13,
    color: COLORS.text_secondary,
    lineHeight: 18,
  },
  trendsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  chartPlaceholder: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 40,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartPlaceholderText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text_primary,
    marginTop: 12,
    marginBottom: 4,
  },
  chartPlaceholderSubtext: {
    fontSize: 14,
    color: COLORS.text_secondary,
    textAlign: "center",
  },
  footer: {
    height: 20,
  },
});
