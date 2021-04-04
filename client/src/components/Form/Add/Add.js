import { useEffect, useState } from 'react'
import firebase from '../../../services/firebase'
import { rules } from '../../../services/validation'
import 'firebase/firestore'

const db = firebase.firestore()
const Add = () => {
    const user = firebase.auth().currentUser
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
                setData({
                    ...data,
                    user: user.uid,
                })
                setLoaded(true)
            } else {
                setLoaded(true)
            }
        })
    }, [data, loaded])

    const [validationErrors, setRule] = useState({
        selectType: '',
        name: '',
        amount: '',
        date: '',
        firebaseError: '',
    })

    const blurHandler = (e) => {
        e.preventDefault()
        validate(e.target.name, e.target.value)
    }

    const validate = (name, value) => {
        switch (name) {
            case 'selectType':
                setRule({
                    ...validationErrors,
                    selectType: rules.selectType(value.toString()),
                })
                break
            case 'name':
                setRule({
                    ...validationErrors,
                    name: rules.name(value),
                })
                break
            case 'amount':
                setRule({
                    ...validationErrors,
                    amount: rules.amount(Number(value)),
                })
                break
            case 'date':
                setRule({
                    ...validationErrors,
                    date: rules.date(value),
                })
                break
            default:
                break
        }
    }

    const onChangeHandler = (e) => {
        e.preventDefault()

        let state = { ...data }
        if (e.target.name === 'amount') {
            state[e.target.name] = Number(e.target.value)
        } else {
            state[e.target.name] = e.target.value
        }

        setData(state)
    }
    const onSubmitFormHandler = (e) => {
        e.preventDefault()

        db.collection(`transactions`)
            .add(data)
            .then((docRef) => {
                console.log('Document written with ID: ', docRef.id)
            })
            .catch((error) => {
                setRule({
                    ...validationErrors,
                    firebaseError: error,
                })
                console.error('Error adding document: ', error)
            })
    }
    const FormContent = ({ loaded, user }) => {
        if (loaded && user) {
            return (
                <form onSubmit={onSubmitFormHandler}>
                    <select
                        name="selectType"
                        onBlur={blurHandler}
                        onChange={onChangeHandler}
                    >
                        <option value="">Choose Type</option>
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                    </select>
                    {validationErrors.selectType.length ? (
                        <h2 style={{ color: 'red' }}>
                            {validationErrors.selectType}
                        </h2>
                    ) : (
                        ''
                    )}

                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onBlur={blurHandler}
                        onChange={onChangeHandler}
                    />
                    {validationErrors.name.length ? (
                        <h2 style={{ color: 'red' }}>
                            {validationErrors.name}
                        </h2>
                    ) : (
                        ''
                    )}
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={data.amount}
                        onBlur={blurHandler}
                        onChange={onChangeHandler}
                    />
                    {validationErrors.amount.length ? (
                        <h2 style={{ color: 'red' }}>
                            {validationErrors.amount}
                        </h2>
                    ) : (
                        ''
                    )}

                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={data.date}
                        onBlur={blurHandler}
                        onChange={onChangeHandler}
                    />
                    {validationErrors.date.length ? (
                        <h2 style={{ color: 'red' }}>
                            {validationErrors.date}
                        </h2>
                    ) : (
                        ''
                    )}

                    <button>Add</button>
                </form>
            )
        } else if (!loaded) {
            return <p>Loading...</p>
        } else if (loaded && !user) {
            return <p>Please log in...</p>
        }
    }

    return (
        <div className="add-new">
            <div className="container">
                <h1>Add Expense or Income</h1>
                <FormContent loaded={loaded} user={data.user} />
            </div>
        </div>
    )
}

export default Add
