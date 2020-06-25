import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../constants';

interface Props extends TouchableOpacityProps {
  text: string;
  loading: boolean;
}

export class Button extends Component<Props, {}> {
  render() {
    const {text, loading} = this.props;
    return (
      <TouchableOpacity
        disabled={loading}
        {...this.props}
        style={[
          styles.buttonStyle,
          {backgroundColor: loading ? colors.secondary : colors.primary},
        ]}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonTextStyle}>{text}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonTextStyle: {
    color: colors.containerBg,
    fontWeight: '700',
    fontSize: 16,
  },
});
