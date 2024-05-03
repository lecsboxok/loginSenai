import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons/'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'



export default function Cadastro() {

    const navigation = useNavigation();
    const [email, salvarEmail] = useState("");
    const [senha, salvarSenha] = useState("");

    async function salvarItem() {
        try {
            if (senha === "" || email === "") {
                alert("Preencha todos os campos")
                return;
            } else {
                await AsyncStorage.setItem('userData', JSON.stringify({ email, senha }))
                salvarEmail();
                salvarSenha();
                alert("Cadasro realizado!")
                console.log(email, senha)
                
            }
        } catch (erro) {
            alert("Erro ao salvar as informações", erro)
        }
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <StatusBar barStyle="light" translucent={true} backgroundColor="#880000" />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container} >
                    <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                        <Ionicons size={25} color={"#fff"} style={styles.volta} name="chevron-back-outline" onPress={() => navigation.navigate('index')} />
                        <Text style={styles.message}>Cadastre-se</Text>
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                        <Text style={styles.title}>
                            E-mail
                        </Text>
                        <TextInput
                            placeholder='Digite um email...'
                            style={styles.input}
                            value={email}
                            onChangeText={salvarEmail}
                        />
                        <TextInput
                            placeholder='Digte uma senha'
                            style={styles.input}
                            secureTextEntry
                            value={senha}
                            onChangeText={salvarSenha}
                        />
                        <TouchableOpacity style={styles.button} onPress={salvarItem}>
                            <Text style={styles.buttonText}>
                                Cadastrar
                            </Text>
                        </TouchableOpacity>

                    </Animatable.View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#880000'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '3%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#FFF",
        marginLeft: 30,
        marginTop: 20
    },
    containerForm: {
        backgroundColor: "#FFF",
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%"
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: '#880000',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold'
    },


})