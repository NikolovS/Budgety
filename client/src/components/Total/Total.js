import 'firebase/firestore'

const Total = ({ loaded, data }) => {
    let total = 0
    let totalInc = 0
    let totalExp = 0
    const calculateTotal = (e) => {
        if (data) {
            data.map((t, index) => {
                if (t.selectType === 'Income') {
                    total += Number(t.amount)
                } else if (t.selectType === 'Expense') {
                    total -= Number(t.amount)
                }
                return total
            })
        }
        return total
    }
    const calculateTotalExp = (e) => {
        if (data) {
            data.map((t, index) => {
                if (t.selectType === 'Expense') {
                    totalExp += Number(t.amount)
                }
                return totalExp
            })
        }
        return totalExp
    }
    const calculateTotalInc = (e) => {
        if (data) {
            data.map((t, index) => {
                if (t.selectType === 'Income') {
                    totalInc += Number(t.amount)
                }

                return totalInc
            })
        }
        return totalInc
    }

    if (loaded && data.length > 0) {
        return (
            <>
                <tr>
                    <td colSpan="5">
                        <p style={{ textAlign: 'center' }}>
                            Total Expenses:
                            {calculateTotalExp()}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td colSpan="5">
                        <p style={{ textAlign: 'center' }}>
                            Total Incomes:
                            {calculateTotalInc()}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td colSpan="5">
                        <p style={{ textAlign: 'center' }}>
                            Total:
                            {calculateTotal()}
                        </p>
                    </td>
                </tr>
            </>
        )
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

export default Total