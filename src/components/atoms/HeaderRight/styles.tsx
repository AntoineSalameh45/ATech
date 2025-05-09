import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  glowContainer: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 10,
    borderRadius: 30,
  },
  gradientContainer: {
    borderRadius: 30,
    padding: 1,
  },
  buttonContainer: {
    borderRadius: 30,
    backgroundColor: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.34)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default styles;
