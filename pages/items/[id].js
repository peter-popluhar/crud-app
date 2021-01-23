import React from 'react'
import { connectToDatabase } from '../../util/mongodb'
import { ObjectID } from 'mongodb';

const { MONGO_DB_COLLECTION } = process.env

export default function Item({item}) {
  const {itemName, itemPrice} = item;
  
  return (

    <h1>Item {itemName}: {itemPrice}</h1>
  )
}

export async function getServerSideProps({query}) {
  const {id} = query

  const {db} = await connectToDatabase();
  const objectId = await ObjectID(id)
  const item = await db
    .collection(MONGO_DB_COLLECTION)
    .findOne({_id: objectId})

  return {
    props: {item: JSON.parse(JSON.stringify(item))}
  }
}
