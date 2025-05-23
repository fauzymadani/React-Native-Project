import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const localImages = [
  { name: 'product1.png', path: require('../assets/images/minum.jpeg') },
  { name: 'product2.jpg', path: require('../assets/images/parfume.jpeg') },
  { name: 'product3.jpeg', path: require('../assets/images/prod.jpeg') },
];

const App = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageName, setImageName] = useState(localImages[0].name);
  const [products, setProducts] = useState([]);

  const addProduct = () => {
    if (name.trim() && description.trim() && price.trim()) {
      setProducts([
        ...products,
        {
          id: Date.now().toString(),
          name,
          description,
          price,
          image: imageName,
        },
      ]);
      setName('');
      setDescription('');
      setPrice('');
      setImageName(localImages[0].name);
    }
  };

  // Fungsi untuk hapus produk
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Fungsi untuk edit produk: isi form dan hapus produk lama
  const editProduct = (item) => {
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setImageName(item.image);
    setProducts(products.filter((p) => p.id !== item.id));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Tombol Kembali */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Product List</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#666"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#666"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={{ color: '#ccc', marginBottom: 8 }}>Choose Image:</Text>
      <FlatList
        horizontal
        data={localImages}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setImageName(item.name)}
            style={[
              styles.imageSelector,
              imageName === item.name && styles.imageSelected,
            ]}
          >
            <Image source={item.path} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
        style={{ marginBottom: 16 }}
      />

      <View style={{ marginBottom: 16 }}>
        <Button title="Add Product" color="#4CAF50" onPress={addProduct} />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const img = localImages.find((img) => img.name === item.image)?.path;
          return (
            <View style={styles.card}>
              <Image source={img} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 8,
                }}
              >
                <Button
                  title="Edit"
                  color="#FFC107"
                  onPress={() => editProduct(item)}
                />
                <Button
                  title="Delete"
                  color="#F44336"
                  onPress={() => deleteProduct(item.id)}
                />
              </View>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#222',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  backButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#111',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f0',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  input: {
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#222',
    width: '100%',
    maxWidth: 320,
    fontFamily: 'monospace',
  },
  imageSelector: {
    marginRight: 12,
    borderWidth: 0,
    borderRadius: 6,
  },
  imageSelected: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    maxWidth: 320,
    alignSelf: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#fff',
    fontFamily: 'monospace',
  },
  description: {
    fontSize: 13,
    color: '#aaa',
    fontFamily: 'monospace',
  },
  price: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 6,
    fontFamily: 'monospace',
  },
});

export default App;
