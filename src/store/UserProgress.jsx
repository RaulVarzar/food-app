import { createContext, useState } from "react";

// User progress can be:
// [shopping, checkout, finished]

const UserProgress = createContext({
    progress: "",
    updateProgress: () => {},
})

export function UserProgressProvider({children}) {

    const [progress, setProgress] = useState("shopping")

    function updateProgress(nextStep){
        setProgress(nextStep)
    }

    
    return <UserProgress.Provider value={{ progress, updateProgress }} >{children}</UserProgress.Provider>
}

export default UserProgress

