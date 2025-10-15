import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {
  render() {
    return (
      <ScrollView>
        <Card>
          <Card.Title>Contact Information</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10, lineHeight:35 }}>
            121, Clear Water Bay Road{'\n'}
            Clear Water Bay, Kowloon{'\n'}
            HONG KONG{'\n'}
            Tel: +852 1234 5678{'\n'}
            Fax: +852 8765 4321{'\n'}
            Email:confusion@food.net
          </Text>
        </Card>
      </ScrollView>
    );
  }
}

export default Contact;
