import {useState} from "react";
import {useUser} from "../../Context/UserContext.jsx";

function UserConfirmIdentityForm({setError, switchToResetPasswordScreen, switchToLoginScreen}) {


    const {checkUserExistFromDetail} = useUser();

    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");

    const clearState = () => {
        setEmail("");
        setDob("");
        setError("");
    }

    const SignInAction = () => {
        clearState();
        switchToLoginScreen();
    }


    const handleIdentityConfirmSubmit = (e) => {
        e.preventDefault();

        const checkUserDetails = {
            email: email,
            dob: dob,
        }
        const user = checkUserExistFromDetail(checkUserDetails);
        if (!user){
            setError("No such user exist!");
            return;
        }
        clearState();
        switchToResetPasswordScreen(user);
    }

    return (
        <>
            <form onSubmit={handleIdentityConfirmSubmit}
                  className="flex flex-col gap-2 h-full">
                <h1 className="text-sm font-medium text-center p-2 text-purple-800">
                    To reset password, please verify your email and date of birth!
                </h1>
                <p className="text-sm pl-1">Email</p>
                <input className="p-1 sm:p-2 w-full bg-white rounded-lg outline-none"
                       type="email"
                       required
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                       placeholder="Enter your email address"
                />
                <p className="text-sm pl-1 pt-2">DOB</p>
                <input className="p-1 sm:p-2 w-full bg-white rounded-lg outline-none"
                       type="date"
                       required
                       value={dob}
                       onChange={e => setDob(e.target.value)}
                />

                <div className="flex mt-4 justify-center">

                    <button
                        className="font-medium text-lg text-white bg-purple-800 w-3/4 p-2 rounded-lg cursor-pointer
                                    transition-all duration-100 ease-in-out
                                    hover:scale-102 active:scale-99">
                        Reset Password
                    </button>
                </div>

            </form>
            <div className="p-2 text-sm text-gray-700">
                Remembered your password?
                <span onClick={() => SignInAction()}
                      className="inline-block text-amber-800 font-bold text-base cursor-pointer pl-1
                                              transition-all duration-100 ease-in-out
                                              hover:scale-105 active:scale-95">
                        Sign In
                    </span>
            </div>
        </>
    );
}

export default UserConfirmIdentityForm;