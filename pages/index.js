import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';
import { Fragment } from 'react';
const Dummy = [
  {
    id:'m1',
    title:'first meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/f/fc/Deras-TreeHouse.JPG',
    address:'some address 12345 City',
    description:'this is first meetup'
  },
  {
    id:'m2',
    title:'2nd meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/e/ed/Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_%28Hokan-ji_Temple%29%2C_Kyoto%2C_Japan.jpg',
    address:'some address 12345 City',
    description:'this is 2nd meetup'
  }
]

function HomePage (props) {
  return (
  <Fragment>
  <Head>
    <title>React Meetups</title>
    <meta name="description" content='list of React meetups'/>
  </Head>
  <MeetupList meetups={props.meetups}/>
  </Fragment>
  );
}

// export async function getServerSideProps(context){
//   const req  = context.req;
//   const res  = context.res;

//   return {
//     props:{
//       meetups: Dummy
//     }
//   }
// }

export async function getStaticProps(){
  const client = await MongoClient.connect("mongodb+srv://gopa:gopa1234@cluster0.tjg1v.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db();
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
      props: {
        meetups:meetups.map( meetup =>({
          title: meetup.title,
          address :meetup.address,
          image: meetup.image,
          id: meetup._id.toString()
        }))
      },
      revalidate:1
    }
}
export default HomePage;
