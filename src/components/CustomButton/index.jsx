import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utills/colors';
import {height, width} from '../../utills/helper';
import {FONTS} from '../../assets';

const CustomButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  smallButton = false,
  isborder,
  icon,
  isColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && styles.disabled,
        smallButton && styles.smallButton,
        {
          borderColor: isborder ? COLORS.primary : null,
          borderWidth: isborder ? 1 : 0,
          backgroundColor: COLORS.primary,
          width: smallButton ? width * 0.6 : width * 0.9,
        },
      ]}>
      {loading ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}>
          <ActivityIndicator
            size="small"
            color={COLORS.white}
            style={{paddingVertical: 5}}
          />
          <Text
            style={{
              fontFamily: FONTS.MontserratMedium,
              fontSize: scale(13),
              color: COLORS.white,
            }}>
            Loading...
          </Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          {icon && (
            <Image
              source={icon}
              style={{
                height: height * 0.03,
                width: height * 0.03,
                resizeMode: 'contain',
              }}
            />
          )}

          <Text
            style={[
              styles.text,
              {
                color: isborder
                  ? COLORS.primary
                  : icon
                  ? COLORS.primary
                  : COLORS.white,
              },
            ]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: height * 0.06,
    borderRadius: height * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.06,
  },
  smallButton: {
    paddingHorizontal: height * 0.06,
    borderRadius: height * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.06,
  },
  text: {
    color: COLORS.white,
    fontSize: scale(16),
    fontFamily: FONTS.MontserratSemibold,
  },
  disabled: {
    opacity: 0.6,
    paddingHorizontal: height * 0.06,
    borderRadius: height * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.06,
  },
});

export default CustomButton;
