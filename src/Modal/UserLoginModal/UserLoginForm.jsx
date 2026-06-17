import {useState} from "react";
import {useUser} from "../../Context/UserContext.jsx";
import {useModal} from "../../Context/ModalContext.jsx";


function UserLoginForm({setError, switchToUserIdentifyScreen}) {


    const {logInUser} = useUser();
    const {switchToRegisterModal, setIsLoginModalOpen, setModalMessage} = useModal();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);


    const clearState = () => {
        setEmail("");
        setPassword("");
        setRememberMe(false);
        setError("");
        setModalMessage("");
    }


    const handleLoginSubmit = (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError('Please enter a valid email or password!');
        }
        setError("");

        const loggedIn = logInUser(email, password);

        if (!loggedIn) {
            setError('Please enter a valid email or password!');
            return;
        }

        clearState();
        setIsLoginModalOpen(false);
    }

    const forgotPasswordAction = () => {
        clearState();
        switchToUserIdentifyScreen();
    }


    return (

        <>
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-2 h-full">


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

                    <div onClick={() => forgotPasswordAction()}
                         className="text-xs sm:px-2 py-3 justify-center items-center text-amber-800 font-bold
                                        cursor-pointer transition-all duration-100 ease-out
                                        hover:scale-105 active:scale-95">
                        Forgot Password?
                    </div>

                </div>


                <div className="flex mt-4 justify-center">

                    <button
                        className="font-medium text-lg bg-green-600 w-full p-2 rounded-lg cursor-pointer
                                    transition-all duration-100 ease-in-out
                                    hover:scale-105 active:scale-95">
                        Login
                    </button>
                </div>

            </form>

            <div className="p-2 text-sm text-gray-700">
                Don't have an account?
                <span onClick={() => switchToRegisterModal()}
                      className="inline-block text-amber-800 font-bold text-base cursor-pointer pl-1
                                        transition-all duration-100 ease-out
                                        hover:scale-105 active:scale-95">
                        Register here
                    </span>
            </div>
        </>
    );
}

export default UserLoginForm;