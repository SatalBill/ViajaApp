import firebase from '@react-native-firebase/app';
import { Alert } from 'react-native';

export const USER_LOGIN_SUCESS = 'USER_LOGIN';
const userLoginSucess = user => ({
  type: USER_LOGIN_SUCESS,
  user
});

export const USER_LOGOUT = 'USER_LOGOUT'
export const userLogout = () => ({
  type: USER_LOGOUT
})

export const logar = ({ email, password }) => dispatch => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user)
      const action = userLoginSucess(user);
      dispatch(action);
      return user;
    })
    .catch(error => {
      if (error.code == "auth/user-not-found") {
        return "user-not-found"
      }
      else if (error.code == "auth/wrong-password") {
        return "wrong-password"
      } else {
        return "error"
      }
    })
}








    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then(user => {
    //       const action = userLoginSucess(user);
    //       dispatch(action);
    //       return user;
    //     })
    //     .catch(error => {
    //       if (error.code == "auth/user-not-found") {
    //         Alert.alert(
    //           "Usuário não encontrado",
    //           "Deseja criar um novo usuário?",
    //           [{
    //             text: 'Não',
    //             onPress: () => {
    //               resolve();
    //             }
    //           }, {
    //             text: 'Sim',
    //             onPress: () => { this.props.navigation.navigate("CadastroUsuario") }
    //           }],
    //           { cancelable: true }
    //         )

    //       }

    //       else if (error.code == "auth/wrong-password") {
    //         Alert.alert("Senha Incorreta",
    //           "Tente Novamente")
    //       }
    //     })

    // }