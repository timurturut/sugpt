import MainScreen from "./components/MainScreen";
import SideBar from "./components/SideBar";


function App() {
  return (
    <div className="h-full w-full flex">
      <SideBar />
      <MainScreen />
    </div>
  );
}

export default App;
