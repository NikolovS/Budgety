import { useEffect, useState } from 'react'
import firebase, { streamTransactionsForUser } from '../../services/firebase'
import 'firebase/firestore'
import { Link } from 'react-router-dom'

const ListRecords = () => {
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

    const TableContent = ({ loaded, data }) => {
        if (loaded && data.length > 0) {
            return data.map((t, index) => {
                console.log(index, t)
                return (
                    <tr key={index}>
                        <td>{t.id}</td>
                        <td>{t.selectType}</td>
                        <td>{t.name}</td>
                        <td>{t.amount}</td>
                        <td>{t.date}</td>
                        <td>
                            <Link to={`/list/${t.id}`}>Edit</Link>
                            <Link to={`/list/${t.id}`}>Delete</Link>
                        </td>
                    </tr>
                )
            })
        } else if (loaded && data.length === 0) {
            return (
                <tr>
                    <td colSpan="5">
                        <p style={{ textAlign: 'center' }}>No records</p>
                    </td>
                </tr>
            )
        } else if (!loaded && data.length === 0) {
            return (
                <tr>
                    <td colSpan="5">
                        <p style={{ textAlign: 'center' }}>Loading</p>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td colSpan="5">
                        <p style={{ textAlign: 'center' }}>
                            Unhandled component state
                        </p>
                    </td>
                </tr>
            )
        }
    }
    return (
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
                        <TableContent
                            data={data}
                            loaded={loaded}
                        ></TableContent>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListRecords
