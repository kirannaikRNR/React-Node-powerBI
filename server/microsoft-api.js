const request = require('request-promise');

const clientId = "a05f2d4b-1f2f-4d65-868a-7e0f287e83ae" ;
const clientSecret = "5c3_pZ753YLPJZQ7-O_HD.7u1-.C8KNyKY" ;
const proxyUserAuthUrl = "https://login.microsoftonline.com/7b3d0e11-bc5e-4f10-973e-8c50ccf0df65/oauth2/token";
const proxyUserUsername = process.env.FAHEY_PROXY_USER_USERNAME || 'No proxy username set';
const proxyUserPassword = process.env.FAHEY_PROXY_USER_PASSWORD || 'No proxy user password set';

const groupId = 'c22eb093-75e7-4d99-b6bd-55e1f3fec916';
const reportId = 'b5f06fb4-9615-4385-b634-b662cadedb70';

const microsoftApi = {
  getBearerTokenResponse: async () => {
    const options = {
      method: 'POST',
      url: proxyUserAuthUrl,
      headers:
      {
        'cache-control': 'no-cache',
        'Authorization' : 'OAuth2',
        'Content-type' : "application/X-www-form-urlencoded"
      },
      formData:
      {
        resource: 'https://analysis.windows.net/powerbi/api',
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
        // username: proxyUserUsername,
        // password: proxyUserPassword,
        //scope: 'openid'
      },
      json: true
    };

    return request(options);
  },

  getPowerBiEmbedTokenForBearerToken: async (bearerToken) => {
    const options = {
      method: 'POST',
      url: `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`,
      headers:
      {
        'cache-control': 'no-cache',
        authorization: `Bearer  ${bearerToken}`,
        'content-type': 'application/json; charset=utf-8'
      },
      body: {
        accessLevel: 'View'
      },
      json: true
    };

    return request(options);
  },
  
};





module.exports = microsoftApi;
