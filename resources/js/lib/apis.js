import axios from "axios";
const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.content;

export const register = async (data) => {
    try{
        const res = await axios.post('/register', data);
    return res;
    }catch(err){
        console.error('Something Went Wrong', err);
        throw err;
    }

}

export const Login = async (data) => {
    try {
        const response = await axios.post('/auth/check', {
                _token: csrfToken, // Automatically include the CSRF token
                ...data
        });
        return response; // Directly returning the data
    } catch (error) {
        console.error('Error fetching business statistics:', error);
        throw error; // Re-throw the error for handling in the component
    }
};

export const Data = async () => {
    try{
        const res = await axios.get('/region')
        return res;
    }catch(err){
        console.error(err);
        throw err;
    }
}

export const updateProfile = async (data, isFileUpload = false) => {
  try {
    let response;

    if (isFileUpload) {
      // 🟢 For file uploads
      response = await axios.post("/auth/update", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      // 🟡 For normal JSON payload
      response = await axios.post("/auth/update", { data });
    }

    return response;
  } catch (err) {
    console.error("Something went wrong", err);
    throw err;
  }
};

export const updateLandingPage = async(data) => {
    try{
        const response = await axios.post(`/updatelandingpage`, data)
        return response;
    }catch(err){
        console.error('Something went wrong',err);
        throw err;
    }
}

export const getLandingPage = async() => {
    try{
        const res = await axios.get('/getLandingPage');
        return res;
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const membershipPlans = async() => {
    try{
        const res = await axios.get('/membership/plans');
        return res;
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const increaseView = async (id) => {
  try {
    const res = await axios.post("/increase-view", { id });
    return res.data;
  } catch (error) {
    console.error("Error increasing view:", error);
    throw error;
  }
};

export const getFeatured = async(data) => {
    try{
        const res = await axios.post('/featured', data);
        return res;
    }catch(err){
        console.error(err);
        throw err;
    }
}

export const updatePassword = async(data) => {
    try{
        const res = await axios.post('/auth/passwordChange', data);
        return res;
    }catch(err){
        console.error(err);
        throw err;
    }
}

export const filter = async(data) => {
    try{
        const res = await axios.post('/search/filter', data);
        return res;
    }catch(err){
        console.error(err);
        throw err;
    }
}

export const allUsers = async () => {
  return await axios.get('/allUsers');
};

export const sparkleUser = async() => {
  try{
    const res = await axios.get('/data/sparkle')
    return res;
  }catch(err){
    console.error(err);
    throw err;
  }
}

export const shineUser = async() => {
  try{
    const res = await axios.get('/data/shine')
    return res;
  }catch(err){
    console.error(err);
    throw err;
  }
}

export const shinePlusUser = async() => {
  try{
    const res = await axios.get('/data/shinePlus')
    return res;
  }catch(err){
    console.error(err);
    throw err;
  }
}

export const getAds = () => axios.get('/ads/data');
export const userAds = () => axios.get('/ads/your')
export const CreateAds = (data) => axios.post('/ads/create', data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const CreateAdminAds = (data) => axios.post('/admin/ads/create', data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const updateAd = (id, data) => axios.post(`/ads/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const deleteAd = (id) => axios.delete(`/ads/${id}`);
export const updateAdStatus = (id, data) => axios.post(`/ads/${id}/status`, data);

// Admin APIs

export const userdata = async() => {
    try{
        const res = await axios.get('/admin/userdata');
        return res?.data;
    }catch(err){
        console.error(err);
        throw err;
    }
}

export const revenueData = async() => {
    try{
        const res = await axios.get('/admin/revenue');
        return res;
    }catch(err){
        console.error(err);
        throw err;
    }
}

export const revenueByTier = async () => {
  try {
    const res = await axios.get('/admin/revenue-tier');
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addFeature = async (userId) => {
  try {
    const res = await axios.post('/admin/feature/add', { user_id: userId });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const removeFeature = async (userId) => {
  try {
    const res = await axios.post('/admin/feature/remove', { user_id: userId });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateAdminSettings = async (data) => {
  try {
    const res = await axios.post('/admin/setting/update', data);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
