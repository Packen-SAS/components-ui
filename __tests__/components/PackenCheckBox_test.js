import PackenCheckBox from '../../app/components/PackenCheckBox';
import renderer from 'react-test-renderer';
import React from 'react';

state = {
    checked: null
}

handleNotify = (newState) => {
    this.setState({ checked: newState })
}

describe('Render PackenCheck', () => {
    let c;
    beforeAll(() => {
        c = new PackenCheckBox({
            checked: true,
            title: "Test",  
            notifyParent: handleNotify = (checked) => console.log(checked),
            disabled: true
        });
        
        c.setState = (state) =>{
            c.state.checked = state;
        }
        
    })

    it('rends correctly checked(true)' , () => {
        let render = renderer.create(
            <PackenCheckBox checked={true} title={"Pruena"}
                notifyParent={handleNotify = (checked) => console.log(checked)} />
        ).toJSON();
        expect(render);
    });

    it('rends correctly checked(false) without title' , () => {
        let render = renderer.create(
            <PackenCheckBox checked={false} 
                notifyParent={handleNotify = (checked) => console.log(checked)} />
        ).toJSON();
        expect(render);
    });

    it('rends correctly change state', async() => {
        c.setState = (state) => {
            c.state.checked = state
        }
        let state = c.changeState();
        expect(state);
    })

    it('rends change state with async/await', async() =>{
        let checkbox = new PackenCheckBox({
            checked: true,
            title: "Test",
            notifyParent: handleNotify = (checked) => console.log(checked),
            disabled: false
        })
        checkbox.setState = (state) =>{
            checkbox.state.checked = state;
        }
        
        let state = checkbox.changeState();
        console.log("State con await ", state);
    });

    it('rends correctly styles when check not is disabled and checked is true or false', () =>{
        let check = new PackenCheckBox({
            checked: true,
            title: "Test",
            notifyParent: handleNotify = (checked) => console.log(checked),
            disabled: true
        })
        check.setState = (state) =>{
            c.state.checked = state;
        }
        let state = check.getStylesCheckBox();
        expect(state);  
    });

    it('rends styles when checked not is true or false', () => {
        let render = renderer.create(
            <PackenCheckBox checked={null}
                title={"Test"}
                notifyParent={handleNotify = (checked) => console.log(checked)}
                disabled={true} />
        ).toJSON();
        expect(render);
    });

    it('rends styles when cheked is not disabled and checked is true or false', () => {
        let render = renderer.create(
            <PackenCheckBox checked={null}
                title={"Test"}
                notifyParent={handleNotify = (checked) => console.log(checked)}
            />
        ).toJSON();
        expect(render);
    });

    it('rends styles of checkbox when is disabled and checked is true or false', () => {
        let cb = new PackenCheckBox({
            checked: true,
            title: "Test",
            notifyParent: handleNotify = (checked) => console.log(checked),
            disabled: false
        })
        cb.setState = (state) =>{
            c.state.checked = state;
        }
        let state = cb.changeState();
        expect(state);
    });

})