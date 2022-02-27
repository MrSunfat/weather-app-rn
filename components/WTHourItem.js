import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

function WTHourItem({ hour, uriImg, temp, humidity }) {
    return (
        <View style={stylesHourItem.hourContainer}>
            <Text>{hour}</Text>
            <Image
                style={stylesHourItem.imgWTHour}
                source={{
                    uri: `http://openweathermap.org/img/wn/${uriImg}@2x.png`,
                }}
            />
            <Text>{`${temp}°`}</Text>
            <Text style={stylesHourItem.humidity}>
                <Feather name="droplet" size={12} color="#0F91F3" />
                {`${humidity}%`}
            </Text>
        </View>
    );
}

const stylesHourItem = StyleSheet.create({
    hourContainer: {
        alignItems: 'center',
        paddingHorizontal: 12,
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    imgWTHour: {
        width: 45,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#E5E3C9',
    },
    humidity: {
        display: 'flex',
    },
});

export default WTHourItem;
