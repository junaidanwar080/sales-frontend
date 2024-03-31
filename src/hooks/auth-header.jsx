import React from "react"
const authHeader = () => {
    const user  = JSON.parse(localStorage.getItem("user"));
    if(user && user.access){
        return { "x-auth-token": user.access };
    } else {
        return {};
    }
}
export default authHeader