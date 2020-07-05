import { useRef, useEffect } from "react"

function useThrottle(fn, ms, deps) {
    const previous = useRef(0)
    useEffect(() => {
        const now = Date.now()
        if (now >= previous.current + ms) {
            previous.current = now
            fn()
        }
    }, deps)
}

export default useThrottle