import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={{
          flexDirection: "row",
          width: "100%",
          flex: 1,
          minWidth: 112,
          minHeight: 56, // min-h-14
          marginTop: 16, // mt-4
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 9999, // rounded-full
          overflow: "hidden",
        }}
      >
        <Image
          source={icon}
          tintColor="#151312"
          style={{ width: 20, height: 20 }} // size-5
        />
        <Text
          style={{
            color: "#151312", // replace 'text-secondary' with your hex
            fontSize: 16, // text-base
            fontWeight: "600", // font-semibold
            marginLeft: 8, // ml-2
          }}
        >
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16, // mt-4
        borderRadius: 9999,
      }}
    >
      <Image
        source={icon}
        tintColor="#A8B5DB"
        style={{ width: 20, height: 20 }} // size-5
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Save",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Save" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
