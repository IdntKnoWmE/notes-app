import {useEffect, useState} from 'react';
import {useModal} from "../../Context/ModalContext.jsx";
import {useUser} from "../../Context/UserContext.jsx";
import UserConfirmIdentityForm from "./UserConfirmIdentityForm.jsx";
import UserRestPasswordForm from "./UserRestPasswordForm.jsx";
import UserLoginForm from "./UserLoginForm.jsx";

function UserLoginModal() {



    const {modalMessage, setModalMessage} = useModal();

    const [forgotPassword, setForgotPassword] = useState(false);
    const [emailDobConfirmScreen, setEmailDobConfirmScreen] = useState(false);
    const [resetPasswordScreen, setResetPasswordScreen] = useState(false);
    const [passwordUpdateUser, setPasswordUpdateUser] = useState(null);


    // A state to store the validation message
    const [error, setError] = useState('');


    const switchToResetPasswordScreen = (user) => {

        setEmailDobConfirmScreen(false);
        setResetPasswordScreen(true);
        setPasswordUpdateUser(user);

    }

    const switchToLoginScreen = () => {
        setForgotPassword(false);
        setEmailDobConfirmScreen(false);
        setResetPasswordScreen(false);
        setPasswordUpdateUser(null);
    }

    const switchToUserIdentifyScreen = () => {
        setForgotPassword(true);
        setEmailDobConfirmScreen(true);
    }

    useEffect( () => {
        if(error){
            setModalMessage("");
        }
    }, [error])


    return (
        <div
            className="fixed inset-0 m-auto bg-transparent
                        h-3/4 w-2/3
                        flex rounded-xl">

            <div
                className="w-full rounded-3xl md:rounded-none md:w-1/2 bg-white/90 h-full md:rounded-l-2xl p-8 flex flex-col justify-between">

                <div>
                    <img className="w-16 h-16"
                         src="/notes_logo.png" alt="notes logo"/>
                </div>


                <div className="flex flex-col justify-center leading-none gap-1 my-4">

                    <div className="text-[24px] font-medium text-black"> Welcome To</div>
                    <div className="text-[27px] font-bold text-amber-800"> My Notes App</div>

                </div>

                <div className="h-8">

                    {error && (
                        <div className="text-red-600 text-xs font-medium">
                            {error}
                        </div>
                    )}
                    {modalMessage && (
                        <div className="text-green-600 text-xs font-medium">
                            {modalMessage}
                        </div>
                    )}

                </div>

                {forgotPassword ? (
                    <>
                    {emailDobConfirmScreen? (
                        <UserConfirmIdentityForm setError={setError}  switchToResetPasswordScreen={switchToResetPasswordScreen}
                                                 switchToLoginScreen={switchToLoginScreen}
                        />
                    ): null}
                    {resetPasswordScreen? (
                        <UserRestPasswordForm setError={setError} user={passwordUpdateUser} switchToLoginScreen={switchToLoginScreen}/>
                    ) : null}
                    </>
                    ): null}

                {!forgotPassword ? (
                    <UserLoginForm setError={setError} switchToUserIdentifyScreen={switchToUserIdentifyScreen}
                    />
                ) : null}


            </div>

            <div
                className="w-0 md:w-1/2 bg-transparent h-full md:rounded-r-2xl md:border-r-14 md:border-t-14 md:border-b-14 border-white">

            </div>


        </div>
    );
}

export default UserLoginModal;