import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobList from "./pages/JobList";
import AddJob from "./pages/AddJob";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlice";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  //api isteğiatıpcevabı store a bildir
  const getJobs = () => {
    //slice deki yükleniyor u true çek
    dispatch(setLoading());
    // api isteiği at
    axios
      .get("http://localhost:3001/jobs")
      // slice daki veriyi güncelle
      .then((res) => dispatch(setJobs(res.data)))
      // slice daki hatayı  güncelle
      .catch((err) => dispatch(setError(err.message)));
  };
  useEffect(() => {
    getJobs();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<JobList getJobs={getJobs} />} />
        <Route path="/add" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
