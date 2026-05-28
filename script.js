// دیتابیس خدمات دندانپزشکی
const services = [
    // تشخیص
    { name: "معاینه و مشاوره", desc: "معاینه کامل دهان و دندان، برنامه درمانی", price: "۱۵۰,۰۰۰", category: "diagnostic" },
    { name: "تصویربرداری پانورامیک", desc: "عکس OPG از کل فک", price: "۲۵۰,۰۰۰", category: "diagnostic" },
    { name: "سی تی اسکن CBCT", desc: "تصویر سه بعدی برای ایمپلنت و جراحی", price: "۸۵۰,۰۰۰", category: "diagnostic" },
    
    // زیبایی
    { name: "بلیچینگ (سفید کردن)", desc: "سفید کردن دندان‌ها با لیزر", price: "۳,۵۰۰,۰۰۰", category: "cosmetic" },
    { name: "ونیر کامپوزیت", desc: "لمینت سرامیکی - هر واحد", price: "۴,۵۰۰,۰۰۰", category: "cosmetic" },
    { name: "لمینت سرامیکی Emax", desc: "هر واحد - با گارانتی", price: "۷,۵۰۰,۰۰۰", category: "cosmetic" },
    
    // درمان
    { name: "پر کردن کامپوزیت", desc: "زیبایی - هر سطح", price: "۸۰۰,۰۰۰", category: "treatment" },
    { name: "عصب‌کشی (اندو)", desc: "آسیاب بزرگ", price: "۲,۵۰۰,۰۰۰", category: "treatment" },
    { name: "روکش زیرکونیا", desc: "هر واحد - زیبایی و مقاومت بالا", price: "۴,۰۰۰,۰۰۰", category: "treatment" },
    
    // جراحی
    { name: "کشیدن دندان عقل", desc: "نهفته", price: "۱,۸۰۰,۰۰۰", category: "surgery" },
    { name: "ایمپلنت کره‌ای", desc: "شامل فیکسچر + اباتمنت + روکش", price: "۱۵,۰۰۰,۰۰۰", category: "surgery" },
    { name: "ایمپلنت سوئیسی", desc: "با گارانتی مادام العمر", price: "۲۲,۰۰۰,۰۰۰", category: "surgery" },
    
    // ارتودنسی
    { name: "ارتودنسی ثابت فلزی", desc: "هر فک", price: "۱۲,۰۰۰,۰۰۰", category: "ortho" },
    { name: "ارتودنسی کریستالی", desc: "هر فک - زیبایی بالا", price: "۱۸,۰۰۰,۰۰۰", category: "ortho" },
    { name: "اینویزیلاین", desc: "ارتودنسی نامرئی", price: "۲۵,۰۰۰,۰۰۰", category: "ortho" },
    
    // بهداشت
    { name: "جرم‌گیری و پولیش", desc: "یک جلسه کامل", price: "۳۵۰,۰۰۰", category: "preventive" },
    { name: "فلورایدتراپی", desc: "کودکان و بزرگسالان", price: "۲۵۰,۰۰۰", category: "preventive" },
    { name: "فیشور سیلانت", desc: "شیارپوش - هر دندان", price: "۳۰۰,۰۰۰", category: "preventive" }
];

let currentCategory = "all";
let searchTerm = "";

// نمایش خدمات
function displayServices() {
    const grid = document.getElementById("servicesGrid");
    const filtered = services.filter(service => {
        const matchCategory = currentCategory === "all" || service.category === currentCategory;
        const matchSearch = service.name.includes(searchTerm) || service.desc.includes(searchTerm);
        return matchCategory && matchSearch;
    });
    
    if(filtered.length === 0) {
        grid.innerHTML = `<div style="text-align: center; padding: 40px;">❌ هیچ خدمتی یافت نشد</div>`;
        return;
    }
    
    grid.innerHTML = filtered.map(service => `
        <div class="service-card">
            <div class="service-name">${service.name}</div>
            <div class="service-desc">${service.desc}</div>
            <div class="service-price">${service.price} <small>تومان</small></div>
            <button class="appointment-btn" onclick="makeAppointment('${service.name}')">
                📞 درخواست نوبت
            </button>
        </div>
    `).join("");
}

// درخواست نوبت
window.makeAppointment = function(serviceName) {
    const message = encodeURIComponent(`سلام، من برای خدمت "${serviceName}" نیاز به نوبت دارم.`);
    window.location.href = `tel://02112345678`;
    // می‌توانید به واتساپ هم متصل کنید:
    // window.location.href = `https://wa.me/989123456789?text=${message}`;
}

// رویدادها
document.getElementById("categories").addEventListener("click", (e) => {
    if(e.target.classList.contains("category-btn")) {
        document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        currentCategory = e.target.dataset.category;
        displayServices();
    }
});

document.getElementById("searchInput").addEventListener("input", (e) => {
    searchTerm = e.target.value;
    displayServices();
});

// بارگذاری اولیه
displayServices();

// PWA نصب
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById("installBanner").style.display = "flex";
});

document.getElementById("installBtn").addEventListener("click", async () => {
    if(deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if(outcome === "accepted") {
            document.getElementById("installBanner").style.display = "none";
        }
        deferredPrompt = null;
    }
});