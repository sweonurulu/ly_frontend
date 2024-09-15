import Container from 'react-bootstrap/esm/Container';
import './App.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from 'react-helmet'; // react-helmet import edin

// NAVBAR
import HomeScreen from "./Screens/NavbarScreens/HomeScreen.js";
import InfoScreen from "./Screens/NavbarScreens/InfoScreen.js";
import ContactScreenUser from "./Screens/NavbarScreens/ContactScreenUser.js";
import ContactScreenGuest from "./Screens/NavbarScreens/ContactScreenGuest.js";
import NavbarPdfViewer from "./Screens/PdfScreens/NavbarPdfViewer.js";

// USER
import SigninScreen from './Screens/UserScreens/SigninScreen.js';
import SignupScreen from './Screens/UserScreens/SignupScreen.js';
import EditProfileScreen from "./Screens/UserScreens/EditProfileScreen.js";
import ProfileScreen from "./Screens/UserScreens/ProfileScreen.js";
import AddressScreen from "./Screens/UserScreens/AddressScreen"; 

// PURCHASE BOOK
import CartScreen from "./Screens/PurchaseScreens/CartScreen.js"; 
import BookPurchaseScreen from "./Screens/PurchaseScreens/BookPurchaseScreen.js"; 

// ADMIN
import AdminSignupScreen from './Screens/AdminScreens/AdminSignupScreen.js';
import AdminPanelScreen from './Screens/AdminScreens/AdminPanelScreen.js';
//import EditContentScreen from './Screens/AdminScreens/EditContentScreen.js';
import AdminMessagesScreen from './Screens/AdminScreens/AdminMessagesScreen';

// BOOK
import CreateBookScreen from "./Screens/BookScreens/CreateBookScreen.js";
import BookScreen from "./Screens/BookScreens/BookScreen.js";
import BookEditScreen from "./Screens/BookScreens/BookEditScreen.js";
import BookCategoryScreen from "./Screens/BookScreens/BookCategoryScreen.js";
import ReviewPdfViewer from "./Screens/PdfScreens/ReviewPdfViewer.js";

// RENTING
import MainPaymentScreen from "./Screens/RentingScreens/MainPaymentScreen.js";

// PASSWORD
import UpdatePasswordScreen from "./Screens/PasswordScreens/UpdatePasswordScreen.js";
import ForgotPasswordScreen from "./Screens/PasswordScreens/ForgotPasswordScreen.js";



import { useState } from 'react';
import { Toaster } from "react-hot-toast";
import PriceListScreen from './Screens/NavbarScreens/PriceListScreen.js';

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Helmet>
                <title>Lisans Yayıncılık</title>
                <link id="logo" rel="icon" href="/logo.ico" type="image/x-icon"/>
            </Helmet>
            <Header user={user} setUser={setUser} />
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/signin" element={<SigninScreen setUser={setUser} />} />
                        <Route path="/signup" element={<SignupScreen />} />
                        <Route path="/editProfile" element={<EditProfileScreen />} />
                        <Route path="/address" element={<AddressScreen />} />
                        <Route path="/cart" element={<CartScreen />} />

                        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />

                        <Route path="/cart" element={<CartScreen />} />
                        <Route path="/book-purchase" element={<BookPurchaseScreen />} />


                        <Route path="/admin/signup" element={<AdminSignupScreen />} />
                        <Route path="/admin" element={user && user.userType === "ADMIN" ? <AdminPanelScreen setUser={setUser} /> : <Navigate to="/signin" />} />
                        {/*<Route path="/edit-content" element={user && user.userType === "ADMIN" ? <EditContentScreen /> : <Navigate to="/signin" />} />*/}
                        <Route path="/admin/messages" element={user && user.userType === "ADMIN" ? <AdminMessagesScreen /> : <Navigate to="/signin" />} />

                        <Route path="/" element={<HomeScreen user={user} />} exact />
                        <Route path="/home" element={<HomeScreen user={user} />} exact />
                        <Route path="/info" element={<InfoScreen />} />
                        <Route path="/contact" element={user ? <ContactScreenUser /> : <ContactScreenGuest />} />
                        <Route path="/price-list" element={<PriceListScreen />} />
                        <Route path="/pdf-viewer/:pdfId" element={<NavbarPdfViewer />} />
                        <Route path="/profile" element={<ProfileScreen user={user} />} />

                        <Route path="/create-book/*" element={user && user.userType === "ADMIN" ? <CreateBookScreen /> : <Navigate to="/signin" />} />
                        <Route path="/books/category/:categoryId" element={<BookCategoryScreen />} />
                        <Route path="/book/:bookId" element={<BookScreen />} />
                        <Route path="/book/edit/:bookId" element={<BookEditScreen />} />
                        <Route path="/review-pdf/:bookId" element={<ReviewPdfViewer />} />
                        <Route path="/payment" element={<MainPaymentScreen />} />

                    </Routes>
                </Container>
            </main>
            <Toaster toastOptions={{
                duration: 2700,
            }} />
        </Router>
    );
}

export default App;
