const baseUrl = "https://scramble-web-api.herokuapp.com";
const scrambleEndpoint = "/scramble";

export const getFmcScrambles = (n: number): Promise<Response> => {
  const url = new URL(baseUrl + scrambleEndpoint + "/333fm");
  url.searchParams.append("numberOfScrambles", String(n));

  return fetch(url.href);
};
