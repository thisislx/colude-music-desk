import { useEffect, useCallback } from "react"

// 判断点击是否在依赖内 @params(deps --- @type(ref))
function useClick(fn, deps) {
    const
        handle = useCallback((e) => {
            const tar = e.target
            for (const { current: el } of deps) {
                // 20表示在该元素之内
                if (el && (tar === el || el.compareDocumentPosition(tar) === 20))
                    return fn(true)
            }
            // 不在deps内
            fn(false)
        }, [deps]),
        open = useCallback(() => {
            window.addEventListener('click', handle, false)
        }, [handle]),
        close = useCallback(() => {
            window.removeEventListener('click', handle, false)
        }, [handle])

    useEffect(() => {
        return () => {
            close()
        }
    }, [close])

    return [open, close]
}

export default useClick