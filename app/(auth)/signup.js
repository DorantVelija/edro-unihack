import { StyleSheet, Text, View, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

import FormField from '../../components/formField';
import CustomButton from '../../components/customButton';
import DatePicker from '../../components/DatePicker';
import AccountTypeDropdown from '../../components/accountType'; 

import { FIREBASE_AUTH, FIREBASE_DB} from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const config = {
  gestureEnabled: false,  
};

const SignUp = () => {
  const imageSource = require('../../assets/logo.png');
  const [accountType, setAccountType] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState({
    firstName:'',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: accountType,
    birthday: '',
    phone: '',
    educationInstitution: '',
    teacherEmail: '',
  })
  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      type: accountType,
    }));
  }, [accountType]);

  const handleDateChange = (selectedDate) => {
    setForm((prevForm) => ({
      ...prevForm,
      birthday: selectedDate.toLocaleDateString(),
    }));
  };
  const user = FIREBASE_AUTH.currentUser;
  
  const router = useRouter();
  const auth = FIREBASE_AUTH;
  const signUp = async () => {
    setDisabled(true);
    console.log(form);

     if (
      !form.email ||
      !form.password ||
      !form.firstName ||
      !form.lastName ||
      !form.username ||
      !form.phone ||
      !form.birthday ||
      (accountType === 'student' && !form.educationInstitution)||
      (accountType === 'student' && !form.teacherEmail)||
      (accountType === 'teacher' && !form.educationInstitution)    
      ) {
        Alert.alert("All fields are required.");
        setDisabled(false);
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.email)) {
          Alert.alert("Validation Error", "Please enter a valid email address.");
          setDisabled(false);
          return;
      }

      if (form.password.length < 6) {
          Alert.alert("Password must be at least 6 characters long.");
          setDisabled(false);
          return;
      }

      if (form.password !== form.confirmPassword){
        Alert.alert("Passwords don't match.");
        setDisabled(false);
        return;
      }

    try {
        const response = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const uid = response.user.uid;
       
        if(accountType == 'student'){
          await setDoc(doc(FIREBASE_DB, 'users', uid), {
            firstName: form.firstName,
            lastName: form.lastName,
            educationInstitution: form.educationInstitution,
            teacherEmail: form.teacherEmail,
            accountType: accountType.toString(),
            username: form.username.toLowerCase(),
            phone: form.phone,
            birthday: form.birthday,
            email: form.email,
            createdAt: new Date(),
          
          }
        );

        }

        if(accountType == 'teacher'){
          await setDoc(doc(FIREBASE_DB, 'users', uid), {
            firstName: form.firstName,
            lastName: form.lastName,
            accountType: accountType.toString(),
            username: form.username.toLowerCase(),
            phone: form.phone,
            birthday: form.birthday,
            email: form.email,
            createdAt: new Date(),
            educationInstitution: form.educationInstitution
          });
        }

        if(accountType == 'sponsor'){
          await setDoc(doc(FIREBASE_DB, 'users', uid), {
            firstName: form.firstName,
            lastName: form.lastName,
            accountType: accountType.toString(),
            username: form.username.toLowerCase(),
            phone: form.phone,
            birthday: form.birthday,
            email: form.email,
            createdAt: new Date(),
          });
        }

        setDisabled(false);
        console.log(form);
        console.log(user);
        Alert.alert("Succesfully registered");
        router.replace("/signin");
    }
    catch (error) {
        console.log(error)
        setDisabled(false);
        Alert.alert("Sign Up Error", error.message);
    }
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.main}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
              {imageSource && <Image source={imageSource} style={styles.image} />}
              <Text style={styles.title}>Register to EDRO</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: "48%", marginRight: 10 }}>
                  <FormField
                    title="First Name"
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    handleTextChange={(e) => { setForm({...form, firstName: e})}}
                  />
                </View>
                <View style={{ width: "48%" }}>
                  <FormField
                    title="Last Name"
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    handleTextChange={(e) => { setForm({...form, lastName: e})}}
                  />
                </View>
              </View>
              <FormField
                title="Email"
                type="email"
                placeholder="example@edro.com"
                value={form.email}
                handleTextChange={(e) => { setForm({...form, email: e})}}
              />
              <FormField
                title="Password"
                type="password"
                placeholder="password"
                value={form.password}
                handleTextChange={(e) => { setForm({...form, password: e})}}
              />
              <FormField
                title="Confirm Password"
                type="password"
                placeholder="re-enter password"
                handleTextChange={(e) => { setForm({...form, confirmPassword: e})}}
              />
              <FormField
                    title="Username"
                    type="text"
                    placeholder="username"
                    value={form.username}
                    handleTextChange={(e) => { setForm({...form, username: e})}}
                  />

              <Text style={styles.label}>Account Type</Text>
              <AccountTypeDropdown
                value={accountType}
                setValue={setAccountType}
              />

              <DatePicker
                title="Birthday"
                value={form.birthday}
                onDateChange={handleDateChange}  
              />
              <FormField
                title="Cell"
                type="phone"
                placeholder="+40123456789"
                value={form.phone}
                handleTextChange={(e) => { setForm({...form, phone: e})}}
              />
            </View>
             
              {accountType === 'student' ? (
                <View>
                  <FormField
                      title="Education Institution"
                      type="text"
                      placeholder="Scoala Gimnaziala Nr1 Sibiiu"
                      value={form.educationInstitution}
                      handleTextChange={(e) => { setForm({...form, educationInstitution: e})}}
                    />
                  <FormField
                    title="Supervising Teacher Email"
                    type="text"
                    placeholder="example@edro.com"
                    value={form.teacherEmail}
                    handleTextChange={(e) => { setForm({...form, teacherEmail: e})}}
                  />
                  </View>
              ) : null}
              
              {accountType === 'teacher' ? (
                <View>
                  <FormField
                      title="Education Institution"
                      type="text"
                      placeholder="Scoala Gimnaziala Nr1 Sibiiu"
                      value={form.educationInstitution}
                      handleTextChange={(e) => { setForm({...form, educationInstitution: e})}}
                    />
                </View>
              ) : null}

              {accountType === 'sponsor' ? (
                <Text style={styles.text}>SPONSOR</Text>
              ) : null}
            
      
        
            <CustomButton title="Sign up" disabled={disabled} onPress={() => { signUp() }} /> 
      
            <Link style={styles.text} href="/signin">
              Already have an account? <Text style={{ color: "#D96F4A" }}>Sign In</Text>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFE8CD',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,  
    paddingBottom: 40,    
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    width: "100%",
    paddingHorizontal: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
    fontFamily: 'InriaSans-Bold',
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
    fontFamily: 'InriaSans-Bold',
  },
});