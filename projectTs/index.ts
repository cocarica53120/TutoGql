import { prisma, UserCreateInput, UserUpdateInput, UserWhereInput, UserPromise } from '../generated/prisma'

console.log('coucou');

// A `main` function so that we can use async/await
async function main() {
    // Create a new user with a new post

    let test: UserCreateInput;


    const newUser = await prisma.createUser({
      name: 'Bob',
    })
    console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)
  
    console.log(prisma)

    let  data: UserUpdateInput = {};
    data.name = 'NewBob'

    let res: any;
    res = await prisma.updateUser({data: data, where: {"id": newUser.id}})

    console.log('res', res);

    // Read all users from the database and print them to the console
    const allUsers = await prisma.users()
    console.log(allUsers)
}


  
main().catch(e => console.error(e))