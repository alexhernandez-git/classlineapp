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
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import API_URL from "../../constants/API_URL";
import { fetchMeetups } from "../../store/actions/meetups";

const Meetups = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state: any) => state.authReducer);

  const meetupsReducer = useSelector((state: any) => state.meetupsReducer);
  React.useEffect(() => {
    dispatch(fetchMeetups());
  }, []);
  const [modalMeetup, setModalMeetup] = React.useState<any>(null);
  React.useEffect(() => {
    console.log("modalMeetup", modalMeetup);
  }, [modalMeetup]);
  const [meetups, setMeetups] = React.useState([
    {
      id: 1,
      title: "Lunes",
      events: [],
    },
    {
      id: 2,

      title: "Martes",
      events: [],
    },
    {
      id: 3,

      title: "Miercoles",
      events: [],
    },
    {
      id: 4,

      title: "Jueves",
      events: [],
    },
    {
      id: 5,

      title: "Viernes",
      events: [],
    },
    {
      id: 6,

      title: "Sabado",
      events: [],
    },
    {
      id: 7,
      title: "Domingo",
      events: [],
    },
  ]);
  React.useEffect(() => {
    if (!meetupsReducer.isLoading && meetupsReducer.meetups) {
      console.log(meetupsReducer.meetups);

      setMeetups([
        {
          id: 1,
          title: "Lunes",
          events: meetupsReducer.meetups.filter(
            (meetup: any) => new Date(meetup.start).getDay() == 0
          ),
        },
        {
          id: 2,

          title: "Martes",
          events: meetupsReducer.meetups.filter(
            (meetup: any) => new Date(meetup.start).getDay() == 1
          ),
        },
        {
          id: 3,

          title: "Miercoles",
          events: meetupsReducer.meetups.filter(
            (meetup: any) => new Date(meetup.start).getDay() == 2
          ),
        },
        {
          id: 4,

          title: "Jueves",
          events: meetupsReducer.meetups.filter(
            (meetup: any) => new Date(meetup.start).getDay() == 3
          ),
        },
        {
          id: 5,

          title: "Viernes",
          events: meetupsReducer.meetups.filter(
            (meetup: any) => new Date(meetup.start).getDay() == 4
          ),
        },
        {
          id: 6,

          title: "Sabado",
          events: meetupsReducer.meetups.filter(
            (meetup: any) => new Date(meetup.start).getDay() == 5
          ),
        },
        {
          id: 7,
          title: "Domingo",
          events: meetupsReducer.meetups.filter(
            (meetup: any) => new Date(meetup.start).getDay() == 6
          ),
        },
      ]);
    }
  }, [meetupsReducer.isLoading]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [activeSections, setActiveSections] = React.useState([]);

  const setSections = (sections: any) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const EventCard = (event: any) => (
    <TouchableHighlight
      style={{
        ...styles.eventCardContainer,
        backgroundColor: event.event.backgroundColor,
      }}
      activeOpacity={0.9}
      onPress={() => {
        setModalMeetup(event.event);
        setModalVisible(true);
      }}
    >
      <View>
        <Text style={styles.textEventCard}>{event.event.title}</Text>
        <Text style={styles.textEventCard}>
          {moment(event.event.start).format("hh:mm A")}
        </Text>
      </View>
    </TouchableHighlight>
  );
  const renderHeader = (section: any) => {
    return (
      <LinearGradient
        colors={["#2e6a89", "#56b389"]}
        start={[0, 1]}
        style={styles.header}
        end={[1, 0]}
      >
        <Text style={styles.headerText}>{section.title}</Text>
        <Text style={styles.headerEvents}>{section.events.length} eventos</Text>
      </LinearGradient>
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
            sections={meetups}
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
            <Text style={styles.modalTitle}>
              {modalMeetup && modalMeetup.title}
            </Text>
            <Text style={styles.modalText}>
              {modalMeetup && modalMeetup.description}
            </Text>
            <View>
              {modalMeetup && modalMeetup.videoconference ? (
                <TouchableWithoutFeedback
                  onPress={() => Linking.openURL(modalMeetup.videoconference)}
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
              ) : (
                <Text style={{ marginBottom: 15 }}>
                  No hay videoconferencia
                </Text>
              )}
            </View>
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
    color: "#fff",
  },
  headerEvents: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",

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
    padding: 10,
    marginVertical: 5,
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
