import React from 'react'

const UserContext = React.createContext()

export default UserContext;

// React Context allows you to share data across components without passing props manually at every level.
// For example: user info, theme, language settings, etc.