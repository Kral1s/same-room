# ساخت با GitHub Actions

مخزن را باز کن، به زبانهٔ **Actions** برو، گردش‌کار **Build Windows exe** را انتخاب کن و روی **Run workflow** بزن. چند دقیقه صبر کن؛ سپس اجرای تمام‌شده را باز کن و artifact با نام **SameRoom-windows** را دانلود کن. این artifact یک فایل ZIP شامل `SameRoom.exe` است.

# ساخت روی رایانهٔ ویندوز خودم (نیازمند Node.js LTS)

در پوشهٔ اصلی مخزن این فرمان‌ها را اجرا کن:

```powershell
npm install
npm start
npm run dist
```

`npm start` یک پنجرهٔ آزمایشی باز می‌کند؛ فایل نهایی در `dist/SameRoom.exe` ساخته می‌شود.

# نکته‌ها

- فایل exe از نوع **portable** و تک‌فایلی است و هنگام هر بار اجرا خودش را موقتاً باز می‌کند؛ اجرای اول ممکن است چند ثانیه طول بکشد.
- چون برنامه امضای کد ندارد، ممکن است Windows SmartScreen پیام **Windows protected your PC** را نشان دهد. برای ادامه روی **More info** و سپس **Run anyway** بزن.
- پس از هر تغییری در `index.html` باید exe را دوباره بسازی.
- پیشرفت بازی در پوشهٔ `AppData` کاربر ذخیره می‌شود.
