import MainLayout from '../Layout/MainLayout'
import ListRecords from '../components/ListRecords'
import { useEffect, useState } from 'react'
import firebase, { streamTransactionsForUser } from '../services/firebase'
const List = () => {
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && !loaded) {
                const unsubscribe = streamTransactionsForUser(user.uid, {
                    next: (querySnapshot) => {
                        const updatedTransactions = querySnapshot.docs.map(
                            (docSnapshot) => {
                                return {
                                    ...docSnapshot.data(),
                                    id: docSnapshot.id,
                                }
                            }
                        )
                        setLoaded(true)
                        setData(updatedTransactions)
                    },
                    error: () => {
                        console.log('Transaction list get fail')
                    },
                })
                return unsubscribe
            }
        })
    }, [data, loaded])

    return (
        <MainLayout>
            <div className="records">
                <div className="container">
                    <h1>List</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListRecords
                                data={data}
                                loaded={loaded}
                                setData={setData}
                                setLoaded={setLoaded}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    )
}

export default List
