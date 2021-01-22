import { connectToDatabase } from '../../util/mongodb'

export default async function Add(req, res) {
    const data = req.body

    if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
        return
    }
    
    if(data.itemName === '' || data.itemPrice === '') {
        res.setHeader('Allow', ['POST'])
        res.status(203).end(`Non-Authoritative Information`)
        return
    }
    
    try {
        const { db } = await connectToDatabase();
        const collection = await db.collection("crud-app-collection");
        await collection.insertOne(data);
        const items = await collection.find({}).toArray()
        console.log('items', items)
        res.json(items)
        res.status(201)
    } catch(e) {
        console.log(e)
    }
}