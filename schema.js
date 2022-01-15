const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const axios = require('axios')

//Dummy data
/*
const customers = [
    { id: '1', name: 'John Doe', email: 'john@gmail.com', age: 35 },
    { id: '2', name: 'Steve Smith', email: 'steve@gmail.com', age: 25 },
    { id: '3', name: 'Sara Williams', email: 'sara@gmail.com', age: 32 }
];
*/

// CustomerType
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                /*
                for (let i = 0; i < customers.length; i++) {
                    if (customers[i].id == args.id) {
                        return customers[i]
                    }
                }
                */
               return axios.get(`http://localhost:3000/customers/${args.id}`)
                .then((response) => response.data)
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/customers`)
                .then(response => response.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});