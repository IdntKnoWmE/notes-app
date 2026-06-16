import {useMemo} from 'react';
import Card from "./Card.jsx";
import {useNotes} from "../../Context/NotesContext.jsx";

function NotesCard() {

    const {currentFilter, searchQuery, getNotes, getFavouriteNotes, getDeletedNotes} = useNotes();

    const filteredNotes = useMemo( () => {

        let notes = [];

        if (currentFilter === "all") {
            notes = getNotes();
        }
        else if (currentFilter === "favourite") {
            notes = getFavouriteNotes();
        }
        else if (currentFilter === "deleted") {
            notes = getDeletedNotes();
        }

        if(searchQuery) {
            let searchQueryText = searchQuery.toLowerCase();
            notes = notes.filter((note) => {
                return (
                note.noteTitle.toLowerCase().includes(searchQueryText) ||
                note.noteText?.toLowerCase().includes(searchQueryText)
                )
            })
        }
        return notes;
    }, [currentFilter, getNotes, getFavouriteNotes, getDeletedNotes, searchQuery]);



    return (
        <div className="bg-center flex-1 flex flex-col p-4 pl-14 sm:pl-0 overflow-hidden">
            <div className="py-2 pl-8">
                <h4>
                    {searchQuery ? (
                        <span className="font-medium cursor-pointer">
                            Search result for: <span className="text-sm text-green-700 font-bold">
                            {searchQuery}</span>
                        </span>
                    ):(
                        <span className="font-medium cursor-pointer capitalize">
                            {currentFilter} Notes
                        </span>
                    )
                    }
                    <span className="text-[6px] pl-2 text-gray-500">{filteredNotes.length} Notes</span>
                </h4>
            </div>
            <hr/>
            <div className="flex-1 overflow-y-auto mt-2 scrollbar-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 justify-center justify-items-center">
                    {filteredNotes.map((note) => (
                    <Card key={note.id} note={note} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default NotesCard;