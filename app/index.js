import { StyleSheet, Text, View, Image } from "react-native";
import "../global.css"
import CustomButton from "../components/customButton";
import {Link, useRouter} from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const imageSource = require('../assets/logo.png');
  const router = useRouter();
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <CustomButton title="Sign in" onPress={() => router.push("/signin")}></CustomButton>
        <Link style={styles.text} href="/signup">
           Don't have an account yet? <Text style={{color: "#D96F4A"}} >Sign Up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFE8CD",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
    paddingVertical: 20,
    fontFamily: 'InriaSans-Bold',
    fontSize: 16
  },
});
