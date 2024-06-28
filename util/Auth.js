import axios from "axios";

const URL='https://hint-backend.vercel.app/api/user/'

export async function createUser(email, password,userName) {
  const res = await axios.post(
    `${URL}signup`,
    {
      email: email,
      password: password,
      userName:userName
    }
  );
  return res;
}
export async function logInUser(email, password) {
  const res = await axios.post(`${URL}signin`, {
    email: email,
    password: password
   
  });
  return res;
}

export async function getUserdetails(token) {
  try {
    
    const response = await fetch(`${URL}profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getUserdetails:', error);
    throw error;
  }
}