export default (() => {
    const
        className = ' iconfont pointer ',
        obj = {
            logo: { icon: '&#xe618;' },
            left: { icon: '&#xe660;', className: ' weight-v1 ' },
            right: { icon: '&#xe65f;' },
            like: { icon: '&#xe609;' },
            collect: { icon: '&#xe609;' },
            full: { icon: '&#xe62e;', },
            theme: { icon: '&#xe666;' },
            gender: {
                icon(num) {
                    return ['', '&#xe67f;', '&#xe680;'][num]
                }
            },
        }
    for (const item of Object.values(obj))
        item.className = item.className ? className + item.className : className
    return obj
})()

export const _mediaIcons = (() => {
    const
        className = ' iconfont weight-v1 pointer ',
        obj = {
            previous: { icon: '&#xe65a;' },
            control: { icon: bool => bool ? '&#xe845;' : '&#xe625;' },
            next: { icon: '&#xe657;' },
            volume: { icon: '&#xe64c;' },
            playlist: { icon: '&#xe644;' },
            mv: { icon: '&#xe6cf;' },
        }
    for (const item of Object.values(obj))
        item.className = item.className ? className + item.className : className
    return obj
})() 
