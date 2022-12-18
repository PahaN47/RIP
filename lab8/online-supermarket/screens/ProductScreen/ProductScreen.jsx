import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

export const ProductScreen = () => {
  const { product } = useSelector((state) => state.product);
  const ratingStars = useMemo(() => {
    const arr1 = new Array(product?.rating ?? 0).fill(1);
    const arr2 = new Array(5 - (product?.rating ?? 0)).fill(1);
    return (
      <>
        {arr1.map((value, index) => (
          <Image
            key={index}
            source={require("../../assets/star.png")}
            style={styles.star}
            resizeMode="stretch"
          />
        ))}
        {arr2.map((value, index) => (
          <Image
            key={index}
            source={require("../../assets/star.png")}
            style={styles.starGrey}
          />
        ))}
      </>
    );
  }, [product]);

  return (
    <ScrollView>
      <View style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>{product.price} Р.</Text>
          <View style={styles.starContainer}>{ratingStars}</View>
          <Image
            style={styles.image}
            source={{ uri: product.image_url }}
            resizeMode="cover"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e0e5ff",
    padding: 12,
    minHeight: Dimensions.get("window").height,
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 24,
    marginBottom: 20,
    width: "100%",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 24,
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 16,
    marginTop: 24,
  },
  price: {
    backgroundColor: "royalblue",
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 32,
  },
  starContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 24,
  },
  star: {
    width: 40,
    height: 40,
  },
  starGrey: {
    width: 40,
    height: 40,
    opacity: 0.6,
  },
});
