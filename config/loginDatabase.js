const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const databaseAPI = {
  url: "https://blogposts-7a28.restdb.io/rest/",
  config: {
    headers: {
      "content-type": "application/json",
      "x-apikey": process.env.REST_DB_API_KEY,
    },
  },
  async write(collection, payload) {
    try {
      const endpoint = `${this.url}${collection}`;
      const postResponse = await axios.post(endpoint, payload, this.config);
      console.log(`${collection} collection updated: `, postResponse.data);
      return postResponse;
    } catch (error) {
      console.error("Error updating database:", error);
      throw error;
    }
  },
  async update(collection, id, updatedPayload) {
    try {
      const updateEndpoint = `${this.url}${collection}/${id}`;
      const updateResponse = await axios.patch(
        updateEndpoint,
        updatedPayload,
        this.config
      );
      console.log(`${collection} collection updated: `, updateResponse.data);
      return updateResponse.data;
    } catch (error) {
      console.error("Error updating database:", error);
      throw error;
    }
  },
  async findUserByUsername(username) {
    try {
      const response = await axios.get(
        `${this.url}logins?q={"username":"${username}"}`,
        this.config
      );
      const user = response.data[0];
      console.log(user);
      return user || null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },
};
module.exports = databaseAPI;
