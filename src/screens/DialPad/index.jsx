import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getPin} from '../../utills/storage';

const DialPad = ({onSuccess, onReset}) => {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();

  const handlePress = num => {
    if (pin.length < 4) {
      setPin(pin + num);
    }

    if (pin.length === 3) {
      verifyPin(pin + num);
    }
  };

  const verifyPin = enteredPin => {
    const savedPin = getPin();
    console.log('savedPin: ', savedPin);

    if (savedPin === enteredPin) {
      Alert.alert('Success', 'PIN verified!');
      onSuccess();
    } else {
      Alert.alert('Error', 'Incorrect PIN');
      setPin('');
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter PIN</Text>
      <View style={styles.pinContainer}>
        {[...Array(4)].map((_, index) => (
          <View
            key={index}
            style={pin.length > index ? styles.filledDot : styles.emptyDot}
          />
        ))}
      </View>

      <View style={styles.dialPad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'del', 0].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() =>
              item === 'del' ? handleDelete() : handlePress(item)
            }>
            <Text style={styles.buttonText}>
              {item === 'del' ? '⬅️' : item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reset PIN Button */}
      <TouchableOpacity onPress={onReset}>
        <Text style={{color: 'blue', marginTop: 20}}>Reset PIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DialPad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  pinContainer: {flexDirection: 'row', marginBottom: 30},
  filledDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'black',
    margin: 5,
  },
  emptyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'gray',
    margin: 5,
  },
  dialPad: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'},
  button: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 5,
  },
  buttonText: {fontSize: 24, fontWeight: 'bold'},
});
