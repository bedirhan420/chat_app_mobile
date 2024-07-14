import {
  QuerySnapshot,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { auth, db } from "../firebase";
import GlobalContext from "../context/Context";
import ContactsFloatingIcons from "../components/ContactsFloatingIcon";
import LisItem from "../components/ListItem";

export default function Chats() {
  const { currentUser } = auth;
  const { rooms, setRooms ,setUnfilteredRooms} = useContext(GlobalContext);
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participiantsArray", "array-contains", currentUser.email)
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      console.log("Dinleyici tetiklendi");
      const parsedChats = querySnapshot.docs.map((doc) => {
        console.log("Belge alındı:", doc.data());
        return {
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .participants.find((p) => p.phoneNumber === currentUser.phoneNumber),
        };
      });
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
  
    return () => unsubscribe();
  }, []);
  
  function getUserB(user, contacts) {
    const useContact = contacts.find((c) => c.phoneNumber === user.phoneNumber);
    if (useContact && useContact.contactName) {
      return { ...user, contactName: useContact.contactName };
    }
    return user;
  }
  return (
    <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
      {rooms.map((room) => (
        <LisItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        />
      ))}
      <ContactsFloatingIcons />
    </View>
  );
}
