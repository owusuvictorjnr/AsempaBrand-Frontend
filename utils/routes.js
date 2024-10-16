const baseApiUrl = 'http://54.235.108.224/api/v1'; 
const basefrontendUrl = 'http://localhost:3000';

const routes = {
  // Page routes
  pages: {
    home:'/',
    login: '/auth',
    verification: '/auth/verification-code',
    reset:`${basefrontendUrl}/auth/reset-password/`
  },
  
  // API routes
  api: {
    login: `${baseApiUrl}/token/`,
    loginwithGoogle: `${baseApiUrl}/auth/google/`,
    register: `${baseApiUrl}/register/`,
    verify :`${baseApiUrl}/verify-otp/`,
    resendOTP :`${baseApiUrl}/resend-otp/`,
    requestReset :`${baseApiUrl}/password/reset-request/`,
    resetPassword :`${baseApiUrl}/password-reset/`,
    getCarousels:`${baseApiUrl}/carousels/`,
    getCategories:`${baseApiUrl}/categories/`,
    getCollections:`${baseApiUrl}/collections/`,
    getNewArrivals:`${baseApiUrl}/products/newest-releases/`,
    getTopSellingProducts:`${baseApiUrl}/products/best-sellers/`
  },

  images:{
    base: `https://res.cloudinary.com/dckfbgbpr/`
  }

};

export default routes;
