import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IProduct } from "../../api";

interface IRecieptItemProps {
  item: IProduct;
  handleOpenModal: (item: IProduct) => void;
}

const RecieptItem: React.FC<IRecieptItemProps> = ({ item, handleOpenModal }) => {
  const { name, prepTimeMinutes, cookTimeMinutes, difficulty, rating } = item;
  
  return (
    <Pressable onPress={() => handleOpenModal(item)} style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.name}>{name}</Text>
        <Text>rating: {rating}</Text>
      </View>

      <View>
        <Text>Preparation time: {prepTimeMinutes}</Text>
        <Text>Cooking time: {cookTimeMinutes}</Text>
        <Text>Difficulty: {difficulty}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 19,
  },
});

export default RecieptItem;
