import React, { Component } from "react";
import { Text, View, Picker, ScrollView, RefreshControl } from "react-native";
import { List, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import * as Progress from "react-native-progress";

import {
  distanceChange,
  sortByChage,
  offerChange,
  categoryEnable,
  getCategory
} from "../actions";

const styles = {
  wrapper: {
    marginTop: 15
  },
  textStyle: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1
  }
};

const distanceValues = ["0.3", "1", "3", "5", "20"];
const sortBy = ["best_match", "rating", "review_count", "distance"];

class SettingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1
    };

    this._onSwitch = this._onSwitch.bind(this);
  }

  componentWillMount() {
    this.props.getCategory();
  }

  _onSwitch(v, l) {
    this.props.categoryEnable(v, l);
  }

  _onDistanceChange(value) {
    this.props.distanceChange(value);
  }

  _onOfferChange(v) {
    this.props.offerChange(v);
  }

  render() {
    const categories = this.props.categories;
    const categoriesSelected = this.props.categoriesSelected;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.wrapper}>
          <View style={styles.textStyle}>
            <Text style="">Main Settings</Text>
          </View>
          <List containerStyle={{ marginTop: 0 }}>
            <ListItem
              hideChevron
              title="Sort By"
              key="sortBy"
              label={
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    marginRight: 5,
                    flexDirection: "row"
                  }}
                >
                  <Picker
                    style={{ flex: 1 }}
                    onValueChange={v => {
                      this.props.sortByChage(v);
                    }}
                    selectedValue={this.props.sortBy}
                  >
                    {sortBy.map(i => {
                      return <Picker.Item label={i} value={i} key={i} />;
                    })}
                  </Picker>
                </View>
              }
            />
          </List>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.textStyle}>
            <Text style={{ flex: 0.25 }}>Categories</Text>
            {this.props.onLoad &&
              <Progress.Circle style={{ flex: 1 }} indeterminate size={24} />}
          </View>
          <List containerStyle={{ marginTop: 0 }}>
            {categories.map((l, i) => {
              let selected = false;
              if (categoriesSelected.indexOf(l.alias) > -1) {
                selected = true;
              }
              if (i <= 10 * this.state.step) {
                return (
                  <ListItem
                    switchButton
                    switched={selected}
                    hideChevron
                    key={l.alias}
                    title={l.title}
                    onSwitch={v => {
                      this._onSwitch(v, l.alias);
                    }}
                  />
                );
              }
            })}
            {!this.state.onLoad &&
              <ListItem
                title="Load More"
                hideChevron
                onPress={() => {
                  this.setState({
                    step: this.state.step + 1
                  });
                }}
              />}
          </List>

        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.settings.categories,
    categoriesSelected: state.settings.categoriesSelected,
    distance: state.settings.distance,
    sortBy: state.settings.sortBy,
    offeringADeal: state.settings.offeringADeal,
    onload: state.settings.onLoad
  };
};

export default connect(mapStateToProps, {
  distanceChange,
  sortByChage,
  offerChange,
  categoryEnable,
  getCategory
})(SettingScreen);
