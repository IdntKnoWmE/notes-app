import {useContext, useState, createContext, useEffect} from "react";
import {getTodayDateTime} from "../utils/dateHelper.js";

const UserContext = createContext();

export function UserProvider({ children }) {

    const [userId, setUserId] = useState(() => {
        const storedUserId = localStorage.getItem("userId");
        return storedUserId?storedUserId: 1;
    });


    const [userDatabase, setUserDatabase] = useState(() => {
        const storedUserDatabase = localStorage.getItem("userDatabase");
        return storedUserDatabase?JSON.parse(storedUserDatabase): [];
    });

    const [currentUser, setCurrentUser] = useState(() => {

        const storedCurrentUser = localStorage.getItem("currentUser");
        return storedCurrentUser?JSON.parse(storedCurrentUser): null;
    })



    useEffect(() => {
        if (userDatabase) {
            localStorage.setItem("userDatabase", JSON.stringify(userDatabase));
        }
    }, [userDatabase]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser"); // Clears on logout
        }
    }, [currentUser]);
    useEffect(() => {
        localStorage.setItem("userId", userId);
    }, [userId]);



    const logInUser = (userEmail, userPassword) => {

        let user = userDatabase.find(user => user.email === userEmail && userPassword === userPassword && user.isDeleted === false);
        if (user) {

            const sessionData = {
                user: user,
                session_expires_at: Date.now() + 1800000,
            }

            setCurrentUser((prevdata) => sessionData);

            return true;
        }
        else{
            return false;
        }
    }

    const isUserExists = (Id) => {
        if(userDatabase.find(user => Number(user.id) === Number(Id))) {
            return true;
        }
        return false;
    }

    const isUserDeleted = (email) => {
        if(userDatabase.find(user => user.email === email && user.isDeleted === true)) {
            return true;
        }
        return false;
    }


    const isEmailUnique = (Id, userEmail) => {

        if(!Id && userDatabase.find(user => user.email === userEmail)){
            return false;
        }
        else if(Id && userDatabase.find(user => Number(user.id) !== Number(Id) && user.email === userEmail)){
            return false;
        }
        return true;
    }

    const addUser = (userData) => {

        if (!isEmailUnique(null, userData.email)) {

            if(isUserDeleted(userData.email)) {
                return [false, "User was deleted earlier, Please ask admin for recovery!"]
            }
            return [false, "Email already exists"];
        }

        try {
            setUserDatabase((prevUsers) => {

                userData.id = userId;
                userData.isDeleted = false;
                userData.lastLogin = getTodayDateTime();
                return [...prevUsers, userData];
            });
        }
        catch{
            return [false, "Something went wrong"];
        }
        setUserId((prevUserId) => Number(prevUserId) + 1);
        return [true, "User Created Successfully! Please login now"];
    };

    const updateUser = (updatedUser) => {

        if (!isUserExists(updatedUser.id)) {
            return [false, "User does not exists"];
        }

        if(!isEmailUnique(updatedUser.id, updatedUser.email)) {
            return [false, "Email already exists"];
        }
        setUserDatabase((prevUsers) =>
            prevUsers.map((user) =>
                Number(user.id) === Number(updatedUser.id)
                    ? updatedUser
                    : user
            )
        );
        return [true, "User Profile Updated Successfully"];
    };

    const deleteUser = (Id) => {

        if (!isUserExists(Id)) {
            return [false, "User does not exists"];
        }

        setUserDatabase((prevUsers) => {
            return prevUsers.map((user) =>
                Number(user.id) === Number(Id) ? { ...user, isDeleted: true } : user
            );
        });

        return [true, "User Profile Deleted Successfully!"];
    }

    const logOutUser = (Id) => {

        if(!currentUser){
            return [false, "User Logged Out"];
        }

        if(Number(currentUser.user.id) !== Number(Id)){
            return [false, "Invalid request!"];
        }
        setCurrentUser(null);
        return [true, "User Logged Out Successfully!"]
    }

    return (
        <UserContext value={{currentUser,setCurrentUser, logInUser, logOutUser, addUser, updateUser, deleteUser}}>
            {children}
        </UserContext>
    )
}

export function useUser(){
    return useContext(UserContext);
}

