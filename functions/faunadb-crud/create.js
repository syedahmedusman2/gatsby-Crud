// const process = require('process')

const {Client,query}= require('faunadb')
require('dotenv').config();

/* configure faunaDB Client with our secret */
const client = new Client({
  secret: 'fnAD9iF5ZUACBHW8GJQ02QTjVCRVOcJZSgTgi3pV',
})

/* export our lambda function as named "handler" export */
const handler = async (event) => {
  /* parse the string body into a useable JS object */

  // if(event.httpMethod!=='POST'){
  //   return { statusCode: 405, body: "Method Not Allowed" }
  // }

  const data = JSON.parse(event.body)
  console.log('Function `create` invoked', data)
  const item = {
    data,
  }
  /* construct the fauna query */
  return client
    .query(query.Create(query.Collection('todos'), item))
    .then((response) => {
      console.log('success', response)
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      console.log('error', error)
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}

module.exports = { handler }