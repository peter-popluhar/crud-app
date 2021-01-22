import { connectToDatabase } from "../util/mongodb"

export default function ShowData({data}) {
    return(
        <>
            <h1>
                Show all data from DB
            </h1>
            <ul>
                { data &&
                    data.map(({itemName, itemPrice, _id}) => {

                        return(
                            <li key={_id}>{itemName}: {itemPrice}</li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export async function getStaticProps() {
    const {db} = await connectToDatabase();


    let data = await db
        .collection("crud-app-collection")
        .find({})
        .toArray();
    
    
    return {
        props: {
            data:  JSON.parse(JSON.stringify(data))
        }
    }
}