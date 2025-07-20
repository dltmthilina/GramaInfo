import { useAuth } from "@/context/auth_context/AuthContext";
import { loginUser } from "@/service/authService";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import COLORS from "../../constants/Colors";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { setUser } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const user = await loginUser(email, password);

      if (user) {
        setUser(user);
        router.replace('/'); // Navigate to the main tabs screen
      }
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Failed",
        error.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.title}>Welcome to GramaInfo!!</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.input_placeholder}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.input_placeholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing In..." : "Login"}
        </Text>
      </Pressable>

      <Text style={styles.switchText}>
        Don't have an account?{" "}
        <Text style={styles.linkText} onPress={() => router.push("/register")}>
          Register
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.input_background,
    borderWidth: 1,
    borderColor: COLORS.input_border,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.text_primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: COLORS.button_disabled,
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.text_inverse,
    fontWeight: "600",
    fontSize: 16,
  },
  switchText: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.text_secondary,
    fontSize: 14,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
