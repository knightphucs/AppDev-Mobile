import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

class Menu extends Component {
  render() {
    return (
      <FlatList data={this.props.dishes}
        renderItem={({ item, index }) => this.renderMenuItem(item, index)}
        keyExtractor={(item) => item.id.toString()} />
    );
  }
  renderMenuItem(item, index) {
    return (
      <ListItem>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar source={require('./images/uthappizza.png')} />
          <ListItem.Content style={{ marginLeft: 10 }}>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </View>
      </ListItem>
    );
  }
}
export default Menu;