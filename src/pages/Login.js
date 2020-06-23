import React, { Component } from 'react';
import {
  StyleSheet, Text, View, ImageBackground, Image, TextInput, TouchableOpacity, Alert, Button
} from 'react-native';
import Colors from '../assets/styles/index';
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin'
import { connect } from 'react-redux'
import { logar } from '../redux/actions'

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyB0HjVRWaUOF6A4Q3-lSV3ml7tWSdeKeik",
      authDomain: "tcc-viaja.firebaseapp.com",
      databaseURL: "https://tcc-viaja.firebaseio.com",
      projectId: "tcc-viaja",
      storageBucket: "tcc-viaja.appspot.com",
      messagingSenderId: "1027663264550",
      appId: "1:1027663264550:web:0454af733b50637c3b9fe7",
      measurementId: "G-FQFLT5Q3FW"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  logar() {
    const { email, password } = this.state;
    if ((email.length === 0) || (password.length === 0)) {
      Alert.alert("Complete todos os campos");

    } else {
      this.props.logar({ email, password })
        .then(user => {
          console.log("user" + user)
          if (user == "user-not-found") {
            Alert.alert(
              "Usuário não encontrado",
              "Deseja criar um novo usuário?",
              [{
                text: 'Não',
                onPress: () => console.log('Não'),
                style: 'cancel'
              }, {
                text: 'Sim',
                onPress: () => { this.props.navigation.navigate("CadastroUsuario") }
              }],
              { cancelable: true }
            )
          }
          else if (user == "wrong-password") {
            Alert.alert("Senha Incorreta",
              "Tente Novamente")
            this.passwordTI.clear();
          }
          else if (user == "error") {
            Alert.alert(
              "Ocorreu um erro, tente novamente"
            )
          }
          else {
            this.props.navigation.replace("Roteiro")
          }
        })

    }
  }

  logGoogle = async () => {

    GoogleSignin.configure({
      webClientId: '1027663264550-3hdu6f1abh54fnjd4a95q6c31402tt2n.apps.googleusercontent.com'
    })


    const data = await GoogleSignin.signIn();
    const credential = await firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
    await firebase.auth().signInWithCredential(credential)
      .then(() => { this.props.navigation.replace("Roteiro") })
      .catch(error => {
        console.log(error);
      })

  }


  logFacebook = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    auth().signInWithCredential(facebookCredential)
      .then(() => { this.props.navigation.replace("Roteiro") })
      .catch(error => {
        console.log(error);
      })
  }

  render() {

    return (
      <>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={require('../assets/images/background.jpg')}>

          <View style={styles.logo}>
            <Image style={{ width: 300 }}
              source={require('../assets/logo/logo.png')} />
          </View>

          <TextInput ref={input => { this.emailTI = input }} style={styles.input} placeholder="E-mail" placeholderTextColor={Colors.placeholder}
            value={this.setState.email}
            onChangeText={value => { this.setState({ email: value }) }} />


          <TextInput ref={input => { this.passwordTI = input }} style={styles.input} secureTextEntry={true} placeholder="Senha" placeholderTextColor={Colors.placeholder}
            value={this.setState.password}
            onChangeText={value => { this.setState({ password: value }) }} />

          <TouchableOpacity onPress={() => { this.props.navigation.navigate("EsqueceuSenha") }}><Text style={styles.forgot}>Esqueceu a senha?</Text></TouchableOpacity>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.buttonLog} onPress={() => this.logar()}>
              <Icon name="long-arrow-right" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.logGoogle}
              onPress={() => this.logGoogle()}>
              <Image style={{ width: 40, height: 40 }}
                source={require('../assets/logo/google.png')} />
              <Text style={{ fontSize: 16 }}>Continue com Google</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.logFace}
              onPress={() => this.logFacebook()}>
              <Image style={{ width: 30, height: 30, marginRight: 8, marginLeft: 4 }}
                source={require('../assets/logo/facebook.png')} />
              <Text style={{ fontSize: 16, color: "white" }}>Continue com Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("CadastroUsuario") }}>
              <Text style={{ color: '#fff' }}>Não tem uma conta? <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Cadastre-se aqui</Text></Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>
      </>
    );
  }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 340,
    height: 50,
    marginLeft: 32,
    marginBottom: 20,
    fontSize: 18,
    paddingTop: 12,
    paddingLeft: 10
  },
  logo: {
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 70
  },
  forgot: {
    color: 'white',
    fontSize: 17,
    marginLeft: 220,
    marginBottom: 20
  },
  buttonLog: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2884B5',
    width: 100,
    height: 40,
    borderRadius: 10,
    marginBottom: 70
  },
  logGoogle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "white",
    width: 220,
    height: 35,
    borderRadius: 10
  },
  logFace: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 2,
    backgroundColor: "#3b5998",
    width: 220,
    height: 35,
    borderRadius: 10
  }
});

export default connect(null, { logar })(Login);