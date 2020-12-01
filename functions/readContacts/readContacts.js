const faunadb = require("faunadb"),
  q = faunadb.query

exports.handler = async (event, context) => {
  try {
    var client = new faunadb.Client({
      secret: process.env.FAUNADB_ADMIN_SECRET,
    })

    var result = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("index"))),
        q.Lambda(["name", "ref"], q.Get(q.Var("ref")))
      )
    )

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
