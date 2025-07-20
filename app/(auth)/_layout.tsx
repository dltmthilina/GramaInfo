import COLORS from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.text_inverse,
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Stack.Screen
        name="signin"
        options={{
          title: "Sign In",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
