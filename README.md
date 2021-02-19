Crane
=====

Crane come with everything you need while creating multi-page Web App (WIP).

## Installation

```shell
npm install @cranejs/cli
```

## Usage

Check out [example](https://github.com/joe223/crane/tree/dev/example).

### Commands

#### Development

```
crane dev
```

#### Creating a Production Build

```
crane build
```

### Parameters

#### mode

```
crane dev --mode development
```

Crane will search for `[project root directory]/env/.env.development` file and inject all environment constants which start with `WEB_APP_*` to project. That means that you can write code like this:

```javascript
// some javascript code
import React from 'react'

export default function App (props) {
    return <h1>Hello {process.env.WEB_APP_NAME} {process.env.VERSION}</h1>
}
```

You will get `Hello Crane 1.0.0` if these environment constants are provided.

**env/.env._base**
```javascript
WEB_APP_NAME = 'World'
WEB_APP_VERSION = '1.0.0'
```

**env/.env.development**
```javascript
WEB_APP_NAME = 'Crane'
```

### Output directory

**crane.config.js**
```javascript
        index: {
            title: 'Crane',
            entry: 'index/index.js',
            template: 'index/index.pug',

            // output html file: /index.html
            output: '/'
        },
        'vue-page': {
            title: 'Vue App',
            entry: 'vue-page/index.jsx',
            template: 'vue-page/index.pug',
            jsxType: 'vue'

            // output html file: /vue-page/index.html
        },
        'react-page': {
            title: 'React App',
            entry: 'react-page/index.jsx',
            template: 'vue-page/index.pug',
            jsxType: 'react',
            static: 'react-page/static',

            // output html file: /react-app
            output: 'react-app'
        }
```

### JSX

React and Vue use different babel JSX presets. Declaring `jsxType` explicitly and provide `@cranejs/plugin-jsx` plugin to enable JSX compilation.

**crane.config.js**
```javascript
module.exports = {
    pages: {
        'vue-page': {
            title: 'Vue App',
            entry: 'vue-page/index.jsx',
            template: 'vue-page/index.pug',
            jsxType: 'vue'
        },
        'react-page': {
            title: 'React App',
            entry: 'react-page/index.jsx',
            template: 'vue-page/index.pug',
            output: 'react-app',
            jsxType: 'react',
            static: 'react-page/static'
        }
    },

    plugins: [
        '@cranejs/plugin-jsx'
    ]
}
```

### Static resource

Provide `pageConfig.static` property to tell crane to copy whole directory as static resource.

**crane.config.js**
```javascript
module.exports = {
    pages: {
        'vue-page': {
            // ...
            static: 'vue-page/static'
        }
    }
}
```
