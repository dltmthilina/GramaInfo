import DrawerContent from "@/components/custom/DrawerContent";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <DrawerContent {...props} />}></Drawer>
    </GestureHandlerRootView>
  );
}
