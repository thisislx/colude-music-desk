import React, { memo, useContext, useCallback } from 'react'
import commonStyle from '../common/style'
import { Context } from '../../index'
import { _mediaIcons } from 'config/icons'
import CommonBtn from '../common'

function PlayAllBtn() {
    const { theme, onPlay } = useContext(Context)

    return (
        <CommonBtn
            name='播放全部+'
            icon={_mediaIcons.control.icon(false)}
            className={`${commonStyle.wrap} ${theme.border_v1} ${theme} pointer`}
            onClick={() => onPlay()}
        />
    )
}


export default memo(PlayAllBtn)