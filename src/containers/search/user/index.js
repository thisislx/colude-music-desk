import React, { memo, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _avatarSize } from './config'
import _icons from 'config/icons'

function User(props) {
    const
        { list, theme, enterUser } = props,
        proxyHandle = useCallback(e => {
            const userId = e.target.getAttribute('data-user-id')
            userId && enterUser(userId)
        }, [enterUser])
    return (
        <ol
            className={styles.wrap}
            onClick={proxyHandle}
        >
            {
                list.map((user, index) => (
                    <li
                        key={user.userId}
                        data-user-id={user.userId}
                        className={`${index & 1 ? '' : theme.back_v1} ${theme.backHover_v1} pointer`}
                    >
                        <section className={styles.itemLeft} data-user-id={user.userId}>
                            <img src={user.avatarUrl + _avatarSize} data-user-id={user.userId} />
                            <span data-user-id={user.userId}>{user.nickname}</span>
                            <span
                                data-user-id={user.userId}
                                dangerouslySetInnerHTML={{ __html: _icons.gender.icon(user.gender) }}
                                className={`${_icons.gender.className}`}
                            ></span>
                        </section>
                        <section className={styles.itemRight} data-user-id={user.userId}>
                            {user.description}
                        </section>
                    </li>
                ))
            }
        </ol>
    )
}


User.propTypes = {
    list: PropTypes.array,
    theme: PropTypes.object,
    enterUser: PropTypes.func,
}

export default memo(User)