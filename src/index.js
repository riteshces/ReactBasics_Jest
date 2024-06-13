import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Navigation from "app/navigation/Navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Footer from "app/components/footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Navigation>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <Footer />
      </div>
    </Navigation>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
