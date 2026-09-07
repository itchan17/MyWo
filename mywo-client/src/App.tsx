import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkspacePage from "./pages/Workspace/WorkspacePage";
import AreaPage from "./pages/Area/AreaPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/areas/:id" element={<AreaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
