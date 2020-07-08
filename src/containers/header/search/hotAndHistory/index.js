import React, { memo, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _hotLightConfig } from '../config'

function HotAndHistory(props) {
    const
        { searchHot = [], searchHistory, onSubmit, theme } = props,
        proxyClick = useCallback(e => {
            const
                el = e.target,
                word = el.getAttribute('data-word')
            word && onSubmit(word)
        }, [onSubmit])

    return (
        <div
            className={`${styles.wrap} `}
        >
            <section>
                <h2>搜索历史</h2>
                <ol onClick={proxyClick} className={styles.history}>
                    {
                        searchHistory.map((item, key) => (
                            <li
                                data-word={item}
                                key={key}
                                className={`pointer ${theme.textHover_v1}`}
                            >
                                {item}
                            </li>
                        ))
                    }
                </ol>
            </section>
            <section >
                <h2>热搜榜</h2>
                <ol className={styles.hotList} onClick={proxyClick}>
                    {
                        searchHot.map((item, key) => {
                            const light = key < _hotLightConfig
                            return (
                                <li
                                    key={item.searchWord}
                                    data-word={item.searchWord}
                                    className={`${theme.backHover_v1}`}
                                >
                                    <aside
                                        className={light ? styles.hot : ''}
                                        data-word={item.searchWord}
                                    >
                                        {key + 1}
                                    </aside>
                                    <article data-word={item.searchWord}>
                                        <p data-word={item.searchWord}>
                                            {item.searchWord}
                                            <span className={styles.score} data-word={item.searchWord}>
                                                {item.score}
                                            </span>
                                            {item.iconUrl ? <img src={item.iconUrl} /> : null}
                                        </p>
                                        <p data-word={item.searchWord}>
                                            {item.content}
                                        </p>
                                    </article>
                                </li>
                            )
                        })
                    }
                </ol>
            </section>
        </div>
    )
}

HotAndHistory.propTypes = {
    history: PropTypes.array,
    searchHot: PropTypes.array,
    searchHistory: PropTypes.array,
    onSubmit: PropTypes.func,
    theme: PropTypes.object,
}

export default memo(HotAndHistory)