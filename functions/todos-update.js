const faunadb = require('faunadb');
q = faunadb.query

// require("dotenv").config()


exports.handler = async function(event, context) {

    try{


        let reqObject = JSON.parse(event.body);
        const client = new faunadb.Client({secret: 'fnAD7m5S58ACAmN2MZH6HJTBY4CLude2d3mVWzOU'});

        const result = await client.query(
            q.Update(
                q.Ref(q.Collection('CRUD'), reqObject.id),
                { data: { message:  reqObject.message} },
              )
        )
        
        return { 
            statusCode: 200, 
            body: JSON.stringify({message: `Successfully Updated Item from Database at ${result.ref.id}` })
            
        }
        

    } catch (error){

        return { statusCode: 400, body: `Event Not present in ${error.toString()}`  }

    }


}