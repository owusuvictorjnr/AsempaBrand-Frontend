import { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Head from "next/head";
import { forgotPassword, loginUser, registerUser } from "@/server/authapi";
import { useRouter } from "next/router";
import routes from "@/utils/routes";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

export default function Home() {
  const [isRegister, setIsRegister] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    let payload;

    if (isForgotPassword) {
      // Forgot Password Request
      payload = { email, frontend_url: routes.pages.reset };
    } else if (!isRegister) {
      // Login Request
      payload = { email, password,remember_me:rememberMe };
    } else {
      // Register Request
      payload = {
        first_name,
        last_name,
        email,
        password,
        password_confirm: confirm_password,
      };
    }

    try {
      if (isForgotPassword) {
        // Forgot Password API Call
        const response = await forgotPassword(payload);
        setMessage(response.message);
        setEmail("");
        setLoading(false);
      } else if (!isRegister) {
        const response = await loginUser(payload);
        const decodedToken = jwtDecode(response.access);
        Cookies.set("access", response.access, {
          expires: decodedToken.exp * 1000 < Date.now(),
          secure: true,
          sameSite: "Strict",
        });
        router.push(`${routes.pages.home}`);
      } else {
        // Register API Call
        // eslint-disable-next-line no-unused-vars
        const response = await registerUser(payload);
        router.push({
          pathname: routes.pages.verification,
          query: { email },
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
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

  // Function to handle Google authentication
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken(); 
      const response = await axios.post(
        routes.api.loginwithGoogle,
        {
          id_token: idToken, 
        }
      );
      const decodedToken = jwtDecode(response.data.access_token);
      Cookies.set("access", response.data.access_token, {
        expires: decodedToken.exp * 1000 < Date.now(),
        secure: true,
        sameSite: "Strict",
      });
      router.push(`${routes.pages.home}`); 

      return {
        response,
      };
    } catch (error) {
      const errorMessage = error.message;
      return { error: errorMessage };
    }
  };



  return (
    <>
      <Head>
        <title>AsempaBrand </title>
        <meta name="asempabrand" content="Asempabrand" />
      </Head>
      <div className="flex justify-center items-center h-screen ">
        <div className="flex bg-white rounded-lg overflow-hidden w-full max-w-4xl h-[650px]">
          {/* Left side: Image */}
          <div className="hidden lg:block w-1/2 relative">
            <Image
              className=" bg-white rounded-md"
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
              {isForgotPassword
                ? "Forgot Password?"
                : isRegister
                ? "Create an Account"
                : "Login to your Account"}
            </h2>
            <p className="text-gray-500 mb-6 text-xs text-center justify-center">
              {isForgotPassword
                ? "No worries, we will send you reset instructions. Please enter your email address."
                : isRegister
                ? "Register below to continue."
                : "Welcome back! Select a method to login:"}
            </p>

            {!isForgotPassword && (
              <>
                <div className="text-center">
                  <button
                    onClick={handleGoogleAuth}
                    className="w-full flex items-center justify-center border py-2 rounded-md"
                  >
                    <Image
                      width={100}
                      height={100}
                      src="/assets/Google.svg"
                      alt="Google"
                      className="w-6 h-6 mr-2"
                    />
                    <span className="font-semibold">Google</span>
                  </button>
                </div>
                <div className="flex items-center mb-4 mt-4">
                  <hr className="flex-grow border-black" />
                  <span className="text-black mx-4 text-xs">
                    or continue with email
                  </span>
                  <hr className="flex-grow border-black" />
                </div>
              </>
            )}
            {errors.detail && (
              <p className="text-center text-xs mt-1 p-2 bg-red-600 text-white mb-2 rounded-md">
                {errors.detail}
              </p>
            )}
            {message && (
              <p className="text-center text-xs mt-1 p-2 bg-green-600 text-white mb-2 rounded-md">
                {message} Check your email for the Rest Password Link
              </p>
            )}
            <form onSubmit={handleSubmit}>
              {errors.general && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errors.general}
                </div>
              )}
              {!isForgotPassword && isRegister && (
                <div className="mb-4">
                  <input
                    placeholder="Enter First Name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className=" text-xs w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-brandPrimary"
                    required
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.first_name[0]}
                    </p>
                  )}
                </div>
              )}
              {!isForgotPassword && isRegister && (
                <div className="mb-4">
                  <input
                    placeholder="Enter Last Name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className=" text-xs w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-brandPrimary"
                    required
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.last_name[0]}
                    </p>
                  )}
                </div>
              )}
              <div className="mb-4">
                <input
                  placeholder="Enter Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-brandPrimary"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
                )}
              </div>
              {!isForgotPassword && (
                <div className="mb-4 relative">
                  <input
                    placeholder="Enter Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-xs w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-brandPrimary"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password[0]}
                    </p>
                  )}
                </div>
              )}
              {!isForgotPassword && isRegister && (
                <div className="mb-4 relative">
                  <input
                    placeholder="Confrim Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="text-xs w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-brandPrimary"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </div>
                  {errors.confirm_password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirm_password[0]}
                    </p>
                  )}
                </div>
              )}
              <div className=" text-xs mb-4 flex justify-between items-center">
                {!isForgotPassword && !isRegister && (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember Me
                  </label>
                )}
                {!isForgotPassword && !isRegister && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setIsForgotPassword(true)}
                      className="text-brandPrimary text-xs"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="text-xs w-full bg-brandPrimary text-white py-3 rounded-md"
                disabled={loading} // Disable button when loading
              >
                {loading
                  ? "Processing.Please Wait..."
                  : isForgotPassword
                  ? "Send"
                  : isRegister
                  ? "Create Account"
                  : "Login"}
              </button>
            </form>

            {!isForgotPassword && (
              <div className="mt-4 text-center text-xs">
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-brandPrimary"
                >
                  {isRegister ? (
                    <p>
                      <span className="text-black">
                        Already have an account?
                      </span>{" "}
                      Login
                    </p>
                  ) : (
                    <p>
                      <span className="text-black">Not registered yet?</span>{" "}
                      Create An Account
                    </p>
                  )}
                </button>
              </div>
            )}
            {!isForgotPassword && (
              <div className="mt-4 text-center border-2 text-xs py-3 rounded-md">
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-black"
                >
                  {"Continue as Guest"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
