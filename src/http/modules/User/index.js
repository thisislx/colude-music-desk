import login from './login'
import user from './user'

function User() {
    if (new.target === undefined) return new User()
}

User.prototype = { ...login, ...user }

Reflect.defineProperty(User.prototype, 'constructor', {
    value: User,
    enumerable: false,
    configurable: true,
    writable: true,
})

export default User