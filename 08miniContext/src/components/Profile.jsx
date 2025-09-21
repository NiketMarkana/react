import React, {useContext} from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const {user} = useContext(UserContext)//useContext(UserContext) returns { user, setUser }.
    
    
    //if (!user) return <div>please login</div>//if you enter any one of username and password then also works

    if (!user.username || !user.password) return <div>please login</div>//both field shoud not be null

    return <div>Welcome {user.username}</div>//Profile.jsx uses "user" using context
}

export default Profile