import axios from 'axios';

export function getAjaxCallWithoutParams(api, callbackFn) {
  const options = {
    method: 'GET',
    url: api,
  };

  axios.request(options).then(function (response) {
    if (callbackFn) {
      callbackFn(response, null)
    } else {
      return response.data
    }
  }).catch(function (error) {
    return error;
  });

}

export function postAjaxCall(api, data, callbackFn) {
  const options = {
    method: 'POST',
    url: api,
    data
  };

  axios.request(options).then(function (response) {
    if (callbackFn) {
      callbackFn(response, null)
    } else {
      return response.data
    }
  }).catch(function (error) {
    return error;
  });

}

export function getAjaxDataCall(api, inputParamJSON, callbackFn) {

  const options = {
    method: 'GET',
    url: api,
    params: inputParamJSON,
  };

  axios.request(options).then(function (response) {
    if (callbackFn) {
      callbackFn(response, null)
    } else {
      return response.data
    }
  }).catch(function (error) {
    return error;
  });

}

