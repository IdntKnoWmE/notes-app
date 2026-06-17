import {useState} from "react";
import {useUser} from "../../Context/UserContext.jsx";
import {validatePassword} from "../../utils/passwordHelper.js";
import {useModal} from "../../Context/ModalContext.jsx";



function UserRestPasswordForm({setError, user, switchToLoginScreen}) {


    const {resetPassword} = useUser();
    const {setModalMessage} = useModal();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const clearState = () => {
        setPassword("");
        setConfirmPassword("");
        setError("");
    }

    const signInAction = () => {
        clearState();
        switchToLoginScreen();
    }


    const handleResetPasswordSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }
        if (validatePassword(password) === "Empty" || validatePassword(password) === "Weak"){
            setError("Password is too weak!")
            return;
        }
        const [isReset, resetMessage] = resetPassword(user.id, password);

        if(!isReset){
            setError(resetMessage);
            return;
        }
        setModalMessage(resetMessage);
        signInAction();

    }


    return (
        <>
            <form onSubmit={handleResetPasswordSubmit}
                  className="flex flex-col gap-2 h-full">
                <h1 className="text-sm font-medium text-center p-2 text-purple-800">
                    Hello {`${user.firstName} ${user.lastName}`}, Please setup new password!
                </h1>
                <p className="text-sm pl-1">Password</p>
                <input className="p-1 sm:p-2 w-full bg-white rounded-lg outline-none"
                       type="password"
                       required
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                       placeholder="Password"
                />
                <p className="text-sm pl-1 pt-2">Confirm Password</p>
                <input className="p-1 sm:p-2 w-full bg-white rounded-lg outline-none"
                       type="password"
                       required
                       value={confirmPassword}
                       onChange={e => setConfirmPassword(e.target.value)}
                       placeholder="Confirm Password"
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
                <span onClick={() => signInAction()}
                      className="inline-block text-amber-800 font-bold text-base cursor-pointer pl-1
                                              transition-all duration-100 ease-in-out
                                              hover:scale-105 active:scale-95">
                        Sign In
                    </span>
            </div>
        </>
    );
}

export default UserRestPasswordForm;