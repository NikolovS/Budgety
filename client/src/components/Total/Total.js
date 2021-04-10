import 'firebase/firestore'
import {useState, useEffect} from 'react'

const Total = ({ loaded, data, selection }) => {
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setIncome(0);
        setExpense(0);
        setTotal(0);
        data.map((t, index) => {
            if (t.selectType === 'Income') {
                setIncome((currentIncome) => currentIncome + t.amount)
                setTotal((currentTotal) => currentTotal + t.amount)
            }
            if (t.selectType === 'Expense') {
                setExpense((currentExpense) => currentExpense+t.amount)
                setTotal((currentTotal) => currentTotal - t.amount)
            }
            return t;
        })
    }, [data])
    if(loaded){
    return (
        <>
                 
                {selection !== 'Income' && <tr>
                    <td colSpan="6">
                        <p style={{ textAlign: 'center' }}>
                            Total Expenses:
                            {expense}
                        </p>
                    </td>
                </tr>}
                {selection !== 'Expense' && <tr>
                    <td colSpan="6">
                        <p style={{ textAlign: 'center' }}>
                            Total Incomes:
                            {income}
                        </p>
                    </td>
                </tr>}
                <tr>
                    <td colSpan="6">
                        <p style={{ textAlign: 'center' }}>
                            Total:
                            {total}
                        </p>
                    </td>
                </tr>
            </>
        )
    } else {
        return (
            <>
                <tr>
                    <td colSpan="6">
                        <p style={{ textAlign: 'center' }}>Loading..</p>
                    </td>
                </tr>
            </>
        )
    }
}

export default Total
