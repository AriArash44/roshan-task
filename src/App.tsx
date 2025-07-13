import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpeechToTextPage from "./components/pages/SpeechToTextPage";
import ArchivePage from "./components/pages/ArchivePage";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/speech-to-text" element={<SpeechToTextPage />} />
        <Route path="/archive" element={<ArchivePage/ >} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
