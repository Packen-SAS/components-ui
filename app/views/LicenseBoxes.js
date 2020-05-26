import React, { Component } from "react";
import { View } from "react-native";

import * as UTIL from "../utils";
import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiLicenseBox from "../components/PackenUiLicenseBox";

class LicenseBoxes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageView>
        <Section title="License Boxes">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiLicenseBox
                overview="Licencia para camión con refrigeración"
                category="A1"
                number="000000"
                state="approved"
                dueDate={UTIL.formatDateSimple("2021-08-14", "DD/MM/YYYY")}
                callback={() => false}
                labels={{
                  approved: "Approved",
                  expired: "Expired",
                  rejected: "Rejected",
                  pending: "Pending"
                }}
              />
            </View>
          </View>
        </Section>
      </PageView>
    );
  }
}

export default LicenseBoxes;