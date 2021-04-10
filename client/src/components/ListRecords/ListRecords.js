import 'firebase/firestore'
import firebase from '../../services/firebase'
import { Link } from 'react-router-dom'
import './ListRecords.scss'
const db = firebase.firestore()
const TableContent = ({ loaded, data }) => {
    const onClickDelete = (e) => {
        e.preventDefault()
        if (e.target.id) {
            if (
                window.confirm('Are you sure you want to delete this record?')
            ) {
                db.collection('transactions')
                    .doc(e.target.id)
                    .delete()
                    .then(() => {
                        console.log('Document successfully deleted!')
                    })
                    .catch((error) => {
                        console.error('Error removing document: ', error)
                    })
            }
        }
    }
    if (loaded && data.length > 0) {
        return data.map((t, index) => {
            return (
                <tr key={index}>
                    <td>{t.id}</td>
                    <td>{t.selectType}</td>
                    <td>{t.name}</td>
                    <td>{t.amount}</td>
                    <td>{t.date}</td>
                    <td>
                        <Link to={`/list/${t.id}`}><i class="fas fa-edit"></i> Edit</Link>
                        <button onClick={onClickDelete} id={t.id}>
                        <i class="far fa-trash-alt"></i> Delete
                        </button>
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

export default TableContent
