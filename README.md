# Çimento Teknik Eğitimleri — PWA

Çalışanların telefonlarından talimatname ve eğitim dokümanlarına ulaşabildiği,
ana ekrana uygulama gibi eklenebilen bir web sayfası (PWA).

Kurulum ve doküman ekleme adımları için sohbette Claude'un verdiği adım adım
anlatıma bakın. Kısa özet aşağıdadır.

## Yeni doküman eklemek

1. PDF/Word/Excel dosyanızı `docs/talimatnameler/` veya `docs/egitimler/`
   klasörüne yükleyin.
2. Kök dizindeki `data.json` dosyasını açın ve ilgili kategoriye şu formatta
   bir satır ekleyin:

```json
{
  "talimatnameler": [
    { "title": "Yangın Güvenliği Talimatnamesi", "file": "docs/talimatnameler/yangin-guvenligi.pdf" }
  ],
  "egitimler": [
    { "title": "İş Güvenliği Temel Eğitimi", "file": "docs/egitimler/is-guvenligi-temel.pdf" }
  ]
}
```

- `title`: Uygulamada görünecek isim.
- `file`: Yüklediğiniz dosyanın tam yolu (klasör + dosya adı, uzantısıyla birlikte).
- Birden fazla doküman eklemek için virgülle ayırıp `{ ... }` bloklarını çoğaltın.

3. Değişikliği kaydedin (Commit changes). Birkaç saniye içinde uygulamada görünür.

## Notlar

- Dosya adlarında Türkçe karakter, boşluk ve büyük harften kaçının
  (örn. `yangin-guvenligi.pdf` gibi, `-` ile ayırın).
- Video eğitimler için dosyayı repoya yüklemek yerine YouTube'a "Liste Dışı"
  olarak yükleyip linkini `file` alanına yazmanız önerilir.
- Tek dosya 50MB'ı geçmemeli (GitHub sınırı).
