import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import SpinnerFullPage from "./ui/SpinnerFullPage";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Create = lazy(() => import("./pages/Create"));
const Manage = lazy(() => import("./pages/Manage"));
const Purchase = lazy(() => import("./pages/Purchase"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Customer = lazy(() => import("./pages/Customer"));
const Order = lazy(() => import("./pages/Order"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Users = lazy(() => import("./pages/Users"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="create" element={<Create />} />
              <Route path="manage" element={<Manage />} />
              <Route path="users" element={<Users />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Order />} />
              <Route path="customers" element={<Customer />} />
              <Route path="purchases" element={<Purchase />} />
              <Route path="inventory" element={<Inventory />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route
              path="resetPassword/:resetToken"
              element={<ResetPassword />}
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        postion="top-center"
        gutter={12}
        containerStyle={{ margin: ".8rem" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "1.2rem",
            maxWidth: "50rem",
            padding: "1.6rem 2.4rem",
            backgroundColor: "var(--color-grey-900)",
            color: "var(--color-gold-100)",
            gap: "1rem",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
