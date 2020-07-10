import React from 'react'
import { render } from 'react-dom'
import App from './app'
import './index.css'

if (Reflect.has(navigator, 'serviceWorker')) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
        .then(regist => console.log('service-worker registed'))
        .catch(reason => console.log('service-worker register err'))
    })
}
render(<App />, app)