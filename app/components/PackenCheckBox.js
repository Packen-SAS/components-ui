import React from 'react';
import { View, } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import CheckBoxStyles from '../styles/components/PackenCheckBox';
import Colors from '../styles/abstracts/colors';
import Typography from '../styles/abstracts/typography';

const PackecnCheckBox = props => {
    return (
        <View>
            <View style={{
                width: 18,
                height: 18,
                backgroundColor: Colors.primary.default,
                borderRadius: 3, alignItems: 'center'
            }} >
                <Icon style={{
                    fontSize: Typography.size.small,
                    color: Colors.base.white, marginTop: 2
                }} name="check" />
            </View>
                <View style={{marginTop: 10}}>

                </View>
            <View style={{
                width: 18,
                height: 18,
                backgroundColor: Colors.primary.focus,
                borderRadius: 3, alignItems: 'center'
            }} >
            </View>

        </View>

    )
}

export default PackecnCheckBox;