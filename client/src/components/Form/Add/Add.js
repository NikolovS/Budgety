import { useState } from 'react'
import firebase from '../../../services/firebase'
import { rules } from '../../../services/validation'
import 'firebase/firestore'
import { Redirect } from 'react-router-dom'
 

const db = firebase.firestore()

const Add = ({ loaded, data, setData }) => {
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
    const [redirectTo,setRedirectTo]=useState("")

    const user = firebase.auth().currentUser

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

    const onSubmitFormHandler = (e) => {
        e.preventDefault()
         
        if (data.selectType !== "" && data.name !== "" && data.amount !== "" && data.date !== "") {
     
            db.collection(`transactions`)
                .add(data)
                .then((docRef) => {
                    if (docRef.id) {
                        console.log('Document written with ID: ', docRef.id)
                        setRedirectTo("/list")
                
                    }
                
                })
                .catch((error) => {
                    setRule({
                        ...validationErrors,
                        firebaseError: error,
                    })
                    console.error('Error adding document: ', error)
                })
        }
    }

    if (redirectTo.length) {
        return <Redirect to={redirectTo}/>
    } else if (loaded && data.user) {
        return (
            <form onSubmit={onSubmitFormHandler}>
                <select
                    required
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
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    onBlur={blurHandler}
                    onChange={onChangeHandler}
                />
                {validationErrors.name.length ? (
                    <h2 style={{ color: 'red' }}>{validationErrors.name}</h2>
                ) : (
                    ''
                )}
                <label htmlFor="amount">Amount</label>
                <input
                    required
                    type="number"
                    id="amount"
                    name="amount"
                    value={data.amount}
                    onBlur={blurHandler}
                    onChange={onChangeHandler}
                />
                {validationErrors.amount.length ? (
                    <h2 style={{ color: 'red' }}>{validationErrors.amount}</h2>
                ) : (
                    ''
                )}

                <label htmlFor="date">Date</label>
                <input
                    required
                    type="date"
                    id="date"
                    name="date"
                    value={data.date}
                    onBlur={blurHandler}
                    onChange={onChangeHandler}
                />
                {validationErrors.date.length ? (
                    <h2 style={{ color: 'red' }}>{validationErrors.date}</h2>
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

export default Add
