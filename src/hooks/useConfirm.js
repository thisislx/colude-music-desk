import { useCallback } from 'react'
import store from 'store'
import { actionsCreator } from 'store/global'
const { dispatch } = store

function useConfirm(fn) {
    const pop = useCallback(text => {
        dispatch(actionsCreator.showConfirm({
            is: true,
            text,
            cb(bool) {
                dispatch(actionsCreator.showConfirm({ text }))
                fn(bool)
            }
        }))
    }, [fn])
    return pop
}

export default useConfirm

