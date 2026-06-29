<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Web SPA Demo</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        nav {
            background-color: #333;
            padding: 1rem;
        }
        nav a {
            color: white;
            text-decoration: none;
            margin-right: 20px;
            font-weight: bold;
        }
        nav a:hover {
            color: #00bcd4;
        }
        #app {
            padding: 20px;
            flex: 1;
            background-color: #f9f9f9;
        }
        .post-card {
            background: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>

    <nav>
        <a href="/" onclick="route(event)">หน้าแรก (Home)</a>
        <a href="/feed" onclick="route(event)">ฟีดกระทู้ (Feed API)</a>
        <a href="/about" onclick="route(event)">เกี่ยวกับเรา (About)</a>
    </nav>

    <div id="app">
        </div>

    <script>
        // 1. กำหนด Content หรือหน้าตาของแต่ละ Route
        const routes = {
            "/": {
                title: "หน้าแรก",
                render: () => `<h1>ยินดีต้อนรับสู่เว็บ SPA</h1><p>นี่คือหน้าแรก โครงสร้างภายนอกจะไม่ขยับเลยตอนคุณกดเปลี่ยนเมนู</p>`
            },
            "/feed": {
                title: "ฟีดกระทู้ยอดนิยม",
                render: async () => {
                    // จำลองการดึงข้อมูลจาก API (เลียนแบบ Pantip/Social Media)
                    const appDiv = document.getElementById("app");
                    appDiv.innerHTML = `<h1>กำลังโหลดข้อมูลจาก API...</h1>`;
                    
                    try {
                        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
                        const posts = await response.json();
                        
                        let html = `<h1>ฟีดกระทู้ล่าสุด (Mock API)</h1>`;
                        posts.forEach(post => {
                            html += `
                                <div class="post-card">
                                    <h3>${post.title}</h3>
                                    <p>${post.body}</p>
                                </div>
                            `;
                        });
                        return html;
                    } catch (error) {
                        return `<h1>เกิดข้อผิดพลาดในการโหลดข้อมูล</h1>`;
                    }
                }
            },
            "/about": {
                title: "เกี่ยวกับเรา",
                render: () => `<h1>เกี่ยวกับเรา</h1><p>ระบบนี้พัฒนาด้วย Vanilla JavaScript เพื่อแสดงกลไกของ Single Page Application</p>`
            }
        };

        // 2. ฟังก์ชันจัดการเมื่อมีการคลิก Link
        function route(event) {
            event = event || window.event;
            event.preventDefault(); // ป้องกันไม่ให้เบราว์เซอร์รีโหลดหน้าเว็บจริง
            window.history.pushState({}, "", event.target.href); // เปลี่ยน URL บนแถบ Address bar
            handleLocation(); // อัปเดตเนื้อหาในหน้าเว็บ
        }

        // 3. ฟังก์ชันเปลี่ยนเนื้อหาใน <div id="app"> ตาม URL ปัจจุบัน
        async function handleLocation() {
            const path = window.location.pathname;
            const route = routes[path] || routes["/"]; // ถ้าไม่เจอหน้าให้กลับไปหน้าแรก
            
            document.title = route.title;
            
            // ตรวจสอบว่าเป็นดึงข้อมูลแบบ Async (เช่น หน้า Feed) หรือไม่
            if (typeof route.render === "function") {
                const content = await route.render();
                document.getElementById("app").innerHTML = content;
            }
        }

        // รองรับการกดปุ่ม Back / Forward ของเบราว์เซอร์
        window.onpopstate = handleLocation;
        // รันครั้งแรกเมื่อโหลดหน้าเว็บ
        handleLocation();
    </script>
</body>
</html>