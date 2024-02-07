import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation();
    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }]
            })
        } catch (e) {
            console.error("Error while logout", e);
        }
    }
    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#CFCFCF" }}>
            <Text
                style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    marginBottom: 40,
                    marginTop: 150
                }}>
                Welcome to Dashboard
            </Text>
            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    backgroundColor: "#841584",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 20,
                    alignItems: "center"
                }}>
                <Text
                    style={{
                        color: "white",
                        fontSize: 22,
                        fontWeight: "bold"
                    }}
                >
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Dashboard