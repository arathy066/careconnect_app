import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CareConnect</Text>
      <Text style={styles.subtitle}>Accessible Healthcare For Everyone</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login')} // navigate to login screen
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#003366',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#003366',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
