import { sortOptions, statusOptions, typeOptions } from "./../constants/index";
import { filterBySearch, sortJobs } from "../redux/slices/jobSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
const Filter = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  // 2. YOL
  const debouncedText = useDebounce(text, 500);

  // her tuş vurusunda filtreleme tapmak düşük donanımlı cihazlarda kasmalara ve donmalara sebep olabileceğinde filtreleme işlemini kullanıcı yazma işini bıraktığpı anda yapmalıyız bu işleme Debounce denir. ardışık olarak gerçekleşen fonksiyon çağırma işlemlerinde fonksiyonun kısa bir zaman aralığında çağrıldırğında görmezden gelir.

  useEffect(() => {
    // bir sayaç başlat ve işlemi  sayaç durduğunda yap
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ text, name: "company" }));
    }, 500);
    // eğerki süre bitmeden tekrardan useEffect çalışırsa önceki sayacın çalışmasını durdur.
    return () => {
      clearTimeout(timer);
    };
  }, [text]);
  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div>
          <label>Şirket ismine Göre Ara</label>
          <input
            onChange={(e) => {
              dispatch(
                filterBySearch({ name: "company", text: e.target.value })
              );
            }}
            type="text"
          />
        </div>
        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "status", text: e.target.value }))
            }
          >
            <option hidden>Seçiniz</option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "type", text: e.target.value }))
            }
          >
            <option hidden>Seçiniz</option>
            {typeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sırala</label>
          <select onChange={(e) => dispatch(sortJobs(e.target.value))}>
            <option hidden>Seçiniz</option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="reset" className="btn-12" id="special-button">
            <span>Filtreyi Sıfırla</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
