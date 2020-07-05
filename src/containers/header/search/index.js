/* eslint-disable react/prop-types */
import React, { memo, useState, useRef, useEffect, useCallback, useMemo } from 'react'
import styles from './style'
import { _typeConfig, createResultPath_, createSourece_ } from './config'
import useDebounce from 'hooks/useDebounce'
import useClick from 'hooks/useClick'
import useTheme from 'hooks/useTheme'
import { useHistory } from 'react-router-dom'
import { actionsCreator } from 'store/search'
import { actionsCreator as musicActionsCreator } from 'store/music'

import Pad from 'base-ui/pad'
import HotAndHistory from './hotAndHistory'
import Suggest from './suggest'
import { connect } from 'react-redux'
const _typeKeys = _typeConfig.keys

function Search(props) {
    const
        { themeName } = props,
        { getSearchHot, getSearchSuggest, addSongs } = props,
        { searchHot_imm, searchSuggest_imm } = props,
        searchHot = useMemo(() => searchHot_imm.toJS(), [searchHot_imm]),
        searchSuggest = useMemo(() => searchSuggest_imm.toJS(), [searchSuggest_imm]),
        [showPad, setShowPad] = useState(false),
        [inputValue, setInputValue] = useState(''),
        wrapRef = useRef(null),
        history = useHistory(),
        theme = useTheme(themeName),
        [listener, closeListener] = useClick((bool) => {
            if (!bool) setShowPad(false)
        }, [wrapRef]),
        /* 搜索推荐 */
        suggestSubmitHandle = useCallback((id, type) => {
            switch (type) {
                case _typeConfig[_typeKeys[0]].type:
                    addSongs(id, createSourece_())
                    break

                case _typeConfig[_typeKeys[1]].type:
                    break

                case _typeConfig[_typeKeys[2]].type:
                    break

                case _typeConfig[_typeKeys[3]].type:
                    break
            }
            setShowPad(false)
        }, [addSongs]),
        /* 进入 */
        enterSearchPage = useCallback(words => {
            history.push({
                pathname: createResultPath_(words, _typeConfig[_typeKeys[0]].type)
            })
            setShowPad(false)
        }, [history])

    useDebounce((() => {
        let lastInputValue = ''
        return () => {
            const newValue = inputValue.trim()
            if (newValue !== lastInputValue) {
                lastInputValue = newValue
                getSearchSuggest(newValue)
            }
        }
    })(), 200, [inputValue, getSearchSuggest])

    useEffect(() => {
        if (showPad) listener()
        else closeListener()
    }, [listener, closeListener, showPad])

    useEffect(() => {
        getSearchHot()
    }, [showPad])

    return (
        <form
            className={styles.wrap}
            ref={wrapRef}
            onSubmit={e => { console.log(e); e.preventDefault(); enterSearchPage(inputValue) }}
        >
            <input
                type='text'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onFocus={e => setShowPad(true)}
            />
            <span className={`iconfont`}>&#xe632;</span>
            <Pad show={showPad} width={20} top={6} left={20}>
                <div className={styles.pad}>
                    {
                        inputValue ?
                            <>
                                <p
                                    onClick={e => enterSearchPage(inputValue)}
                                    className={`${theme.backHover_v1} pointer`}
                                >
                                    搜 <span>{inputValue}</span> 相关结果
                                </p>
                                <Suggest
                                    searchSuggest={searchSuggest}
                                    onSubmit={suggestSubmitHandle}
                                    theme={theme}
                                />
                            </>
                            :
                            <HotAndHistory
                                searchHot={searchHot}
                                theme={theme}
                                onSubmit={enterSearchPage}
                            />
                    }
                </div>
            </Pad>
        </form>
    )
}

const
    mapState = state => {
        const
            themeName = state.getIn(['theme', 'name']),
            search = state.get('search'),
            searchHot_imm = search.get('searchHot'),
            searchSuggest_imm = search.get('searchSuggest')

        return {
            themeName,

            searchHot_imm,
            searchSuggest_imm,
        }
    },
    mapDispath = dispatch => ({
        getSearchHot() {
            dispatch(actionsCreator.getSearchHot())
        },
        getSearchSuggest(keywords) {
            dispatch(actionsCreator.getSearchSuggest(keywords))
        },
        addSongs(id, source) {
            dispatch(musicActionsCreator.addSongs(id, source))
        }
    })

export default connect(mapState, mapDispath)(memo(Search))