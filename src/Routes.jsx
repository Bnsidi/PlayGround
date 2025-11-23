import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import FieldListings from './pages/field-listings';
import Login from './pages/login';
import BookingWorkflow from './pages/booking-workflow';
import FieldDetails from './pages/field-details';
import Register from './pages/register';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BookingWorkflow />} />
        <Route path="/field-listings" element={<FieldListings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking-workflow" element={<BookingWorkflow />} />
        <Route path="/field-details" element={<FieldDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
