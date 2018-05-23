import { Component, Render, View, Dimensions, Animated } from 'syr';

const styles = {
  view: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#dfdfdf'
  },
  text: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    fontSize: 20,
    left: 0,
    top: 0,
    color: '#000000',
    textAlign: 'center'
  }
};

class MyComponent extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Welcome to Syr Development!</Text>
      </View>
    );
  }
}

Render(MyComponent);
