import { StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";
import React from "react";
import EventDetailView from "./EventDetailView";

export default function HomeScreen() {
  return (
    <>
      <Appbar.Header
        style={{
          position: "absolute",
          top: 49,
          zIndex: 2,
          width: "100%",
          backgroundColor: "rgba(10, 10, 10, 0.4)",
        }}
      >
        <Appbar.Action
          color="#FFFFFF"
          icon="chevron-left"
          size={28}
          onPress={() => {}}
        />
        <Appbar.Content
          style={{
            width: "100%",
            alignItems: "center",
          }}
          color="#FFFFFF"
          title="Event"
        />
        <Appbar.Action
          color="#FFFFFF"
          icon={"dots-horizontal"}
          size={28}
          onPress={() => {}}
        />
      </Appbar.Header>

      <React.Suspense fallback={<Text>Loading...</Text>}>
        <EventDetailView />
      </React.Suspense>
    </>
  );
}
