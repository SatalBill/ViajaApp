import React from 'react'

import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'

const Card = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card}>
                {this.props.children}
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 10
    },
    botao: {
        alignItems: "center",
        height: 40,
        width: 130,
        backgroundColor: "#7DB0C9",
        borderRadius: 10
    },
    texto: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
        marginTop: 5
    }
})

export default Card;