import { useMemo, useRef } from 'react'

const propertys = {
    2: ['border', 'backHover', 'boxShadow', 'textHover'],
    4: ['fontColor', 'back']
}
function useTheme(name) {
    const
        memoryRef = useRef(new Map()),
        theme = useMemo(() => {
            const memory = memoryRef.current
            if (memory.has(name)) return memory.get(name)
            const res = {
                toString() {
                    return name
                },
                loading: `${name}-loading`,
                color: `${name}-color`,
            }
            const levels = Object.keys(propertys)
            for (let level of levels) {
                const props = propertys[level]
                while (level > 0) {
                    for (const prop of props) {
                        res[`${prop}_v${level}`] = `${name}-${prop}-v${level}`
                        res[`${prop}_r${level}`] = `${name}-${prop}-r${level}`
                    }
                    level--
                }
            }
            memory.set(name, res)
            return res
        }, [name, memoryRef])
    return theme
}

export default useTheme