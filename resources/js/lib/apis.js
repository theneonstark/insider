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

export const updateProfile = async (data) => {
    try{
        const response = await axios.post('/auth/update', {data});
        return response;
    }catch(err){
        console.error('Something went wrong',err);
        throw err;
    }
}

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