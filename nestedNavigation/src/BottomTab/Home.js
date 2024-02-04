import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Home = () => {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const onChange = (e, selectedDate) => {
        setDate(selectedDate);
        setShow(false);
    }

    const showMode = (modeToShow) => {
        setShow(true);
        setMode(modeToShow);
    }
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Text onPress={() => navigation.navigate("Detail")}>Go to Details Page</Text>
            <Button title="show Date picker" onPress={() => showMode('date')}/>
            <Button title="show Time picker" onPress={() => showMode('time')}/>
            {
                show && (
                    <DateTimePicker
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )
            }
            <Text>{date.toLocaleString()}</Text>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});