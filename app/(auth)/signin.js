import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react'
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';



const SignIn = () => {
  const imageSource = require('../../assets/logo.png');
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [disabled, setDisabled] = useState(false);
  const auth = FIREBASE_AUTH;
  const login = async () =>{
    setDisabled(true);
  
    try{
      const response = await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log(response);
      setDisabled(false);
      console.log("Current User After Login:", FIREBASE_AUTH.currentUser);
      router.replace("/home");
    }
    catch(error){
      setDisabled(false);
      Alert.alert(error);
    }
  }
 
  const router = useRouter()
  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} 
      >
        <View style={styles.main}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
            {imageSource && <Image source={imageSource} style={styles.image} />}
            <Text style={styles.title}>Sign in to EDRO</Text>
          </View>
          <View style={[styles.formContainer, { marginBottom: 8 }]}>
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
          </View>
          <CustomButton 
            title="Sign in"
            onPress={() => {
              login();
              console.log(form)
            }}
            disabled={disabled}
            />
          <Link style={styles.text} href="/signup">
            Don't have an account yet? <Text style={{ color: "#D96F4A" }}>Sign Up</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFE8CD',
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
    fontFamily: 'InriaSans-Bold',
  },
  formContainer: {
    width: '100%',
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
    paddingVertical: 20,
    fontFamily: 'InriaSans-Bold',
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
  },
});