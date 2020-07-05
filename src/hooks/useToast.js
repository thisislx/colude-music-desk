import { useCallback } from 'react'
import store from 'store'
import { actionsCreator } from 'store/global'
const { dispatch } = store

function useToast(ms = 1500) {
    const cb = useCallback((text, icon = '') => {
        dispatch(actionsCreator.showToast(text, icon, ms))
    }, [ms])
    return cb
}

export default useToast

