import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setProduct } from "../../store/productSlice";

export const ProductItem = ({ navigation, ...product }) => {
  const dispatch = useDispatch();
  const handlePress = useCallback(() => {
    navigation.navigate("Product");
    dispatch(setProduct(product));
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Pressable title="" onPress={handlePress} style={styles.button} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price} Р.</Text>
      <Image
        style={styles.image}
        source={{ uri: product.image_url }}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "700",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginTop: 16,
  },
  price: {
    backgroundColor: "royalblue",
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 32,
  },
});
