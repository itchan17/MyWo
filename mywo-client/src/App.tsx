import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkspacePage from "./pages/workspace/WorkspacePage";
import AreaPage from "./pages/area/AreaPage";

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
