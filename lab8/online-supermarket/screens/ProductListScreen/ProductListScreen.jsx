import { View, Dimensions, ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setProductList } from "../../store/productSlice";
import { ProductItem } from "../../components/ProductItem";
import { axiosInstance } from "../../axios";
import { StyleSheet } from "react-native";

export const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { productList } = useSelector((store) => store.product);

  useEffect(() => {
    async function getAllProducts() {
      await axiosInstance
        .get("/product")
        .then((response) => dispatch(setProductList(response?.data)));
    }
    if (!productList.length) getAllProducts();
  }, [dispatch, productList]);

  const productItems = useMemo(
    () =>
      productList.map((product) => (
        <ProductItem key={product.id} navigation={navigation} {...product} />
      )),
    [productList]
  );

  return (
    <ScrollView>
      <View style={styles.container}>{productItems}</View>
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
