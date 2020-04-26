const bungieFetch = async (route, body) => {
  const config = {
    method: body ? `POST` : `GET`,
    headers: {
      "X-API-Key": process.env.BUNGIE_API_KEY,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`https://www.bungie.net${route}`, config);
  const data = await response.json();

  if (response.ok) {
    return data.Response;
  } else {
    return Promise.reject(data);
  }
};

export default bungieFetch;
