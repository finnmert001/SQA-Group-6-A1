const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

//new database api object
const databaseAPI = {
  url: 'https://blogposts-7a28.restdb.io/rest/',
  config: {
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': process.env.REST_DB_API_KEY
    }
  },
  async write(collection, payload) { // function to write an entry to a collection in the database
    try {
        const endpoint = this.url + collection;
        const postResponse = await axios.post(endpoint, payload, this.config);
        console.log(`${collection} collection updated: `, postResponse.data);
    } catch (error) {
        console.error('Error updating database:', error);
        throw error; 
    }
  },
  async findUserByUsername(username) { // searches for a user in the logins collection in the database
    try {
        const response = await axios.get(`${this.url}logins?q={"username":"${username}"}`, this.config);
        const user = response.data[0];
        console.log(user);
        return user || null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
  }
};
module.exports = databaseAPI;