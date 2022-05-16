const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { data } = require('../commands/player');
dotenv.config();


const fetchPlaceholder = async (uuid, plh)  => {
    const placeholder = plh.replace(/(%)/g, "%25")
    const options = {
        method: 'POST',
        headers: {'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded', 'key': `${process.env.API}`},
        body: `message=${placeholder}&uuid=${uuid}`
        //body: 'message=%25discordsrv_user_name%25&uuid=8b005697-0c91-42bd-b404-9e065e08fbb8'
      }

    const response = await fetch(`${process.env.SERVER}/v1/placeholders/replace`, options)
    
    const data = await response.text()
    return data.replace(/(")/g, '')
    
}

module.exports = fetchPlaceholder

