# Mockup assets (local)

## Git’e eklenmez

- `source_img/` — AI üretimi kaynak görseller (dosya adları çok uzun; GitHub yol limiti).
- `_staging/` — `npm run images` için geçici kopyalar.

## Repoda kullanılan görseller

Site `public/images/` altındaki **kısa isimli** JPEG dosyalarını kullanır.

Kaynakları güncelledikten sonra:

```bash
npm run images
```

Bu komut `mockup/source_img` dosyalarını eşleştirip `public/images/` altına yazar.

## Referans mockup’lar

Kökteki `*.png` dosyaları (anasayfa, flow, hizmet sayfaları) tasarım referansıdır; commit edilebilir.
