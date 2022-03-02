import { getToken } from "./token";

export const loginUser = async (identifier, password) => {
  console.log('-1>' + identifier + '-' + password);
 
  const res = await fetch("http://localhost:1337/api/auth/local", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json();
  return data;
};
// ------------------------------------------------------------*
export const registerUser = async (payload) => {
  console.log('-1>' + payload.email + '-' + payload.username + '-' + payload.password);
  const res = await fetch("http://localhost:1337/api/auth/local/register", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(function (resp) {
    console.log(resp.status);
    console.log(resp.ok);
    console.log(JSON.stringify(resp.json()));
    return resp;
  });

  //return await res;
};
// ------------------------------------------------------------*
export const whoAmI = async () => {
  const res = await fetch("http://localhost:1337/api/users/1", {
    headers: {
      authorization: getToken(),
    },
    method: "GET",
  });
  const data = await res.json();
  return data;
};