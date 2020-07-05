/* eslint-disable react/prop-types */
import React, { memo, useMemo } from 'react'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'

import Toast from './toast'
import Loading from './loading'
import Confirm from './confirm'

function Message(props) {
    const
        { loading_imm, toast_imm, confirm_imm, themeName } = props,
        theme = useTheme(themeName),
        loading = useMemo(() => loading_imm.toJS(), [loading_imm]),
        toast = useMemo(() => toast_imm.toJS(), [toast_imm]),
        confirm = useMemo(() => confirm_imm.toJS(), [confirm_imm])

    return (
        <>
            <Toast {...toast} theme={theme} />
            <Loading {...loading} theme={theme} />
            <Confirm {...confirm} />
        </>
    )
}

const mapState = state => {
    const
        themeName = state.getIn(['theme', 'name']),
        global = state.get('global'),
        toast_imm = global.get('toast'),
        loading_imm = global.get('loading'),
        confirm_imm = global.get('confirm')

    return {
        themeName,
        loading_imm,
        toast_imm,
        confirm_imm,
    }
}

export default connect(mapState, null)(memo(Message))