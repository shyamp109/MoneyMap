import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../assets';
import {COLORS} from '../../utills/colors';
import {setOnboarding} from '../../redux/reducres/authSlice';
import {useDispatch} from 'react-redux';
import {useStyles} from './style';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const styles = useStyles();
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const slides = [
    {
      id: 1,
      image: IMAGES.onboard1,
      title: 'Gain total control of your money',
      description: 'Become your own money manager and make every cent count',
    },
    {
      id: 2,
      image: IMAGES.onboard2,
      title: 'Know where your money goes',
      description:
        'Track your transaction easily, with categories and financial reports',
    },
    {
      id: 3,
      image: IMAGES.onboard3,
      title: 'Planning ahead',
      description: 'Setup your budget for each category so you stay in control',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      startFadeAnimation();
    } else {
      dispatch(setOnboarding(false));
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    dispatch(setOnboarding(false));
    navigation.replace('Login');
  };

  const startFadeAnimation = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={COLORS.white} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Animated.Image
            source={slides[currentSlide].image}
            style={styles.image}
          />

          <Animated.Text style={[styles.title, {opacity: fadeAnim}]}>
            {slides[currentSlide].title}
          </Animated.Text>

          <Animated.Text style={[styles.description, {opacity: fadeAnim}]}>
            {slides[currentSlide].description}
          </Animated.Text>
        </View>

        <View style={styles.dotContainer}>
          {slides.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentSlide === index ? COLORS.primary : COLORS.secondary,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextText}>
              {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
