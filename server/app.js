const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

//set up some middleware
app.use('/graphql', graphqlHTTP({

}));

app.listen(4000, () => {
    console.log('now listening to port 4000');
});