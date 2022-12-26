import { View, Dimensions, ScrollView, Button, Alert } from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setProductList, setProduct } from "../../store/productSlice";
import { ProductItem } from "../../components/ProductItem";
import { axiosInstance } from "../../axios";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

export const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { productList, product } = useSelector((store) => store.product);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getAllProducts() {
      await axiosInstance
        .get("/product")
        .then((response) => dispatch(setProductList(response?.data)));
    }
    if (isFocused) getAllProducts();
  }, [dispatch, isFocused, product]);

  const productItems = useMemo(
    () =>
      productList.map((product) => (
        <ProductItem key={product.id} navigation={navigation} {...product} />
      )),
    [productList, navigation]
  );

  const handleAddPress = useCallback(() => {
    dispatch(setProduct(undefined));
    navigation.navigate("Product", { isCreate: true });
  }, [navigation, dispatch]);

  return (
    <ScrollView>
      <View style={styles.container}>{productItems}</View>
      <Button title="Создать" onPress={handleAddPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e0e5ff",
    padding: 12,
    minHeight: Dimensions.get("window").height,
  },
});
