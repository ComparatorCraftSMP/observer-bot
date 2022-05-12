const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { data } = require('../commands/player');
dotenv.config();


const fetchPlaceholder = async (uuid, plh)  => {
    const placeholder = plh.replace("%", "%25")
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'key': `${process.env.API}`}
      }

    const response = await fetch(`${process.env.SERVER}/v1/placeholders/replace?message=${placeholder}25&uuid=${uuid}`, options)
    const data = await response.json()
    return data
}

module.exports = fetchPlaceholder