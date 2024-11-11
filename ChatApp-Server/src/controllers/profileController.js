const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProfile = (req,res) => {

}

exports.createProfile = async (req,res) => {
    const {username,status} = req.body;
    try {
        if(!username && !status ) res.status(400).send('username or status not sent');
        
        const newUser = await prisma.profiles.create({
            data: {
                username,
            status
            }
        })
        res.status(201).send('Successfully created new profile.');
    }
    catch (error) {
        console.log("error from addProfile: ",error);
        res.status(400).json({error: "An error occured during adding the new profile."});
    }
}

exports.updateProfile = (req,res) => {
    
}