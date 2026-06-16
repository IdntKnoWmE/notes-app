import {useEffect, useState} from 'react';
import {useNotes} from "../../Context/NotesContext.jsx";
import {useUser} from "../../Context/UserContext.jsx";
import {useModal} from "../../Context/ModalContext.jsx";

function NotesTop() {


    const {setSearchQuery} = useNotes();
    const {currentUser, logOutUser} = useUser();
    const {switchToLogin} = useModal();

    // A state to store the validation message
    const [searchInput, setSearchInput] = useState('');
    const [error, setError] = useState("");

    const submitSearchQuery = () => {

        if(!searchInput && searchInput.trim().length === 0) {
            setError("Enter a valid search query");
            return;
        }
        setError("");
        setSearchQuery(searchInput.trim());
    }

    const clearSearchQuery = () => {
        setSearchInput("");
        setSearchQuery("");
        setError("");
    }

    const userLoggingOut = () => {

        logOutUser(currentUser.user.id);
        switchToLogin("");

    }

    return (
        <div className="flex flex-col items-center justify-evenly pt-5 px-5 gap-2
                        sm:flex-row sm:justify-between">
            <div className="flex gap-4">
                <div className="">
                    <img className="w-12 h-12"
                         src={currentUser.user.gender === "Male"? "male.png" : "female.png"}
                         alt="user avatar" />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="font-medium text-blue-700">
                        {`${currentUser.user.firstName} ${currentUser.user.lastName}`}
                    </div>
                    <div className="font-medium text-xs text-orange-800">{currentUser.user.email}</div>
                </div>
            </div>
            <div className="flex flex-col gap-1 sm:w-1/2 w-80 mt-1">
                <div className="flex gap-2 justify-between bg-green-400 rounded-2xl p-2">
                    <input
                        className="w-[80%] outline-none"
                        type="text"
                        placeholder="Search Notes"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    {searchInput && (
                    <button onClick={clearSearchQuery}>
                        <img className="w-6 h-6 mr-1 cursor-pointer
                                        transition-all duration-100 hover:scale-110 active:scale-90"
                                 src="cross.png" alt="notes_add"/>
                    </button>
                        )}
                    <button onClick={submitSearchQuery}>
                        <img className="w-6 h-6 mr-3 cursor-pointer
                                        transition-all duration-100 hover:scale-110 active:scale-90"
                                 src="search.png" alt="notes_add"/>
                    </button>
                </div>
                {error && (
                    <div className="text-red-600 text-xs font-medium pl-2">
                        {error}
                    </div>
                )}
            </div>
            <div>
                <button onClick={userLoggingOut}>
                    <img className="w-9 h-9 mr-3 cursor-pointer mt-1
                                            transition-all duration-100 hover:scale-110 active:scale-90"
                             src="user-logout.png" alt="user_logout"/>
                </button>
            </div>
        </div>
    );
}

export default NotesTop;