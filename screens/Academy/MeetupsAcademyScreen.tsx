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

const EVENTS = [
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
  const [collapsed, setCollapsed] = React.useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  });

  const EventCard = (event: any) => (
    <View style={styles.eventCardContainer}>
      <Text style={styles.textEventCard}>{event.event.title}</Text>
      <Text style={styles.textEventCard}>12:00 AM</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
        <View style={styles.dayContainer}>
          <TouchableOpacity
            onPress={() => {
              setCollapsed({ ...collapsed, mon: !collapsed.mon });
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Lunes</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed.mon} align="center">
            <View style={styles.content}>
              {EVENTS.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </View>
          </Collapsible>
        </View>
        <View style={styles.dayContainer}>
          <TouchableOpacity
            onPress={() => {
              setCollapsed({ ...collapsed, tue: !collapsed.tue });
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Martes</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed.tue} align="center">
            <View style={styles.content}>
              {EVENTS.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </View>
          </Collapsible>
        </View>
        <View style={styles.dayContainer}>
          <TouchableOpacity
            onPress={() => {
              setCollapsed({ ...collapsed, wed: !collapsed.wed });
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Miercoles</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed.wed} align="center">
            <View style={styles.content}>
              {EVENTS.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </View>
          </Collapsible>
        </View>
        <View style={styles.dayContainer}>
          <TouchableOpacity
            onPress={() => {
              setCollapsed({ ...collapsed, thu: !collapsed.thu });
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Jueves</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed.thu} align="center">
            <View style={styles.content}>
              {EVENTS.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </View>
          </Collapsible>
        </View>
        <View style={styles.dayContainer}>
          <TouchableOpacity
            onPress={() => {
              setCollapsed({ ...collapsed, fri: !collapsed.fri });
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Viernes</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed.fri} align="center">
            <View style={styles.content}>
              {EVENTS.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </View>
          </Collapsible>
        </View>
        <View style={styles.dayContainer}>
          <TouchableOpacity
            onPress={() => {
              setCollapsed({ ...collapsed, sat: !collapsed.sat });
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Sabado</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed.sat} align="center">
            <View style={styles.content}>
              {EVENTS.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </View>
          </Collapsible>
        </View>
        <View style={styles.dayContainer}>
          <TouchableOpacity
            onPress={() => {
              setCollapsed({ ...collapsed, sun: !collapsed.sun });
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Domingo</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed.sun} align="center">
            <View style={styles.content}>
              {EVENTS.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </View>
          </Collapsible>
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
    borderColor: "#000",
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
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
