import axios from "axios";

const ApiURL = process.env.REACT_APP_API_URL;

export async function getBots(params) {
  try {
    const resp = await axios.get(`${ApiURL}/_get_all_chatbots`, {
      params: params,
    });
    console.log(resp.data);
    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export async function startSession(params) {
  return await axios.get(`${ApiURL}/_start_session`, {
    params: params,
  });
}
export async function postMessage(params) {
  return await axios.get(`${ApiURL}/__post_message`, {
    params: params,
  });
}

//  params: {'session_id': session_id }
export async function getResponse(params) {
  return await axios.get(`${ApiURL}/_get_response`, {
    params: params,
  });
}
