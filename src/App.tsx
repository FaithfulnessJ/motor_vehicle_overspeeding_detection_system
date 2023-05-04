import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { routes } from "./utils/routes";
import { useUserStore } from "./utils/zustand/Store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import Page404 from "./pages/Page404";

const App = (): JSX.Element => {
  const queryClient = new QueryClient();
  const setUser = useUserStore((state: any) => state.setUser);
  const removeUser = useUserStore((state: any) => state.removeUser);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      authUser ? setUser(authUser) : removeUser();
    });
  }, []);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Routes>
            {routes?.map((route, key) => (
              <Route key={key} path={route?.path} element={route?.element} />
            ))}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </ChakraProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
