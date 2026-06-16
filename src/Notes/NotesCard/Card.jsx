import React, {useState} from 'react';
import {useNotes} from "../../Context/NotesContext.jsx";
import {useModal} from "../../Context/ModalContext.jsx";

function Card({note}) {

    const {openEditNoteModal} = useModal();
    const {deleteNote, permanentDeleteNote, updateFavouriteNote, restoreDeleteNote} = useNotes();


    return (

        <div style={{backgroundColor: note.backgroundColor}}
            className="w-[250px] h-[250px]  rounded-2xl p-4
                        shadow-lg break-inside-avoid
                        transition-all duration-200 ease-in-out
                        hover:scale-105">
            <div className="flex justify-between mr-2">

                <button onClick={() => note.isDeleted? null :updateFavouriteNote(note.id, !note.isFavourite)}
                        className=" cursor-pointer
                                    transition-all duration-100 ease-in-out
                                    hover:scale-110 active:scale-90">
                    <img className={note.isFavourite?"w-7 h-7": "w-6 h-6"}
                         src={note.isFavourite?"favourite.png": "not_favourite.png"} alt="favourite"/>
                </button>

                <button onClick={() => note.isDeleted? permanentDeleteNote(note.id):deleteNote(note.id)}
                        className=" cursor-pointer
                                    transition-all duration-100 ease-in-out
                                    hover:scale-110 active:scale-90">
                    <img className="w-7 h-7"
                         src={note.isDeleted? "permanent_delete.png": "delete.png"} alt="delete"/>
                </button>
            </div>
            <div className="flex flex-col justify-between mt-1 h-[200px]">
                <div className="text-lg font-bold">
                    {note.noteTitle}
                </div>
                <p className="text-sm w-full font-medium text-gray-600 line-clamp-3 leading-relaxed break-words">
                    {note.noteText}
                </p>
                <div className="flex flex-row justify-between pb-3">
                    <div className="text-[11px] pt-2 w-fit font-medium italic text-green-900">
                        {note.date}
                    </div>
                    <button onClick={() => note.isDeleted? restoreDeleteNote(note.id):openEditNoteModal(note)}
                            className={`${note.isDeleted? "":"bg-orange-400 rounded-full w-8 h-8 p-2"}
                                            cursor-pointer
                                            transition-all duration-100 ease-in-out
                                            hover:scale-110 active:scale-90`}>
                        <img className={`${note.isDeleted? "w-8 h-8" : "w-4 h-4"} `}
                             src={note.isDeleted? "restore.png": "notes_edit.png"} alt="notes_edit"/>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Card;