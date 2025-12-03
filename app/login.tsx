import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CareConnect</Text>
      
  {/* Email Field */}
      <Text style={styles.label}>Email Id</Text>
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        keyboardType="email-address"
      />

      {/* Password Field */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        style={styles.input}
        secureTextEntry
      />

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      
<TouchableOpacity style={styles.loginButton} onPress={() => router.push("/today")}>
  <Text style={styles.loginButtonText}>LOGIN</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.googleButton} onPress={() => router.push("/today")}>
  <Text style={styles.googleButtonText}>LOGIN WITH GOOGLE</Text>
</TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E3A8A", // Deep Blue
    marginBottom: 40,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 5,
    color: "#333",
    fontSize: 14,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  forgotContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#1E3A8A",
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    fontWeight: "bold",
    color: "#000",
  },
  googleButton: {
    backgroundColor: "#1E3A8A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "100%",
    borderRadius: 2,
    marginBottom: 20,
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  googleButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#444",
  },
  signupLink: {
    color: "#1E3A8A",
    fontWeight: "bold",
  },
});