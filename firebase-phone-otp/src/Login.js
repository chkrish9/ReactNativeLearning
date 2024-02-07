import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState(null);
    const navigation = useNavigation();

    const signInWithPhoneNumber = async () => {
        try {
            const userCredentials = await auth.signInWithPhoneNumber(phoneNumber);
            const user = userCredentials.user;

            const userDocument = await firestore().collection('users').doc(user.id).get();
            if (userDocument.exists) {
                navigation.navigate("Dashboard");
            } else {
                navigation.navigate("Detail", { uid: user.id });
            }
        } catch (e) {
            console.error("Error while sending the code: ",e);
        }
    }

    const confirmCode = async () => {
        try {
            const confirmation = await confirm.confirm(code);
            setConfirm(confirmation);
        } catch (e) {
            console.error("Invalid code: ",e);
        }
    }


    return (
        <View style={{ flex:1, padding:10, backgroundColor:"#CFCFCF"}}>
            <Text
            style={{
                fontSize:32,
                fontWeight:'bold',
                marginBottom:40,
                marginTop:150
            }}>
                Phone Number Auth
            </Text>
            {
                confirm ? 
                (
                    <>
                        <Text
                        style={{
                            marginBottom:20,
                            fontSize:18
                        }}
                        >
                            Enter your phone number:
                        </Text>
                        <TextInput
                        style={{
                            height:50,
                            width:"100%",
                            borderColor:"black",
                            borderWidth:1,
                            marginBottom:30,
                            paddingHorizontal:10
                        }}
                        placeholder='e.g., +1 000-000-0000'
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        />
                        <TouchableOpacity
                        onPress={signInWithPhoneNumber}
                        style={{
                            backgroundColor:"#841584",
                            padding:10,
                            borderRadius:5,
                            marginBottom:20,
                            alignItems:"center"
                        }}>
                            <Text
                            style={{
                                color:"white",
                                fontSize:22,
                                fontWeight:"bold"
                            }}
                            >
                                Send Code
                            </Text>
                        </TouchableOpacity>
                    </>
                ):(
                    <>
                        <Text
                        style={{
                            marginBottom:20,
                            fontSize:18
                        }}
                        >
                            Enter code sent to the phone:
                        </Text>
                        <TextInput
                        style={{
                            height:50,
                            width:"100%",
                            borderColor:"black",
                            borderWidth:1,
                            marginBottom:30,
                            paddingHorizontal:10
                        }}
                        placeholder='Enter code'
                        value={code}
                        onChange={setCode}
                        />
                        <TouchableOpacity
                        onPress={confirmCode}
                        style={{
                            backgroundColor:"#841584",
                            padding:10,
                            borderRadius:5,
                            marginBottom:20,
                            alignItems:"center"
                        }}>
                            <Text
                            style={{
                                color:"white",
                                fontSize:22,
                                fontWeight:"bold"
                            }}
                            >
                                Confirm Code
                            </Text>
                        </TouchableOpacity>
                    </>
                )
            }
        </View>
    )
}

export default Login