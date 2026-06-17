import {useEffect, useRef, useState} from 'react';
import {useModal} from "../Context/ModalContext.jsx";
import {useNotes} from "../Context/NotesContext.jsx";
import {useUser} from "../Context/UserContext.jsx";
import {validatePassword} from "../utils/passwordHelper.js";

function UserSettingModal() {

    const {setIsSettingModalOpen, switchToLogin} = useModal();
    const {currentUser, updateUser, deleteUser, logOutUser, setCurrentUser} = useUser();


    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [gender, setGender] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [dob, setDob] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#f1f3f3");

    const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);


    const clearState = () => {
        setfirstName("");
        setlastName("");
        setEmail("");
        setCurrentPassword("");
        setNewPassword("");
        setGender("");
        setDob("");
        setBackgroundColor("");
        setIsSettingModalOpen(false);
        setConfirmDeleteUser(false);
    }

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        setEmail(currentUser.user.email);
        setDob(currentUser.user.dob);
        setfirstName(currentUser.user.firstName);
        setlastName(currentUser.user.lastName);
        setBackgroundColor(currentUser.user.backgroundColor);
        setGender(currentUser.user.gender);


    }, [currentUser]);


    // A state to store the validation message
    const [error, setError] = useState('');


    const checkRequiredValues = () => {

        if(!firstName.trim()){
            return [false, "Invalid First Name"]
        }
        if (!gender){
            return [false, "Invalid Gender"]
        }

        if (currentPassword.trim() !== currentUser.user.password.trim()){
            return [false, "Invalid current password!"]
        }
        if (newPassword && validatePassword(newPassword) === "Empty" || validatePassword(newPassword) === "Weak"){
            return [false, "Password is too weak!"]
        }

        return [true, "Valid Inputs"]

    }


    const handleUpdateProfile = (e) => {

        e.preventDefault();

        const [isValidInput, errorMessage] = checkRequiredValues();
        let reLogin = false;

        if (!isValidInput) {
            setError(errorMessage);
            return;
        }
        setError("");

        if (newPassword.trim() !== ""){
            reLogin = true;
        }

        const newUser = {
            ...currentUser.user,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: newPassword? newPassword : currentPassword,
            gender: gender,
            dob: dob,
            backgroundColor: backgroundColor,
        }

        const [isUpdated, updatedMessage] = updateUser(newUser);

        if (isUpdated) {
            if(reLogin) {
                logOutUser(currentUser.user.id);
                clearState();
                switchToLogin("");
            }
        }
        else{
            setError(updatedMessage);
            return;
        }
        setCurrentUser((prev) => ({...prev, user:newUser}));
        clearState();
    }


    const deleteUserProfile = () => {

        const currentUserId = currentUser.user.id;
        const [isDeleted, deletedMessage] = deleteUser(currentUserId);

        if (!isDeleted) {
            setError(deletedMessage);
            setConfirmDeleteUser(false);
            return;
        }
        setError("");

        logOutUser(currentUser.user.id);
        clearState();
        switchToLogin("");

    }


    return (
        <div
             className="fixed inset-0 m-auto bg-white/80 backdrop-blur-sm
                        h-5/6 w-2/3
                        flex flex-col px-3 pt-2 rounded-3xl">
            <div className="text-end">
                <button onClick={() => setIsSettingModalOpen(false)}
                        className=" cursor-pointer
                                    transition-all duration-100 ease-in-out
                                    hover:scale-110 active:scale-90">
                    <img className="w-10 h-10"
                         src="/close.png" alt="close_modal"/>
                </button>
            </div>

            {!confirmDeleteUser? (
                <form onSubmit={handleUpdateProfile}
                    className="flex flex-col gap-8 h-full pt-4">

                <div className="flex flex-col">
                    <h1
                        className="text-4xl font-bold text-purple-600 uppercase text-center"> User Profile</h1>
                    <hr/>
                </div>

                    {error && (
                        <div className="text-red-600 text-sm font-medium">
                            {error}
                        </div>
                    )}

                <div className="grid gap-y-2 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-6">

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
                        <p className="text-[11px] sm:text-sm pl-1">Current Password</p>
                        <input className="p-0.75 sm:p-2 bg-green-200 rounded-lg outline-none"
                               type="password"
                               required
                               value={currentPassword}

                               onChange={e => setCurrentPassword(e.target.value)}
                               placeholder="Enter your Password"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-[11px] sm:text-sm pl-1">New Password</p>
                        <input className="p-0.75 sm:p-2 bg-purple-200 rounded-lg outline-none"
                               type="password"
                               value={newPassword}

                               onChange={e => setNewPassword(e.target.value)}
                               placeholder="Enter your Password"
                        />
                    </div>

                    <div className="flex gap-4 items-center">
                        <p className="text-[11px] sm:text-sm pl-1">Gender: </p>
                        <button
                            type="button"
                            onClick={()=> setGender("Male")}
                            className={`w-6 h-6 ring-1 sm:w-8 sm:h-8 sm:ring-3 
                                                bg-[url('/male.png')] bg-contain bg-center
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
                                                bg-[url('/female.png')] bg-cover bg-center
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

                <div className="mt-1 sm:mt-4 flex justify-center gap-4">

                    <button type="submit"
                            className=" w-fit px-3 sm:w-1/3 sm:p-2 sm:text-xl uppercase font-bold
                                            bg-green-600 rounded-lg cursor-pointer
                                            transition-all duration-100 ease-in-out
                                            hover:scale-105 active:scale-95">
                        Update Profile
                    </button>

                    <button onClick={() => setConfirmDeleteUser(true)}
                            type="button"
                            className=" w-fit px-3 sm:w-1/3 sm:p-2 sm:text-xl uppercase font-bold
                                            bg-red-600 rounded-lg cursor-pointer
                                            transition-all duration-100 ease-in-out
                                            hover:scale-105 active:scale-95">
                        Delete Profile
                    </button>
                </div>

            </form>
                ): (
                <div className="flex h-full flex-col gap-2 justify-center text-center items-center">
                    <h1 className="text-4xl text-red-800 pb-4">Do you want to delete your account?</h1>
                    <button onClick={deleteUserProfile}
                        className="font-medium text-3xl bg-green-600 w-1/4 mb-3 mr-4 px-9 py-2  rounded-2xl cursor-pointer
                                        transition-all duration-100 ease-in-out
                                        hover:scale-105 active:scale-95">
                        Yes
                    </button>
                    <button onClick={() => setConfirmDeleteUser(false)}
                        className="font-medium text-3xl w-1/4 bg-red-600 mb-3 mr-4 px-9 py-2 rounded-2xl cursor-pointer
                                        transition-all duration-100 ease-in-out
                                        hover:scale-105 active:scale-95">
                        No
                    </button>
                </div>

                    )}


        </div>
    );
}

export default UserSettingModal;