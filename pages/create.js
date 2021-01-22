import React, {useRef, useState, useEffect} from 'react'
import { connectToDatabase } from "../util/mongodb";

const Add = ({items}) => {
    const formRef = useRef()
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setData(items)
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        setBtnDisabled(true)

        if(formRef.current) {
            const formData = new FormData(formRef.current)
            const formValues = Object.fromEntries(formData.entries())
            
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            }

            fetch('/api/create', options)
            .then( (res) => {
                 if(res.status === 203) {setBtnDisabled(false), setError(true)}
                 if(res.status === 200) {
                     setBtnDisabled(false) 
                     formRef.current.reset()    
                     res.json().then( (data) => {
                        setData(data)
                    })
                }
            })
        }
    }   

    return (
        <>
            <h1>Add</h1>
            
            <form ref={formRef} onSubmit={handleSubmit} action="/api/add" method="post">
                {error && "all inputs must be filled"}
                <br />
                <label>Item name</label>{' '}
                <input type="text" id="i-name" name="itemName" />
                <br />
                <br />
                <label>Item price</label>{' '}
                <input type="text" id="i-price" name="itemPrice" />
                <br />
                <br />
                <input type="submit" value="Ad to DB" disabled={btnDisabled} />
            </form>

            <ul>
                { data && 
                    data.map((item, i) => (
                        <li key={i} >{item.itemName} : {item.itemPrice}</li>
                    ))
                }
            </ul>
        </>
    )
}

export default Add

export async function getStaticProps() {
    const {db} = await connectToDatabase();


    let data = await db
        .collection("crud-app-collection")
        .find({})
        .toArray();
    
    
    return {
        props: {
            items:  JSON.parse(JSON.stringify(data))
        }
    }
}