import { MongoClient } from "mongodb";

async function handler (req, res) {

    if(req.method ==='POST'){
        const data = req.body;        
        const client = await MongoClient.connect("mongodb+srv://gopa:gopa1234@cluster0.tjg1v.mongodb.net/meetups?retryWrites=true&w=majority")
        const db = client.db();
        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message:"meetup inserted"});

    }

}

export default handler;
