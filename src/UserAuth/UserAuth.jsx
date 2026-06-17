import React from 'react';
import UserLoginModal from "../Modal/UserLoginModal.jsx";
import UserRegisterModal from "../Modal/UserRegisterModal.jsx";
import {useModal} from "../Context/ModalContext.jsx";

function UserAuth() {

    const {isLoginModalOpen, isRegisterModalOpen} = useModal();

    return (
        <div className="w-full min-h-screen bg-[url('/background.jpg')] bg-cover">

            {isLoginModalOpen? <UserLoginModal/> : null}
            {isRegisterModalOpen? <UserRegisterModal/> : null}

        </div>
    );
}

export default UserAuth;