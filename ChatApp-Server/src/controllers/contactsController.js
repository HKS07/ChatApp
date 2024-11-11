const {PrismaClient} = require('@prisma/client')
const Prisma = new PrismaClient();

exports.getAllContacts = (req,res) => {

}

exports.getContact = (req,res) => {

}

exports.addContact = async (req,res) => {
    const {contactId,userId} = req.body;
    try {
            await Prisma.profiles.update({
                where: {
                    id: userId
                },
                data: {
                    contacts:{
                        push: contactId
                    }
                }
        })
        res.status(200).send('contact added successfully.');
    } catch (error) {
        console.log("error occured during adding contact to usser: ",error);
        
        res.status(500).send('An error occured during adding new contact to user');
    }
}

exports.deleteContact = (req,res) => {

}

exports.updateContact = (req,res) => {

}