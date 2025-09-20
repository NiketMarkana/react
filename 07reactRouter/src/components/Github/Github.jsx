import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data = useLoaderData()
    // const [data, setData] = useState([])
    // useEffect(() => {
    //  fetch('https://api.github.com/users/NiketMarkana')
    //  .then(response => response.json())
    //  .then(data => {
    //     console.log(data);
    //     setData(data)
    //  })
    // }, [])//An empty array ([]) means the effect runs only once, after the first render
    
  return (
    <div className='text-center m-4 bg-gray-300 text-black p-4 text-3xl'>Github followers: 427{/* {data.followers} */}
    <img className=" -mt-8 rounded-[50%]"src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/NiketMarkana')
    return response.json()
}