import React, { useState, useEffect, Component } from "react";

import { View } from "react-native";

import RadioStyles from "../styles/components/PackenRadio";
import PackenRadioControl from "./PackenRadioControl";

class PackenRadio extends Component {
  /* const { layout, items, initialIndex } = props;
  const [checkedIndex, setCheckedIndex] = useState(initialIndex);
  const [currentSelection, setCurrentSelection] = useState(""); */

  constructor(props) {
    super(props);

    this.state = {
      checkedIndex: props.initialIndex,
      currentSelection: ""
    }
  }

  update_checked_index = newCheckedIndex => {
    /* setCheckedIndex(newCheckedIndex); */
    this.setState({
      checkedIndex: newCheckedIndex
    });
  }

  find_current_selection = () => {
    return this.props.items[this.state.checkedIndex];
  }

  update_current_selection = newSelection => {
    /* setCurrentSelection(newSelection); */
    this.setState({
      currentSelection: newSelection
    });
  }

  /* useEffect(() => {
    update_current_selection(find_current_selection());
  }, [checkedIndex]);

  useEffect(() => {

  }, [currentSelection]); */

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.checkedIndex !== this.state.checkedIndex) {
      this.update_current_selection(this.find_current_selection());
    }
    if (prevState.currentSelection !== this.state.currentSelection) {
      /* New selection can be used here */
      /* console.log(this.state.currentSelection); */
    }
  }

  render() {
    return (
      <View style={RadioStyles.container[this.props.layout]}>
        {
          this.props.items.map((item, i) => (
            <View key={i} style={RadioStyles.item[this.props.layout]}>
              <PackenRadioControl
                checkedIndex={this.state.checkedIndex}
                selfIndex={i}
                label={item.label}
                isDisabled={item.isDisabled}
                updateCheckedIndex={this.update_checked_index}/>
            </View>
          ))
        }
      </View>
    );
  }
}

export default PackenRadio;