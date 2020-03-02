import React, { useState, useEffect } from 'react';
import { View, CheckBox } from 'react-native';
import Section from '../components/Section';
import SectionStyles from "../styles/components/Section";
import PackenCheckBox from '../components/PackenCheckBox';
import PackecnCheckBox from '../components/PackenCheckBox';


const Checkbox = (props) => {
    const [isCheck, setIsCheck] = useState(true);
    
    return (
        <Section title="Checkbox">
            <PackecnCheckBox/>
        </Section>
    )
}

export default Checkbox; 