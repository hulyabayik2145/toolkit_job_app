const Error = ({ text, retry }) => {
  return (
    <div className="error-container">
      <p>
        Üzgünüz,verileri alırken hata oluştu
        <span>{text}</span>
      </p>
      <button onClick={retry} className="btn">
        {" "}
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;
