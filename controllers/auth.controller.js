require('dotenv').config({
    path: './config.env'
});
let axios=require('axios')
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
console.log("🚀 ~ CLIENT_ID:", CLIENT_ID)
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.MODE == 'development' ? process.env.DEV_REDIRECT_URI : REDIRECT_URI
exports.authGoogle = (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
};

exports.callbackGoogle = async(req, res) => {
    const { code } = req.query;
    console.log("🚀 ~ exports.callbackGoogle=async ~ code:", code)

    try {
        // Exchange authorization code for access token
        const {
            data
        } = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
        });
        console.log('data', data);
        const {
            access_token,
            id_token
        } = data;
        console.log('access_token', access_token);

        // Use access_token or id_token to fetch user profile
        const {
            data: profile
        } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        });
        console.log('data profile', profile);
        // Code to handle user authentication and retrieval using the profile data

        res.redirect('http://localhost:3001');
    } catch (error) {
        console.error('Error:', error);
        res.redirect('http://localhost:3001/login');
    }
}