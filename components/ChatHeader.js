import React, { useContext } from "react";
import { Text, View } from "react-native";
import Avatar from "./Avatar";
import { useRoute } from "@react-navigation/core";
import GlobalContext from "../context/Context";

export default function ChatHeader() {
  const route = useRoute();
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flexDirection: "row" }}>
        <Avatar size={30} user={route.params.user} />
        <View
          style={{
            marginLeft: 15,
            flexDirection: "column", // Yatay yerine dikey düzen
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.white, fontSize: 18 }}>
            {route.params.user.contactName || route.params.user.displayName}
          </Text>
        </View>
      </View>
    </View>
  );
}
