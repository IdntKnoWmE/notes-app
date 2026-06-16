import {useState, useContext, createContext, useEffect} from "react";
import {getTodayDateTime} from "../utils/dateHelper.js";
import {useUser} from "./UserContext.jsx";

const NotesContext = createContext();

// For Assigning random colors to Notes Card
const colorsForNoteCard = ["#F8C163", "#FCF4BB", "#F2CF94", "#F5D2BA", "#C1EDF7",
    "#D0F2B1", "#E6C0ED", "#E6AEBE"];

const getColorForNoteCard = () => {
    const colorIndex = Math.floor(Math.random() * colorsForNoteCard.length)
    return colorsForNoteCard[colorIndex];
}

const valid_filters = ["all", "favourite", "deleted"];





export function NotesProvider({ children }) {


    const { currentUser } = useUser();

    const [noteId, setNoteId] = useState(() => {

        if(!currentUser) return 1;

        const currentUserId = currentUser.user.id;
        const storedNoteId = localStorage.getItem(`${currentUserId}_noteId`);
        return storedNoteId?storedNoteId:1;

    });
    const [notes, setNotes] = useState(() => {

        if(!currentUser) return [];

        const currentUserId = currentUser.user.id;
        const storedNotes = localStorage.getItem(`${currentUserId}_notes`);
        return storedNotes?JSON.parse(storedNotes):[];
        }
    )

    // Update notes if currentUser changes
    useEffect(() => {
        if (!currentUser) {
            setNotes([]);
            setNoteId(1);
            return;
        }

        const currentUserId = currentUser.user.id;

        const storedNotes = localStorage.getItem(`${currentUserId}_notes`);
        setNotes(storedNotes ? JSON.parse(storedNotes) : []);

        const storedNoteId = localStorage.getItem(`${currentUserId}_noteId`);
        setNoteId(storedNoteId ? Number(storedNoteId) : 1);
    }, [currentUser]);


    // Update localStorage in case of update or add in storage
    useEffect(() => {
        if(!currentUser) return;

        const currentUserId = currentUser.user.id;
        if (notes){
            localStorage.setItem(`${currentUserId}_notes`, JSON.stringify(notes));
        }
    }, [notes, currentUser]);

    useEffect(() => {
        if(!currentUser) return;

        const currentUserId = currentUser.user.id;

        localStorage.setItem(`${currentUserId}_noteId`, noteId);

    }, [noteId, currentUser]);




    // For Notes Screen
    const [currentFilter, setCurrentFilter] = useState('all');


    const setCurrentFilterForNotes = (value) => {
        if (value && valid_filters.indexOf(value) !== -1) {
            setCurrentFilter(value);
        }
    }

    // For searching Notes
    const [searchQuery, setSearchQuery] = useState("");


    // Notes get, update, and delete functions
    const getNotes = () => {
        return notes.filter(note => note.isDeleted === false);
    }

    const getFavouriteNotes = () => {
        return notes.filter(note => note.isFavourite === true && note.isDeleted === false);
    };

    const getDeletedNotes = () => {
        return notes.filter(note => note.isDeleted === true)
    };

    const addNote = (noteData) => {

        setNotes((prevNotes) => {

            noteData.id = noteId;
            noteData.date = getTodayDateTime();
            noteData.isDeleted = false;
            noteData.backgroundColor = getColorForNoteCard();
            return [...prevNotes, noteData];
        });
        setNoteId((prevId) => Number(prevId) + 1);
    };

    const updateNote = (updateNote) => {

        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === updateNote.id
                    ? updateNote
                    : note
            )
        );
    };

    const updateFavouriteNote = (Id, isFavourite) => {

        setNotes(prevNotes =>
            prevNotes.map((note) =>
                note.id === Number(Id)
                    ? { ...note, isFavourite: isFavourite }
                    : note
            )
        );
    };

    const deleteNote = (Id) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === Number(Id)
                    ? { ...note, isDeleted: true, isFavourite: false }
                    : note
            )
        );
    };


    const permanentDeleteNote = (Id) => {

        setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== Number(Id))
        );
    };

    const restoreDeleteNote = (Id) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === Number(Id)
                    ? { ...note, isDeleted: false}
                    : note
            )
        );
    }

    const getDeletedNotesCount = () => {
        return notes.filter(note => note.isDeleted === true).length;
    }


    return (
        <NotesContext value={{currentFilter, setCurrentFilterForNotes, getNotes, getFavouriteNotes, getDeletedNotes,
            addNote, updateNote, deleteNote, permanentDeleteNote, updateFavouriteNote, getDeletedNotesCount,
            restoreDeleteNote, searchQuery, setSearchQuery}}>
            {children}
        </NotesContext>
    )
}

export function useNotes() {
    return useContext(NotesContext);
}