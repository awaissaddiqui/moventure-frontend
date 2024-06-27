import { forwardRef, useRef, useEffect } from "react";
export default  forwardRef(
    function TextInput({type = 'text', isFocused = false,  className = '',  ...props}, ref) {
         const input = useRef();
        useEffect(()=>{
            if(isFocused){
                input.current.focus();
            }
        },[isFocused])
        return (
            <input 
            {...props}
            type={type}
            ref={input}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            />       
        )
    }
)