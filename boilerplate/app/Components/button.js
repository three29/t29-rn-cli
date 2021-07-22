import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';

const Button = props => {
  const {...restProps} = props;
  const {style} = restProps;

  return Platform.OS === 'ios' ? (
    <TouchableOpacity activeOpacity={0.9} {...props}>
      {props.children}
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple()}
      {...props}>
      <View style={style}>{props.children}</View>
    </TouchableNativeFeedback>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

Button.defaultProps = {
  children: null,
};

export default memo(Button);
