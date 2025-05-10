import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  keyContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Rancho-Regular',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontFamily: 'Rancho-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  errorInput: {
    borderColor: '#f00',
  },
  errorText: {
    color: '#f00',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginTextContainer: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  loginLink: {
    color: '#007BFF',
  },
});

export default styles;
