const query_string = require ('querystring');
const axios = require("axios")

const github_auth_token_endpoint = 'https://github.com/login/oauth/authorize';
const github_access_token_endpoint = 'https://github.com/login/oauth/access_token';

const query_params = {
  client_id: process.env.CLIENT_APP_ID,
  redirect_uri: `http://192.168.1.74:3000${process.env.REDIRECT_URI}`,
};

const auth_token_params = {
    ...query_params,
    response_type: 'code',
};

const scopes = "read:user user:email";

const request_get_auth_code_url = `${github_auth_token_endpoint}?${query_string.stringify (auth_token_params)}&scope=${query_string.escape(scopes)}`;

const get_access_token = async auth_code => {
    const access_token_params = {
      ...query_params,
      client_secret: process.env.CLIENT_APP_SECRET,
      code: auth_code,
      grant_type: 'authorization_code',
    };
    return await axios ({
      method: 'post',
      url: `${github_access_token_endpoint}?${query_string.stringify (access_token_params)}`,
    });
};

const get_profile_data = async access_token => {
    const tokenMatch = access_token.match(/access_token=([^&]*)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
        throw new Error('Invalid access token');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get('https://api.github.com/user', config);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile data:', error.response.data);
        throw new Error('Failed to fetch user profile data');
    }
};

module.exports = {
    request_get_auth_code_url,
    get_access_token,
    get_profile_data
}