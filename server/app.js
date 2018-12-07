const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

//set up some middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true

}));

app.listen(4000, () => {
    console.log('now listening to port 4000');
});