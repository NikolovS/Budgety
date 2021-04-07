import MainLayout from '../Layout/MainLayout'
import ListRecords from '../components/ListRecords'

import { useEffect, useState } from 'react'
import firebase, { streamTransactionsForUser,streamTransactionsForExpense, streamTransactionsForIncome } from '../services/firebase'
const List = () => {
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [selection, setSelection] = useState('All')


    const onChangeHandler = (e) => {
        // e.preventDefault()
        setSelection(e.target.value)
         
    }


    useEffect(() => {
        if (selection === "All" ) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user ) {
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
        }
        if (selection === 'Income') {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
       
                    const unsubscribe = streamTransactionsForIncome(user.uid, {
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
        }   
        if (selection === 'Expense') {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    const unsubscribe = streamTransactionsForExpense(user.uid, {
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
        }
        
        
    }, [selection,data, loaded])



    return (
        <MainLayout>
            <div className="budget">
                <div className="container">
                    <h1>List</h1>
                     <select
                    name="selectType"
                   
                    onChange={onChangeHandler}
                >
                    <option value="All">All</option>
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                </select>
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
