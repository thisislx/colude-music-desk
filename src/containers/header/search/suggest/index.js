import React, { memo, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _typeConfig } from '../config'


function Suggest(props) {
    const
        { onSubmit, searchSuggest, theme } = props,
        proxyClickHandle = useCallback(e => {
            if (onSubmit) {
                const
                    el = e.target,
                    typekey = el.getAttribute('data-type-key'),
                    id = el.getAttribute('data-id')
                onSubmit(id, +_typeConfig[typekey].type)
            }
        }, [searchSuggest, onSubmit])

    return (
        <div className={styles.wrap}>
            {
                _typeConfig.keys.map(typeKey => {
                    const
                        hasSuggest = searchSuggest[typeKey] && searchSuggest[typeKey].length,
                        currentType = _typeConfig[typeKey]

                    return hasSuggest ? (
                        <ol
                            className={`${styles.list}`}
                            key={typeKey}
                            onClick={proxyClickHandle}
                        >
                            <header
                                className={`${theme.backLinear_v1}`}
                            >
                                {currentType.name}
                            </header>
                            {
                                searchSuggest[typeKey].map((item, index) => {
                                    const artist = item.artist ? item.artist.name : ''
                                    return (
                                        <li
                                            key={item.id}
                                            className={`${theme.hover_v1} pointer ${theme.backHover_v1}`}
                                            data-type-key={typeKey}
                                            data-id={item.id}
                                        >
                                            {item.name}
                                            {artist ? ` - ${artist}` : null}
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    ) : null
                })
            }
        </div >
    )
}

Suggest.propTypes = {
    onSubmit: PropTypes.func,
    searchSuggest: PropTypes.object,
    theme: PropTypes.object,
}

export default memo(Suggest)