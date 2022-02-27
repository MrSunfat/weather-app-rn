import React, { useState, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    ImageBackground,
    TextInput,
    ActivityIndicator,
} from 'react-native';

import { Entypo, Fontisto, Feather, FontAwesome5 } from '@expo/vector-icons';
import WTHourItem from './components/WTHourItem';
import WTDayItem from './components/WTDayItem';

export default function App() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    // save weather current
    const [data, setData] = useState({});
    const [dataHourly, setDataHourly] = useState([]);
    const [dataDaily, setDataDaily] = useState([]);

    // save coordCity
    const [coordCity, setCoordCity] = useState({
        lon: 0,
        lat: 0,
    });
    // save timezone of city
    const [timezoneOfCity, setTimezoneOfCity] = useState(0);

    const dayName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    // UTC +7
    const timeZone = 25200;

    const api = {
        key: '8db986fe08377dcec893f8940d9c2cfd',
        baseUrl: 'http://api.openweathermap.org/data/2.5/',
        svgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/04n.svg',
    };

    // const iconWeather = data?.weather[0]?.icon;

    const fetchDataHandler = useCallback(() => {
        setLoading(true);
        setInput('');
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`
        )
            .then((response) => response.json())
            .then((data) => {
                setCoordCity(data?.coord);
                setTimezoneOfCity(data?.timezone);
                setData(data);
                // console.log(timezoneOfCity);
                // console.log(data);
                // console.log(coordCity);
            })
            .catch((e) => console.dir(e))
            .finally(() => setLoading(false));
    }, [api.key, input]);

    useEffect(() => {
        fetch(
            `http://api.openweathermap.org/data/2.5/onecall?lat=${coordCity?.lat}&lon=${coordCity?.lon}&units=metric&appid=${api.key}`
        )
            .then((response) => response.json())
            .then((data) => {
                setDataHourly(data?.hourly);
                setDataDaily(data?.daily);
                // console.log(dataHourly.length);
                // console.log(dataDaily.length);
            });
    }, [data]);

    const roundNumber = (number) => {
        return Math.round(number * 10) / 10;
    };

    const hourMinute = (data, timezone) => {
        if (timezone !== timeZone) {
            return new Date(
                new Date(data * 1000) - (timeZone - timezone) * 1000
            ).toLocaleTimeString();
        }
        return new Date(data * 1000).toLocaleTimeString();
    };

    const dtToHourMinute = (data, timezone) => {
        let time = new Date(data * 1000);
        if (timezone !== timeZone) {
            time = new Date(
                new Date(data * 1000) - (timeZone - timezone) * 1000
            );
        }
        const hour =
            time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
        return `${hour}:00`;
    };

    const getDayOfCity = (data, timezone) => {
        const time = new Date(
            new Date(data * 1000) - (timeZone - timezone) * 1000
        );

        return dayName[time.getDay()];
    };

    return (
        <View style={styles.root}>
            <ImageBackground
                style={styles.imageBG}
                resizeMode="cover"
                source={require('./assets/hh.jpg')}
                blurRadius={1}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.text}>The weather app</Text>
                        <TextInput
                            placeholder="Enter city name and press return..."
                            onChangeText={(text) => setInput(text)}
                            value={input}
                            placeholderTextColor={'#000'}
                            style={styles.textInput}
                            onSubmitEditing={fetchDataHandler}
                        />
                    </View>

                    {loading && (
                        <View style={{ marginBottom: 20 }}>
                            <ActivityIndicator size={'large'} color="#1D9BF0" />
                        </View>
                    )}

                    {Object.entries(data).length > 0 && data?.cod !== 200 && (
                        <View>
                            <Text style={styles.notFoundCity}>
                                We can't find weather information about this
                                city !!
                            </Text>
                        </View>
                    )}

                    {Object.entries(data).length > 0 && data?.cod === 200 && (
                        <View style={styles.infoView}>
                            <View style={styles.infoViewMain}>
                                <Text style={styles.cityContryText}>
                                    {`${data?.name}, ${data?.sys?.country}`}
                                </Text>
                                <Image
                                    style={styles.imgWeather}
                                    source={{
                                        uri: `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@4x.png`,
                                    }}
                                />
                                {/* {weatherImg[`${data?.weather[0]?.icon}`]} */}

                                <Text style={styles.tempText}>
                                    <View style={styles.iconWeatherData}>
                                        <FontAwesome5
                                            name="temperature-high"
                                            size={22}
                                            color="#EFAAB3"
                                        />
                                    </View>
                                    {`${Math.round(data?.main?.temp)} °C | ${
                                        data?.weather[0]?.description
                                    }`}
                                </Text>
                                <Text style={styles.dateText}>
                                    {`${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`}
                                </Text>
                                <View style={styles.infoViewMainData}>
                                    <View style={styles.temperature}>
                                        <Text style={styles.minMaxText}>
                                            {`${roundNumber(
                                                data?.main?.temp_min
                                            )} °C / ${roundNumber(
                                                data?.main?.temp_max
                                            )} °C`}
                                        </Text>
                                        <Text
                                            style={styles.feelsLike}
                                        >{`Feels like ${roundNumber(
                                            data?.main?.feels_like
                                        )} °C`}</Text>
                                        <Text>
                                            <Feather
                                                name="sunrise"
                                                size={14}
                                                color="#F6B850"
                                            />
                                            {`Sunrise: ${hourMinute(
                                                data?.sys?.sunrise,
                                                data?.timezone
                                            )}`}
                                        </Text>
                                    </View>
                                    <View style={styles.dataOthers}>
                                        <Text>
                                            <Entypo
                                                name="drop"
                                                size={14}
                                                color="#0F91F3"
                                            />
                                            {`Humidity: ${data?.main?.humidity} %`}
                                        </Text>
                                        <Text>
                                            <Fontisto
                                                name="wind"
                                                size={14}
                                                color="#B2B2B2"
                                            />
                                            {`Wind: ${
                                                Math.round(
                                                    ((data?.wind?.speed *
                                                        3600) /
                                                        1000) *
                                                        10
                                                ) / 10
                                            } km/h`}
                                        </Text>
                                        <Text>
                                            <Feather
                                                name="sunset"
                                                size={14}
                                                color="#CB580A"
                                            />
                                            {`Sunset: ${hourMinute(
                                                data?.sys?.sunset,
                                                data?.timezone
                                            )}`}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <ScrollView
                                style={styles.infoViewHours}
                                horizontal={true}
                            >
                                {dataHourly?.map((item, index) => {
                                    const { dt, weather, temp, humidity } =
                                        item;
                                    return (
                                        <WTHourItem
                                            key={index}
                                            hour={dtToHourMinute(
                                                dt,
                                                timezoneOfCity
                                            )}
                                            uriImg={weather[0]['icon']}
                                            temp={Math.round(temp)}
                                            humidity={Math.round(humidity)}
                                        />
                                    );
                                })}
                            </ScrollView>

                            <ScrollView
                                style={styles.infoViewDays}
                                horizontal={true}
                            >
                                {dataDaily?.map((item, index) => {
                                    const {
                                        dt,
                                        sunrise,
                                        sunset,
                                        temp: { min, max },
                                        humidity,
                                        wind_speed,
                                        weather,
                                        uvi,
                                    } = item;
                                    return (
                                        <WTDayItem
                                            key={index}
                                            day={getDayOfCity(
                                                dt,
                                                timezoneOfCity
                                            )}
                                            minTemp={roundNumber(min)}
                                            maxTemp={roundNumber(max)}
                                            sunrise={hourMinute(
                                                sunrise,
                                                timezoneOfCity
                                            )}
                                            sunset={hourMinute(
                                                sunset,
                                                timezoneOfCity
                                            )}
                                            humidity={humidity}
                                            wind={roundNumber(wind_speed * 3.6)}
                                            weatherDescription={
                                                weather[0]?.description
                                            }
                                            uvi={uvi}
                                        />
                                    );
                                })}
                            </ScrollView>
                        </View>
                    )}
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        overflow: 'hidden',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: 50,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: -2 },
        textShadowRadius: 8,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    imageBG: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    textInput: {
        paddingHorizontal: 5,
        paddingVertical: 20,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: '#fff',
        fontSize: 16,
        borderRadius: 16,
        borderBottomWidth: 3,
        borderBottomColor: '#df8c00',
    },

    notFoundCity: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '800',
        textAlign: 'center',
    },

    infoView: {
        alignItems: 'center',
    },
    infoViewMain: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 5,
        paddingTop: 5,
        paddingBottom: 16,
        width: '100%',
    },
    cityContryText: {
        color: '#fff',
        alignItems: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: -1, height: -2 },
        textShadowRadius: 5,
    },
    imgWeather: {
        width: 140,
        height: 90,
        borderRadius: 20,
        marginBottom: 10,
        backgroundColor: '#E5E3C9',
    },
    dateText: {
        color: '#fff',
        fontSize: 18,
        marginVertical: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    tempText: {
        textTransform: 'capitalize',
        color: '#000',
        fontSize: 20,
        fontWeight: '900',
        textShadowColor: 'rgba(255, 255, 255, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    infoViewMainData: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    temperature: {
        width: '50%',
        alignItems: 'center',
        borderRightColor: '#70757A',
        borderRightWidth: 1,
    },
    dataOthers: {
        width: '50%',
        paddingLeft: 4,
    },
    iconWeatherData: {
        marginRight: 5,
    },

    infoViewHours: {
        marginBottom: 10,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },

    infoViewDays: {
        width: '100%',
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 12,
        paddingRight: 12,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },

    minMaxText: {
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    feelsLike: {},
});
