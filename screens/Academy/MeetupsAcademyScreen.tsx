import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import Collapsible from "react-native-collapsible";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";

import Accordion from "react-native-collapsible/Accordion";
const EVENTS = [
  {
    id: 1,
    title: "Lunes",
    events: [
      {
        id: 1,
        title: "Clase de Yoga por zoom",
      },
      {
        id: 2,
        title: "Clase de fitness por zoom",
      },
      {
        id: 3,
        title: "Clase de zumba por zoom",
      },
      {
        id: 4,
        title: "Clase de Meditación por zoom",
      },
      {
        id: 5,
        title: "Clase de Yoga por zoom",
      },
    ],
  },
  {
    id: 2,

    title: "Martes",
    events: [
      {
        id: 1,
        title: "Clase de Yoga por zoom",
      },
      {
        id: 2,
        title: "Clase de fitness por zoom",
      },
      {
        id: 3,
        title: "Clase de zumba por zoom",
      },
      {
        id: 4,
        title: "Clase de Meditación por zoom",
      },
      {
        id: 5,
        title: "Clase de Yoga por zoom",
      },
    ],
  },
  {
    id: 3,

    title: "Miercoles",
    events: [
      {
        id: 1,
        title: "Clase de Yoga por zoom",
      },
      {
        id: 2,
        title: "Clase de fitness por zoom",
      },
      {
        id: 3,
        title: "Clase de zumba por zoom",
      },
      {
        id: 4,
        title: "Clase de Meditación por zoom",
      },
      {
        id: 5,
        title: "Clase de Yoga por zoom",
      },
    ],
  },
  {
    id: 4,

    title: "Jueves",
    events: [
      {
        id: 1,
        title: "Clase de Yoga por zoom",
      },
      {
        id: 2,
        title: "Clase de fitness por zoom",
      },
      {
        id: 3,
        title: "Clase de zumba por zoom",
      },
      {
        id: 4,
        title: "Clase de Meditación por zoom",
      },
      {
        id: 5,
        title: "Clase de Yoga por zoom",
      },
    ],
  },
  {
    id: 5,

    title: "Viernes",
    events: [
      {
        id: 1,
        title: "Clase de Yoga por zoom",
      },
      {
        id: 2,
        title: "Clase de fitness por zoom",
      },
      {
        id: 3,
        title: "Clase de zumba por zoom",
      },
      {
        id: 4,
        title: "Clase de Meditación por zoom",
      },
      {
        id: 5,
        title: "Clase de Yoga por zoom",
      },
    ],
  },
  {
    id: 6,

    title: "Sabado",
    events: [
      {
        id: 1,
        title: "Clase de Yoga por zoom",
      },
      {
        id: 2,
        title: "Clase de fitness por zoom",
      },
      {
        id: 3,
        title: "Clase de zumba por zoom",
      },
      {
        id: 4,
        title: "Clase de Meditación por zoom",
      },
      {
        id: 5,
        title: "Clase de Yoga por zoom",
      },
    ],
  },
  {
    id: 7,
    title: "Domingo",
    events: [
      {
        id: 1,
        title: "Clase de Yoga por zoom",
      },
      {
        id: 2,
        title: "Clase de fitness por zoom",
      },
      {
        id: 3,
        title: "Clase de zumba por zoom",
      },
      {
        id: 4,
        title: "Clase de Meditación por zoom",
      },
      {
        id: 5,
        title: "Clase de Yoga por zoom",
      },
    ],
  },
];
const SELECTORS = [
  {
    title: "First",
    value: 0,
  },
  {
    title: "Third",
    value: 2,
  },
  {
    title: "None",
  },
];
const Meetups = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [activeSections, setActiveSections] = React.useState([]);

  const setSections = (sections: any) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const EventCard = (event: any) => (
    <TouchableHighlight
      style={styles.eventCardContainer}
      activeOpacity={0.9}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <View>
        <Text style={styles.textEventCard}>{event.event.title}</Text>
        <Text style={styles.textEventCard}>12:00 AM</Text>
      </View>
    </TouchableHighlight>
  );
  const renderHeader = (section: any) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
        <Text style={styles.headerEvents}>4 eventos</Text>
      </View>
    );
  };
  const renderContent = (section: any) => (
    <View style={styles.content}>
      {section.events.map((event: any) => (
        <EventCard key={event.id} event={event} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
        <View style={styles.dayContainer}>
          <Accordion
            activeSections={activeSections}
            sections={EVENTS}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Clase de Yoga en zoom</Text>
            <Text style={styles.modalText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
              delectus veniam natus quod. Iste ad officia fugit nemo? Incidunt
              possimus fugiat ipsam asperiores nihil voluptatem excepturi
            </Text>
            <TouchableWithoutFeedback
              onPress={() =>
                Linking.openURL(
                  "https://us04web.zoom.us/j/75171386719?pwd=dy9JdUxoWXhkbGhwM21SdkpBZlN3dz09"
                )
              }
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#2e6a89", "#56b389"]}
                start={[0, 1]}
                end={[1, 0]}
                style={styles.modalLink}
              >
                <Text
                  style={{
                    backgroundColor: "transparent",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  IR AL ENLACE
                </Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  dayContainer: {
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  headerEvents: {
    textAlign: "center",
    fontSize: 14,

    fontWeight: "500",
  },
  content: {
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
  },
  eventCardContainer: {
    backgroundColor: "#1d2077",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  textEventCard: {
    textAlign: "center",
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: Dimensions.get("window").width - 20,
    // height: Dimensions.get("window").height / 2,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#000",
    borderRadius: 20,
    width: Dimensions.get("window").width - 60,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalLink: {
    marginBottom: 15,
    textDecorationLine: "underline",
    textAlign: "center",
    backgroundColor: "#F194FF",
    color: "#FFF",
    fontWeight: "bold",
    borderRadius: 20,
    width: Dimensions.get("window").width - 60,
    padding: 10,
    elevation: 2,
  },
});

export default Meetups;
