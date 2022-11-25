import axios from "axios";

const ApiURL = "http://128.199.46.26:8002";

export async function getBots(params) {
  return await axios.get(`${ApiURL}/_get_all_chatbots`, {
    params: params,
  });
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
