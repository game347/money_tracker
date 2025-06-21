import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Balance from "./pages/Balance";
import Graph from "./pages/Graph";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/balance" element={<Balance />} />
      <Route path="/graph" element={<Graph />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;