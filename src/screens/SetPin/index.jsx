import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {setPin} from '../../utills/storage';

const SetPin = ({onPinSet}) => {
  const [step, setStep] = useState(1);
  const [pin, setPinState] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleKeyPress = value => {
    if (step === 1) {
      if (pin.length < 4) {
        setPinState(prev => prev + value);
      }
      if (pin.length + 1 === 4) {
        setTimeout(() => setStep(2), 100); // Proceed to confirm PIN
      }
    } else {
      if (confirmPin.length < 4) {
        setConfirmPin(prev => {
          const newConfirmPin = prev + value;
          if (newConfirmPin.length === 4) {
            setTimeout(() => handleConfirmPin(newConfirmPin), 100);
          }
          return newConfirmPin;
        });
      }
    }
  };

  const handleConfirmPin = newConfirmPin => {
    if (pin !== newConfirmPin) {
      Alert.alert('Error', 'PINs do not match! Try again.');
      setPinState('');
      setConfirmPin('');
      setStep(1);
      return;
    }

    setPin(pin);
    Alert.alert('Success', 'PIN set successfully!');
    onPinSet();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {step === 1 ? 'Enter a New PIN' : 'Confirm Your PIN'}
      </Text>
      <View style={styles.pinContainer}>
        {[...Array(4)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.pinDot,
              (step === 1 ? pin.length : confirmPin.length) > i &&
                styles.filledDot,
            ]}
          />
        ))}
      </View>

      {/* Dial Pad */}
      <View style={styles.dialPad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'DEL', '0', 'OK'].map(
          (item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, item === 'DEL' && styles.delButton]}
              onPress={() => {
                if (item === 'DEL') {
                  step === 1
                    ? setPinState(pin.slice(0, -1))
                    : setConfirmPin(confirmPin.slice(0, -1));
                } else if (item === 'OK') {
                  if (step === 2) handleConfirmPin(confirmPin);
                } else {
                  handleKeyPress(item);
                }
              }}>
              <Text style={styles.dialText}>{item}</Text>
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
};

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

export default SetPin;
