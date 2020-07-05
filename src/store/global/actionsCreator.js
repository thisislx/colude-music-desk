import types from './types'
import { fromJS } from 'immutable'
import { initState } from './reducer'

const
    creator = {
        toggleLoading({ text = '', is = false }) {
            return {
                type: types.TOGGLE_LOADING,
                value: fromJS({ text, is })
            }
        },

        /* 默认值初始状态 */
        showConfirm({ text, is, cb } = initState.confirm) {
            return {
                type: types.SHOW_CONFIRM,
                value: fromJS({ text, is, cb })
            }
        }
    },
    sagas = {
        showToast(text = '', icon = false, ms = 1500) {
            return {
                type: types.SAGA_SHOW_TOAST,
                value: [
                    {
                        is: true,
                        text,
                        icon,
                    },
                    ms
                ]
            }
        },
    }


export default {
    ...sagas,
    ...creator,
}

export const assist = {
    /* 
        默认为默认状态    
    */
    changeToast({ is, icon, text } = initState.toast) {
        return {
            type: types.CHANGE_TOAST,
            value: fromJS({
                is,
                icon,
                text
            })
        }
    }
}