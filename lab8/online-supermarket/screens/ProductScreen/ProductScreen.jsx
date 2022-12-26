import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  TextInput,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  patchProduct,
  postProduct,
} from "../../store/productActions";
import { useNavigation } from "@react-navigation/native";

export const ProductScreen = ({ route }) => {
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [isChange, setIsChange] = useState(!!route?.params?.isCreate);
  const [isCreate, setIsCreate] = useState(!!route?.params?.isCreate);
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [rating, setRating] = useState(product?.rating ?? 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const navigation = useNavigation();

  useEffect(() => {
    if (product) {
      setName(product.name.toString());
      setPrice(product.price);
      setRating(product.rating);
      setImageUrl(product.image_url?.toString());
    }
  }, [product]);

  const handleSavePress = useCallback(() => {
    setIsChange(false);
    if (isCreate) {
      setIsCreate(false);
      dispatch(postProduct({ name, price, rating, image_url: imageUrl }));
    } else if (product)
      dispatch(
        patchProduct({
          id: product.id,
          name,
          price,
          rating,
          image_url: imageUrl,
        })
      );
  }, [dispatch, name, price, rating, imageUrl, product]);

  const handleDeletePress = useCallback(() => {
    if (product) dispatch(deleteProduct(product.id));
    navigation.navigate("ProductList");
  }, [product, dispatch]);

  const ratingStars = useMemo(() => {
    let rating = 0;
    if (product) {
      rating = product.rating < 0 ? 0 : product.rating > 5 ? 5 : product.rating;
    }
    const arr1 = new Array(rating).fill(1);
    const arr2 = new Array(5 - rating).fill(1);
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
          {isChange ? (
            <>
              <TextInput
                style={styles.titleChange}
                placeholder="Название"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.price}
                placeholder="Стоимость"
                value={price}
                keyboardType="numeric"
                onChangeText={(value) => setPrice(value)}
              />
              <TextInput
                style={styles.starContainerChange}
                placeholder="Рейтинг"
                value={rating?.toString()}
                onChangeText={(value) => setRating(value)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.imageChange}
                placeholder="URL изображения"
                value={imageUrl}
                onChangeText={setImageUrl}
              />
              <Button
                title="Сохранить"
                style={styles.changeButton}
                onPress={handleSavePress}
              />
              <Button
                title="   Удалить  "
                style={styles.changeButton}
                onPress={handleDeletePress}
                color="#FF0000"
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.price}>{price} Р.</Text>
              <View style={styles.starContainer}>{ratingStars}</View>
              <Image
                style={styles.image}
                source={imageUrl ? { uri: imageUrl } : undefined}
                resizeMode="cover"
              />
              <Button
                title="Изменить"
                style={styles.changeButton}
                onPress={() => setIsChange(true)}
              />
            </>
          )}
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
    marginBottom: 32,
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
  changeButton: {
    width: 500,
  },
  titleChange: {
    alignSelf: "flex-start",
    fontSize: 24,
    fontWeight: "700",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    padding: 8,
  },
  starContainerChange: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 24,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    padding: 8,
    fontSize: 16,
  },
  imageChange: {
    width: "100%",
    borderRadius: 16,
    marginTop: 24,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    padding: 8,
    marginBottom: 32,
  },
});
