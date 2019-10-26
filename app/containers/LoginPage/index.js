import React, { Component } from "react";
import { Image } from 'react-native';
import styles from "./styles";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
const LoginScreen = props => {
  const [value, onChangeText] = React.useState('')
  const _handleLoginPress = () => {
    props.navigation.setParams({
      hideHeader: true,
      });
    props.navigation.navigate('Home');
  };
  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <Image source={require('../../assets/img/logo.png')} style={{width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center', marginTop: 100}} />
          <Text style={styles.logoText}>Emergency Situations Control</Text>
          <View style={styles.loginFormView}>
            <TextInput
              placeholder="Username"
              placeholderColor="#c4c3cb"

              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />
            <View style={styles.btnWrapper}>
              <Button
                buttonStyle={styles.loginButton}
                title="Login"
                onPress={_handleLoginPress}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
