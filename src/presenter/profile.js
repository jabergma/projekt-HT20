import React from 'react'
import ProfileView from '../views/ProfileView'
import { useSelector} from "react-redux";

export default function Profile() {
    const userStocks = useSelector((state) => state.userStocks);
    return (
        <ProfileView userStocks={userStocks}/>
    )
}
