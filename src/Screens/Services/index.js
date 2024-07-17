import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { resetState } from '../../../redux/slicers/userSlicer';
import GlobalStyles from '../../Utils/GlobalStyles';

const ServicesScreen = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetState());
  };
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
       {/* <Pressable
        style={[
          GlobalStyles.buttonPrimary,
          {width: "80%" },
        ]}
        onPress={() => handleReset()}
      >
        <Text style={[GlobalStyles.textMedium, { color: "white" }]}>
          Reset App
        </Text>
      </Pressable> */}
      <Text>This is coming up soon.</Text>
    </View>
  )
}

export default ServicesScreen

const styles = StyleSheet.create({})