import {useItems} from '../context/items-context'

export default function List() {
    const {data} = useItems()

    return(
        <ul>
            { data &&
                data.map(({itemName, itemPrice, _id}) => {

                    return(
                        <li key={_id}>{itemName}: {itemPrice}</li>
                    )
                })
            }
        </ul>
    )
}