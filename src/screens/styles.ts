import {StyleSheet} from 'react-native';
import {colors} from '../constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg,
  },
  loadingFooter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    margin: 20,
    borderRadius: 5,
    padding: 10,
    borderWidth: 0,

    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.52,
    shadowRadius: 2.46,
    elevation: 9,
    backgroundColor: 'white',
    shadowColor: colors.secondary,
    marginBottom: 0,
  },
});

export default styles;
