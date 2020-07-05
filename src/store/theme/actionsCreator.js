import types from './types'

export default {
    changeTheme(value) {
        return {
            type: types.CHANGE_NAME,
            value: value
        }
    },
}