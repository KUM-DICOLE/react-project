import { toastErr, toastInfo } from "./toast";

const CatchErr = (err:{code?:string}) => {
const {code} = err;
if (code === "auth/invalid-email") toastErr("Invalid email");
else if (code === "auth/weak-password")  toastErr("password is invalid should be at least 6 characters")
else if (code === "auth/user-not-found") toastErr("user not found")
else if (code === "auth/email-alreaady-in-use") toastErr("email already in use")
else if (code === "auth/wrong-password") toastErr("wrong password")
else if (code === "auth/requires-reacent-login") toastInfo("logout and login before updating your profile")
else if (code === "auth/invalid-login-credentials") toastErr("invalid login credentials")
else if (code === "Unavailable") toastErr("firebase client is offline")
else toastErr("An error occurred")
console.log(err, err.code);
};

export default CatchErr;