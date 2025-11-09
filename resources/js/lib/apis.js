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