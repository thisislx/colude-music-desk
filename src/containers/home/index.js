/* eslint-disable react/prop-types */
import React, { lazy, memo, useRef, useCallback, useEffect, useState } from 'react'
import styles from './style'
import { _navConfig } from './config'
import _paths from 'config/paths'
import { actionsCreator as layout } from 'store/layout'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'

import Tabs, { TabItem } from 'base-ui/tabs'
import LeftBar from '../left-bar'
import RightBar from '../right-bar'
import Header from '../header'
import Footer from '../footer'
import Wrap from 'base-ui/fixed-wrap'

function Home(props) {
    const
        { history, leftBarWidth } = props,
        { changeLeftBarWidth, changeRightBarShow } = props,
        [hideArticle, setHideArticle] = useState(false),
        pathname = history.location.pathname,
        mainRef = useRef(null),
        leftBarWidthChangeHandle = useCallback(width => {
            mainRef.current.style.left = `${width}px`
        }, [mainRef])

    useEffect(() => {
        if (pathname === _paths.home) setHideArticle(false)
        else setHideArticle(true)
        changeRightBarShow(false)
    }, [pathname, changeRightBarShow])

    useEffect(() => {
        setTimeout(() => {
            mainRef.current.style.left = leftBarWidth
            setTimeout(() => {
                mainRef.current.classList.remove(styles.transition)
            }, 1000)
        }, [1500])
        return () => changeLeftBarWidth(mainRef.current.style.left)
    }, [mainRef, changeLeftBarWidth])

    return (
        <Wrap className={`${styles.wrap}`}>
            <RightBar />
            <LeftBar onWidthChange={leftBarWidthChangeHandle} />
            <Header />
            <main ref={mainRef} className={styles.transition}>
                <article className={`${hideArticle ? styles.hide : ''}`}>
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
                </article>
                <article>
                    {
                        renderRoutes(props.route.routes)
                    }
                </article>
            </main>
            <Footer />
        </Wrap>
    )
}

const
    mapState = state => {
        return {
            leftBarWidth: state.getIn(['layout', 'leftBar', 'width']),
        }
    },
    mapDispatch = dispatch => ({
        changeLeftBarWidth(width) {
            dispatch(layout.changeLeftBarWidth(width))
        },
        changeRightBarShow(bool) {
            dispatch(layout.changeRightBarShow(bool))
        }
    })

export default connect(mapState, mapDispatch)(memo(Home)) 
