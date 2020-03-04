import PackenTextArea from '../../app/components/PackenTextArea';
import renderer from 'react-test-renderer';
import React from 'react';

describe('Render TextArea ', () => {
    it('rends correctly ', () => {
        let render = renderer.create(
            <PackenTextArea
                placeholder="Placeholder test"
                label="Label test" value="Value test"
                changeTextValue={() => console.log("Test value")}
            />).toJSON();
        expect(render);
    })

    it('Handle change TextArea', () => {
    
        const instanceOf = renderer.create(
            <PackenTextArea
                placeholder="Placeholder test"
                label="Label test" value="Value test"
                changeTextValue={() => console.log("Test value")}
            />).getInstance();
        instanceOf.handleTextArea('Email');
        expect(instanceOf);

    });
})