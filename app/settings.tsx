import COLORS from "@/constants/Colors";
import { cacheDurationOptions, fontSizeOptions, languageOptions, sessionTimeoutOptions, syncFrequencyOptions, themeOptions } from "@/constants/const";
import { optionsMap } from "@/utils/maps";
import { ModalsState, Settings } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();

  // Settings state
  const [settings, setSettings] = useState<Settings>({
    // Notification Settings
    pushNotifications: true,
    smsAlerts: false,
    emailNotifications: true,
    dataUpdateAlerts: true,
    systemMaintenanceAlerts: true,

    // Data & Sync Settings
    autoSync: true,
    syncFrequency: "daily", // hourly, daily, weekly, manual
    offlineMode: false,
    dataBackup: true,

    // Privacy & Security
    biometricLock: false,
    sessionTimeout: "30", // minutes
    dataEncryption: true,

    // App Preferences
    language: "en", // en, si, ta
    theme: "light", // light, dark, system
    fontSize: "medium", // small, medium, large

    // Data Management
    cacheDuration: "7", // days
    lowStorageWarning: true,
  });

  const [modals, setModals] = useState<ModalsState>({
    syncFrequency: false,
    sessionTimeout: false,
    language: false,
    theme: false,
    fontSize: false,
    cacheDuration: false,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleModal = (modalKey: keyof ModalsState) => {
    setModals((prev) => ({ ...prev, [modalKey]: !prev[modalKey] }));
  };

  const handleDataExport = () => {
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

  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "This will clear all cached data. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            // Implement cache clearing logic
            Alert.alert("Success", "Cache cleared successfully!");
          },
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      "Reset Settings",
      "This will reset all settings to default values. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            // Reset to default settings
            Alert.alert("Success", "Settings reset to default!");
          },
        },
      ]
    );
  };

  const renderSwitchSetting = (
    title: string,
    subtitle: string,
    key: string,
    icon: string
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={20} color={COLORS.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={typeof settings[key as keyof Settings] === "boolean" ? settings[key as keyof Settings] as boolean : false}
        onValueChange={(value) => updateSetting(key, value)}
        trackColor={{ false: COLORS.gray_200, true: COLORS.primary_100 }}
        thumbColor={settings[key as keyof Settings] ? COLORS.primary : COLORS.gray}
      />
    </View>
  );

  const renderPickerSetting = (
    title: string,
    subtitle: string,
    key: string,
    icon: string,
    modalKey: string
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => toggleModal(modalKey as keyof ModalsState)}
    >
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={20} color={COLORS.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.settingValueContainer}>
        <Text style={styles.settingValue}>
          {getDisplayValue(key as keyof typeof optionsMap, String(settings[key as keyof Settings]))}
        </Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
      </View>
    </TouchableOpacity>
  );

  const renderActionSetting = (
    title: string,
    subtitle: string,
    icon: string,
    onPress: () => void,
    color = COLORS.primary
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color }]}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
    </TouchableOpacity>
  );

  const getDisplayValue = (key: keyof typeof optionsMap, value: string) => {
    const options = optionsMap[key];
    const option = options?.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const renderModal = (
    modalKey: string,
    title: string,
    options: any[],
    settingKey: string
  ) => (
    <Modal
      visible={modals[modalKey as keyof ModalsState]}
      transparent
      animationType="slide"
      onRequestClose={() => toggleModal(modalKey as keyof ModalsState)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={() => toggleModal(modalKey as keyof ModalsState)}>
              <Ionicons name="close" size={24} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.modalOption,
                  settings[settingKey as keyof Settings] === option.value &&
                    styles.modalOptionSelected,
                ]}
                onPress={() => {
                  updateSetting(settingKey, option.value);
                  toggleModal(modalKey as keyof ModalsState);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    settings[settingKey as keyof Settings] === option.value &&
                      styles.modalOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {settings[settingKey as keyof Settings] === option.value && (
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
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>
                Customize your app preferences
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Notification Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            {renderSwitchSetting(
              "Push Notifications",
              "Receive push notifications for updates",
              "pushNotifications",
              "notifications-outline"
            )}
            {renderSwitchSetting(
              "SMS Alerts",
              "Receive SMS notifications for critical updates",
              "smsAlerts",
              "chatbubble-outline"
            )}
            {renderSwitchSetting(
              "Email Notifications",
              "Receive email notifications for reports",
              "emailNotifications",
              "mail-outline"
            )}
            {renderSwitchSetting(
              "Data Update Alerts",
              "Get notified when family data is updated",
              "dataUpdateAlerts",
              "refresh-outline"
            )}
          </View>

          {/* Data & Sync Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data & Sync</Text>
            {renderSwitchSetting(
              "Auto Sync",
              "Automatically sync data with server",
              "autoSync",
              "sync-outline"
            )}
            {renderPickerSetting(
              "Sync Frequency",
              "How often to sync data automatically",
              "syncFrequency",
              "time-outline",
              "syncFrequency"
            )}
            {renderSwitchSetting(
              "Offline Mode",
              "Allow app to work without internet",
              "offlineMode",
              "cloud-offline-outline"
            )}
            {renderSwitchSetting(
              "Data Backup",
              "Automatically backup data to cloud",
              "dataBackup",
              "cloud-upload-outline"
            )}
          </View>

          {/* Privacy & Security */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy & Security</Text>
            {renderSwitchSetting(
              "Biometric Lock",
              "Use fingerprint or face unlock",
              "biometricLock",
              "finger-print-outline"
            )}
            {renderPickerSetting(
              "Session Timeout",
              "Auto-lock after inactivity",
              "sessionTimeout",
              "lock-closed-outline",
              "sessionTimeout"
            )}
            {renderSwitchSetting(
              "Data Encryption",
              "Encrypt sensitive data",
              "dataEncryption",
              "shield-checkmark-outline"
            )}
          </View>

          {/* App Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Preferences</Text>
            {renderPickerSetting(
              "Language",
              "Select app language",
              "language",
              "language-outline",
              "language"
            )}
            {renderPickerSetting(
              "Theme",
              "Choose app appearance",
              "theme",
              "color-palette-outline",
              "theme"
            )}
            {renderPickerSetting(
              "Font Size",
              "Adjust text size",
              "fontSize",
              "text-outline",
              "fontSize"
            )}
          </View>

          {/* Data Management */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Management</Text>
            {renderPickerSetting(
              "Cache Duration",
              "How long to keep cached data",
              "cacheDuration",
              "archive-outline",
              "cacheDuration"
            )}
            {renderSwitchSetting(
              "Low Storage Warning",
              "Warn when storage is low",
              "lowStorageWarning",
              "warning-outline"
            )}
            {renderActionSetting(
              "Export Data",
              "Export village data to file",
              "download-outline",
              handleDataExport
            )}
            {renderActionSetting(
              "Clear Cache",
              "Clear all cached data",
              "trash-outline",
              handleClearCache,
              COLORS.warning
            )}
          </View>

          {/* Advanced Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Advanced</Text>
            {renderActionSetting(
              "Reset Settings",
              "Reset all settings to default",
              "refresh-circle-outline",
              handleResetSettings,
              COLORS.error
            )}
          </View>

          {/* App Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>App Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Build</Text>
              <Text style={styles.infoValue}>2024.12.001</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Developer</Text>
              <Text style={styles.infoValue}>Digital Sri Lanka Initiative</Text>
            </View>
          </View>
        </ScrollView>

        {/* Modals */}
        {renderModal(
          "syncFrequency",
          "Sync Frequency",
          syncFrequencyOptions,
          "syncFrequency"
        )}
        {renderModal(
          "sessionTimeout",
          "Session Timeout",
          sessionTimeoutOptions,
          "sessionTimeout"
        )}
        {renderModal("language", "Language", languageOptions, "language")}
        {renderModal("theme", "Theme", themeOptions, "theme")}
        {renderModal("fontSize", "Font Size", fontSizeOptions, "fontSize")}
        {renderModal(
          "cacheDuration",
          "Cache Duration",
          cacheDurationOptions,
          "cacheDuration"
        )}
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
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTextContainer: {
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text_primary,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary_50,
    paddingBottom: 5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 8,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary_50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text_primary,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: COLORS.text_secondary,
  },
  settingValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    fontSize: 14,
    color: COLORS.text_primary,
    marginRight: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.text_secondary,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text_primary,
    fontWeight: "500",
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
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalOptionSelected: {
    backgroundColor: COLORS.primary_50,
  },
  modalOptionText: {
    fontSize: 16,
    color: COLORS.text_primary,
  },
  modalOptionTextSelected: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
