import React, {useRef} from 'react'
import {useForm} from './use-form'

export default function Form() {
    const form = useRef()
    const {handleSubmit, btnDisabled, error} = useForm(form);
  
      
    return(
        <form ref={form} onSubmit={handleSubmit}>
            {error && "all fields must be filled !!!"}
            <br />
            <label htmlFor="itemName">
                Item name {''}
                <input type="text" id="itemName" name="itemName" />
            </label>
            <br />
            <br />
            <label htmlFor="itemPrice">
                Item price {''}
                <input type="text" id="item-name" name="itemPrice" />
            </label>
            <br />
            <br />
            <input type="submit" value="add item" disabled={btnDisabled} />
        </form>
    )
}