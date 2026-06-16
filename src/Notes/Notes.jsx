import React from 'react';
import NotesTop from "./NotesTop/NotesTop.jsx";
import NotesCard from "./NotesCard/NotesCard.jsx";
import {useUser} from "../Context/UserContext.jsx";

function Notes() {

    const {currentUser} = useUser();

    return (
        <div style={{backgroundColor: currentUser.user.backgroundColor}}
            className="w-19/20 relative h-screen flex flex-col">
            <NotesTop/>
            <NotesCard/>

        </div>
    );
}

export default Notes;