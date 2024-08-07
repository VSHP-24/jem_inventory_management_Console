import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import PageNotFound from "./pages/PageNotFound";
import Create from "./pages/Create";
import Manage from "./pages/Manage";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="create" element={<Create />} />
            <Route path="manage" element={<Manage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
