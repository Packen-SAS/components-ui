import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default {
    text_area: {
        borderWidth: 1,
        width: '100%',
        textAlignVertical: 'top',
        height: 104,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: Colors.base.default_alt,
        fontSize: Typography.size.small,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 18
    },
    label: {
        fontSize: Typography.size.small,
        color: Colors.tertiary.default,
        lineHeight: 16,
        fontWeight: 'bold',
        height: 16,
        letterSpacing: 1,
        textTransform: 'uppercase'
    }
}