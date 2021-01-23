import  {useState} from 'react'
import {useItems} from '../../context/items-context'

const fetchOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export function useForm(formRef) {
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [error, setError] = useState(false)
    const {setData} = useItems()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setBtnDisabled(true)

        if(formRef.current) {
            const formData = new FormData(formRef.current)
            const formValues = Object.fromEntries(formData.entries())
            const options = {
                ...fetchOptions,
                body: JSON.stringify(formValues)
            }
            fetch('/api/create', options)
                .then(res => {
                    if (res.status === 203) {
                        setBtnDisabled(false)
                        setError(true)
                    }
                    if(res.status === 200) { 
                        formRef.current.reset()
                        setBtnDisabled(false)
                        setError(false)
                        res.json().then( data => {
                            setData(data)
                        })
                    }
                })
        }
    }

    return {
        handleSubmit,
        btnDisabled,
        error
    }

}