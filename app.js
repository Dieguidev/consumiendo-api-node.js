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

const clientId = 'pikango';
const clientSecret = '6UGoAJtXa4Kwo0Sa6ZAZhx0zZy0JBcnLEs04Fjsb2DBJfTn7uUNYdH9JSaVaA1j';
const apiUrl = 'https://cloud.securitasfleet.com/api-fleet/v2/trackables';

// Función para obtener el token de acceso
const getAccessToken = async () => {
  const tokenUrl = 'https://cloud.securitasfleet.com/token';
  const params = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
    scope: 'api.fleet',
  };

  try {
    const response = await axios.post(tokenUrl, params);
    const { access_token } = response.data;
    
    console.log(access_token);
    return access_token;
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error.message);
    throw error;
  }
};

// Función para realizar la solicitud a la API
const makeApiRequest = async () => {
  try {
    const accessToken = await getAccessToken();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(apiUrl, { headers });
    console.log('Respuesta de la API:', response.data);
  } catch (error) {
    console.error('Error al realizar la solicitud a la API:', error.message);
  }
};

// Ejecutar la solicitud a la API
makeApiRequest();
