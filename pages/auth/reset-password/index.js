import { useState, useEffect} from "react";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Head from "next/head";
import { useRouter } from "next/router"; // Import useRouter
import { ResetUserPassword } from "@/server/authapi";
import routes from "@/utils/routes";

export default function ResetPassword() {
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(''); // State to handle errors
  const [loading, setLoading] = useState(false); // State to handle loading
  const [errors, setErrors] = useState({}); // State to handle errors
  const router = useRouter(); // Access the router
  const { uid, token } = router.query; // Extract uid and token from URL query params

      // Hide message and error after 10 seconds
  // Hide message and errors after 10 seconds and redirect
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setErrors({});

        // Redirect to home page after clearing the message
        router.push(`${routes.pages.login}`); // Redirect to home page
      }, 3000); // Hide after 10 seconds

      // Cleanup timer on component unmount or if message changes
      return () => clearTimeout(timer);
    }
  }, [message, router]); // Ensure router is included in the dependency array


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const payload = { new_password, confirm_password };

    try {
      const response = await ResetUserPassword(uid,token,payload);
      setMessage(response.message)
      setNewPassword("")
      setConfirmPassword("")
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
              Reset Password
            </h2>
            <p className="text-gray-500 mb-6 text-xs text-center justify-center">
              Enter new password
            </p>
            {message&& (
                  <p className="text-center text-xs mt-1 p-2 bg-green-600 text-white mb-2 rounded-md">{message}</p>
                )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <input
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  value={new_password}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                {errors.new_password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.new_password[0]}
                    </p>
                  )}
              </div>

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

              <button
                type="submit"
                className=" text-xs w-full bg-brandPrimary text-white py-3 rounded-md"
              >
                   {loading
                  ? "Processing.Please Wait..."
                  :"Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
