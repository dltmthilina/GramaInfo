import COLORS from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DrawerContentProps {
  navigation: any;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ navigation }) => {
  const router = useRouter();

  /*  const handleLogout = async () => {
    try {
      console.log("logout");
      await logoutUser();
      router.replace("/login");
    } catch (error) {
      Alert.alert("Logout Failed", "Something went wrong. Please try again.");
    }
  }; */

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.menuTitle}>Menu</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/")}
        >
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Text style={styles.menuText}>Services</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    backgroundColor: COLORS.primary,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 20,
  },
  menuItem: {
    marginVertical: 10,
  },
  menuText: {
    fontSize: 18,
    color: COLORS.secondary,
  },
  divider: {
    height: 1,
    // backgroundColor: COLORS.border,
    marginVertical: 20,
    marginRight: 20,
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutText: {
    fontSize: 18,
    //color: COLORS.error,
  },
});
