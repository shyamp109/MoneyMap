import React from 'react';
import {View, Image, Text, SafeAreaView, StatusBar} from 'react-native';
import {useStyles} from './style';
import {IMAGES} from '../../assets';
import {COLORS} from '../../utills/colors';

const Splashscreen = () => {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={COLORS.primary} />
      <View style={styles.imgContainer}>
        <Image source={IMAGES.logo} style={styles.image} />
        <Text style={styles.title}>MonayMap</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splashscreen;
