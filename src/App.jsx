import Header from "./components/Header";
import MainPage from "./components/MainPage";
import VariablesPage from "./components/VariablesPage";
import VariableDetailPage from "./components/VariableDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/variables" element={<VariablesPage />} />
          <Route path="/variables/:id" element={<VariableDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
