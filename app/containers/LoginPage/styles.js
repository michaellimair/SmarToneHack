const React = require("react-native");

const { StyleSheet } = React;

export default StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: 'center',
    marginBottom: 20,
  },
  loginFormView: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,

  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});