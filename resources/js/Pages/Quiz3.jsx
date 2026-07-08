import BootstrapLayout from "@/layouts/BootstrapLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";

export default function DarkMovieBookingWithNavbar() {
  // --- ข้อมูลจำลองสำหรับระบบ (Mock Data) ---
  const movies = [
    { id: 1, title: "Avatar 3: Fire and Ash", price: 180, genre: "Sci-Fi / Action" },
    { id: 2, title: "Avengers: Doomsday", price: 200, genre: "Action / Adventure" },
    { id: 3, title: "Doraemonเดอะมูฟวี: โนบิตะวาดฝันโลกแห่งคริสตัล", price: 140, genre: "Animation / Family" }, // อัปเดตเรื่องที่ 3 เป็น Doraemon เรียบร้อยครับ
  ];

  const timeSlots = ["11:30", "14:15", "17:00", "19:45", "22:30"];
  const seatOptions = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"];

  const [step, setStep] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedMovie(null);
    setSelectedTime("");
    setSelectedSeats([]);
  };

  const totalPrice = selectedMovie ? selectedSeats.length * selectedMovie.price : 0;

  return (
    <BootstrapLayout>
      <Head title="ระบบจองตั๋วภาพยนตร์ - Z-CINEMA" />

      <div 
        style={{ 
          backgroundColor: "#121212", 
          minHeight: "calc(100vh - 56px)", 
          color: "#e0e0e0",
          display: "block",
          margin: "0 auto",
          padding: "40px 20px",
          width: "100%",
          maxWidth: "850px", 
          boxSizing: "border-box"
        }}
      >
        {/* Progress Bar */}
        <div className="progress mb-4" style={{ height: "6px", backgroundColor: "#2a2a2a" }}>
          <div 
            className="progress-bar" 
            style={{ width: `${(step / 3) * 100}%`, transition: "0.3s", backgroundColor: "#f5b50a" }}
          ></div>
        </div>

        {/* การ์ดหลักดีไซน์ธีมดาร์กโหมด */}
        <div className="card border-0 shadow-lg text-white" style={{ backgroundColor: "#1a1a1a", borderRadius: "12px", width: "100%" }}>
          <div className="card-header border-bottom border-secondary text-center py-4" style={{ backgroundColor: "#0b0b0b", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
            <h3 className="mb-0 font-weight-bold" style={{ color: "#f5b50a", letterSpacing: "2px" }}>
              🎬 Z-CINEMA PREMIUM
            </h3>
          </div>
          <div className="card-body p-4 p-md-5">

            {/* ================= STEP 1: เลือกภาพยนตร์ ================= */}
            {step === 1 && (
              <div>
                <h4 className="font-weight-bold mb-4 text-center" style={{ color: "#f5b50a" }}>
                  ขั้นตอนที่ 1: เลือกภาพยนตร์ที่ต้องการชม
                </h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
                  {movies.map((movie) => (
                    <button
                      key={movie.id}
                      type="button"
                      onClick={() => handleMovieSelect(movie)}
                      className="btn p-3 d-flex flex-column justify-content-between align-items-center text-center border-secondary"
                      style={{ 
                        backgroundColor: "#222222", 
                        color: "#ffffff", 
                        border: "1px solid #444",
                        borderRadius: "10px",
                        minHeight: "190px"
                      }}
                    >
                      <div className="mb-3 w-100">
                        <h5 className="mb-2 font-weight-bold" style={{ color: "#ffffff", fontSize: "16px" }}>{movie.title}</h5>
                        <span className="badge bg-dark border border-secondary" style={{ color: "#dddddd", fontSize: "12px" }}>{movie.genre}</span>
                      </div>
                      <div 
                        className="w-100 py-2 rounded font-weight-bold mt-auto" 
                        style={{ backgroundColor: "#f5b50a", color: "#000", fontSize: "14px" }}
                      >
                        {movie.price} บาท
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ================= STEP 2: เลือกเวลา ================= */}
            {step === 2 && (
              <div>
                <h4 className="font-weight-bold mb-3 text-center" style={{ color: "#f5b50a" }}>ขั้นตอนที่ 2: เลือกรอบเวลา</h4>
                
                <p className="text-center mb-4" style={{ color: "#cccccc", fontSize: "16px" }}>
                  เรื่องที่เลือก: <strong style={{ color: "#ffffff", fontSize: "18px" }}>{selectedMovie?.title}</strong>
                </p>
                
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "15px", justifyContent: "center", width: "100%" }}>
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      className="btn py-3 font-weight-bold"
                      style={{ 
                        backgroundColor: "#222222", 
                        color: "#f5b50a", 
                        border: "1px solid #f5b50a",
                        borderRadius: "8px",
                        fontSize: "16px",
                        minWidth: "120px", 
                        flex: "0 1 auto"
                      }}
                    >
                      ⏰ {time}
                    </button>
                  ))}
                </div>
                
                <button 
                  type="button" 
                  className="btn w-100 mt-5 py-2 font-weight-bold text-white" 
                  style={{ backgroundColor: "#333333", border: "1px solid #555555" }}
                  onClick={() => setStep(1)}
                >
                  ⬅️ ย้อนกลับไปเลือกภาพยนตร์
                </button>
              </div>
            )}

            {/* ================= STEP 3: เลือกที่นั่ง และบอกราคา ================= */}
            {step === 3 && (
              <div>
                <h4 className="font-weight-bold mb-3 text-center" style={{ color: "#f5b50a" }}>ขั้นตอนที่ 3: เลือกที่นั่ง & ชำระเงิน</h4>
                
                <div className="p-3 mb-4 rounded border border-secondary" style={{ backgroundColor: "#111111" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px", textAlign: "center" }}>
                    <div style={{ color: "#dddddd" }}>ภาพยนตร์: <strong className="text-white d-block mt-1">{selectedMovie?.title}</strong></div>
                    <div style={{ color: "#dddddd" }}>รอบเวลา: <strong className="text-white d-block mt-1">{selectedTime} น.</strong></div>
                    <div style={{ color: "#dddddd" }}>ราคาต่อที่นั่ง: <strong className="text-warning d-block mt-1">{selectedMovie?.price} บาท</strong></div>
                  </div>
                </div>

                {/* หน้าจอโรงภาพยนตร์ */}
                <div 
                  className="text-center py-2 mb-5 rounded font-weight-bold" 
                  style={{ 
                    backgroundColor: "#222222", 
                    color: "#888", 
                    letterSpacing: "6px",
                    boxShadow: "0px -5px 15px rgba(245, 181, 10, 0.25)"
                  }}
                >
                  SCREEN
                </div>

                {/* ผังที่นั่ง */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", maxWidth: "400px", margin: "0 auto" }}>
                  {seatOptions.map((seat) => {
                    const isSelected = selectedSeats.includes(seat);
                    return (
                      <button
                        key={seat}
                        type="button"
                        onClick={() => handleSeatClick(seat)}
                        className="btn py-2 font-weight-bold"
                        style={{
                          backgroundColor: isSelected ? "#e50914" : "#333333",
                          color: "#ffffff",
                          border: isSelected ? "1px solid #e50914" : "1px solid #444444",
                          boxShadow: isSelected ? "0 0 10px rgba(229, 9, 20, 0.5)" : "none",
                          transition: "0.2s"
                        }}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>

                <hr className="border-secondary my-4" />

                {/* ส่วนสรุปราคา */}
                <div className="my-3 p-3 rounded" style={{ backgroundColor: "#0b0b0b", borderLeft: "4px solid #f5b50a" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="font-weight-bold" style={{ color: "#eeeeee" }}>ราคารวมทั้งสิ้น:</span>
                    <span className="h1 font-weight-bold mb-0" style={{ color: "#f5b50a" }}>
                      {totalPrice.toLocaleString()} <span style={{ fontSize: "18px" }}>บาท</span>
                    </span>
                  </div>
                  <div className="small mt-2" style={{ color: "#dddddd" }}>
                    ที่นั่ง: {selectedSeats.length > 0 ? (
                      <span className="text-white font-weight-bold bg-danger px-2 py-1 rounded ms-1">{selectedSeats.join(", ")}</span>
                    ) : (
                      "ยังไม่ได้เลือกที่นั่ง"
                    )}
                  </div>
                </div>

                {/* ปุ่มควบคุม */}
                <div style={{ display: "flex", flexDirection: "row", gap: "15px", marginTop: "30px" }}>
                  <button 
                    type="button" 
                    className="btn text-white py-2 font-weight-bold" 
                    style={{ backgroundColor: "#333333", border: "1px solid #555555", flex: "1" }}
                    onClick={() => setStep(2)}
                  >
                    ย้อนกลับเลือกรอบ
                  </button>
                  <button
                    type="button"
                    disabled={selectedSeats.length === 0}
                    className="btn font-weight-bold py-2"
                    style={{ 
                      backgroundColor: selectedSeats.length === 0 ? "#444444" : "#f5b50a", 
                      color: selectedSeats.length === 0 ? "#888888" : "#000000",
                      cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
                      fontSize: "16px",
                      flex: "1"
                    }}
                    onClick={() => alert(`จองสำเร็จ! ยอดชำระเงินคือ ${totalPrice} บาท`)}
                  >
                    {selectedSeats.length === 0 ? "กรุณาเลือกที่นั่ง" : "ยืนยันการจองตั๋ว"}
                  </button>
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-link text-muted w-100 mt-3 small text-decoration-none text-center" 
                  onClick={handleReset}
                >
                  ยกเลิกและรีเซ็ตระบบ
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </BootstrapLayout>
  );
}