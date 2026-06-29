import BootstrapLayout from "@/layouts/BootstrapLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";

export default function FoodOrderingPage() {
  // 1. กำหนดราคาพื้นฐานของอาหาร (บาท)
  const BASE_PRICE = 60;

  // 2. สร้าง State สำหรับเก็บตัวเลือกของผู้ใช้
  const [size, setSize] = useState("normal"); // ค่าเริ่มต้นเป็นจาน "ธรรมดา"
  const [toppings, setToppings] = useState([]); // เริ่มต้นยังไม่มีท็อปปิ้งเสริม []

  // รายการท็อปปิ้งจำลองที่มีให้เลือก
  const toppingOptions = [
    { id: "egg", name: "ไข่ดาว", price: 10 },
    { id: "cheese", name: "ทอดมัน", price: 25 },
    { id: "basil", name: "ใบกระเพรา", price: 10 },
  ];

  // 3. ฟังก์ชันจัดการเมื่อคลิกเลือก/ยกเลิกท็อปปิ้ง (Toggle Topping State)
  const handleToppingChange = (toppingId) => {
    if (toppings.includes(toppingId)) {
      // ถ้าเลือกไว้แล้ว -> ให้เอาออก
      setToppings(toppings.filter((id) => id !== toppingId));
    } else {
      // ถ้ายังไม่เลือก -> ให้เพิ่มเข้าไปใน State
      setToppings([...toppings, toppingId]);
    }
  };

  // 4. คำนวณราคาแบบเรียลไทม์ตาม State ที่เปลี่ยนไป
  const getSizeExtraPrice = () => (size === "jumbo" ? 20 : 0); // พิเศษบวกเพิ่ม 20 บาท
  
  const getToppingTotalPrice = () => {
    return toppings.reduce((total, toppingId) => {
      const current = toppingOptions.find((t) => t.id === toppingId);
      return total + (current ? current.price : 0);
    }, 0);
  };

  const finalPrice = BASE_PRICE + getSizeExtraPrice() + getToppingTotalPrice();

  return (
    <BootstrapLayout>
      <Head title="สั่งอาหารออนไลน์ - กะเพราแท้เนื้อสับ" />

      <div className="container py-5" style={{ maxWidth: '500px' }}>
        <div className="card shadow-sm">
          {/* รูปภาพอาหารจำลอง */}
          <div 
            className="bg-secondary text-white d-flex align-items-center justify-content-center" 
            style={{ height: '200px', fontSize: '24px', fontWeight: 'bold' }}
          >
            🍳 ข้าวกะเพราเนื้อสับโบราณ
          </div>

          <div className="card-body">
            <h3 className="card-title font-weight-bold">ข้าวกะเพราเนื้อสับโบราณ</h3>
            <p className="text-muted small">สูตรแห้ง พริกแห้ง หอมกระทะ (ราคาเริ่มต้น {BASE_PRICE} บาท)</p>
            <hr />

            {/* ส่วนที่ 1: เลือกขนาด (Radio Button จัดการ State แบบค่าเดียว) */}
            <div className="mb-4">
              <h6 className="font-weight-bold text-primary">1. เลือกขนาด</h6>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sizeOptions"
                  id="sizeNormal"
                  value="normal"
                  checked={size === "normal"}
                  onChange={(e) => setSize(e.target.value)} // อัปเดต State ขนาดเป็นธรรมดา
                />
                <label className="form-check-label" htmlFor="sizeNormal">
                  ธรรมดา (+0 บาท)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sizeOptions"
                  id="sizeJumbo"
                  value="jumbo"
                  checked={size === "jumbo"}
                  onChange={(e) => setSize(e.target.value)} // อัปเดต State ขนาดเป็นพิเศษ
                />
                <label className="form-check-label" htmlFor="sizeJumbo">
                  พิเศษ/จัมโบ้ (+20 บาท)
                </label>
              </div>
            </div>

            {/* ส่วนที่ 2: เลือกท็อปปิ้ง (Checkbox จัดการ State แบบอาร์เรย์) */}
            <div className="mb-4">
              <h6 className="font-weight-bold text-primary">2. เครื่องเคียง / ท็อปปิ้งเสริม</h6>
              {toppingOptions.map((topping) => (
                <div className="form-check mb-2" key={topping.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`topping-${topping.id}`}
                    checked={toppings.includes(topping.id)}
                    onChange={() => handleToppingChange(topping.id)} // เรียกฟังก์ชันจัดการ State อาร์เรย์
                  />
                  <label className="form-check-label d-flex justify-content-between" htmlFor={`topping-${topping.id}`}>
                    <span>{topping.name}</span>
                    <span className="text-muted">+{topping.price} บ.</span>
                  </label>
                </div>
              ))}
            </div>

            <hr />

            {/* ส่วนที่ 3: สรุปข้อมูลจาก State และแสดงราคาสุทธิ */}
            <div className="my-3 p-3 bg-light rounded">
              <div className="d-flex justify-content-between align-items-center">
                <span className="font-weight-bold">ราคาสุทธิ:</span>
                <span className="h3 text-success font-weight-bold mb-0">
                  {finalPrice} บาท
                </span>
              </div>
              <small className="text-muted d-block mt-2">
                * ขนาด: {size === "jumbo" ? "พิเศษ" : "ธรรมดา"} 
                {toppings.length > 0 && ` | ท็อปปิ้ง: ${toppings.map(id => toppingOptions.find(t => t.id === id)?.name).join(', ')}`}
              </small>
            </div>

            {/* ปุ่มกดเพิ่มลงตะกร้า */}
            <button type="button" className="btn btn-primary btn-lg w-100 mt-2">
              🛒 ใส่ตะกร้าเลย
            </button>
          </div>
        </div>
      </div>
    </BootstrapLayout>
  );
}