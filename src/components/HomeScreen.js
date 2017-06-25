import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView,
  Image,
  RefreshControl
} from "react-native";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
import * as Progress from "react-native-progress";

import LoginScreen from "./LoginScreen";
import { updateToken, updateData } from "../actions";

const styles = {
  container: {
    flex: 1
  },
  headerContainer: {
    flexDirection: "row",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    elevation: 2,
    position: "relative",
    backgroundColor: "#fff"
  },
  headerBtn: {
    flex: 2,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  headerSearchBar: {
    flex: 6,
    justifyContent: "center",
    padding: 0
  },
  buttonStyle: {
    borderColor: "#000",
    borderWidth: 1,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 14,
    paddingLeft: 14
  },
  listWrapper: {
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#f2f2f2",
    padding: 10
  }
};

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      searchText: "restaurant",
      refreshing: false,
      isLoad: true
    };

    this._getToken = this._getToken.bind(this);
    this._invalidToken = this._invalidToken.bind(this);
    this._getLatestData = this._getLatestData.bind(this);
  }

  componentWillMount() {
    this._getToken().then(() => {
      this._getLatestData();
    });
  }

  _getLatestData() {
    let _postData = this.props.query.data;

    if (this.state.step === 1) {
      _postData = [];
    }

    const offset = (this.state.step - 1) * 20;
    console.log(this.props.settings.categoriesSelected.join(","));
    let queryString = {
      term: this.state.searchText,
      location: "United+States",
      limit: 20,
      offset: offset,
      sort_by: this.props.settings.sortBy
    };

    if (!_.isEmpty(this.props.settings.categoriesSelected)) {
      queryString.categories = this.props.settings.categoriesSelected.join(",");
    }

    // if (this.props.settings.offeringADeal) {
    //   queryString.attributes = "deals";
    // }

    queryString = _.reduce(
      queryString,
      (sum, v, k) => {
        return !_.isEmpty(v) || !_.isUndefined(v)
          ? sum + k + "=" + v + "&"
          : sum;
      },
      ""
    );

    return fetch("https://api.yelp.com/v3/businesses/search?" + queryString, {
      headers: {
        Authorization: "Bearer " + this.props.query.token.access_token,
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(json => {
        _postData = _.concat(_postData, json.businesses);
        this.setState(
          {
            isLoad: false
          },
          () => {
            this.props.updateData(_postData);
          }
        );
      });
  }

  _invalidToken() {
    if (_.isEmpty(this.props.query.token.access_token)) {
      console.log("ahihi éo đc rùi :D");
      return false;
    }

    const current = parseInt(moment().format("X"));
    const expire = parseInt(this.props.query.token.expire_in);
    if (current > expire) {
      console.log("ahihi éo đc rùi :D");
      return false;
    }

    return true;
  }

  _getToken() {
    if (!this._invalidToken()) {
      const client_id = "5P7dyinp9rcLNqxafvZGjA";
      const client_secret =
        "r23aR3wqYqat2eVHxCOa8F9DAitWfNfQZ4BOfcxgV7RvbUyQU7JsD50wnTJwka9S";

      return fetch("https://api.yelp.com/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
      })
        .then(resp => resp.json())
        .then(json => {
          this.props.updateToken({
            access_token: json.access_token,
            expire_in:
              parseInt(moment().format("X")) + parseInt(json.expires_in)
          });
        })
        .catch(err => {
          console.error(err);
        });
    }

    return Promise.resolve("success");
  }

  _onPress() {
    this.props.navigation.navigate("Setting");
  }

  _onChangeText(text) {
    console.log(text);
    this.setState(
      {
        searchText: text,
        step: 1
      },
      () => {
        this._getLatestData();
      }
    );
  }

  _onEndReached() {
    this.setState(
      {
        step: this.state.step + 1
      },
      () => {
        this._getLatestData();
      }
    );
  }

  _renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerBtn}>
          <TouchableHighlight
            onPress={this._onPress.bind(this)}
            onLongPress={this._onPress.bind(this)}
          >
            <View style={styles.buttonStyle}>
              <Text style={{ color: "#000" }}>Filter</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.headerSearchBar}>
          <SearchBar
            lightTheme
            round
            containerStyle={{
              backgroundColor: "#fff"
            }}
            onChangeText={this._onChangeText.bind(this)}
          />
        </View>
      </View>
    );
  }

  _onRefresh() {
    this.setState(
      {
        step: 1,
        refreshing: true
      },
      () => {
        this._getLatestData().then(() => {
          this.setState({
            refreshing: false
          });
        });
      }
    );
  }

  _renderListView() {
    return (
      <ListView
        enableEmptySections
        dataSource={ds.cloneWithRows(this.props.query.data)}
        onEndReached={this._onEndReached.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        renderRow={rowData => {
          return (
            <TouchableHighlight>
              <View style={styles.listWrapper}>
                <View style={{ flex: 2.5 }}>
                  <Image
                    source={{ uri: rowData.image_url }}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View style={{ flex: 6 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", flex: 1 }}>
                      {rowData.name.length > 25
                        ? rowData.name.substr(0, 25) + "..."
                        : rowData.name}
                    </Text>
                    <Text style={{ flex: 0.3 }}>{`${(rowData.distance /
                      1609.34).toFixed(2)} mi`}</Text>
                  </View>
                  <Text>{`${rowData.review_count} Reviews`}</Text>
                  <Text
                    style={{ fontWeight: "bold" }}
                  >{`${rowData.location.display_address.join(", ")}`}</Text>
                  <Text>
                    {rowData.categories.map(v => {
                      return v.title + ", ";
                    })}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          );
        }}
        style={{ backgroundColor: "#fff" }}
      />
    );
  }

  _renderLoading() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Progress.Circle indeterminate />
      </View>
    );
  }

  render() {
    if (_.isEmpty(this.props.query.token.access_token)) {
      return <LoginScreen />;
    }

    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {_.isEmpty(this.props.query.data)
          ? this._renderLoading()
          : this._renderListView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.query);
  return {
    settings: state.settings,
    query: state.query
  };
};

export default connect(mapStateToProps, {
  updateToken,
  updateData
})(HomeScreen);
