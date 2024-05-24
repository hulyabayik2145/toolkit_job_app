import { v4 } from "uuid";
import { typeOptions, statusOptions } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";

const AddJob = () => {
  // state ler
  const jobState = useSelector((store) => store.jobReducer);
  // kurulumlar
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form gonderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    //inputtaki verilerden bir nesne oluştur
    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());
    //! tarih ve id ekle
    newJobData.date = new Date().toLocaleDateString();
    newJobData.id = v4();
    console.log(newJobData);

    //! apiye veri ekleme
    axios
      .post("http://localhost:3001/jobs", newJobData)
      //başarılı olursa
      .then(() => {
        //bildirim gönder
        toast.success("İş başarıyla eklendi");
        // store  de ekle
        dispatch(createJob(newJobData));

        //anasayfaya yönlendir
        navigate("/");
      })
      //başarısız olursa
      .catch(() => {
        toast.error("Ekleme işleminde sorun oluştu");
      });
  };
  //dizideki değerleri aynı olan elemanları kaldır
  const removeDuplicates = (key) => {
    //sadece pozisyonlardan oluşan bir dizi tanımla
    const arr = jobState.jobs.map((job) => job[key]);
    // 2 dizii içerisinden tekrar eden elemanı kaldır
    const filtred = arr.filter((item, index) => arr.indexOf(item) === index);

    // fonksiyonu çağrıldığı uyerde dondur
    return filtred;
    //
  };
  console.log(removeDuplicates);
  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="position_list" name="position" required type="text" />
            <datalist id="position_list">
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
              <option value="Edge" />
              <option value="Firefox" />
            </datalist>
          </div>
          <div>
            <label>Şirket</label>
            <input list="company_list" name="company" required type="text" />

            <datalist id="company_list">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
              <option value="Edge" />
              <option value="Firefox" />
            </datalist>
          </div>
          <div>
            <label>Lokasyon</label>
            <input list="location_list" name="location" required type="text" />
            <datalist id="location_list">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
              <option value="Edge" />
              <option value="Firefox" />
            </datalist>
          </div>
          <div>
            <label>Durum</label>
            <select name="status" required>
              <option hidden>Seçiniz</option>
              {statusOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tür</label>
            <select name="type" required>
              <option hidden value={""}>
                Seçiniz
              </option>
              {typeOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="btn-12" id="special-button">
              <span>Kaydet</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
