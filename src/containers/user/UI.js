import React from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _imgSizes, _regionCode, _myMenuTitle } from './config'
import useTheme from 'hooks/useTheme'

import SongMenu, { SongMenuItem } from 'components/song-menu'
import OpcityWrap from 'base-ui/fixed-wrap/opcity'

function UI(props) {
    const
        { currentData, themeName, currentMenu, isMy, myId } = props,
        { enterPlaylist, toggleFollowUser } = props,
        { profile = {} } = currentData,
        currentMenuLength = Object.keys(currentMenu).length,
        theme = useTheme(themeName)

    return (
        <OpcityWrap className={styles.wrap}>
            <header className={`${theme.fontColor_v2}`}>
                <img src={`${profile.avatarUrl}${_imgSizes.avatar}`} />
                <main>
                    <header className={theme.border_v1}>
                        <section className={styles.nickname}>
                            {profile.nickname}
                            <span className={`${styles.level} ${theme.color} pointer weight-v1`}>
                                lv.{currentData.level}
                            </span>
                        </section>
                        {
                            isMy && ~myId ? null :
                                <section
                                    className={`${styles.call}`}
                                    onClick={e => toggleFollowUser(profile.userId, profile.followed)}
                                >
                                    <span className={`pointer ${theme.border_v1} ${theme.back_r4} ${theme.backHover_v1}`}>
                                        {profile.followed ? '已关注' : '+关注'}
                                    </span>
                                    <span className={`pointer ${theme.border_v1} ${theme.back_r4} ${theme.backHover_v1}`}>
                                        私信
                            </span>
                                </section>
                        }
                    </header>

                    <div className={styles.headerCount}>
                        <section className={`${theme.border_v1} pointer`}>
                            <h1>{profile.eventCount}</h1>
                            动态
                        </section>
                        <section className={`${theme.border_v1} pointer`}>
                            <h1>{profile.follows}</h1>
                            关注
                        </section>
                        <section className={`${theme.border_v1} pointer`}>
                            <h1>{profile.followeds}</h1>
                            粉丝
                        </section>
                    </div>

                    <footer>
                        <section>
                            所在地区：{_regionCode[profile.city]}
                        </section>
                        <section>
                            个人介绍：{profile.signature}
                        </section>
                    </footer>
                </main>
            </header>

            {/* 歌单 */}
            {
                currentMenuLength
                    ? <ol>
                        {_myMenuTitle[isMy].map((title, index) => (
                            <li key={index}>
                                <SongMenu
                                    key={index}
                                    title={title}
                                    onClick={enterPlaylist}
                                >
                                    {
                                        currentMenu[_myMenuTitle.propertys[index]].map(menu => (
                                            <SongMenuItem
                                                key={menu.id}
                                                img={menu.coverImgUrl}
                                                count={menu.playCount}
                                                name={menu.name}
                                                length={1}
                                                id={menu.id}
                                            />
                                        ))
                                    }
                                </SongMenu>
                            </li>
                        ))}
                    </ol>
                    : null
            }
        </OpcityWrap>
    )
}


UI.propTypes = {
    isMy: PropTypes.bool,
    myId: PropTypes.number,
    themeName: PropTypes.string,
    currentData: PropTypes.object,
    currentMenu: PropTypes.object,
    enterPlaylist: PropTypes.func,
    toggleFollowUser: PropTypes.func,
}

export default UI