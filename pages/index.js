import React, {useEffect} from 'react'
import { connectToDatabase } from '../util/mongodb'
import List from '../components/list'
import Form from '../components/form/form'
import {useItems} from '../context/items-context'

const { MONGO_DB_COLLECTION } = process.env

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

export async function getStaticProps() {
  let items = []
  const { client, db } = await connectToDatabase()
  const isConnected = await client.isConnected()

  try {
    items = await db
      .collection(MONGO_DB_COLLECTION)
      .find({})
      .toArray();
  } catch(e) {
    console.log(e)
  }

  return {
    props: { 
      isConnected, 
      items: JSON.parse(JSON.stringify(items)) 
    },
  }
}
