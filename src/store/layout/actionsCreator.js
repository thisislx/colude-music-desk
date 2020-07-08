import types from './types'
import { fromJS } from 'immutable'

export default {
    changeLeftBarWidth(width) {
        return {
            type: types.CHANGE_LEFT_BAR_WIDTH,
            value: width + 'px'
        }
    },
    changeLeftBarRef(ref) {
        return {
            type: types.CHANGE_LEFT_BAR_REF,
            value: fromJS(ref)
        }
    },
    changeRightBarShow(bool) {
        return {
            type: types.CHANGE_RIGHT_BAR_SHOW,
            value: bool,
        }
    },
    changeRightBarRef(ref) {
        return {
            type: types.CHANGE_RIGHT_BAR_REF,
            value: fromJS(ref)
        }
    }
}
