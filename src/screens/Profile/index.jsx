import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useStyles} from './style';
import {useDispatch} from 'react-redux';
import {userToken} from '../../redux/reducres/authSlice';
import CustomButton from '../../components/CustomButton';
import {COLORS} from '../../utills/colors';
import {ICONS} from '../../assets';
import {height} from '../../utills/helper';

const Profile = ({navigation}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const handleLogout = () => {
    dispatch(userToken(null));
    setLogoutVisible(false);
    navigation.reset({
      index: 1,
      routes: [{name: 'Login'}],
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.white}
        translucent={false}
        barStyle="dark-content"
      />
      <View style={styles.logoutContainer}>
        <CustomButton title="Logout" onPress={() => setLogoutVisible(true)} />
      </View>
      {logoutVisible && (
        <Modal
          transparent={true}
          visible={logoutVisible}
          animationType="fade"
          onRequestClose={() => setLogoutVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => setLogoutVisible(false)}>
                <Image
                  source={ICONS.close}
                  style={{
                    height: height * 0.03,
                    width: height * 0.03,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Confirm Logout?</Text>
              <Text style={styles.modalMessage}>
                Are you sure you want to logout?
              </Text>
              <View style={styles.modalActions}>
                <CustomButton
                  title={'Logout'}
                  smallButton
                  onPress={() => handleLogout()}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Profile;
