import React, { useState } from 'react'

export default function App (props) {
    const [count, setCount] = useState(0)

    return <div>
            <h1>{process.env.WEB_APP_NAME}</h1>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>Add</button>
            <img src="/react-app/static/img.jpeg" alt=""/>
    </div>
}
