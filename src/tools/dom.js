export const
    _toFullScreen = (() => {
        const body = document.body
        if (body.requestFullscreen)
            return dom => dom.requestFullscreen()
        else if (body.webkitRequestFullScreen)
            return dom => dom.webkitRequestFullScreen()
        else if (body.mozRequestFullScreen)
            return dom => dom.mozRequestFullScreen()
        else return dom => dom.msRequestFullscreen()
    })(),
    _exitFullScreen = () => document.exitFullscreen(),
    _isFullScreen = () => !!document.fullscreenElement