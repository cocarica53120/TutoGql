const { prisma } = require('../generated/prismaJs');
const { GraphQLServer } = require('graphql-yoga')


const resolvers = {
    Query: {
        users(root, args, context) {
            // console.log(args, context, prisma);
            // // return context.prisma.users
            // let users = [];
            // const user = prisma.createUser({name: 'coco', age: 50})
            //     .then(user => {
            //         users.push(user)
            //     });
            //     console.log('users', users);
                const ret = context.prisma.users();
                ret.then(res => console.log('users', res));
                return ret;
            },
            user(root, args, context) {
                console.log('args', args);
                const ret = context.prisma.user({id: args.userId});
                ret.then(res => console.log('user', res));
                return ret;
                // Synthetic => The real way of doing
                // return context.prisma.user({id: args.userId})
            },
            // Synthetic => The real way of doing
            user(root, args, context) {
            return context.prisma.user({id: args.userId})
            },
            userByName(root, args, context) {
                console.log('args', args);
                const ret = context.prisma.users({where: { name: args.userName }});
                ret.then(res => console.log('userByName', res));
                return ret;
            },
        }      
}


const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: {
        prisma,
    },
    })
    server.start(() => console.log('Server is running on http://localhost:4000'))
