import Axios from 'axios'

//const env = process.env.NODE_ENV;

export default Axios.create({
        // baseURL:
        //         env === 'production' ? 'https://hms-mern-backend.herokuapp.com/' : 'http://localhost:8080/',
        responseType: 'json'
});


