// const fetch = require('node-fetch');
// import fetch from 'node-fetch';


// fetch('https://cloud.securitasfleet.com/api-fleet/v2/swagger.json')
//   .then((respuesta) => {
//     return respuesta.json()
//   }).then((resp) => {
//     // setInterval(() => {
//     //   console.log(resp)
//     // }, '3000');
//     console.log(resp)
//   })

const axios = require('axios');
const querystring = require('querystring');

const clientId = 'pikango';
const clientSecret = '6UGoAJtXa4Kwo0Sa6ZAZhx0zZy0JBcnLEs04Fjsb2DBJfTn7uUNYdH9JSaVaA1j';
const redirectUri = 'https://cloud.securitasfleet.com//api-fleet/v2/trackables';

// Paso 1: Obtener el código de autorización
const getAuthorizationCode = async () => {
  const params = {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code'
  };

  const authorizationUrl = `https://proveedor-oauth.com/auth?${querystring.stringify(params)}`;
  console.log('Abre esta URL en tu navegador:', authorizationUrl);

  // Espera a que el usuario ingrese el código de autorización
  const authorizationCode = 'CODIGO_DE_AUTORIZACION';

  return authorizationCode;
};

// Paso 2: Obtener el token de acceso
const getAccessToken = async (authorizationCode) => {
  const params = {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    code: authorizationCode,
    grant_type: 'authorization_code',
  };

  const tokenUrl = 'https://proveedor-oauth.com/token';

  try {
    const response = await axios.post(tokenUrl, querystring.stringify(params));
    const { access_token, refresh_token } = response.data;
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error.message);
  }
};

// Ejecutar el flujo de autorización
(async () => {
  const authorizationCode = await getAuthorizationCode();
  await getAccessToken(authorizationCode);
})();