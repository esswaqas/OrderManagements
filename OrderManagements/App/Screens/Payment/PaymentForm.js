import React, { useState ,useEffect} from 'react';
import { Modal, View, StyleSheet,Text } from 'react-native';
import { Button as PaperButton, TextInput } from 'react-native-paper';
import ApplicationConstant from 'src/Utles/ApplicationConstant'
import { ListItem, Icon, Card, CheckBox ,Button as ElementButton  } from '@rneui/themed';
import Toast from 'react-native-toast-message'

export default function PaymentForm(props) {
    const [AmountToPay, setAmountToPay] = useState(0);
    const [PaymentMethod, setPaymentMethod] = useState('C');
    const [AccountNumber, setAccountNumber] = useState('');
    const [BankName, setBankName] = useState('');
    const [Description, setDescription] = useState('');

    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false);

    const [isFormSubmited, setisFormSubmited] = useState(true);

    const setPaymentMethodType = (type) => {
        if (type === 'C') {
            setPaymentMethod('C');
            setBankName('');
            setAccountNumber('');
        } else {
            setPaymentMethod('B');
        }
    };
useEffect(() => {

        // Trigger form validation when name, 
        // email, or password changes
       // if(isFormSubmited==false){
        //}
        validateForm();
    }, [AmountToPay, Description, AccountNumber,BankName,PaymentMethod]);

    const validateForm = () => {
        let errors = {};

        // Validate name field
        if (!(AmountToPay>0)) {
            errors.AmountToPay = 'Amount To Pay is required.';
        }

        // if (!Description) {
        //     errors.Description = 'Description is required.';
        // }

        if (!BankName && PaymentMethod=='B') {
            errors.BankName = 'Bank Name is required.';
        }
        if (!AccountNumber && PaymentMethod=='B')  {
            errors.AccountNumber = 'Account Number is required.';
        }

      

        // Set the errors and update form validity
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
        setisFormSubmited(Object.keys(errors).length === 0);
    }
    
    const submitForm = async () => {
         
        validateForm();
        
        let pm= PaymentMethod
        let amt= AmountToPay;
        let an=  AccountNumber;
        let Bnk=  BankName;
        let des=  Description;

        if(isFormValid)
            {
                 
     
         setAmountToPay(0);
         setPaymentMethod('C');
         setBankName('');
         setAccountNumber('');
         setDescription('');

        props.SubmitPaymentForm(
            PaymentMethod,
            AmountToPay,
            AccountNumber,
            BankName,
            Description,
            false
        );
    }
    };

    const ClosePopup = () => {
        // Reset form fields
        setAmountToPay(0);
        setPaymentMethod('C');
        setBankName('');
        setAccountNumber('');
        setDescription('');

        // Optionally call onClose prop to close the modal
        props.SubmitPaymentForm(
            PaymentMethod,
            AmountToPay,
            AccountNumber,
            BankName,
            Description,
            true
        );
    };

    return (
        <Modal
        style={{ zIndex: 1}}
        
            animationType="slide"

            transparent={true}
            visible={props.visiblePopup}
            onRequestClose={ClosePopup}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <View style={styles.row}>
                        <CheckBox
                            center
                            title="Cash"
                            checked={PaymentMethod === 'C'}
                            checkedColor={ApplicationConstant.AppColor}
                            textStyle={styles.font12}
                            size={20}
                            onPress={() => setPaymentMethodType('C')}
                        />

                        <CheckBox
                            center
                            size={20}
                            title="Bank"
                            textStyle={styles.font12}
                            checked={PaymentMethod === 'B'}
                            checkedColor={ApplicationConstant.AppColor}
                            onPress={() => setPaymentMethodType('B')}
                        />
                    </View>

                    <View style={styles.row}>
                        <TextInput
                            mode="outlined"
                            label="Amount To Pay"
                            placeholder="Amount To Pay"
                            style={styles.fullWidth}
                            value={String(AmountToPay)}
                            textStyle={{ color: 'red' }}
                            keyboardType='numeric'
                            onChangeText={(val) => setAmountToPay(Number(val))}
                            right={<TextInput.Affix />}
                        />
                      
                    </View>
                    <View style={styles.row}>
                        {
                            
                      errors['AmountToPay'] && <Text style={{ color: 'red' }}>{errors['AmountToPay']} </Text>

                    }</View>
                    {PaymentMethod === 'B' && (
                        <>
                            <View style={styles.inputSpacing}>
                                <TextInput
                                    mode="outlined"
                                    label="Bank Name"
                                    placeholder="Bank Name"
                                    style={styles.fullWidth}
                                    value={BankName}
                                    textStyle={{ color: 'red' }}
                                    onChangeText={(val) => setBankName(val)}
                                    right={<TextInput.Affix />}
                                />
                                  {
                      errors['BankName'] && <Text style={{ color: 'red' }}>{errors['BankName']} </Text>

                    }
                            </View>
                            <View style={styles.inputSpacing}>
                                <TextInput
                                    mode="outlined"
                                    label="Account Number"
                                    placeholder="Account Number"
                                    style={styles.fullWidth}
                                    value={AccountNumber}
                                    textStyle={{ color: 'red' }}
                                    onChangeText={(val) => setAccountNumber(val)}
                                    right={<TextInput.Affix />}
                                />
                                 {
                      errors['AccountNumber'] && <Text style={{ color: 'red' }}>{errors['AccountNumber']} </Text>

                    }
                            </View>
                        </>
                    )}

                    <View style={styles.inputSpacing}>
                        <TextInput
                            mode="outlined"
                            label="Description"
                            placeholder="Description"
                            style={styles.fullWidth}
                            value={Description}
                            textStyle={{ color: 'red' }}
                            onChangeText={(val) => setDescription(val)}
                            right={<TextInput.Affix />}
                        />
                         {/* {
                      errors['Description'] && <Text style={{ color: 'red' }}>{errors['Description']} </Text>

                    } */}
                    </View>

                    <View style={styles.buttonContainer}>
                        <PaperButton
                            style={styles.closeButton}
                            mode="outlined"
                            textColor={ApplicationConstant.AppColor}
                            onPress={ClosePopup}
                        >
                            Close
                        </PaperButton>

                        <PaperButton
                            style={styles.saveButton}
                            mode="contained"
                            buttonColor={ApplicationConstant.AppColor}
                            onPress={submitForm}
                        >
                            Save
                        </PaperButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        width: '90%',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
         
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fullWidth: {
        width: '100%',
    },
    inputSpacing: {
        paddingBottom: 5,
        width: '100%',
        paddingTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    closeButton: {
        width: '48%',
        borderColor: ApplicationConstant.AppColor,
        borderWidth: 2,
    },
    saveButton: {
        width: '48%',
        borderColor: ApplicationConstant.AppColor,
        borderWidth: 2,
    },
    font12: {
        fontSize: 12,
    },
});
