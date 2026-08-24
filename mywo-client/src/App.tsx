import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WorkspacePage from "./pages/Workspace/WorkspacePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/workspace" element={<WorkspacePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
