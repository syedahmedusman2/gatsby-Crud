/* Import faunaDB sdk */
const process = require('process')

const { query, Client } = require('faunadb')

const client = new Client({
  secret: 'fnAD9iF5ZUACBHW8GJQ02QTjVCRVOcJZSgTgi3pV',
})

const handler = async (event) => {
  const data = JSON.parse(event.body)
  const { id } = event
  console.log(`Function 'update' invoked. update id: ${id}`)
  return client
    .query(
      query.Update(
        query.Ref(query.Collection('todos'),id),
        {data},
      )
      )
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}

module.exports = { handler }