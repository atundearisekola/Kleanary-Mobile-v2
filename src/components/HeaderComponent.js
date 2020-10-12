import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

const HeaderComponent = (props) => {
  return (
    <Header style={styles.header}>
      <Button
        transparent
        onPress={() => {
          props.props.navigation.openDrawer();
        }}
      >
        <Icon name="menu" />
      </Button>

      <Right>
        <Button transparent>
          <Icon name="search" />
        </Button>
        <Button transparent>
          <Icon name="heart" />
        </Button>
        <Button transparent>
          <Icon name="more" />
        </Button>
      </Right>
    </Header>
  );
};
export default HeaderComponent;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.5 * 0.2;
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#39cff2',
  },
});
