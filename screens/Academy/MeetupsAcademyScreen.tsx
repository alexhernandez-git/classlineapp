import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Collapsible from "react-native-collapsible";
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
  const [activeSections, setActiveSections] = React.useState([]);

  const setSections = (sections: any) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const EventCard = (event: any) => (
    <View style={styles.eventCardContainer}>
      <Text style={styles.textEventCard}>{event.event.title}</Text>
      <Text style={styles.textEventCard}>12:00 AM</Text>
    </View>
  );
  const renderHeader = (section: any) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
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
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    padding: 10,
    backgroundColor: "#fff",
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  textEventCard: {
    textAlign: "center",
    color: "#fff",
  },
});

export default Meetups;
