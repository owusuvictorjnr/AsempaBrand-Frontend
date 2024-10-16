/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router"; // Use 'next/router' to extract query params
import { ResendOTP, VerifyUser } from "@/server/authapi";
import routes from "@/utils/routes";

function Index() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill("")); 
  const [resendLoading, setResendLoading] = useState(false); // Loading state for resending OTP
  const [countdown, setCountdown] = useState(60); // Timer state for countdown
  const [canResend, setCanResend] = useState(false); // Control when resend button is available

  const inputRefs = useRef([]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [message, router]); 

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email); 
    }
  }, [router.query.email]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to the next input box
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  // Timer effect for the countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true); 
    }
  }, [countdown]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    let payload;
    const otpCode = otp.join("");
    payload = { email, otp_code: otpCode };

    try {
      const response = await VerifyUser(payload);
      console.log(response);
      router.push(routes.pages.login);
      setLoading(false);
    } catch (error) {
      if (typeof error === "object" && error !== null) {
        setErrors(error);
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again later.",
        });
      }
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    let payload;
    payload = { email};
    setResendLoading(true);
    setCountdown(60); 
    setCanResend(false); 

    try {
      const response = await ResendOTP(payload);
      console.log(response);
      setResendLoading(false);
      setMessage('Verification Code Sent Sucessfully')
    } catch (error) {
      if (typeof error === "object" && error !== null) {
        setErrors(error);
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again later.",
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AsempaBrand </title>
        <meta name="asempabrand" content="Asempabrand" />
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div className="flex bg-white rounded-lg overflow-hidden w-full max-w-4xl h-[650px]">
          {/* Left side: Image */}
          <div className="hidden lg:block w-1/2 relative">
            <Image
              className="bg-white rounded-md"
              src="/assets/login-bg.svg"
              alt="Login Image"
              layout="fill"
              objectFit="contain"
            />
          </div>
          {/* Right side: Form */}
          <div className="w-full lg:w-1/2 p-8 relative overflow-y-auto scrollbar-hide">
            {/* Logo for small screens */}
            <div className="block lg:hidden text-center mb-6">
              <Image
                src="/assets/logo.svg"
                alt="Logo"
                width={150}
                height={50}
                className="mx-auto"
              />
            </div>

            <h2 className="text-xl font-semibold mb-4 text-center justify-center">
              Verification Code
            </h2>
            <p className="text-gray-500 mb-6 text-xs text-center justify-center">
              Enter Verification Code sent to your email
            </p>
            {errors.error && (
              <p className="bg-red-600 text-center text-xs mt-1 p-2 text-white mb-2 rounded-md">{errors.error}</p>
            )}
            {message && (
              <p className="text-center text-xs mt-1 p-2 bg-green-600 text-white mb-2 rounded-md">
                {message}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  placeholder="Enter Email Address"
                  type="email"
                  value={email} // Pre-fill the email input
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-brandPrimary"
                  required
                  readOnly // Make the email input read-only
                />
              </div>

              <div className="flex justify-between mb-4">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input box
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="text-xs w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-1 focus:ring-brandPrimary"
                  />
                ))}
              </div>
                        {/* Resend OTP section */}
            <div className="mt-4 text-center mb-6">
              {canResend ? (
                <button
                  onClick={handleResendOtp}
                  className="text-xs text-brandPrimary underline"
                  disabled={resendLoading}
                >
                  {resendLoading ? "Resending..." : "Resend OTP"}
                </button>
              ) : (
                <p className="text-xs text-gray-500">
                  Resend OTP in {countdown} seconds
                </p>
              )}
            </div>

              <button
                type="submit"
                className="text-xs w-full bg-brandPrimary text-white py-3 rounded-md"
              >
                {loading ? "Verifying. Please Wait..." : "Verify Code"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
