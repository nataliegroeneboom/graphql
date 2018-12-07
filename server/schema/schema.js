const graphql = require('graphql');
const _ = require('lodash');
// this file will set out the structure
// of the data and relationship between the objects

//destructuring
const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
        }  = graphql;


//dummy data as not connected to a database yet
const books = [
    {name: 'Stalin', genre: 'History', id:'1', authorid: '1'},
    {name: 'Harry Pottery and the Deathly Hallows', genre: 'Sci-Fi', id:'2', authorid:'2'},
    {name: 'Harry Pottery and the Philosophers Stone', genre: 'Sci-Fi', id:'3', authorid:'2'},
    {name: 'Nineteen Eighty Four', genre: 'Sci-Fi', id:'4', authorid:'3'},
];

const authors = [
    {name: 'Stephen Kotkin', age: 44, id: '1'},
    {name: 'J. K. Rowling', age: 45, id: '2'},
    {name: 'Gorge Orwell', age: 123, id: '3'}
]


const BookType = new GraphQLObjectType({
    //define object type 'book'
    name:'Book',
    fields: () => ({
   //define types
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { type: AuthorType,
                  resolve(parent, args){
            console.log(parent);
            return _.find(authors, {id: parent.authorid})
                  }  }
    })
});

const AuthorType = new GraphQLObjectType({
    //define object type 'book'
    name:'Author',
    fields: () => ({
        //define types
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
           type: new GraphQLList(BookType),
           resolve(parent,args){
               return _.filter(books, {authorid: parent.id})
           }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        //name of the query ie 'book'
        book: {
            //when a query of a book is made, it expects argument of id with the book (and defining type)
            type: BookType,
            args: {id: {type: GraphQLID}},
            //resolve function takes two parameters
            resolve(parent, args){

                // code to get data from db/other source
                console.log(typeof(args.id))
               return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
}
});



module.exports = new GraphQLSchema({
    query: RootQuery
});