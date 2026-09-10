# 📸 Panduan Folder Foto

Folder ini digunakan untuk menyimpan seluruh file gambar/foto untuk website **Najhani Hijab**.

Karena folder ini berada di dalam `public/`, seluruh file di dalamnya dapat langsung diakses melalui path URL `/foto/...` tanpa perlu di-import lewat JavaScript.

---

## 📁 Struktur Folder

```plaintext
public/foto/
├── hero/          # Simpan foto untuk banner Hero / Beranda utama
│   └── hero-model.jpg
├── produk/        # Simpan foto untuk produk katalog & 3D carousel
│   ├── produk-1.jpg
│   ├── produk-2.jpg
│   ├── produk-3.jpg
│   ├── produk-4.jpg
│   └── produk-5.jpg
```

---

## 💡 Cara Menggunakan Foto di Kode

### 1. Di Data Produk (`src/data.js`)
Jika Anda menyimpan foto produk dengan nama `voal-larissa.jpg` di dalam `public/foto/produk/`, cukup ubah path gambarnya menjadi:

```javascript
{
  id: 1,
  name: 'Voal Larissa - Nude',
  price: 85000,
  image: '/foto/produk/voal-larissa.jpg', // 👈 Cukup gunakan path ini
  badge: 'Terlaris',
  tag: '#Signature'
}
```

### 2. Di Komponen Hero (`src/App.jsx`)
Jika Anda menyimpan foto hero dengan nama `hero-model.jpg` di dalam `public/foto/hero/`:

```jsx
<img 
  src="/foto/hero/hero-model.jpg" 
  alt="Model mengenakan hijab Najhani"
  className="w-full h-full object-cover"
/>
```

---

> [!TIP]
> * Format yang disarankan: `.webp`, `.jpg`, atau `.png` (kompresi ukuran di bawah 300KB agar loading website sangat cepat).
> * Disarankan rasio foto produk adalah **3:4** atau **1:1 (persegi)** untuk hasil terbaik di katalog.
