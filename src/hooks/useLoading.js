import { useCallback } from 'react'
import store from 'store'
import { actionsCreator } from 'store/global'
const { dispatch } = store

function useLoading(text = '') {
    const
        open = useCallback(() => {
            dispatch(actionsCreator.toggleLoading({ is: true, text }))
        }, [text]),
        close = useCallback(() => {
            dispatch(actionsCreator.toggleLoading({ is: false, text }))
        }, [text])
    return [open, close]
}

export default useLoading

