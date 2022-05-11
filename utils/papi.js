const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
dotenv.config();


const fetchPlaceholder = async (uuid, plh)  => {

}

module.exports = fetchPlaceholder