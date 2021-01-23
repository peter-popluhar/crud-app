import {useItems} from '../context/items-context'
import Link from 'next/link'

export default function List() {
    const {data} = useItems()

    return(
        <ul>
            { data &&
                data.map(({itemName, itemPrice, _id}) => {

                    return(
                        <li key={_id}>{itemName}: {itemPrice} <Link href={`/items/${_id}`}><a>link</a></Link></li>
                    )
                })
            }
        </ul>
    )
}