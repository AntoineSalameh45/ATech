import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  keyContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Rancho-Regular',
  },
  description: {
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupTextContainer: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
  },
  signupLink: {
    color: '#007BFF',
  },
});

export default styles;
