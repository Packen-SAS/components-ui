import PackenCheckBox from '../../app/components/PackenCheckBox';
import renderer from 'react-test-renderer';
import React from 'react';

describe('Render PackenCheck', () => {
    let c;
    beforeAll(() => {
        c = new PackenCheckBox({
            items: [{
                checked: true,
                title: "Check",
                disabled: false,
            },
            {
                checked: false,
                title: "UnCheck",
                disabled: false,
            },
            {
                checked: null,
                title: "Null",
                disabled: false,
            }],

            layout: "row",
            notifyParent:console.log("Test")


        });


        c.setState = (state) => {
            c.state.checked = state;
        }

    })


    it('rends styles checkbox when checked is disabled is false and checked is true or false', () => {
        c.getStylesCheckBox(false, true);
    });

    it('rends styles checkbox when checked is diferent of true or false', () => {
        c.getStylesCheckBox(true, null);
    });

    it('rends styles checkbox when disable is true and checked is true or false', () => {
        c.getStylesCheckBox(true, true);
    })

    it('rends styles checkbox when disable is false and checked is diferent to true or false', () => {
        c.getStylesCheckBox(false, null);
    })

    it('rends correctly', () => {
        let render = renderer.create(
            <PackenCheckBox
            layout="column"
            notifyParent={() => console.log("Test")}
                items={[{
                    checked: true,
                    title: "Check",
                    disabled: false,
                    id: 1
                },
                {
                    checked: false,
                    title: "UnCheck",
                    disabled: false,
                    key: 2
                },
                {
                    checked: null,
                    title: "Null",
                    disabled: false,
                    key: 3
                }]}

            />).toJSON();            
            expect(render);
    })

    it('rends correctly change state', async () => {
        c.setState = (state) => {
            c.state.checked = state
        }
        let state = c.changeState();
        expect(state);
    })

})