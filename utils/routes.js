const baseApiUrl = 'http://54.235.108.224/api/v1'; 
const basefrontendUrl = 'http://localhost:3000';

const routes = {
  // Page routes
  pages: {
    home:'/',
    login: '/auth',
    verification: '/auth/verification-code',
    reset:`${basefrontendUrl}/auth/reset-password?`,
    category: (slug) => `/category?slug=${slug}`,
    collection: (slug) => `/collection?slug=${slug}`,
    detials: (slug) => `/details?slug=${slug}`,
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
    getTopSellingProducts:`${baseApiUrl}/products/best-sellers/`,

    ////////////////////////////////////////////////////////////////////////////////

    getaCategory:(slug) =>`${baseApiUrl}/categories/${slug}`,
    getaCollection:(slug) =>`${baseApiUrl}/collections/${slug}`,
    getaProduct:(slug) =>`${baseApiUrl}/products/${slug}`



  },

  images:{
    base: `https://res.cloudinary.com/dckfbgbpr/`
  }

};

export default routes;
