import COLORS from "@/constants/Colors";
import { registerUser } from "@/service/authService";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
// import { useAuth } from "@/context/AuthContext"; // if using auth context

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  villageCode: Yup.string().required("Village code is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegisterScreen() {
  const router = useRouter();
  // const { setUser } = useAuth();

  const handleRegister = async (values: any) => {
    const { email, password, name, villageCode } = values;
    try {
      const user = await registerUser(email, password, name, villageCode, "resident");
      if (user) {
        Alert.alert(
          "Success", 
          "Registration successful!",
          [
            {
              text: "OK",
              onPress: () => router.replace('/'), // Navigate to home
            }
          ]
        );
      }
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register with GramaInfo!!</Text>

      <Formik
        initialValues={{ name: "", email: "", password: "", role: "member", villageCode: "" }}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Village Code"
              placeholderTextColor={COLORS.black}
              onChangeText={handleChange("villageCode")}
              value={values.villageCode}
            />
            {touched.villageCode && errors.villageCode && (
              <Text style={styles.errorText}>{errors.villageCode}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={COLORS.black}
              onChangeText={handleChange("name")}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLORS.black}
              onChangeText={handleChange("email")}
              value={values.email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.black}
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

           {/*  <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={values.role}
                onValueChange={(itemValue) => setFieldValue("role", itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Officer (Admin)" value="admin" />
                <Picker.Item label="Resident (Member)" value="member" />
              </Picker>
            </View> */}

            <Pressable style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </>
        )}
      </Formik>

      <Text style={styles.switchText}>
        Already have an account?{" "}
        <Text style={styles.linkText} onPress={() => router.push("/signin")}>
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.primary_50,
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    fontSize: 16,
    color: COLORS.black,
  },
  pickerWrapper: {
    backgroundColor: COLORS.primary_50,
    borderRadius: 10,
    marginBottom: 16,
  },
  picker: {
    padding: 14,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.secondary,
    fontWeight: "600",
    fontSize: 16,
  },
  switchText: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.primary,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13,
  },
});
