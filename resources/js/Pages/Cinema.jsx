import BootstrapLayout from "@/layouts/BootstrapLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";

export default function CompleteMovieBooking() {
  // --- ข้อมูลจำลองสำหรับระบบ (Mock Data) ---
  const movies = [
    { id: 1, title: "Avatar 3: Fire and Ash", price: 180, genre: "Sci-Fi / Action" },
    { id: 2, title: "Avengers: Doomsday", price: 200, genre: "Action / Adventure" },
    { id: 3, title: "Classic Love Story", price: 140, genre: "Romance / Drama" },
  ];

  const timeSlots = ["11:30", "14:15", "17:00", "19:45", "22:30"];
  const seatOptions = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"];

  // --- การจัดการ State ---
  const [step, setStep] = useState(1); // ควบคุมหน้าปัจจุบัน: 1 = เลือกหนัง, 2 = เลือกเวลา, 3 = เลือกที่นั่งและสรุปราคา
  const [selectedMovie, setSelectedMovie] = useState(null); // เก็บ Object หนังที่เลือก
  const [selectedTime, setSelectedTime] = useState(""); // เก็บรอบเวลาที่เลือก
  const [selectedSeats, setSelectedSeats] = useState([]); // เก็บอาเรย์ที่นั่งที่เลือก

  // --- ฟังก์ชันจัดการระบบ ---
  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setStep(2); // เลือกหนังเสร็จ ไปขั้นตอนที่ 2 ทันที
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3); // เลือกเวลาเสร็จ ไปขั้นตอนที่ 3 ทันที
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

  // คำนวณราคาสุทธิ
  const totalPrice = selectedMovie ? selectedSeats.length * selectedMovie.price : 0;

  return (
    <BootstrapLayout>
      <Head title="ระบบจองตั๋วภาพยนตร์ครบวงจร - z-cinema" />

      <div className="container py-5" style={{ maxWidth: "600px" }}>
        {/* Progress Bar แสดงสถานะขั้นตอนแบบ Dynamic ตาม Step State */}
        <div className="progress mb-4" style={{ height: "8px" }}>
          <div 
            className="progress-bar bg-primary" 
            style={{ width: `${(step / 3) * 100}%`, transition: "0.3s" }}
          ></div>
        </div>

        <div className="card shadow">
          <div className="card-header bg-dark text-white text-center py-3">
            <h4 className="mb-0 font-weight-bold">🎬 z-cinema Booking</h4>
          </div>
          <div className="card-body">

            {/* ================= STEP 1: เลือกภาพยนตร์ ================= */}
            {step === 1 && (
              <div>
                <h5 className="font-weight-bold text-primary mb-3">ขั้นตอนที่ 1: เลือกภาพยนตร์ที่ต้องการชม</h5>
                <div className="list-group">
                  {movies.map((movie) => (
                    <button
                      key={movie.id}
                      type="button"
                      onClick={() => handleMovieSelect(movie)}
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3"
                    >
                      <div>
                        <h6 className="mb-1 font-weight-bold">{movie.title}</h6>
                        <small className="text-muted">{movie.genre}</small>
                      </div>
                      <span className="badge bg-primary rounded-pill">{movie.price} บาท</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ================= STEP 2: เลือกเวลา ================= */}
            {step === 2 && (
              <div>
                <h5 className="font-weight-bold text-primary mb-2">ขั้นตอนที่ 2: เลือกรอบเวลา</h5>
                <p className="text-muted small">เรื่องที่เลือก: <strong className="text-dark">{selectedMovie?.title}</strong></p>
                <div className="row g-2 my-3">
                  {timeSlots.map((time) => (
                    <div className="col-4" key={time}>
                      <button
                        type="button"
                        onClick={() => handleTimeSelect(time)}
                        className="btn btn-outline-primary w-100 py-2 font-weight-bold"
                      >
                        ⏰ {time}
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className="btn btn-secondary w-100 mt-3" onClick={() => setStep(1)}>
                  ย้อนกลับไปเลือกหนัง
                </button>
              </div>
            )}

            {/* ================= STEP 3: เลือกที่นั่ง และบอกราคา ================= */}
            {step === 3 && (
              <div>
                <h5 className="font-weight-bold text-primary mb-2">ขั้นตอนที่ 3: เลือกที่นั่งและสรุปยอดเงิน</h5>
                <div className="p-2 mb-3 bg-light rounded small">
                  <div><strong>ภาพยนตร์:</strong> {selectedMovie?.title}</div>
                  <div><strong>รอบเวลา:</strong> {selectedTime} น.</div>
                  <div><strong>ราคาต่อที่นั่ง:</strong> {selectedMovie?.price} บาท</div>
                </div>

                {/* หน้าจอโรงภาพยนตร์จำลอง */}
                <div className="bg-secondary text-white text-center py-1 mb-4 rounded small text-uppercase" style={{ fontSize: '11px' }}>
                  SCREEN
                </div>

                {/* ผังที่นั่ง */}
                <div className="row row-cols-4 g-2 mb-4">
                  {seatOptions.map((seat) => {
                    const isSelected = selectedSeats.includes(seat);
                    return (
                      <div className="col" key={seat}>
                        <button
                          type="button"
                          onClick={() => handleSeatClick(seat)}
                          className={`btn w-100 py-2 small font-weight-bold ${
                            isSelected ? "btn-danger text-white" : "btn-outline-secondary"
                          }`}
                        >
                          {seat}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <hr />

                {/* ส่วนสรุปราคาที่คำนวณจาก State ทันที */}
                <div className="my-3 p-3 border border-warning rounded bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="font-weight-bold text-dark">ราคารวมทั้งสิ้น:</span>
                    <span className="h3 text-danger font-weight-bold mb-0">
                      {totalPrice.toLocaleString()} บาท
                    </span>
                  </div>
                  <div className="small text-muted mt-2">
                    ที่นั่งที่เลือก: {selectedSeats.length > 0 ? (
                      <span className="text-primary font-weight-bold">{selectedSeats.join(", ")}</span>
                    ) : (
                      "ยังไม่ได้เลือกที่นั่ง"
                    )} ({selectedSeats.length} ที่นั่ง)
                  </div>
                </div>

                {/* ปุ่มควบคุม */}
                <div className="d-flex gap-2 mt-4">
                  <button type="button" className="btn btn-secondary w-50" onClick={() => setStep(2)}>
                    ย้อนกลับเลือกรอบ
                  </button>
                  <button
                    type="button"
                    disabled={selectedSeats.length === 0}
                    className="btn btn-success w-50"
                    onClick={() => alert(`จองสำเร็จ! ยอดชำระเงินของคุณคือ ${totalPrice} บาท`)}
                  >
                    ยืนยันการจองตั๋ว
                  </button>
                </div>
                <button type="button" className="btn btn-link text-muted w-100 mt-2 small text-decoration-none" onClick={handleReset}>
                  ❌ ยกเลิกและกลับหน้าแรก
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </BootstrapLayout>
  );
}