import { ThemedText } from "@/components/ThemedText";
import { eventDetailsState } from "@/recoil/atoms/EventDetails";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useRecoilState } from "recoil";

const EventDetails = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [student, setStudent] = useState(false);
  const [social, setSocial] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [eventDetails, setEventDetails] = useRecoilState(eventDetailsState);

  const handleNextQuestion = () => {
    if (currentQuestion === 4) {
      setLoading(true);
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Ticket confirmed",
          text2:
            "Now we need to wait for the host to approve you. Once you're approved you'll have access to your ticket.",
        });

        setEventDetails((c) => ({ ...c, purchased: true }));

        setTimeout(() => {
          setLoading(false);
          router.back();
        }, 4000);
      }, 1000);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSocialSelection = (value: string) => {
    if (social.includes(value)) {
      setSocial((v: [string]) => v.filter((i) => i !== value));
      return;
    }
    setSocial((v: [string]) => [...v, value]);
  };

  const validateFields = () => {
    let hasError = false;
    switch (currentQuestion) {
      case 1:
        if (!company || company === "") {
          hasError = true;
        }
        break;

      case 2:
        if (!jobTitle) {
          hasError = true;
        }
        break;

      case 4:
        if (!social.length) {
          hasError = true;
        }
        break;

      default:
        hasError = false;
    }

    return hasError;
  };

  return (
    <View style={{ marginTop: 50, flex: 1, backgroundColor: "#e8e2ff" }}>
      {currentQuestion === 1 && (
        <View style={{ padding: 30 }}>
          <ThemedText
            style={{ color: "#8D86FE", fontWeight: 700, fontSize: 14 }}
            type="caption"
          >
            QUESTION 1 OF 4
          </ThemedText>
          <ThemedText type="subtitle">Company/Organization: </ThemedText>
          <View style={{ paddingTop: 20 }}>
            <TextInput
              label=""
              value={company}
              outlineColor="#e8e2ff"
              activeOutlineColor="#e8e2ff"
              placeholderTextColor="#9f99fea"
              cursorColor="#000000"
              mode="outlined"
              placeholder="Write your answer here"
              style={{ padding: 0, margin: 0, backgroundColor: "#e8e2ff" }}
              onChangeText={(text) => setCompany(text)}
            />
          </View>
        </View>
      )}

      {currentQuestion === 2 && (
        <View style={{ padding: 30 }}>
          <ThemedText type="caption">QUESTION 2 OF 4</ThemedText>
          <ThemedText type="subtitle">Job Title: </ThemedText>
          <View style={{ paddingTop: 20 }}>
            <TextInput
              label=""
              value={jobTitle}
              outlineColor="#e8e2ff"
              activeOutlineColor="#e8e2ff"
              placeholderTextColor="#9f99fea"
              cursorColor="#000000"
              mode="outlined"
              placeholder="Write your answer here"
              style={{ padding: 0, margin: 0, backgroundColor: "#e8e2ff" }}
              onChangeText={(text) => setJobTitle(text)}
            />
          </View>
        </View>
      )}

      {currentQuestion === 3 && (
        <View style={{ padding: 30 }}>
          <ThemedText type="caption">QUESTION 3 OF 4</ThemedText>
          <ThemedText type="subtitle">Are you a current student ?: </ThemedText>
          <View style={{ paddingTop: 20 }}>
            <Button
              style={{ borderRadius: 2, margin: 10 }}
              mode={student ? "contained" : "outlined"}
              onPress={() => setStudent(true)}
            >
              Yes
            </Button>
            <Button
              style={{ borderRadius: 2, marginHorizontal: 10 }}
              mode={student ? "outlined" : "contained"}
              onPress={() => setStudent(false)}
            >
              No
            </Button>
          </View>
        </View>
      )}

      {currentQuestion === 4 && (
        <View style={{ padding: 30 }}>
          <ThemedText type="caption">QUESTION 3 OF 4</ThemedText>
          <ThemedText type="subtitle">Are you a current student ?: </ThemedText>
          <View style={{ paddingTop: 20 }}>
            <Button
              style={{ borderRadius: 2, margin: 10 }}
              mode={social.includes("Linkedin") ? "contained" : "outlined"}
              onPress={() => handleSocialSelection("Linkedin")}
            >
              Linkedin
            </Button>
            <Button
              style={{ borderRadius: 2, marginHorizontal: 10 }}
              mode={social.includes("Instagram") ? "contained" : "outlined"}
              onPress={() => handleSocialSelection("Instagram")}
            >
              Instagram
            </Button>
            <Button
              style={{ borderRadius: 2, margin: 10 }}
              mode={social.includes("Twitter") ? "contained" : "outlined"}
              onPress={() => handleSocialSelection("Twitter")}
            >
              Twitter
            </Button>
            <Button
              style={{ borderRadius: 2, marginHorizontal: 10 }}
              mode={social.includes("Facebook") ? "contained" : "outlined"}
              onPress={() => handleSocialSelection("Facebook")}
            >
              Facebook
            </Button>
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          buttonColor="#6C63FF"
          mode="contained"
          disabled={validateFields() || loading}
          loading={loading}
          onPress={() => handleNextQuestion()}
        >
          {currentQuestion <= 3 ? "Next Question" : "Claim ticket"}
        </Button>
      </View>

      <Toast />
    </View>
  );
};

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
    flexDirection: "column",
    padding: 15,
    elevation: 10,
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default EventDetails;
