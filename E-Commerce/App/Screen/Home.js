import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    return (
        <SafeAreaView>
            <View>
                <Header />
            </View>
        </SafeAreaView>
    )
}