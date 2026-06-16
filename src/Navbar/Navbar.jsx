
import {useModal} from "../Context/ModalContext.jsx";
import {useNotes} from "../Context/NotesContext.jsx";

function Navbar() {

    const {openCreateNoteModal, setIsSettingModalOpen, isSettingModalOpen} = useModal();

    const {setCurrentFilterForNotes, getDeletedNotesCount, } = useNotes();

    return (
        <div className="w-14 fixed sm:relative min-h-screen sm:w-1/20 bg-white flex flex-col justify-between items-center py-7 z-50 shadow-md">

            <button className="cursor-pointer transition-all duration-100 ease-in-out hover:scale-110
                        active:scale-90">
                <img className="w-12 h-12"
                     src="notes_logo.png" alt="notes_add"/>
            </button>
            <div className="flex flex-col justify-center gap-10 pb-50">

                <button onClick={openCreateNoteModal}
                        className="cursor-pointer transition-all duration-100 ease-in-out hover:scale-110
                        active:scale-90"
                >
                    <img className="w-12 h-12"
                         src="notes_add.png" alt="notes_add"/>
                </button>

                <button onClick={() => setCurrentFilterForNotes("all")}
                        className="cursor-pointer transition-all duration-100 ease-in-out hover:scale-110
                        active:scale-90">
                    <img className="w-12 h-12"
                         src="all_notes.png" alt="all_notes"/>
                </button>

                <button onClick={() => setCurrentFilterForNotes("favourite")}
                        className="cursor-pointer transition-all duration-100 ease-in-out hover:scale-110
                        active:scale-90">
                    <img className="w-12 h-12"
                         src="all_favourite.png" alt="all_favourite"/>
                </button>

                <button onClick={() => setCurrentFilterForNotes("deleted")}
                        className="cursor-pointer transition-all duration-100 ease-in-out hover:scale-110
                        active:scale-90">
                    <img className="w-12 h-12"
                         src={getDeletedNotesCount() > 0 ? "full_trash.png": "empty_trash.png"}
                         alt="trash"/>
                </button>

            </div>
            <div>
                <button onClick={() => setIsSettingModalOpen(!isSettingModalOpen)}
                    className="cursor-pointer transition-all duration-100 ease-in-out hover:scale-110
                        active:scale-90">
                    <img className="w-12 h-12"
                         src="notes_setting.png" alt="notes_add"/>
                </button>
            </div>


        </div>
    );
}

export default Navbar;