import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { Appbar } from "react-native-paper";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {/* <Appbar.Header
          style={[
            {
              position: "static",
              top: 50,
              zIndex: 2,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
          ]}
        >
          <Appbar.Action
            color="#FFFFFF"
            icon="chevron-left"
            size={28}
            onPress={() => {}}
          />
          <Appbar.Content
            color="#FFFFFF"
            style={{
              width: "100%",
              alignItems: "center",
            }}
            title="Event"
          />
          <Appbar.Action
            icon={"dots-horizontal"}
            size={28}
            onPress={() => {}}
            color="#FFFFFF"
          />
        </Appbar.Header> */}
        <Animated.View
          style={[
            styles.header,
            { top: 64, backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 350,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 32,
    top: -30,
    elevation: 4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    gap: 16,
    overflow: "hidden",
  },
});
