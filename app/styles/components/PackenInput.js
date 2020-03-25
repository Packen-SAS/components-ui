import Colors from '../abstracts/colors';
import Typography from '../abstracts/typography';

export default {
    content: {
        contentInput: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors.base.default_alt,
            height: 40,
            paddingLeft: 16,
            paddingRight: 13,
            color: Colors.base.default_alt,
            backgroundColor: "transparent"
        },

        contentInputHover: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors.base.default_alt,
            height: 40,
            paddingLeft: 16,
            paddingRight: 13,
            color: Colors.base.default_alt,
            backgroundColor: Colors.secondary.default
        },
        contentInputFocus: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: Colors.base.default_alt,
            height: 40,
            paddingLeft: 16,
            paddingRight: 13,
            color: Colors.base.default_alt,
            backgroundColor: Colors.secondary.default
        },
        contentInputError: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'red',
            height: 40,
            paddingLeft: 10,
            paddingRight: 13,
            color: Colors.base.default_alt,
            backgroundColor: Colors.secondary.default
        },
        contentInputDisabled:{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: Colors.basic.gray.lgt,
            height: 40,
            paddingLeft: 16,
            paddingRight: 13,
            color: Colors.base.default_alt,
            backgroundColor: Colors.secondary.default
        },
        textInput: {
            flex: 1,
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 5,
            color: '#424242',
            height: 40
        },
        labelInput: {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: Colors.tertiary.default
        },
        icon: {
            fontSize: Typography.size.small,
            fontWeight: 'normal',
            lineHeight: 16,
            left: 3,
            color: "red"
        }
    }

}