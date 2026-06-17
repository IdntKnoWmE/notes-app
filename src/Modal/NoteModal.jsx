import {useEffect, useRef, useState} from 'react';
import {useModal} from "../Context/ModalContext.jsx";
import {useNotes} from "../Context/NotesContext.jsx";

function NoteModal() {

    const {isNoteModalOpen, activeNote, closeNoteModal} = useModal();
    const {addNote, updateNote } = useNotes();

    const [noteTitle, setnoteTitle] = useState('');
    const [noteText, setnoteText] = useState('');
    const [isFavourite, setIsFavourite] = useState(false);

    // A state to store the validation message
    const [error, setError] = useState('');

    const clearState = () => {
        setnoteTitle("");
        setnoteText("");
        setIsFavourite(false);
        setError("");
    }

    useEffect(() => {
        if(isNoteModalOpen && activeNote) {
            setnoteTitle(activeNote.noteTitle || "");
            setnoteText(activeNote.noteText || "");
            setIsFavourite(activeNote.isFavourite || false);
        }
        return () => {
            clearState();
        }
    }, [isNoteModalOpen, activeNote]);


    // Logic for closing modal if clicked outside the modal
    const modalRef = useRef();
    useEffect(() => {
        if (!isNoteModalOpen) return;

        const handleClickOutsideModal = (e) => {
            if(!modalRef.current.contains(e.target)) {
                clearState();
                closeNoteModal();
            }
        };
        document.addEventListener("mousedown", handleClickOutsideModal);

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideModal);
        }
    }, [isNoteModalOpen, closeNoteModal]);


    const handleNoteSubmit = (e) => {
        e.preventDefault();

        if(!noteTitle.trim()) {
            setError("Title is required before saving your note!");
            return;
        }
        setError("");

        if(activeNote){
            updateNote({...activeNote, noteTitle:noteTitle.trim(), noteText:noteText.trim(), isFavourite:isFavourite});
            }
        else{
            addNote({noteTitle:noteTitle.trim(), noteText:noteText.trim(), isFavourite:isFavourite})
        }
        clearState();
        closeNoteModal();
    }



    return (
        <div ref={modalRef}
            className="fixed inset-0 m-auto bg-amber-500/50 backdrop-blur-sm
                        h-3/4 w-3/4
                        flex flex-col gap-1 px-6 py-3 rounded-3xl">
            <div className="flex justify-end">
                <button onClick={closeNoteModal}
                        className=" cursor-pointer
                                    transition-all duration-100 ease-in-out
                                    hover:scale-110 active:scale-90">
                    <img className="w-10 h-10"
                         src="/close.png" alt="close_modal"/>
                </button>
            </div>
            <form onSubmit={handleNoteSubmit} className="flex flex-col gap-4 h-full">
                <div>
                <h1 className="text-3xl font-bold text-green-700 uppercase"> {activeNote ? "Update" : "Add"} NOTE</h1>
                {error && (
                    <div className="text-red-600 text-sm font-medium">
                        {error}
                    </div>
                )}
                </div>
                <input className="w-full bg-white rounded-xl p-2 outline-none
                                   focus:ring-2 focus:ring-amber-500"
                       type="text"
                       onChange={(e) => setnoteTitle(e.target.value)}
                       value={noteTitle}
                       placeholder="Enter Note Title"
                />

                <textarea  className="w-full h-full p-4 bg-white rounded-lg resize-none focus:outline-none
                                    focus:ring-2 focus:ring-amber-500 text-base scrollbar-none"
                           type="text"
                           onChange={(e) => setnoteText(e.target.value)}
                           value={noteText}
                           placeholder="Enter Note Text"
                />
                <div className="flex justify-between mt-2">
                    <div className="flex gap-2 py-2 px-2">
                        <input className="w-5 h-5 mt-1"
                               type="checkbox"
                               onChange={(e) => setIsFavourite(e.target.checked)}
                               checked={isFavourite}
                               name="isFavourite"
                        />
                        <h4 className="font-medium text-pink-500 text-lg pb-2">Mark Favourite</h4>
                    </div>
                    <button className="font-medium text-lg bg-green-600 w-fit mb-3 mr-4 px-9  rounded-2xl cursor-pointer
                                        transition-all duration-100 ease-in-out
                                        hover:scale-105 active:scale-95">
                        {activeNote ? "Update" : "Add"} Note
                    </button>
                </div>

            </form>
        </div>
    );
}

export default NoteModal;