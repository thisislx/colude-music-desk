/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState, useMemo, useRef, useCallback } from 'react'
import styles from './style'
import { _requestLimit, _typesConfig, _defaultType, createSource_ } from './config'
import { connect } from 'react-redux'
import { actionsCreator } from 'store/search'
import { actionsCreator as MusicActionsCreator } from 'store/music'
import { getProperty } from 'tools'
import Pagination from 'base-ui/pagination'
import Tabs, { TabItem } from 'base-ui/tabs'
import OpcityWrap from 'base-ui/fixed-wrap/opcity'

const _typeKeys = Object.keys(_typesConfig)

function Search(props) {
    const
        { match: { params: { words } }, history, location: { search: loc_search } } = props,
        requestType = useMemo(() => loc_search.split('=')[1], [loc_search]),
        { getSearch, cleanResult, addSongs } = props,
        { result_imm } = props,
        result = useMemo(() => result_imm.toJS(), [result_imm]),
        [offset, setOffset] = useState(0),     /* 页数 */
        [type, setType] = useState(_defaultType),        /* 1, 100, ... */
        tabsRef = useRef(null),
        currentResult = useMemo(() => getProperty(result, [type, offset]) || [], [result, type, offset]),
        total = currentResult.length ? currentResult[0].total : 0,
        commentMethods = useMemo(() => ({
            addSongs(id) {
                addSongs(id, createSource_(words, requestType))
            }
        }), [addSongs, words, requestType])

    if (words === '' && words === undefined) history.replace('/')

    /* 搜索初始化 */
    useEffect(() => {
        setOffset(0)
        setType(_typeKeys.includes(requestType) ? requestType : _defaultType)
        cleanResult()
    }, [words, requestType, cleanResult])

    /* 请求 */
    useEffect(() => {
        if (!getProperty(result, [type, offset]))
            getSearch(words, type, offset)
    }, [words, type, offset, getSearch, result])

    useEffect(() => {
        tabsRef.current.scrollIntoView(true)
    }, [currentResult, tabsRef])

    return (
        <OpcityWrap className={styles.wrap}>
            <Tabs
                el={tabsRef}
                onChange={e => console.log(e)}
            >
                {
                    _typeKeys.map((typeKey, index) => {
                        const
                            { Component, name, methods } = _typesConfig[typeKey],
                            __props = {}
                        for (const key of methods) {
                            __props[key] = commentMethods[key]
                        }
                        return (
                            <TabItem
                                tab={name}
                                key={index}
                                {...__props}
                            >
                                {
                                    Component ?
                                        <Component
                                            {...__props}
                                            list={type == typeKey ? currentResult : Array.prototype}
                                        /> : null
                                }
                            </TabItem>
                        )
                    })
                }
            </Tabs>
            <footer>
                <Pagination
                    current={offset}
                    pageSize={_requestLimit}
                    total={total}
                    onChange={val => setOffset(val)}
                />
            </footer>
        </OpcityWrap>
    )
}

const
    mapState = state => {
        const
            __search = state.get('search'),
            result_imm = __search.get('result')

        return {
            result_imm
        }
    },
    mapDispatch = dispatch => ({
        getSearch(words, type, offset) {
            dispatch(actionsCreator.getSearch(words, type, offset, _requestLimit))
        },
        cleanResult() {
            dispatch(actionsCreator.cleanResult())
        },
        addSongs(id, source) {
            dispatch(MusicActionsCreator.addSongs(id, source))
        }
    })

export default connect(mapState, mapDispatch)(memo(Search))