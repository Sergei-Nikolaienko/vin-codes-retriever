import { AppProvider } from "./AppContext";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import VariablesPage from "./components/VariablesPage";
import VariableDetailPage from "./components/VariableDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/variables" element={<VariablesPage />} />
            <Route path="/variables/:id" element={<VariableDetailPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
