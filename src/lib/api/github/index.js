import jwt from 'jsonwebtoken';

/** @type {string} */
let accessToken;

/**
 * @param {number} installationId
 * @param {string} token
 * @returns {Promise<string>} 
 */
async function getAccessToken(installationId, token) {
  const data = await fetchGitHub(
    `/app/installations/${installationId}/access_tokens`,
    token,
    { method: 'POST' }
  );
  return data.token;
}

function getGitHubJWT() {
  return jwt.sign(
    {
      iat: Math.floor(Date.now() / 1000) - 60,
      iss: process.env.GITHUB_APP_ID,
      exp: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes is the max
    },
    process.env.GITHUB_APP_PK_PEM,
    {
      algorithm: 'RS256',
    }
  );
}


/**
 * @param {string} token
 * @returns {Promise<Object>} 
 */
async function getInstallation(token) {
  const installations = await fetchGitHub('/app/installations', token);
  return installations.find((i) => i.account.login === process.env.GITHUB_USER_NAME);
}


/**
 * @param {string} path
 * @param {string} token
 * @param {any} opts
 */
function createGitHubRequest(path, token, opts = {}) {
  return fetch(`https://api.github.com${path}`, {
    ...opts,
    headers: {
      ...opts.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
  });
}

/**
 * @param {string} path
 * @param {string} token
 * @param {any} opts
 * @returns {Promise<Object>} 
 */
export async function fetchGitHub(path, token, opts = {}) {
  let req = await createGitHubRequest(path, token, opts);

  if (req.status === 401) {
    // JWT has expired, cache a new token
    await setAccessToken();
    // Retry request with new cached access token
    req = await createGitHubRequest(path, accessToken, opts);
  }

  return req.json();
}


/**
 * @returns {Promise<string>} 
 */
export async function readAccessToken() {
  // check if exists
  if (!accessToken) {
    await setAccessToken();
  }

  return accessToken;
}

export async function setAccessToken() {
  const jwt = getGitHubJWT();
  const installation = await getInstallation(jwt);

  accessToken = await getAccessToken(installation.id, jwt);

  return accessToken;
}