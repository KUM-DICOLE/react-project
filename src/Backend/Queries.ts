import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "./Firebase";
import { toastErr } from "../utils/toast";
import CatchErr from "../utils/catchErr";
import { authDataType, setLoadingType, userType } from "../Types";
import { signInWithEmailAndPassword } from "firebase/auth";
import {  NavigateFunction } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { defaultUser, setUser } from "../Redux/userSlice"; 
import { AppDispatch } from "../Redux/store";
import convertTime from "../utils/convertTime";
import AvatarGenerator from "../utils/avatarGenerator";

 
//colection names 
const usersCall= "users";
const tasksCall= "tasks";
const taskslistCall= "tasklist";
const chatscall= "chats";
const messagescall= "messages";

export const BE_signUp = (
    data:authDataType,
    setLoading: setLoadingType,
    reset:() => void,
    goTo: NavigateFunction,
    dispatch: AppDispatch
) => {
        const { email, password, confirmPassword } = data;
        //loading false 
        setLoading(true);

        if(email && password){
            if(password === confirmPassword){
                createUserWithEmailAndPassword(auth, email, password)
                .then(async({ user }) => {

                    const imgLink = AvatarGenerator(user.email?.split("@")[0] );
                    
                    const userInfo = await addUserToCollection(
                        user.uid, 
                        user.email || "",
                        user.email?.split("@")[0] || "", 
                        imgLink
                    );

                 dispatch(setUser(userInfo));

                    setLoading(false);
                    reset();
                    goTo("/dashboard");
                })
                .catch((err) => {
                    CatchErr(err);
                    setLoading(false);
                    }); 
            }else toastErr("Passwords do not match!", setLoading);
        }else toastErr("Fields shouldn't be empty!", setLoading);
    }; 
    export const BE_signIn  = (
        data: authDataType,
        setLoading: setLoadingType,
        reset: () => void,
        goTo:  NavigateFunction,
        dispatch: AppDispatch  

    ) => {
        const {email, password} = data;
        //loading true     
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
        .then(async({ user })=> {
            //TODO:  update user is true

            await updateUserInfo({id:user.uid, isOnline:true});


            //get the user info
            const userInfo = await getUserInfo(user.uid)
            dispatch(setUser(userInfo));

            setLoading(false);
            reset(); 
            goTo("/dashboard");   
        }).catch(err => {
            CatchErr(err);
            setLoading(false);
        }); 
    };

    // add user to collection      
  const addUserToCollection = async (id:string, email:string, username:string, img:string)  => {
    await setDoc(doc(db, usersCall, id), { 
        isOnline:true,
        img, 
        username,
        email,
        creationTime: serverTimestamp(),
        lastseen: serverTimestamp(),
        bio: `Hi my name is ${username}, thanks to Kum I understood React and Typescript now, 
        and i'm confortable working with them. `
    });
     return getUserInfo(id)
  }; 

  // get user to collection
  const getUserInfo = async (
    id: string
):Promise<userType>  => {
    const userRef = doc(db, usersCall, id);
    const user = await getDoc(userRef);

    if(user.exists()) {   
        const {img, isOnline, username, email, bio, creationTime, lastseen} = user.data();
        return {
            id: user.id,
            img,
            isOnline,
            username, 
            email,
            bio,
            creationTime: creationTime ? convertTime(creationTime.toDate()) : "no date yet: userinfo ",
            lastseen: lastseen ? convertTime(lastseen.toDate()) : "no date yet: userinfo " ,
        }          
    }else{
        toastErr("getUserInfo: user not found");
        return defaultUser;
    }

  };
  // update user info
  const updateUserInfo = async ({
    id,
    username,
    img, 
    isOnline, 
    isOffline
}:{
    id?: string;
    username?:string;
    img?:string;
    isOnline?:boolean;
    isOffline?:boolean;
}) => {
    if(!id){
        id = getStorageUser().id
    }
    if(id){
        await updateDoc(doc(db, usersCall, id),{
            ...(username && {username}),
            ...(isOnline && {username}),
            ...(isOffline && {isOnline:false}),
            ...(img && {img}), 
            lastseen: serverTimestamp(),

        });
    }    
};
const getStorageUser = () => {
    const usr = localStorage.getItem("react-project_user")
    if (usr) return JSON.parse(usr) 
        else return null
}