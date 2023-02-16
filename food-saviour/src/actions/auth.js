import axios from 'axios';
import Cookies from 'js-cookie';

console.log(Cookies.get("csrftoken"))
export const l = (username, password) => async dispatch => {
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login/`, {
            username: username,
            password: password,
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-CSRFToken': Cookies.get("csrftoken")
            }
        });
    } catch (err) {
        console.log(err)
    }

};