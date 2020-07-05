import React, { memo, useCallback, useRef, useEffect, useState } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import useClick from 'hooks/useClick'
import { connect } from 'react-redux'
import Pad from 'base-ui/pad'
import useTheme from 'hooks/useTheme'

function CommentInput(props) {
    const
        {
            themeName,
            onSubmit,
            onClick,
            config = {
                type: '提交',
                placeholder: '写点什么...',
                show: false,
            },
        } = props,
        [showPad, setShowPad] = useState(false),
        padRef = useRef(null),
        textAreaRef = useRef(null),
        [listener, cancelListener] = useClick(bool => {
            setShowPad(bool)
        }, [padRef]),
        theme = useTheme(themeName),
        clickHandle = useCallback(e => {
            setShowPad(true)
            onClick && onClick()
        }, [onClick]),
        submitHandle = useCallback((e) => {
            e.preventDefault()
            const
                textArea = e.target.textarea,
                value = textArea.value,
                newValue = value ? value.trim() : ''
            if (newValue && onSubmit) {
                onSubmit(newValue)
                textArea.value = ''
                setShowPad(false)

            }
        }, [onSubmit])

    /* 外部改变 */
    useEffect(() => {
        setShowPad(config.show)
    }, [config])

    useEffect(() => {
        if (showPad) {
            listener()
            textAreaRef.current.focus()
        }
        else cancelListener()
        return () => cancelListener()
    }, [listener, cancelListener, showPad, textAreaRef])

    return (
        <>
            <div
                className={`${styles.inputWrap}  ${theme.border_v1}`}
                onClick={clickHandle}
            >
                发表评论
            </div>
            <Pad
                show={showPad}
                direction='center'
                width='100'
                el={padRef}
            >
                <form
                    className={styles.form}
                    onSubmit={submitHandle}
                >
                    <textarea
                        name='textarea'
                        className={`${theme.back_r2} ${theme.fontColor_v3}  ${theme.border_v1}`}
                        placeholder={config.placeholder}
                        ref={textAreaRef}
                    />
                    <button
                        type='submit'
                        className={`${theme} pointer `}
                    >
                        {config.type}
                    </button>
                </form>
            </Pad>
        </>
    )
}

CommentInput.propTypes = {
    themeName: PropTypes.string,
    onSubmit: PropTypes.func,
    onClick: PropTypes.func,
    config: PropTypes.object,
}

const mapState = state => ({ themeName: state.getIn(['theme', 'name']) })

export default connect(mapState, null)(memo(CommentInput))