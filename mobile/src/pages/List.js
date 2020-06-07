import React, { useState, useEffect } from 'react';

import socketio from 'socket.io-client'

import { ScrollView ,AsyncStorage, Image, StyleSheet, Alert } from 'react-native';

import logo from '../assets/logo.png'

import SpotList from '../components/SpotList'

export default function List() {

    const [techs, setTechs] = useState([])

    useEffect(() =>{
        AsyncStorage.getItem('user').then(user_id =>{
            const socket = socketio('http://192.168.1.6:3333', {
                query:{ user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'} `)
            })
        })
    },[])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs =>{
            const techsArray = storageTechs.split(',').map(tech => tech.trim())
            setTechs(techsArray)
        })
    },[]) 

    return (
        <ScrollView styles={styles.container}>
            <Image 
            source={logo} 
            style = {styles.logo}
            />
            {techs.map(tech => <SpotList key={tech} tech = {tech} />)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 40,
    },
    logo:{
        marginTop: 55,
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
            
    }
})
