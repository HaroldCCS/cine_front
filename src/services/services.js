import axios from 'axios'
const API_URI = window.env.API_ENDPOINT;

export default class Services {
  static headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };


  static async get(rute) {
    let response = {};
    try {
      response = await axios.get(API_URI + rute);
      response.statusCode = 200;
    } catch (error) {
      response.statusCode = 400;
    }
    return response
  }

  static async post(rute, body) {
    let response = {};
    try {
      response = await axios.post(API_URI + rute, body, { headers: "" });
      response.statusCode = 200;
    } catch (error) {
      response.statusCode = 400;
    }
    return response
  }

  static async put(rute, body) {
    let response = {};
    try {
      response = await axios.put(API_URI + rute, body);
      response.statusCode = 200;
    } catch (error) {
      response.statusCode = 400;
    }
    return response
  }

  static async delete(rute) {
    let response = {};
    try {
      response = await axios.delete(API_URI + rute);
      response.statusCode = 200;
    } catch (error) {
      response.statusCode = 400;
    }
    return response
  }
}
