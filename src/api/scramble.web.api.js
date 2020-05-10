const baseUrl = "https://scramble-web-api.herokuapp.com";
//const baseUrl = "http://localhost:2020";
const scrambleEndpoint = "/scramble";

export const getFmcScrambles = (n) => {
  let url = new URL(baseUrl + scrambleEndpoint + "/333fm");
  url.searchParams.append("numberOfScrambles", n);

  return fetch(url.href);
};
