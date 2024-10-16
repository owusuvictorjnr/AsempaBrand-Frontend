import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Loader from "@/components/Loader";

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  return decodedToken.exp * 1000 < Date.now();
};

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [tokenData, setTokenData] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        let accessToken = Cookies.get("access");

        if (!accessToken || isTokenExpired(accessToken)) {
          router.push("/auth");
          return;
        }

        try {
          const decodedToken = jwtDecode(accessToken);
          setTokenData(decodedToken);
        } catch (error) {
          console.error("Error decoding token:", error);
          router.push("/auth");
        }

        setLoading(false);
      };

      setTimeout(() => {
        checkAuth();
      }, 500);
    }, [router]);

    if (loading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} tokenData={tokenData} />;
  };
};

export default withAuth;
