import {ItemsProvider, useItems} from '../context/items-context'

export default function MyApp({ Component, pageProps }) {
    
    return <ItemsProvider items={[]}>
        <Component {...pageProps} />
    </ItemsProvider>
    
}
