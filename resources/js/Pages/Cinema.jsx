import BootstrapLayout from "@/layouts/BootstrapLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react"; // นำ useState มาใช้จัดการ State ส่วน useEffect สามารถเก็บไว้ใช้ดึงข้อมูลจาก API ในอนาคตได้ครับ

export default function MovieSeatSelection() {
  // 1. กำหนดราคาตั๋วต่อที่นั่ง (บาท)
  const SEAT_PRICE = 160;

  // 2. สร้าง State สำหรับเก็บรายชื่อเก้าอี้ที่เลือก
  const [selectedSeats, setSelectedSeats] = useState([]);

  // รายชื่อเก้าอี้จำลองในโรงภาพยนตร์
  const seats = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'];

  // 3. ฟังก์ชันจัดการเมื่อคลิกที่เก้าอี้ (Toggle State)
  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // 4. คำนวณราคาสุทธิจากความยาวของ State
  const totalPrice = selectedSeats.length * SEAT_PRICE;

  return (
    <BootstrapLayout>
      {/* ส่วนจัดการ Meta Data ของหน้าเว็บผ่าน Inertia Head */}
      <Head title="จองตั๋วภาพยนตร์ - z-cinema" />

      <div className="container py-5" style={{ maxWidth: '500px' }}>
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-center mb-4 font-weight-bold text-primary">
              จองตั๋วภาพยนตร์ (z-cinema)
            </h2>
            
            {/* จอภาพยนตร์จำลอง */}
            <div className="bg-dark text-white text-center py-2 mb-4 rounded small text-uppercase tracking-wider">
              หน้าจอโรงภาพยนตร์
            </div>

            {/* ผังที่นั่ง (ใช้ Grid ของ Bootstrap) */}
            <div className="row row-cols-4 g-3 mb-4">
              {seats.map((seat) => {
                const isSelected = selectedSeats.includes(seat);
                return (
                  <div className="col" key={seat}>
                    <button
                      type="button"
                      onClick={() => handleSeatClick(seat)}
                      className={`btn w-100 py-3 font-weight-bold btn-block ${
                        isSelected ? 'btn-danger text-white' : 'btn-outline-secondary'
                      }`}
                    >
                      {seat}
                    </button>
                  </div>
                );
              })}
            </div>

            <hr />

            {/* ส่วนแสดงผลข้อมูลจาก State */}
            <div className="my-4">
              <p className="mb-2">
                <strong>ที่นั่งที่เลือก:</strong>{' '}
                {selectedSeats.length > 0 ? (
                  <span className="badge bg-info text-dark text-wrap">{selectedSeats.join(', ')}</span>
                ) : (
                  <span className="text-muted">ยังไม่ได้เลือกที่นั่ง</span>
                )}
              </p>
              <p className="mb-2">
                <strong>จำนวน:</strong> {selectedSeats.length} ที่นั่ง
              </p>
              <h4 className="text-danger font-weight-bold mt-3">
                ราคารวมทั้งสิ้น: {totalPrice.toLocaleString()} บาท
              </h4>
            </div>

            {/* ปุ่มกดยืนยัน */}
            <button 
              type="button"
              disabled={selectedSeats.length === 0}
              className="btn btn-success btn-lg w-100 mt-2"
            >
              {selectedSeats.length === 0 ? 'กรุณาเลือกที่นั่ง' : 'ยืนยันการชำระเงิน'}
            </button>
          </div>
        </div>
      </div>
    </BootstrapLayout>
  );
}