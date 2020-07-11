/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState, useMemo, useRef } from 'react'
import styles from './style'
import { _requestLimit, _typesConfig, _defaultType, _typeKeys, _layout, createSource_ } from './config'
import { connect } from 'react-redux'
import { actionsCreator as searchAc } from 'store/search'
import { actionsCreator as musicAc } from 'store/music'
import { getProperty } from 'tools'
import Pagination from 'base-ui/pagination'
import Tabs, { TabItem } from 'base-ui/tabs'
import OpcityWrap from 'base-ui/fixed-wrap/opcity'
import useTheme from 'hooks/useTheme'
import _paths from 'config/paths'

function Search(props) {
    const
        { match: { params: { words } }, history } = props,
        requestType = useMemo(() => history.location.state, [history]),
        tabDefaultValue = useMemo(() => _typeKeys.indexOf(requestType), [requestType]),
        { themeName } = props,
        { getSearch, addSongs, changeWords } = props,
        { result_imm } = props,
        result = useMemo(() => result_imm.toJS(), [result_imm]),
        [offset, setOffset] = useState(0),     /* 页数 */
        [type, setType] = useState(_defaultType),        /* 1, 100, ... */
        currentResult = useMemo(() => getProperty(result, [type, offset]) || [], [result, type, offset]),
        total = currentResult[0] ? currentResult[0].total : 0,
        tabsRef = useRef(null),
        theme = useTheme(themeName),
        commentMethods = useMemo(() => ({
            addSongs(id) {
                addSongs(id, createSource_(words, type))
            },
            enterUser(userId) {
                history.push(_paths.user + userId)
            },
            enterMv(mvid) {
                history.push(_paths.mvPlayer + mvid)
            }
        }), [addSongs, words, type, history])


    if (!words) history.replace('/')
    /* 搜索初始化 */
    useEffect(() => {
        setOffset(0)
        setType(_typeKeys.includes(requestType) ? requestType : _defaultType)
        changeWords(words)
    }, [words, requestType, changeWords])

    /* 请求 */
    useEffect(() => {
        if (!getProperty(result, [type, offset]))
            getSearch(type, offset)
    }, [type, offset, getSearch, result])

    return (
        <OpcityWrap className={styles.wrap} state={_layout}>
            <header>
                搜索 <span className={styles.words}>{words}</span>,
                找到{currentResult[0] && currentResult[0].total}{_typesConfig[type].unit}{_typesConfig[type].name}
            </header>
            <article>
                <Tabs
                    height={2.4}
                    el={tabsRef}
                    onChange={index => setType(_typeKeys[index])}
                    defaultValue={tabDefaultValue}
                >
                    {
                        _typeKeys.map((typeKey, index) => {
                            const
                                { Component, name, methods } = _typesConfig[typeKey],
                                __methods = {}
                            for (const key of methods) {
                                __methods[key] = commentMethods[key]
                            }

                            return (
                                <TabItem
                                    tab={name}
                                    key={index}
                                >
                                    {
                                        Component ?
                                            <Component
                                                {...__methods}
                                                theme={theme}
                                                list={type == typeKey ? currentResult : Array.prototype}
                                            /> : index
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
            </article>

        </OpcityWrap>
    )
}

const
    mapState = state => {
        const
            __search = state.get('search'),
            result_imm = __search.get('result')

        return {
            themeName: state.getIn(['theme', 'name']),
            result_imm,
        }
    },
    mapDispatch = dispatch => ({
        changeWords(words) {
            dispatch(searchAc.changeWords(words))
        },
        getSearch(type, offset) {
            dispatch(searchAc.getSearch(type, offset, _requestLimit))
        },
        addSongs(id, source) {
            dispatch(musicAc.addSongs(id, source))
        }
    })

export default connect(mapState, mapDispatch)(memo(Search))