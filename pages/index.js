import React, {useRef, useState, useEffect} from 'react'
import { connectToDatabase } from '../util/mongodb'
const { MONGO_DB_COLLECTION } = process.env
import List from '../components/list'
import Form from '../components/form/form'
import {useItems} from '../context/items-context'

export default function Home({ isConnected, items }) {
  const {setData} = useItems()

  useEffect(() => {
    setData(items)
  }, [items])

  return (

    <>
        {isConnected ? (
          <>
            <h2>You are connected to MongoDB</h2>
            <Form />
            <List />
          </>
        ) : (
          <h2>
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
    </>
  )
}

export async function getServerSideProps() {
  const { client, db } = await connectToDatabase()
  const isConnected = await client.isConnected()

  let items = await db
        .collection(MONGO_DB_COLLECTION)
        .find({})
        .toArray();

  return {
    props: { 
      isConnected, 
      items: JSON.parse(JSON.stringify(items)) 
    },
  }
}
