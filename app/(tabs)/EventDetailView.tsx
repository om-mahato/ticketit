import { Image, StyleSheet, Platform, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Icon } from "react-native-paper";
import { Link } from "expo-router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  eventDetailsSelector,
  eventDetailsState,
} from "../../recoil/atoms/EventDetails";
import React from "react";

export default function EventDetailView() {
  const eventDetails = useRecoilValue(eventDetailsState);

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/event.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView>
          <ThemedText type="title">{eventDetails?.title || ""}</ThemedText>
          <ThemedText type="defaultSemiBold">
            {eventDetails?.author || ""}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.row}>
          <View style={styles.column}>
            <ThemedText style={{ padding: 5 }} type="subtitle">
              <Icon size={22} source="calendar" />
            </ThemedText>
          </View>
          <View style={styles.column}>
            <ThemedText type="subtitle">{eventDetails?.date || ""}</ThemedText>
            <ThemedText type="caption">
              {eventDetails?.duration || ""}
            </ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.row}>
          <View style={styles.column}>
            <ThemedText style={{ padding: 5 }} type="subtitle">
              <Icon size={22} source="map-marker" />
            </ThemedText>
          </View>
          <View style={styles.column}>
            <ThemedText type="subtitle">
              {eventDetails?.address || ""}
            </ThemedText>
            <ThemedText type="caption">Join to see full address</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.row}>
          <View style={styles.column}>
            <ThemedText style={{ padding: 5 }} type="subtitle">
              <Icon size={22} source="ticket-confirmation" />
            </ThemedText>
          </View>
          <View style={styles.column}>
            <ThemedText type="subtitle">
              {eventDetails?.remaningTicket || ""} tickets left
            </ThemedText>
            <ThemedText type="caption">
              {eventDetails?.invitationCount || ""}
            </ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.row}>
          <View style={styles.column}>
            <ThemedText
              style={{
                padding: 5,
                backgroundColor: "#000000",
                borderRadius: 50,
              }}
              type="subtitle"
            >
              <Icon color="#ffffff" size={18} source="currency-usd" />
            </ThemedText>
          </View>
          <View style={styles.column}>
            <ThemedText type="subtitle">
              {" "}
              {eventDetails?.price || ""}
            </ThemedText>
            <ThemedText type="caption"></ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">About this event</ThemedText>
          <ThemedText type="defaultSemiBold">
            {eventDetails?.description || ""}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Find this event</ThemedText>
          <View style={{ height: 100 }}></View>
        </ThemedView>
      </ParallaxScrollView>

      {eventDetails?.purchased === false && (
        <View style={styles.buttonContainer}>
          <Link href="/eventDetails" asChild>
            <Button
              buttonColor="#6C63FF"
              mode="contained"
              onPress={() => console.log("Pressed")}
            >
              Buy Tickets
            </Button>
          </Link>
        </View>
      )}

      {eventDetails?.purchased === true && (
        <View style={styles.buttonContainer2}>
          <Button
            buttonColor="#6C63FF"
            mode="contained"
            icon="ticket-confirmation"
            style={{ width: "45%", marginRight: 10 }}
            onPress={() => console.log("Pressed")}
          >
            My tickets
          </Button>
          <Button
            textColor="#6C63FF"
            mode="outlined"
            icon="share"
            style={{ width: "45%", marginLeft: 10 }}
            onPress={() => console.log("Pressed")}
          >
            Share event
          </Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 350,
    width: 393,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  buttonContainer: {
    padding: 15,
    elevation: 10,
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  buttonContainer2: {
    flexDirection: "row",
    padding: 15,
    elevation: 10,
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
