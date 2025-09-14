import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

function MyApp(){
  return (
    <div>
      <h1>Custom App | chai</h1>
    </div>
  )
}

// const ReactElement = {
//     type: 'a',
//     props: {
//         href: 'https://google.com',
//         target: '_blank'
//     },
//     children: 'Click me to visit google'
// }

const anotherElement = (
    <a href="https://google.com" target='_blank'>Visit google</a>
)

//declare global variable
const anotherUser = "chai aur react"


const reactElement = React.createElement(
    'a',
    {href: 'https://google.com',target: '_blank' },
    'click me to visit google',
    anotherElement
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}

    {/* <MyApp /> */}
    {/* consider as MyApp() */}

    {/* ReactElement */} 
    {/* itwill not work  */}

    {/* anotherElement */}

    reactElement

  </StrictMode>,
)
