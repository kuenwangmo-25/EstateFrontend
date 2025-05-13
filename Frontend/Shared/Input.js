import React from 'react';
import { TextInput, View } from 'react-native';

const Input = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  autoCorrect = true,
  containerStyle,
  inputStyle,
}) => {
  return (
    <View style={containerStyle}>
      {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        style={inputStyle}
      />
    </View>
  );
};

export default Input;
