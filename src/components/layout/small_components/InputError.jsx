export default function InputError({className='', message, ...props}){
    return (
        <p {...props} className={'text-sm text-red-600 ' + className}>
            {message}
        </p>
    )
}
