import React, {createContext, useContext, useState} from 'react'

const ItemsContext = createContext({
    data: [],
    setData: () => {}
})

export const ItemsProvider = ({children}) => {
    const [data, setData] = useState([])

    return(
        <ItemsContext.Provider value={{data, setData}}>
            {children}
        </ItemsContext.Provider>
    )
}

export const useItems = () => useContext(ItemsContext)
