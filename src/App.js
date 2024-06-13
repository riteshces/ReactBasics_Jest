import Footer from "app/components/footer/Footer";
import HeaderStats from "app/components/header/HeaderStats";
import Sidebar from "app/components/side-bar/Sidebar";
import AdminNavbar from "app/components/navbar/AdminNavbar";

function App() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
