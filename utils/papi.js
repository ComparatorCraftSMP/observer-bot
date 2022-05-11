
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const fetchPlaceholder = async ()  => {

}

module.exports = fetchPlaceholder