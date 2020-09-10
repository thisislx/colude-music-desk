import React, { memo, useState, useCallback, useContext, useRef, useMemo, useEffect } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _loginWay } from './config'
import useClick from 'hooks/useClick'
import Pad from 'base-ui/pad'

function NotLogin(props) {
    const
        { theme } = props,
        [show, setShow] = useState(false),
        [current, setCurrent] = useState(0),  // 登录方式
        padRef = useRef(null),
        inputAccountRef = useRef(null),
        inputPasswordRef = useRef(null),
        inputRefs = useMemo(() =>
            [inputAccountRef, inputPasswordRef], [inputAccountRef, inputPasswordRef]),
        loginHandle = useCallback((e) => {
            e.preventDefault()
            const
                key = _loginWay[current].method,
                account = inputAccountRef.current.value.trim(), // 不包括空格
                password = inputPasswordRef.current.value
            props[key](account, password)
        }, [current, inputAccountRef, inputPasswordRef]),
        [listener, closeListner] = useClick(bool => {
            setShow(bool)
        }, [padRef])

    useEffect(() => {
        if (show) listener()
        else closeListner()
        return () => closeListner()
    }, [show])

    return (
        <div
            className={`${styles.wrap} pointer`}
            onClick={e => setShow(true)}
        >
            <span className='iconfont'>&#xe62f;</span>
            <span className={styles.text}>未登录</span>

            <Pad show={show} direction='center' width={26} el={padRef}>
                <form
                    className={`${styles.form} `}
                    onSubmit={loginHandle}
                >
                    {
                        _loginWay[current].inputTypes.map((item, key) => {
                            const way = _loginWay[current]
                            return (
                                <input
                                    key={key}
                                    className={`${theme.border_v1} ${theme.fontColor_v3} ${theme.back_r1}`}
                                    ref={inputRefs[key]}
                                    type={way.inputTypes[key]}
                                    placeholder={way.placehodlers[key]}
                                    pattern={way.patterns[key]}
                                />
                            )
                        })
                    }

                    <button
                        type='submit'
                        className={`${theme} click-active pointer`}
                    >
                        登录
                    </button>

                    <footer
                        className={styles.ways}
                    >
                        {
                            _loginWay.map((item, index) => (
                                <section
                                    key={index}
                                    className={`pointer ` + (index === current ? theme : theme.v1)}
                                    onClick={e => setCurrent(index)}
                                >
                                    {item.name}
                                </section>
                            ))
                        }
                    </footer>
                </form>
            </Pad>
        </div>
    )
}

NotLogin.propTypes = {
    props: PropTypes.object,
    theme: PropTypes.object,
    cellphoneLogin: PropTypes.func,
    emailLogin: PropTypes.func,
}

export default memo(NotLogin)