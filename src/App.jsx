import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./components/Login/Login.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Register from "./components/Register/Register";
import { GlobalProvider } from "./Context/GlobalContext";
import MainMenu from "./components/MainMenu/MainMenu";
import CreateBarcode from "./components/CreateBarcode/CreateBarcode";
import Sticker from "./components/Sticker/Sticker";
import MenuReadBarcode from "./components/MenuReadBarcode/MenuReadBarcode";
import ReadBarcode from "./components/ReadBarcode/ReadBarcode";
import MenuScannedBarcode from "./components/MenuScannedBarcode/MenuScannedBarcode";
import ScannedBarcode from "./components/ScannedBarcode/ScannedBarcode";
import prueba from "./components/prueba";
import ViewReg from "./components/ViewReg/ViewReg";
import DoubleSticker from "./components/DoubleSticker/DoubleSticker";


const App = () => {
  return (
    <div className="container" id="mainContainer">
      <GlobalProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/viewreg" component={ViewReg} />
            <Route exact path="/prueba" component={prueba} />
            <Route exact path="/scannedbarcode" component={ScannedBarcode} />
            <Route exact path="/menuscannedbarcode" component={MenuScannedBarcode} />
            <Route exact path="/readbarcode" component={ReadBarcode} />
            <Route exact path="/menureadbarcode" component={MenuReadBarcode} />
            <Route exact path="/doublesticker" component={DoubleSticker} />
            <Route exact path="/sticker" component={Sticker} />
            <Route exact path="/createbarcode" component={CreateBarcode} />
            <Route exact path="/menu" component={MainMenu} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Login} />
          </Switch>
          <Footer />
        </Router>
      </GlobalProvider>
    </div>
  );
};

export default App;
