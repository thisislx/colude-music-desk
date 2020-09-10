export const
    _loginWay = [
        {
            name: '手机登录',
            method: 'cellphoneLogin',   // actionsCreator[method]
            placehodlers: ['手机号码', '密码'],
            patterns: ['^1\\d{10}$', '^[\\s\\S]{6,}$'],   // input pattern属性
            inputTypes: ['tel', 'password'],
        },
        {
            name: '邮箱登录',
            placehodlers: ['邮箱', '密码'],
            method: 'emailLogin',
            patterns: ['^\\w+@\\w+\\.\\w+$', '^[\\s\\S]{6,}$'],
            inputTypes: ['email', 'password'],
        }
    ]