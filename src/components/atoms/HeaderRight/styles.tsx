import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  characterButton: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterText: {
    fontSize: 28,
    fontFamily: 'Starjedi',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});


export default styles;
