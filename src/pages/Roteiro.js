import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';
  import Colors from '../assets/styles/index';
  
  class Roteiro extends Component {

    render() {
  
      return (
        <>
          <View>
            <Text style={styles.oi}>
              oi
            </Text>
            <Button title="oi" onPress={()=>{this.props.navigation.navigate("Login")}}/>
          </View>
        </>
      );
    }
  };
  
  const styles = StyleSheet.create({
    oi: {
      fontSize: 40,
      color: Colors.text
    }
  });
  
  export default Roteiro;