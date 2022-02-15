import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetails from "../../components/meetups/MeetupDetail";

function Meetupdetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}/>
            </Head>
            <MeetupDetails
           image = {props.meetupData.image}
           title = {props.meetupData.title}
           address = {props.meetupData.address}
           description = {props.meetupData.description}
           />
        </Fragment>
    );
}

export async function getStaticPaths (){
  const client = await MongoClient.connect("mongodb+srv://gopa:gopa1234@cluster0.tjg1v.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db();
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find({},{_id:1}).toArray();
  client.close();
    return{
        fallback: 'blocking',
        paths: meetups.map((meetup) =>({
            params:{meetupId: meetup._id.toString()}
        })),
    }
}

export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect("mongodb+srv://gopa:gopa1234@cluster0.tjg1v.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db();
    const meetupsCollection = db.collection('meetups')
    const selectedmeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
    client.close();

    return {
        props:{
            meetupData: {
                id: selectedmeetup._id.toString(),
                image: selectedmeetup.image,
                title: selectedmeetup.title,
                description: selectedmeetup.description,
                address: selectedmeetup.address
            },
        }
    }
}
export default Meetupdetails;
// {
//     image : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Deras-TreeHouse.JPG',
//     title :  "first meetup",
//     address : "some address 12345 City",
//     description : "this is first meetup"
// }
