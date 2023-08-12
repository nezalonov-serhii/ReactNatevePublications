import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

export const MapScreen = ({ route }) => {
   const [isMapReady, setIsMapReady] = useState(false);

   const onMapLayout = () => {
      setIsMapReady(true);
   };

   const { location, title } = route.params;

   return (
      <View style={styles.container}>
         <MapView
            style={{ flex: 1 }}
            initialRegion={{
               longitude: location.longitude,
               latitude: location.latitude,
               latitudeDelta: 0.01,
               longitudeDelta: 0.01,
            }}
            onLayout={onMapLayout}
         >
            {isMapReady && (
               <Marker
                  coordinate={{ longitude: location.longitude, latitude: location.latitude }}
                  title={title}
               />
            )}
         </MapView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
   },
});
