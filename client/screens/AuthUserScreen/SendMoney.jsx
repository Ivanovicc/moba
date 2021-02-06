import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import accounting from "accounting-js";

//Redux functions
import { getContactInfo } from '../../redux/actions/contactActions';
import { addNewTransaction, getUserTransactions } from '../../redux/actions/transactionActions';

const SendMoney = ({ route }) => {
    // Redux
    const dispatch = useDispatch();
    const loggedUser = useSelector((state) => state.user);
    const destinatary = useSelector((state) => state.contacts.selectedContact);
    const lastTransfer = useSelector((state) => state.transactions.lastTransaction);

    // Params
    const { 
        selectedContactUsername,
        selectedContactNameInitial,
        selectedContactSurnameInitial 
    } = route.params;

    // Amount to be transfered
    const [transferAmount, setTransferAmount] = useState({
        amount: 0
    });

    // Navigation and Form
    const navigation = useNavigation();
    const { handleSubmit } = useForm();

    useEffect(() => {
        dispatch(getContactInfo(selectedContactUsername));
        alert("New transaction added!");
    }, [lastTransfer]);

    const textInputChange = (val) => {
        if (val.length >= 1) {
        setTransferAmount({
            amount: val
        });
        }
    };

    const onSubmit = () => {
        makeTransfer();
    };

    function makeTransfer() {
        let transferData = {
            cvu_sender: loggedUser.info.account.cvu,
            cvu_receiver: destinatary.account.cvu,
            // All transfer amounts have a 0 as 1st character, so we must get rid of it
            amount: parseInt(transferAmount.amount.toString()),
            number: Math.floor((Math.random() * 1000000))
        }

        dispatch(addNewTransaction(transferData));

        // axios.post(`http://localhost:8080/transaction`, transferData)
        //     .then(res => {
        //         console.log(transferData);
        //         console.log(res);
        //         navigation.navigate("SendMoneySuccess");
        //     })
        //     .catch(error => {
        //         navigation.navigate("SendMoneyError");
        //     })
    }

    // Style functions
    const formatValue = (value) => {
        return accounting.formatMoney(parseFloat(value));
    };

    return (
        <LinearGradient
        style={styles.container}
        colors={["rgba(140, 165, 253, 1)", "rgba(243, 129, 245, 0.77)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    // style={{ position: "absolute" }}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <View
                    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                >
                    <Text style={styles.greeting}>Send money</Text>
                </View>
            </View>
                <View style={styles.whiteContainer}>
                    <TextInput
                        style={styles.textInputAmount}
                        autoCapitalize="none"
                        value={formatValue(transferAmount.amount)}
                    />
                    <TextInput
                        style={styles.textInputAmountHide}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        value={transferAmount.amount}
                    />
                    <View style={styles.contact}>
                        <View style={styles.avatar}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                {selectedContactNameInitial}{selectedContactSurnameInitial}
                            </Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={styles.name}>{destinatary.name} {destinatary.surname}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.btnContent}>Send</Text>
                    </TouchableOpacity>
                </View>  
        </LinearGradient>
        );
};

export default SendMoney;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 18,
        marginRight: 18,
        top: 24,
    },
    greeting: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    whiteContainer: {
        top: 50,
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: "100%",
    },
    button: {
        height: 50,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: "center",
        backgroundColor: "#25D681",
        marginRight: 18,
        marginLeft: 18,
        top: 380
    },
    btnContent: {
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold'
    },
    avatar: {
        marginRight: 20,
        borderRadius: 50,
        backgroundColor: '#25D681',
        padding: 10,
        height: 41,
        width: 41,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'left'
    },
    contact: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 18,
        marginVertical: 15,
        justifyContent: 'center',
        marginTop: 30,
        height: 41
    },
    textInputAmount: {
        height: 40,
        textAlign: 'center',
        marginTop: 80,
        fontSize: 32,
        color: "#168903"
    },
    textInputAmountHide: {
        height: 40,
        textAlign: 'center',
        marginTop: -40,
        fontSize: 32,
        color: "#168903",
        opacity: 0
    }
});