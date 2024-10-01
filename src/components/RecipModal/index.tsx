import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface RecipeDetailsProps {
  name: string;
  ingredients: string[];
  instructions: string[];
  onClose: () => void;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ name, ingredients, instructions, onClose }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.heading}>Ingredients:</Text>
        {ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.textItem}>• {ingredient}</Text>
        ))}

        <Text style={styles.heading}>Instructions:</Text>
        {instructions.map((instruction, index) => (
          <Text key={index} style={styles.textItem}>{index + 1}. {instruction}</Text>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  textItem: {
    fontSize: 16,
    marginBottom: 3,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RecipeDetails;
