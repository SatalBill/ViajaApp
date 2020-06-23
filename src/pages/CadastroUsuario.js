import React, { Component } from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, Alert
} from 'react-native';
import Colors from '../assets/styles/index';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'

class CadastroUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            passwordConfirm: ""
        }
    }


    signup() {
        const { email, password, passwordConfirm } = this.state;
        if (password === passwordConfirm) {
            if ((email.length !== 0) && (password.length !== 0) && (passwordConfirm.length !== 0)) {

                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => { this.props.navigation.replace("Roteiro") })
                    .catch(error => {
                        if (error.code == "auth/email-already-in-use") {
                            Alert.alert("E-mail já está sendo usado")
                            this.emailTI.clear();
                        } else if (error.code == "auth/invalid-email") {
                            Alert.alert("E-mail inválido")
                            this.emailTI.clear();
                        }else if(error.code == "auth/weak-password"){
                            Alert.alert("Senha fraca, tente uma mais forte")
                        }else{
                            Alert.alert("Erro inesperado, tente novamente")
                        }
                    })
            }
            else {
                Alert.alert("Complete todos os campos")
            }
        }
        else {
            Alert.alert("Senhas devem ser idênticas")
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: Colors.backgroundGreen, flex: 1, alignItems: "center", justifyContent: "center" }}>


                <TextInput ref ={input => {this.emailTI = input}} style={styles.input} placeholder="E-mail" placeholderTextColor={Colors.placeholder}
                    value={this.state.email} onChangeText={value => { this.setState({ email: value }) }} />

                <TextInput style={styles.input} secureTextEntry placeholder="Senha" placeholderTextColor={Colors.placeholder}
                    value={this.state.password} onChangeText={value => { this.setState({ password: value }) }} />

                <TextInput style={styles.input} secureTextEntry placeholder="Confirmação de Senha" placeholderTextColor={Colors.placeholder}
                    value={this.state.passwordConfirm} onChangeText={value => { this.setState({ passwordConfirm: value }) }} />

                <TouchableOpacity style={styles.buttonSignUp} onPress={() => { this.signup() }}><Text style={{ color: 'white', fontSize: 18 }}>Cadastrar</Text></TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 340,
        height: 50,
        fontSize: 17,
        paddingLeft: 10,
        marginBottom: 20
    },
    buttonSignUp: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2884B5',
        width: 100,
        height: 50,
        borderRadius: 10,
        marginTop: 10
    }
})

export default CadastroUsuario;