import COLORS from "@/constants/Colors";
import { familyTypes, housingTypes } from "@/constants/const";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView, KeyboardTypeOptions, Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function AddFamilyScreen() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    headOfFamily: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    nicNumber: "",
    occupation: "",
    monthlyIncome: "",
    familyType: "nuclear", // nuclear, extended, single_parent
    housingType: "owned", // owned, rented, shared, government
    numberOfMembers: "1",
    emergencyContact: "",
    emergencyPhone: "",
    notes: "",
  });

  type FormErrors = {
    headOfFamily?: string;
    address?: string;
    phoneNumber?: string;
    emailAddress?: string;
    nicNumber?: string;
    occupation?: string;
    monthlyIncome?: string;
    familyType?: string;
    housingType?: string;
    numberOfMembers?: string;
    emergencyContact?: string;
    emergencyPhone?: string;
    notes?: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

 

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.headOfFamily.trim()) {
      newErrors.headOfFamily = "Head of family name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+94\s?\d{2}\s?\d{3}\s?\d{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Please enter a valid Sri Lankan phone number (+94 XX XXX XXXX)";
    }

    if (!formData.nicNumber.trim()) {
      newErrors.nicNumber = "NIC number is required";
    } else if (
      !/^(\d{9}[vVxX]|\d{12})$/.test(formData.nicNumber.replace(/\s/g, ""))
    ) {
      newErrors.nicNumber = "Please enter a valid NIC number";
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = "Occupation is required";
    }

    if (formData.numberOfMembers && parseInt(formData.numberOfMembers) < 1) {
      newErrors.numberOfMembers = "Number of members must be at least 1";
    }

    if (formData.emailAddress && !/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fix the errors and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate a unique family ID
      const familyId = `FAM${Date.now().toString().slice(-6)}`;

      // Prepare the family data
      const familyData = {
        ...formData,
        familyId,
        status: "active",
        category: getCategoryFromMembers(parseInt(formData.numberOfMembers)),
        registeredDate: new Date().toISOString().split("T")[0],
        lastUpdated: new Date().toISOString().split("T")[0],
        registeredBy: "current_user", // Replace with actual user ID
      };

      // TODO: Save to Firebase
      console.log("Family data to save:", familyData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Success",
        `Family registered successfully!\nFamily ID: ${familyId}`,
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error("Error saving family:", error);
      Alert.alert("Error", "Failed to register family. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryFromMembers = (members: number) => {
    if (members <= 2) return "small";
    if (members <= 5) return "standard";
    return "large";
  };

  type InputOptions = {
    required?: boolean;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    multiline?: boolean;
    numberOfLines?: number;
    maxLength?: number;
  };

  const renderInput = (
    label: string,
    field: keyof typeof formData,
    options: InputOptions = {}
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label}
        {options.required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.textInput,
          errors[field] && styles.inputError,
          options.multiline && styles.textAreaInput,
        ]}
        value={formData[field]}
        onChangeText={(value) => updateFormData(field, value)}
        placeholder={options.placeholder || `Enter ${label.toLowerCase()}`}
        placeholderTextColor={COLORS.input_placeholder}
        keyboardType={options.keyboardType || "default"}
        multiline={options.multiline || false}
        numberOfLines={options.numberOfLines || 1}
        maxLength={options.maxLength}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  const renderPicker = (label: string, field: keyof typeof formData, options: { label: string; value: string }[], required = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <View
        style={[styles.pickerContainer, errors[field] && styles.inputError]}
      >
        <Picker
          selectedValue={formData[field]}
          onValueChange={(value) => updateFormData(field, value)}
          style={styles.picker}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

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
            <Text style={styles.headerTitle}>Add New Family</Text>
            <Text style={styles.headerSubtitle}>
              Register a new family in your village
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Basic Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          {renderInput("Head of Family", "headOfFamily", {
            required: true,
            placeholder: "Enter full name of family head",
          })}

          {renderInput("NIC Number", "nicNumber", {
            required: true,
            placeholder: "Enter NIC number (e.g., 123456789V)",
            maxLength: 12,
          })}

          {renderInput("Phone Number", "phoneNumber", {
            required: true,
            placeholder: "+94 77 123 4567",
            keyboardType: "phone-pad",
          })}

          {renderInput("Email Address", "emailAddress", {
            placeholder: "Enter email address (optional)",
            keyboardType: "email-address",
          })}

          {renderInput("Occupation", "occupation", {
            required: true,
            placeholder: "Enter primary occupation",
          })}

          {renderInput("Monthly Income (LKR)", "monthlyIncome", {
            placeholder: "Enter monthly household income",
            keyboardType: "numeric",
          })}
        </View>

        {/* Address Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Information</Text>

          {renderInput("Full Address", "address", {
            required: true,
            placeholder: "Enter complete address with house number and street",
            multiline: true,
            numberOfLines: 3,
          })}
        </View>

        {/* Family Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Details</Text>

          {renderInput("Number of Family Members", "numberOfMembers", {
            required: true,
            placeholder: "Enter total number of family members",
            keyboardType: "numeric",
          })}

          {renderPicker("Family Type", "familyType", familyTypes, true)}

          {renderPicker("Housing Type", "housingType", housingTypes, true)}
        </View>

        {/* Emergency Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>

          {renderInput("Emergency Contact Name", "emergencyContact", {
            placeholder: "Enter emergency contact person name",
          })}

          {renderInput("Emergency Contact Phone", "emergencyPhone", {
            placeholder: "+94 77 123 4567",
            keyboardType: "phone-pad",
          })}
        </View>

        {/* Additional Notes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>

          {renderInput("Notes", "notes", {
            placeholder: "Enter any additional notes or special circumstances",
            multiline: true,
            numberOfLines: 4,
          })}
        </View>

        {/* Submit Button */}
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Text style={styles.submitButtonText}>Registering...</Text>
            ) : (
              <>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={COLORS.white}
                />
                <Text style={styles.submitButtonText}>Register Family</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={isSubmitting}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingBottom: 30,
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text_primary,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  textInput: {
    backgroundColor: COLORS.input_background,
    borderWidth: 1,
    borderColor: COLORS.input_border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text_primary,
  },
  textAreaInput: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerContainer: {
    backgroundColor: COLORS.input_background,
    borderWidth: 1,
    borderColor: COLORS.input_border,
    borderRadius: 12,
  },
  picker: {
    color: COLORS.text_primary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  submitContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.7,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  cancelButtonText: {
    color: COLORS.text_secondary,
    fontSize: 16,
    fontWeight: "500",
  },
});
