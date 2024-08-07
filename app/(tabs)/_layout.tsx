import { Stack } from "expo-router";

export default function EventDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: "Event",
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="eventDetails" options={{}} /> */}
    </Stack>
  );
}
