import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import OtpInput from '../OtherComponents/OtpInput';

const VerificationPage = () => {
    const [verificationCode, setVerCode] = useState("");
    const location = useLocation();
    const [error, setError] = useState("");
    const email = location.state?.email;
    const navigate = useNavigate();

    console.log(email);

    const handleVerification = async () => {
        const response = await fetch("http://localhost:8085/auth/verify", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, verificationCode:verificationCode})
        });

        if(response.ok){
            navigate("/login");
        } else {
            const message = await response.text();
            setError(message);
        }
    }

  return (
    <div className="screen-adapt">
        <div className="flex flex-col border border-gray-400 rounded-[20px] px-6 py-6 my-[10%] lg:my-[5%] items-center justify-center gap-5">
            <h1 className='page_header'>Verify your account</h1>
            <p className="auth_paragraph opacity-60">Enter the code sent to your email in order to verify your account.</p>
            <OtpInput length={6} onComplete={setVerCode}/>

            <button className='verification_button'onClick={handleVerification}>
                Verify
            </button>

            <div className="flex gap-2">
                <span>Didn't receive code?</span>
                <button className="resend_ver_btn">Resend Verification Code</button>
            </div>
        </div>
    </div>
  )
}

export default VerificationPage