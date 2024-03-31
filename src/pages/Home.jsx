import React from 'react'

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.user.username)
  if (user && user.access){
    return (
      <div className="m-10">Loged in User at Home</div>
    )
  } else{

    return (
      <div className="m-10">Home</div>
    )
  }

}

export default Home