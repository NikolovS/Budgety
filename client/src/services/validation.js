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
        if (value && value[0] !== value[0].toUpperCase()) {
            return 'Must start with upper!'
        }
        return ''
    },
    lastName: (value) => {
        if (value && value[0] !== value[0].toUpperCase()) {
            return 'Must start with upper!'
        }
        return ''
    },
}
