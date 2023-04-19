// Hook (use-auth.js)
import { useState, useEffect, useContext, createContext } from "react";
import { User } from "firebase/auth";
import { auth } from "@/firebase";

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

type ContextType = {
  user: User | null
}

const authContextDefaultValue: ContextType = {
  user: null
};

const authContext = createContext<ContextType>(authContextDefaultValue);

export const getCurrentUser = () => {
  return auth.currentUser;
};


// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
export function ProvideAuth({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setLoading(false);
        setUser(null);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return <authContext.Provider value={{ user }}>{!loading && children}</authContext.Provider>;

}
