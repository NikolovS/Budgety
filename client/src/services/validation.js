const passLength = 6
export const rules = {
    email: (value) => {
        if (!value) {
            return 'Email is required.'
        } else if (!/^^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(value)) {
            return 'Email is not valid.'
        }
        return ''
    },
    password: (value) => {
        if (!value) {
            return 'Password is required.'
        } else if (value.length < passLength) {
            return `Password should be at least ${passLength} characters.`
        } else if (!/[a-z]/.test(value)) {
            return 'Password should contain at least one lowercase letter.'
        } else if (!/[A-Z]/.test(value)) {
            return 'Password should contain at least one uppercase letter.'
        } else if ([...value].every((char) => isNaN(char))) {
            return 'Password should contain at least one digit.'
        }
        return ''
    },
    rePassword: (value, pass) => {
        if (!value) {
            return 'Confirm Password is required.'
        } else if (value.length < passLength) {
            return `Confirm Password should be at least ${passLength} characters.`
        } else if (value !== pass) {
            return 'Confirm Password should be equal to Password'
        }

        return ''
    },
    firstName: (value) => {
        if (!value) {
            return 'First Name is required.'
        }else if (value && value[0] !== value[0].toUpperCase()) {
            return 'Must start with upper!'
        }
        return ''
    },
    lastName: (value) => {
        if (!value) {
            return 'Last Name is required.'
        }else if (value && value[0] !== value[0].toUpperCase()) {
            return 'Must start with upper!'
        }
        return ''
    },
    name: (value) => {
        if (!value) {
            return 'You need to provide a name for your record!'
        } else if (value && value[0] !== value[0].toUpperCase()) {
            return 'Must start with upper!'
        }
        return ''
    },
    amount: (value) => {
        if (!value) {
            return 'Amount is required'
        } else if (!/\d+(\.\d{1,2})?/.test(value)) {
            return 'The Amount must be a valid number'
        } else if (value === 0) {
            return 'The amount must be greater than zero'
        }
        return ''
    },
    selectType: (value) => {
        if (value === 'Choose Type' || value === '') {
            return 'You need to select an option'
        }
        return ''
    },
    date: (value) => {
        if (!value) {
            return 'You need to choose a date'
        } else if (
            !/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(
                value
            )
        ) {
            return 'You need to choose a valid date!'
        }
        return ''
    },
}
