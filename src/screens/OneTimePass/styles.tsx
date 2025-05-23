import { StyleSheet } from 'react-native';
import { globalColors } from '../../styles/globalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  notice: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20,
    gap: 5,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 45,
    height: 50,
    borderRadius: 6,
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  button: {
    width: '80%',
    backgroundColor: globalColors.light_blue,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    marginTop: 15,
  },
  secondaryButtonText: {
    color: globalColors.light_text,
  },
});

export default styles;
