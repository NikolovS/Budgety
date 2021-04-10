import { useState } from 'react'
import firebase from '../../../services/firebase'
import { rules } from '../../../services/validation'
import 'firebase/firestore'

const db = firebase.firestore()

const Update = ({ loaded, data, setData, id }) => {
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
        let state = { ...data }
        // if (e.target.name === 'amount') {
        //     state[e.target.name] = Number(e.target.value)
        // } else {
        state[e.target.name] = e.target.value
        // }

        setData(state)
    }
    const onSubmitFormHandler = (e) => {
        e.preventDefault()
        console.log('data', data)
        db.collection(`transactions`)
            .doc(id)
            .update(data)
            .catch((error) => {
                setRule({
                    ...validationErrors,
                    firebaseError: error,
                })
                console.error('Error adding document: ', error)
            })
    }

    if (loaded && data.user) {
        return (
           <div className="add-record">
            <section className="h-100 w-100">
              <div className="container h-100 w-100">
                  <div className="row justify-content-md-left h-100">
                      <div className="card-wrapper ">
                          
                          <div className="card fat row justify-content-md-center ">
                              <div className="card-body ">
                                  <h4 className="card-title">Edit Current Record</h4>
                          <form  className="my-add-validation" onSubmit={onSubmitFormHandler} >
                                               
                              <div className="form-group">
                              <select
                            required
                           name="selectType"
                         value={data.selectType}
                                onBlur={blurHandler}
                                onChange={onChangeHandler}
                            >
                                <option value="">Choose Type</option>
                                <option value="Expense">  Expense</option>
                                <option value="Income">Income</option>
                            </select>
                         
                                              </div>
                    {validationErrors.selectType.length ? (<h2 style={{ color: 'red' }}>{validationErrors.selectType}</h2>) : ( '')}
            
                              <div className="form-group">
                              <label htmlFor="name">Name</label>
                                <input
                                className="col-md-6"
                                required
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onBlur={blurHandler}
                                onChange={onChangeHandler}
                            />
                                              </div>
                           {validationErrors.name.length ? (<h2 style={{ color: 'red' }}> {validationErrors.name}</h2> ) : ('')}
            
                              <div className="form-group">
                              <label htmlFor="amount">Amount</label>
                           <input
                                className="col-md-6"
                                required
                                type="number"
                                id="amount"
                                name="amount"
                                value={data.amount}
                                onBlur={blurHandler}
                                onChange={onChangeHandler}
                            />
                                              </div>
                          {validationErrors.amount.length ? (<h2 style={{ color: 'red' }}>{validationErrors.amount}</h2>) : ( '' )}
            
                               <div className="form-group">
                               <label htmlFor="date">Date</label>
                            <input
                                required
                                className="col-md-6"
                                type="date"
                                id="date"
                                name="date"
                                value={data.date}
                                onBlur={blurHandler}
                                onChange={onChangeHandler}
                            />
                                      </div>
                           {validationErrors.date.length ? ( <h2 style={{ color: 'red' }}>{validationErrors.date}</h2>) : ('')}
                               
                              <div className="form-group m-0">
                                          <button className="btn   btn-block">
                                                   <i class="far fa-save"></i>   ADD
                                          </button>
                      {validationErrors.firebaseError.length ? (<h2 style={{ color: 'red' }}>{validationErrors.firebaseError}</h2>) : ('')}
                                      </div>
                                      
                                  </form>
                              </div>
                          </div>
            
                      </div>
                  </div>
              </div>
            </section>
            
            </div>
          
        )
    } else if (!loaded) {
        return <p>Loading...</p>
    } else if (loaded && !data.user) {
        return <p>Please log in...</p>
    }
}

export default Update
