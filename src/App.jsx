import Navbar from "./Navbar/Navbar.jsx";
import Notes from "./Notes/Notes.jsx";
import NoteModal from "./Modal/NoteModal.jsx";
import {ModalProvider, useModal} from "./Context/ModalContext.jsx";
import {NotesProvider} from "./Context/NotesContext.jsx";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./ErrorFallback/ErrorFallback.jsx";
import {UserProvider, useUser} from "./Context/UserContext.jsx";
import UserAuth from "./UserAuth/UserAuth.jsx";
import UserSettingModal from "./Modal/UserSettingModal.jsx";


function App() {

    function AppContent() {

        const {currentUser, logOutUser} = useUser();
        const {isSettingModalOpen, isNoteModalOpen} = useModal();

        const currTime = Date.now();

        if (currentUser && currentUser.session_expires_at > currTime) {

            return (
                <div className="bg-white min-h-screen flex w-full">
                    <Navbar/>
                    <Notes/>
                    {isNoteModalOpen? <NoteModal/> : null}
                    {isSettingModalOpen? <UserSettingModal/>: null}
                </div>
            )
        }
        else
            {
                if(currentUser && currentUser.session_expires_at <= currTime) {
                    logOutUser(currentUser.user.id);
                }

                return (
                    <UserAuth/>
                )
            }
        }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <UserProvider>
                <NotesProvider>
                    <ModalProvider>
                        <AppContent/>
                    </ModalProvider>
                </NotesProvider>
            </UserProvider>
        </ErrorBoundary>
    )
}

export default App
