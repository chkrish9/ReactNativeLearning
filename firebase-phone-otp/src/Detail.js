import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';

const Detail = ({ route, navigation }) => {
    const { uid } = route.params;
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');

    const saveDetails = async () => {
        try {
            await firestore().collection("users").doc(uid).set({
                name,
                dob,
                gender
            });
            navigation.navigate("Dashboard");
        } catch (e) {
            console.error("Error while saving", e)
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
                Enter Details
            </Text>
            <TextInput
                style={{
                    height: 50,
                    width: "100%",
                    borderColor: "black",
                    borderWidth: 1,
                    marginBottom: 30,
                    paddingHorizontal: 10
                }}
                placeholder='Name'
                value={name}
                onChange={setName}
            />
            <TextInput
                style={{
                    height: 50,
                    width: "100%",
                    borderColor: "black",
                    borderWidth: 1,
                    marginBottom: 30,
                    paddingHorizontal: 10
                }}
                placeholder='Date of birth'
                value={dob}
                onChange={setDob}
            />
            <TextInput
                style={{
                    height: 50,
                    width: "100%",
                    borderColor: "black",
                    borderWidth: 1,
                    marginBottom: 30,
                    paddingHorizontal: 10
                }}
                placeholder='Gender'
                value={gender}
                onChange={setGender}
            />
            <TouchableOpacity
                onPress={saveDetails}
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
                    Save Details
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Detail