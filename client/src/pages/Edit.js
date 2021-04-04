import MainLayout from '../Layout/MainLayout'
import Update from '../components/Form/Update'
import firebase, { userRecord } from '../services/firebase'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
const Edit = () => {
    const { id } = useParams()

    const [data, setData] = useState({
        selectType: '',
        name: '',
        amount: 0,
        date: '',
        user: '',
    })
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && !loaded) {
                userRecord(id)
                    .then((record) => {
                        if (record.exists) {
                            setData(record.data())
                            setLoaded(true)
                        } else {
                            console.log('Wrong ID')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
    }, [data, loaded, id])

    return (
        <MainLayout>
            <div className="add-new">
                <div className="container">
                    <h1>Update Expense or Income</h1>

                    <Update
                        loaded={loaded}
                        data={data}
                        setData={setData}
                        id={id}
                    />
                </div>
            </div>
        </MainLayout>
    )
}

export default Edit
