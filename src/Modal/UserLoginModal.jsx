import {useEffect, useState} from 'react';
import {useModal} from "../Context/ModalContext.jsx";
import {useUser} from "../Context/UserContext.jsx";

function UserLoginModal() {

    const {modalMessage, setModalMessage, setIsLoginModalOpen, switchToRegisterModal} = useModal();

    const {logInUser} = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);


    // A state to store the validation message
    const [error, setError] = useState('');

    const clearState = () => {
        setEmail("");
        setPassword("");
        setModalMessage("");
        setIsLoginModalOpen(false);
    }

    const setErrorMessage = (message) => {
        setModalMessage("");
        setError(message);
    }


    const handleLoginSubmit = (e) => {
        e.preventDefault();

        if(!email.trim() || !password.trim()) {
            setErrorMessage('Please enter a valid email or password!');
        }
        setError("");

        const loggedIn = logInUser(email, password);

        if (!loggedIn) {
            setErrorMessage('Please enter a valid email or password!');
            return;
        }

        clearState();
    }

    return (
        <div
            className="fixed inset-0 m-auto bg-transparent
                        h-3/4 w-2/3
                        flex rounded-xl">

            <div className="w-full rounded-3xl sm:rounded-none sm:w-1/2 bg-white/90 h-full sm:rounded-l-2xl p-8 flex flex-col justify-between">

                <div>
                    <img className="w-16 h-16"
                         src="/notes_logo.png" alt="notes logo"/>
                </div>

                <div className="flex flex-col justify-center">

                    <div className="flex flex-col leading-none gap-1 mb-6">
                        <div className="text-[24px] font-medium text-black"> Welcome To</div>
                        <div className="text-[27px] font-bold text-amber-800"> My Notes App</div>
                    </div>


                    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-2 h-full">
                        <div>

                            {error && (
                                <div className="text-red-600 text-sm font-medium">
                                    {error}
                                </div>
                            )}
                            {modalMessage && (
                                <div className="text-green-600 text-sm font-medium">
                                    {modalMessage}
                                </div>
                            )}

                        </div>
                        <p className="text-sm pl-1">Email</p>
                        <input className="p-1 sm:p-2 w-full bg-white rounded-lg outline-none"
                               type="email"
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                               placeholder="Enter your email address"
                        />
                        <p className="text-sm pl-1 pt-3">Password</p>
                        <input className="p-1 sm:p-2 w-full bg-white rounded-lg outline-none"
                               type="password"
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                               placeholder="Enter your Password"
                        />

                        <div className="flex pt-2 justify-between items-center">

                            <div className="flex gap-2 py-2 px-2 justify-center items-center">
                                <input className="w-4 h-4"
                                       type="checkbox"
                                       checked={rememberMe}
                                       onChange={() => setRememberMe(!rememberMe)}
                                       name="rememberMe"
                                />
                                <h4 className="font-medium text-gray-700 text-xs py-1">Remember me</h4>
                            </div>

                            <div className="text-xs sm:px-2 py-3 justify-center items-center text-amber-800 font-bold">
                                Forgot Password?
                            </div>

                        </div>


                        <div className="flex justify-between mt-4 justify-center">

                            <button
                                    className="font-medium text-lg bg-green-600 w-full p-2 rounded-lg cursor-pointer
                                        transition-all duration-100 ease-in-out
                                        hover:scale-105 active:scale-95">
                                Login
                            </button>
                        </div>

                    </form>
                </div>

                <div className="p-2 text-sm text-gray-700">
                    Don't have an account?
                    <span onClick={()=>switchToRegisterModal()}
                        className="text-amber-800 font-bold text-base cursor-pointer pl-1">
                        Register here
                    </span>
                </div>

            </div>

            <div className="w-0 sm:w-1/2 bg-transparent h-full sm:rounded-r-2xl sm:border-r-14 sm:border-t-14 sm:border-b-14 border-white">

            </div>


        </div>
    );
}

export default UserLoginModal;