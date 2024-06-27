export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={'text-sm font-semibold text-gray-700 ' + className}>
            {value? value:children}
        </label>
    )
}