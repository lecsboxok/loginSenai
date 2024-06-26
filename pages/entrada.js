import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons/'
import { useNavigation } from '@react-navigation/native';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'


export default function Acesso() {

    const navigation = useNavigation();
    const [email, salvarEmail] = useState('');
    const [senha, salvarSenha] = useState('');

    async function loginRealizado() {
        try {
            
            const userData = await AsyncStorage.getItem('userData')
            const {email: emailSalvo, senha: senhaSalva} = JSON.parse(userData);
            if (email == emailSalvo && senha == senhaSalva){
                alert('Login realizado com sucesso')
            }else {
                alert('Login inválido')
            }
            return JSON.parse(userData) || [];
        }

        catch (erro) {
            alert("Erro ao realizar login", erro)
            return [];
        }
    }



    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <StatusBar barStyle="light" translucent={true} backgroundColor="#880000" />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container} >                 
                    <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                        <Ionicons size={25} color={"#fff"} style={styles.volta} name="chevron-back-outline" onPress={() => navigation.navigate('index')}/>
                        <Text style={styles.message}>Bem-vindo(a)</Text>
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
                            placeholder='Sua senha'
                            style={styles.input}
                            value={senha}
                            secureTextEntry
                            onChangeText={salvarSenha}
                        />
                        <TouchableOpacity style={styles.button} onPress={loginRealizado}>
                            <Text style={styles.buttonText}>
                                Acessar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('cadastro')}>
                            <Text style={styles.registerText} >
                                Não possui uma conta? Cadastre-se
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
        marginLeft:30,
        marginTop:20
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
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText: {
        color: '#a1a1a1'
    },

})