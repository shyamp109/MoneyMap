import { StyleSheet } from "react-native";
import { height, width } from "../../utils/helper";
import { theme } from "../../utils/theme";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../assets";

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollviewContainer: {
      backgroundColor: theme.white,
    },
    imageStyle: {
      height: height * 0.08,
      width: height * 0.15,
      tintColor: theme.white,
      resizeMode: "contain",
    },
    welcomeText: {
      fontSize: scale(12),
      fontFamily: FONTS.loraRegular,
      color: theme.white,
    },
    main: {
      borderTopLeftRadius: height * 0.03,
      borderTopRightRadius: height * 0.03,
      marginHorizontal: height * 0.025,
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textTitle: {
      fontSize: scale(18),
      fontFamily: FONTS.loraSemibold,
      color: theme.gold,
    },
    textViewAll: {
      fontSize: scale(12),
      fontFamily: FONTS.loraMedium,
      color: theme.goldLight,
      textDecorationLine: "underline",
      textDecorationColor: theme.goldLight,
    },
    row: {
      marginBottom: 10,
    },
    heroImg: {
      width: width,
      height: height * 0.26,
      objectFit: "cover",
    },
    textContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    text: {
      fontSize: scale(24),
      fontFamily: FONTS.loraBold,
      color: theme.titleText,
    },
    icon: {
      height: height * 0.03,
      width: height * 0.03,
      tintColor: theme.titleText,
      resizeMode: "contain",
    },
    flatListContainer: {
      marginTop: height * 0.02,
    },
    cummunityContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: theme.primary,
      borderRadius: 10,
      paddingVertical: height * 0.015,
      paddingHorizontal: height * 0.02,
      gap: height * 0.025,
    },
    eyeIcon: {
      height: height * 0.025,
      width: height * 0.025,
      tintColor: theme.white,
    },
    cummunityMain: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    cummunityText: {
      fontSize: scale(14),
      fontFamily: FONTS.loraSemiBold,
      color: theme.white,
    },
    tbdText: {
      fontSize: scale(14),
      fontFamily: FONTS.loraSemiBold,
      color: theme.white,
      width: width * 0.68,
    },
    card: { marginTop: height * 0.05 },
    cardImg: { width: width * 0.929, borderRadius: height * 0.01 },
    cardTitle: {
      fontSize: scale(24),
      color: theme.titleText,
      fontFamily: FONTS.loraSemibold,
      marginTop: height * 0.024,
    },
    cardDesc: {
      fontSize: scale(16),
      color: theme.black,
      fontFamily: FONTS.loraRegular,
      marginTop: height * 0.024,
      marginBottom: 0,
    },
    cardBtn: {
      width: width * 0.929,
      borderRadius: height * 0.01,
      backgroundColor: theme.button,
      padding: height * 0.02,
    },
    btnText: {
      fontSize: scale(16),
      color: theme.white,
      fontFamily: FONTS.loraMedium,
      textAlign: "center",
    },
    residentHubContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: height * 0.04,
    },
    residentFlatList: {
      marginTop: height * 0.015,
      marginRight: height * 0.015,
      flexWrap: "wrap",
    },
  });
};
