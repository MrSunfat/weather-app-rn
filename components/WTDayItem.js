import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
    Entypo,
    Fontisto,
    Feather,
    FontAwesome5,
    Ionicons,
    MaterialIcons,
} from '@expo/vector-icons';

function WTDayItem({
    day,
    minTemp,
    maxTemp,
    sunrise,
    sunset,
    humidity,
    wind,
    weatherDescription,
    uvi,
}) {
    return (
        <View style={stylesDayItem.dayContainer}>
            <Text style={stylesDayItem.dayText}>{day}</Text>
            <Text style={stylesDayItem.description}>
                <MaterialIcons name="description" size={14} color="#A25300" />
                {weatherDescription}
            </Text>
            <Text>
                <Feather name="sunrise" size={14} color="#F6B850" />
                {`Sunrise: ${sunrise}`}
            </Text>
            <Text>
                <Feather name="sunset" size={14} color="#CB580A" />
                {`Sunset: ${sunset}`}
            </Text>
            <Text>
                <FontAwesome5
                    name="temperature-high"
                    size={14}
                    color="#EFAAB3"
                />
                {`${minTemp}° / ${maxTemp}°`}
            </Text>
            <Text>
                <Fontisto name="wind" size={14} color="#B2B2B2" />
                {`Wind: ${wind} km/h`}
            </Text>
            <Text>
                <Entypo name="drop" size={14} color="#0F91F3" />
                {`Humidity: ${humidity}%`}
            </Text>
            <Text>
                <Ionicons name="sunny" size={14} color="#F9D14C" />
                {`UV index: ${uvi}`}
            </Text>
        </View>
    );
}

const stylesDayItem = StyleSheet.create({
    dayContainer: {
        // alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderTopColor: '#CCC',
        borderTopWidth: 3,
        borderBottomColor: '#CCC',
        borderBottomWidth: 3,
        borderLeftColor: '#F8F8F8',
        borderLeftWidth: 1,
        borderRightColor: '#F8F8F8',
        borderRightWidth: 1,
        borderRadius: 20,
        marginHorizontal: 2,
    },
    dayText: {
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        textTransform: 'capitalize',
    },
});

export default WTDayItem;
