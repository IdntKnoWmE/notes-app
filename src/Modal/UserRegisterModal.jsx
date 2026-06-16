import {useEffect, useState} from 'react';
import {useModal} from "../Context/ModalContext.jsx";
import {useUser} from "../Context/UserContext.jsx";
import {validatePassword} from "../utils/passwordHelper.js";

function UserLoginModal() {

    const {switchToLogin} = useModal();
    const {addUser} = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [dob, setDob] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#f1f3f3");


    // A state to store the validation message
    const [error, setError] = useState('');

    const clearState = () => {
        setfirstName("");
        setlastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setGender("");
        setDob("");
        setBackgroundColor("");
    }


    const checkRequiredValues = () => {

        if(!firstName.trim()){
            return [false, "Invalid First Name"]
        }
        if (!gender){
            return [false, "Invalid Gender"]
        }
        if (password !== confirmPassword){
            return [false, "Password mismatch!"]
        }
        if (validatePassword(password) === "Empty" || validatePassword(password) === "Weak"){
            return [false, "Password is too weak!"]
        }

        return [true, "Valid Inputs"]

    }


    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const [isValidInput, errorMessage] = checkRequiredValues();

        if (!isValidInput) {
            setError(errorMessage);
            return;
        }
        setError("");

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            gender: gender,
            dob: dob,
            backgroundColor: backgroundColor,
        }

        const [isRegistered, registerMessage] = addUser(newUser);

        if (isRegistered) {
            switchToLogin(registerMessage);
        }
        else{
            setError(registerMessage);
            return;
        }
        clearState();

    }

    return (
        <div
            className=" p-1 sm:p-7
                        fixed inset-0 m-auto  border-white border-2 bg-transparent border-dashed
                        h-3/4 w-2/3 flex flex-col justify-between
                        flex rounded-xl">

            <div
                className=" p-2 sm:p-0 h-full flex flex-col justify-between bg-white
                                sm:border-14 bg-transparent border-transparent rounded-xl">

                <div className="flex gap-4 justify-center items-center">
                    <img className="w-11 h-11 sm:w-16 sm:h-16"
                         src="notes_logo.png" alt="notes logo"/>
                    <div className="text-[12px] sm:text-[27px] font-bold text-amber-800 underline">
                            My Notes App Registration
                    </div>

                </div>

                <div className="flex flex-col justify-center">

                    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-2 h-full">
                        <div>

                            {error && (
                                <div className="text-[8px] text-red-600 sm:text-sm font-medium pl-2">
                                    {error}
                                </div>
                            )}
                        </div>
                        <div className="grid gap-y-2 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-4">

                            <div className="flex flex-col gap-1">
                                <p className="text-[11px] sm:text-sm pl-1">First Name</p>
                                <input className="p-0.75 sm:p-2 bg-red-200 rounded-lg outline-none"
                                       type="text"
                                       required
                                       value={firstName}
                                       onChange={e => setfirstName(e.target.value)}
                                       placeholder="Enter your First Name"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-[11px] sm:text-sm pl-1">Last Name</p>
                                <input className="p-0.75 sm:p-2 bg-blue-200 rounded-lg outline-none"
                                       type="text"
                                       value={lastName}
                                       onChange={e => setlastName(e.target.value)}
                                       placeholder="Enter your Last Name"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-[11px] sm:text-sm pl-1">Email</p>
                                <input className="p-0.75 sm:p-2 bg-amber-200 rounded-lg outline-none"
                                       type="email"
                                       required
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       placeholder="Enter your email address"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-[11px] sm:text-sm pl-1">Date of Birth</p>
                                <input className="p-0.75 sm:p-2 bg-orange-200 rounded-lg outline-none"
                                       type="date"
                                       value={dob}
                                       required
                                       onChange={e => setDob(e.target.value)}
                                       placeholder="Enter your email address"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-[11px] sm:text-sm pl-1">Password</p>
                                <input className="p-0.75 sm:p-2 bg-green-200 rounded-lg outline-none"
                                       type="password"
                                       value={password}
                                       required
                                       onChange={e => setPassword(e.target.value)}
                                       placeholder="Enter your Password"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-[11px] sm:text-sm pl-1">Confirm Password</p>
                                <input className="p-0.75 sm:p-2 bg-purple-200 rounded-lg outline-none"
                                       type="password"
                                       value={confirmPassword}
                                       required
                                       onChange={e => setConfirmPassword(e.target.value)}
                                       placeholder="Enter your Password"
                                />
                            </div>

                            <div className="flex gap-4 items-center">
                                <p className="text-[11px] sm:text-sm pl-1">Gender: </p>
                                <button
                                    type="button"
                                    onClick={()=> setGender("Male")}
                                    className={`w-6 h-6 ring-1 sm:w-8 sm:h-8 sm:ring-3 
                                                bg-[url('male.png')] bg-contain bg-center
                                                rounded-full cursor-pointer
                                                transition-all duration-200 ease-in-out 
                                                hover:scale-110 active:scale-90 
                                                ${gender === "Male" ? "ring-green-600" : "ring-transparent"}
                                                `}
                                    >
                                </button>
                                <button
                                type="button"
                                onClick={()=> setGender("Female")}
                                className={`w-7 h-7 ring-1 sm:w-9 sm:h-9 sm:ring-3
                                                bg-[url('female.png')] bg-cover bg-center
                                                rounded-full  cursor-pointer
                                                transition-all duration-200 ease-in-out 
                                                hover:scale-110 active:scale-90 
                                                ${gender === "Female" ? "ring-green-600" : "ring-transparent"}
                                                `}>

                                </button>
                            </div>

                            <div className="flex gap-4 items-center">
                                <p className="text-[11px] sm:text-sm pl-1">Background Color: </p>
                                <div className="w-5 h-5 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-sm border
                                        cursor-pointer hover:scale-105 transition-transform">
                                    <input
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        className="cursor-pointer scale-300"
                                    />
                                </div>

                            </div>

                        </div>


                        <div className="mt-1 sm:mt-4 flex justify-center">

                            <button type="submit"
                                className=" w-fit px-3 sm:w-1/2 sm:p-2 sm:text-lg font-medium
                                            bg-green-600 rounded-lg cursor-pointer
                                            transition-all duration-100 ease-in-out
                                            hover:scale-105 active:scale-95">
                                Register
                            </button>
                        </div>

                    </form>
                </div>

                <div className="p-2 text-sm text-gray-700">
                    Already have an account?
                    <span onClick={() => switchToLogin("")}
                          className="text-amber-800 font-bold text-base cursor-pointer pl-1">
                        Login here
                    </span>
                </div>
            </div>


        </div>
    );
}

export default UserLoginModal;