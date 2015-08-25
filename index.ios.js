/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from "react-native"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  TextInput,
  TouchableHighlight,
  LayoutAnimation
} from "react-native"

import fetchWeather from "./api"

class Brebex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "Bucuresti",
      country: "Romania",
      weatherType: "Clean",
      searchedCity: "Bucuresti",
      background: this._randomColor(),
      temperature: 0
    };
  }

  componentWillMount() {
    this.getWeather()
    LayoutAnimation.spring()
  }

  getWeather() {
    fetchWeather(this.state.searchedCity).then((response) => {
      var weatherList = response.list[0];

      this.setState({
        city: weatherList.name,
        country: weatherList.sys.country,
        temperature: weatherList.main.temp,
        weatherType: weatherList.weather[0].main,
        background: this._randomColor()
      });
    });
  }


  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.background}]}>
        <Text style={styles.temperature}>
          {Math.round(this.state.temperature) + "°C"}
        </Text>
        <Text style={styles.location}>
          {this.state.city}, {this.state.country}
        </Text>
        <Text style={styles.weatherType}>
          {this.state.weatherType}
        </Text>
        <TextInput style={styles.input}
                   onChangeText={(text) => this.onChangeText(text)}
                   onSubmitEditing={() => this.getWeather()}
                   clearButtonMode={"always"}/>
        <TouchableHighlight style={styles.button}
                            onPress={() => this.getWeather()}
                            underlayColor={this._randomColor()}>
          <View>
            <Text style={styles.buttonText}>
              Get Weather!
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  onChangeText(city) {
    this.setState({
      searchedCity: city
    });
  }

  _randomColor() {
    var colors = [0, 1, 2].map(() => Math.ceil(Math.random() * 255))

    return `rgb(${colors.join(",")})`
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  temperature: {
    fontSize: 130,
    fontWeight: "100"
  },
  location: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "100"
  },
  weatherType: {
    fontSize: 32,
    fontWeight: "500"
  },
  input: {
    borderWidth: 1,
    borderColor: "#666",
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 20,
    borderRadius: 5
  },
  button: {
    backgroundColor: "coral",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 14,
    color: "white"
  }
});

AppRegistry.registerComponent('Brebex', () => Brebex);
