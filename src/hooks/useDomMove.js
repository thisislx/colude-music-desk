import { useCallback, useEffect, useState, useRef, useMemo } from "react"
import { debounce } from 'tools'
/*
 dom左右移动
 @params(moveRef) 位置参考的ref
 @params(triggerRef) 鼠标点击触发ref
 @parmas(orgin) @valueOfOne(left, right) @desc(起始点)
*/
export default (cb, [moveRef, triggerRef], onEnd, origin = 'left') => {
    const
        [acting, setActing] = useState(false),
        moveRefAlign = useRef(0)  /* 距离屏幕左边大小 */,
        moveHandle = useCallback((e, end) => {
            if (end) return cb(null, end)
            e.stopPropagation()
            requestAnimationFrame(() => {
                cb(Math.abs(e.clientX - moveRefAlign.current))
            })
        }, [moveRefAlign, cb]),
        posTable = useMemo(() => {
            return {
                left: () => moveRef.current && moveRef.current.getBoundingClientRect().x,
                right: () => window.innerWidth,
                top: () => 1,
                bottom: () => 1,
            }
        }, [moveRef])

    /* 准备监听 */
    useEffect(() => {
        const
            onDown = e => { e.stopPropagation(); setActing(true); },
            onUp = e => { e.stopPropagation(); setActing(false); onEnd && onEnd() }
        triggerRef.current.addEventListener('mousedown', onDown, true)
        window.addEventListener('mouseup', onUp, true)

        return () => {
            triggerRef.current.removeEventListener('mousedown', onDown, true)
            window.removeEventListener('mouseup', onUp, true)
        }
    }, [triggerRef, moveRef, moveHandle, onEnd])

    /* 监听移动 */
    useEffect(() => {
        if (acting) window.addEventListener('mousemove', moveHandle, true)
        else window.removeEventListener('mousemove', moveHandle, true)
        return () => {
            window.removeEventListener('mousemove', moveHandle, true)
        }
    }, [acting, moveHandle])

    /* 处理距离屏幕左边大小 */
    useEffect(() => {
        const handle = debounce(e => {
            moveRefAlign.current = posTable[origin]()
        }, 200)
        handle()
        window.addEventListener('resize', handle)
        return () => {
            window.removeEventListener('resize', handle)
        }
    }, [origin, posTable, moveRefAlign])
}
