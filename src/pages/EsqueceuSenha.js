import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from 'react-native'
import Colors from '../assets/styles'
import firebase from '@react-native-firebase/app'
import ButtonText from '../assets/components/ButtonText'

class EsqueceuSenha extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: ""
        }
    }

    sendEmail() {
        const {email} = this.state;
        if (email.length === 0) {
            Alert.alert("Campo vazio");
        } else {
            firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("E-mail de confirmação enviado")
                this.emailTI.clear();
            })
            .catch((error) => {
                if (error.code == "auth/user-not-found") {
                    Alert.alert("E-mail inválido")
                    this.emailTI.clear();
                }
            })
        }
    }

    render() {
        return (
            <>
                <View style={{ backgroundColor: Colors.backgroundGreen, flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <TextInput ref={input => { this.emailTI = input }} style={styles.input} placeholder="E-mail" placeholderTextColor={Colors.placeholder}
                        value={this.state.email} onChangeText={value => { this.setState({ email: value }) }} />

                    <TouchableOpacity style={styles.buttonSignUp} onPress={() => { this.sendEmail() }}><Text style={{ color: 'white', fontSize: 18 }}>Redefinir Senha</Text></TouchableOpacity>
                </View>
            </>
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
        paddingLeft: 10
    },
    buttonSignUp: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2884B5',
        width: 150,
        height: 50,
        borderRadius: 10,
        marginTop: 20
    }
})

export default EsqueceuSenha;