/* eslint-disable react/prop-types */
import React, { memo, useRef, useCallback, useEffect, useState, Suspense } from 'react'
import styles from './style'
import { _navConfig, _leftBarMaxWidth, _playlistMaxWidth } from './config'
import _paths from 'config/paths'
import { actionsCreator as layout } from 'store/layout'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { debounce } from 'tools'
import useDomMove from 'hooks/useDomMove'

import Tabs, { TabItem } from 'base-ui/tabs'
import LeftBar from '../left-bar'
import Loading from 'base-ui/loading-icon'
import SongPlaylist from '../song-playlist'

function Home(props) {
    const
        { changeLeftBarWidth, history } = props,
        wrapRef = useRef(null),
        [hideArticle, setHideArticle] = useState(false),
        pathname = history.location.pathname,
        leftBarRefs = useRef({ wrap: {}, control: {} }),
        playlistRefs = useRef({ wrap: {}, control: {} }),
        { wrap: lbWrapRef, control: lbControlRef } = leftBarRefs.current,
        { wrap: plWrapRef, control: plControlRef } = playlistRefs.current,
        leftBarMoveHandle = useCallback(width => {
            if (width <= _leftBarMaxWidth) {
                lbWrapRef.current.style.width = width + 'px'
                if (!hideArticle)
                    wrapRef.current.style.left = `${width}px`
            }
        }, [lbWrapRef, wrapRef, hideArticle]),
        playlistMoveEndHandle = useCallback(debounce(() => {
            const
                el = plWrapRef.current,
                method = el.offsetWidth < 20 ? 'add' : 'remove'
            plWrapRef.current.classList[method](styles.overHide)
        }, 100), [plWrapRef]),
        playlistMoveHandle = useCallback(width => {
            if (width <= _playlistMaxWidth)
                plWrapRef.current.style.width = (width < 40 ? 0 : width) + 'px'
        }, [plWrapRef])

    useDomMove(leftBarMoveHandle, [lbWrapRef, lbControlRef])
    useDomMove(playlistMoveHandle, [plWrapRef, plControlRef], playlistMoveEndHandle, 'right')

    useEffect(() => {
        if (pathname === _paths.home) setHideArticle(false)
        else setHideArticle(true)
        changeLeftBarWidth(lbWrapRef.current.offsetWidth)
    }, [pathname, changeLeftBarWidth, lbWrapRef])

    return (
        <div className={styles.wrap} ref={wrapRef}>
            <SongPlaylist el={playlistRefs} />
            <LeftBar el={leftBarRefs} />
            <article className={hideArticle ? styles.hide : ''}>
                <Suspense fallback={<Loading />}>
                    <Tabs>
                        {
                            _navConfig.map((tab, index) => (
                                <TabItem
                                    key={index}
                                    tab={tab.name}
                                >
                                    <tab.Component />
                                </TabItem>
                            ))
                        }
                    </Tabs>
                </Suspense>
            </article>
            {
                renderRoutes(props.route.routes)
            }
        </div>
    )
}

const
    mapDispatch = dispatch => ({
        changeLeftBarWidth(width) {
            dispatch(layout.changeLeftBarWidth(width))
        }
    })

export default connect(null, mapDispatch)(memo(Home)) 
