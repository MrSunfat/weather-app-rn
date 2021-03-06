import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import SkillImage from '../assets/cloud-network.png';

export default function CategoryListItem({ title, urlImg }) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => {
      Alert.alert('Click');
    }}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.categoryImage} source={urlImg ? urlImg : SkillImage} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  categoryImage: {
    width: 64,
    height: 64,
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: 8,
    fontWeight: '700',
  },
});