import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default {
    content: {
        default: {
            width: 18,
            height: 18,
            backgroundColor: Colors.brand.primary.snw,
            borderRadius: 3,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors.brand.primary.drk
        },
        active: {
            width: 18,
            height: 18,
            backgroundColor: Colors.primary.default,
            borderRadius: 3,
            alignItems: 'center'
        },
        disabled: {
            width: 18,
            height: 18,
            backgroundColor: Colors.base.disabled_alt,
            borderRadius: 3,
            alignItems: 'center'
        },
        disabledCheckUnChecked: {
            width: 18,
            height: 18,
            backgroundColor: Colors.base.disabled,
            borderRadius: 3,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors.base.disabled_alt
        }

    },

    icon: {
        fontSize: Typography.size.small,
        color: Colors.base.white, marginTop: 2
    },
    title: {
        left: 5,
        
        fontSize: Typography.size.medium,
        color: Colors.base.default_alt
    }

}