import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ( {length = 6, onComplete}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([])

    useEffect(() => {
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if(isNaN(value)) return;

        const newOtp = [...otp];
        //allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if(value && index< length - 1){
            inputRefs.current[index + 1].focus();
        }

        //When all boxes are filled onComplete
        const filled  = newOtp.every((d) => d !== "");
        if(filled) onComplete(newOtp.join(""));
    }
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1,1);

        if(index>0 && !otp[index-1] || !otp[index-2]){
            inputRefs.current[otp.indexOf("")].focus();
        }
    }
    const handleKeyDown = (index, e) => {
        if(e.key == "Backspace" && !otp[index] && index>0 && inputRefs.current[index - 1]){
            inputRefs.current[index - 1].focus();
        }
    }

  return (
    <div className="flex gap-2">
        {
            otp.map( (value,index) => {
                return <input 
                key={index} 
                type="text"
                ref={(input) =>(inputRefs.current[index] = input)} 
                value={value}
                onChange={(e) => handleChange(index,e)} 
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otpInput"
                />
            })
        }
    </div>
  )
}

export default OtpInput