import React, { useEffect, useState } from 'react';
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import AddListBoard from './AddListBoard';
import Icon from './Icon';
import UserHeaderProfile from './UserHeaderProfile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { useNavigate } from 'react-router-dom'; 
import { BE_signOut, getStorageUser } from '../Backend/Queries';
import Spinner from './Spinner';
import { setUser } from '../Redux/userSlice';
const logo = require('../Assets/logo.png');

type Props = {}

function Header() {
    const [logoutloading, setLogoutLoading] = useState(false);
    const [currentPage, setCurrentPages] = useState(() => localStorage.getItem('react-project-Page'));
    const goTo = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const usr = getStorageUser();

    useEffect(() => {
        if (usr?.id) {
            dispatch(setUser(usr));
        } else {
            goTo("/auth");
        }
    }, [dispatch, goTo, usr]);

    useEffect(() => {
        if (currentPage) goTo("/dashboard" + currentPage);
    }, [currentPage, goTo]);

    const handleGoToPage = (page: any) => {
        goTo("/dashboard/" + page);
        setCurrentPages(page);
    };

    const handleSignOut = async () => {
        await BE_signOut(dispatch, goTo, setLogoutLoading);
    };

    return (
        <div className='flex flex-wrap sm:flex-row gap-5 items-center justify-between drop-shadow-md 
        bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white'>
            <img className='w-[70px] drop-shadow-md cursor-pointer' 
            src={logo} 
            alt='logo' 
            />
            <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
                {currentPage === "chat" ? (
                    <Icon IconName={FiList} onClick={() => handleGoToPage("list")} />
                ) : currentPage === "profile" ? (
                    <>
                        <Icon IconName={FiList} onClick={() => handleGoToPage("list")} />
                        <Icon 
                            IconName={BsFillChatFill} 
                            ping={true}
                            onClick={() => handleGoToPage("chat")} 
                        />
                    </>
                ) : (
                    <>
                        <AddListBoard />
                        <Icon 
                            IconName={BsFillChatFill} 
                            ping={true}
                            onClick={() => handleGoToPage("chat")} 
                        />
                    </>
                )}
                
                <div className='group relative'>
                    {currentUser ? (
                        <UserHeaderProfile user={currentUser} />
                    ) : (
                        <div className="text-gray-300">Loading...</div> // Optional loading state or fallback UI
                    )}
                    <div className="absolute pt-5 hidden group-hover:block w-full min-max">
                        <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
                            <p 
                                onClick={() => handleGoToPage("profile")} 
                                className='hover:bg-gray-200 py-2 px-4 block cursor-pointer'>
                                Profile
                            </p> 
                            <p 
                                onClick={() => !logoutloading && handleSignOut()}
                                className={`hover:bg-gray-200 py-2 px-4 
                                    cursor-pointer flex items-center gap-4`}>
                                Log out
                                {logoutloading && <Spinner />}
                            </p> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );  
};

export default Header;
