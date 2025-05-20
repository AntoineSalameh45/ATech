import {StyleSheet} from 'react-native';

export const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';

  return StyleSheet.create({
    viewContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isLight ? '#F0F8FF' : '#1C1C1E',
    },
    cameraOpenButtonContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      position: 'absolute',
      bottom: 50,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraOpenButton: {
      height: 80,
      width: 80,
      borderRadius: 40,
      backgroundColor: isLight ? '#aaaaaaaa' : '#333333aa',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
    },
    cameraButtons: {
      top: 10,
      padding: 10,
    },
    buttonStyle: {
      color: '#fff',
    },
    shutterButton: {
      height: 80,
      width: 80,
      borderRadius: 40,
      backgroundColor: '#ffffffaa',
    },
    shutterContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      position: 'absolute',
      bottom: 50,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {width: '100%', height: '100%'},
    camFlipButton: {
      position: 'absolute',
      bottom: 80,
      right: 10,
      padding: 10,
    },
    flashContainer: {
      alignItems: 'center',
    },
    flashHintContainer: {
      position: 'absolute',
      top: 50,
      left: 5,
      height: 20,
      width: 80,
      backgroundColor: '#0e0e0eaa',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flashHintText: {
      fontSize: 12,
      color: '#fff',
    },
    postPhotoButtonContainer: {
      position: 'absolute',
      bottom: 60,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      gap: 10,
    },

    saveButton: {
      alignSelf: 'center',
      backgroundColor: isLight ? '#aaaaaaaa' : '#333333aa',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
};
