import { useRef, useEffect } from "react"

function useDebounce(fn, ms = 30, deps) {
    const kid = useRef(null)
    useEffect(() => {
        if (kid.current) clearTimeout(kid.current)
        kid.current = setTimeout(() => {
            fn()
        }, ms)
    }, deps)
}

export default useDebounce