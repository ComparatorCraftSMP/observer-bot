const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
dotenv.config();


const fetchPlaceholder = async (uuid, plh)  => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'key': `${process.env.API}`}
      }

    const response = await fetch(`${process.env.SERVER}/v1/placeholders/replace`, options)

}

module.exports = fetchPlaceholder