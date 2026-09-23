# TSI Practice Prep – 1. Aşama kurulumu

## Dosyalar

| Dosya | Ne yapar |
|---|---|
| `index.html` | Sizin dosyanızın düzenlenmiş hali (değişiklikler aşağıda) |
| `tsipp-data.js` | Sitenin **zaten kaydettiği** verileri okur (yeni veri toplamaz) |
| `tsipp-insights.js` | Güven seçimi kaydı, Hidden Weaknesses, hata kalıpları, Fix My Mistakes, gelişmiş Study Tutor |
| `tsipp-dashboard.js` | Yeni tek paneli çizer, düğmeleri mevcut motora bağlar |
| `tsipp.css` | Panelin stilleri (hepsi `.tsipp` altında, sitenin CSS'ine karışmaz) |

## Yükleme

1. Mevcut `index.html` dosyanızın **yedeğini alın**.
2. 5 dosyayı sitenin kök klasörüne (`index.html`'in olduğu yere) yükleyin.
3. Tarayıcıda Ctrl+F5 ile yenileyin.

Geri almak için eski `index.html` dosyasını geri koymanız yeterli. Diğer 3 dosya o durumda hiçbir şey yapmaz.

## index.html'de değişenler

1. **Yeni panel eklendi.** Eski Command Center'ın yerinde duruyor.
2. **4 eski bölüm gizlendi, silinmedi:** `#student-dashboard`, `#smart-learning`, `#my-results`, `#my-progress`. Sitenin JavaScript'i bu bölümleri kullanmaya devam ettiği için HTML'de kalıyorlar. Tekrar göstermek için `<head>` içindeki `tsipp-phase1-hide` stil satırını silin.
3. **Alt menüdeki "Progress" linki** artık yeni panele gidiyor.
4. **Hero güncellendi:** H1'deki "Free TSIA2, SAT & ACT Practice Tests" ifadesi SEO için korundu, alt satırı "Know exactly what to practice." oldu. Yeni açıklama metni ve güven satırı eklendi. Ayrıca **"Try 5 questions: TSIA2 / SAT / ACT"** düğmeleri var; bunlar mevcut soru bankasından 5 soruluk set başlatıyor.
5. **Toolnova sponsor kartı ve footer linki kaldırıldı.**
6. **Testten önceki 5 saniyelik reklam otomatik geçiliyor.** Geri istemek için sayfaya `window.TSIPP_SKIP_PRETEST_AD=false;` ekleyin. Kalıcı çözüm için bu reklam `practice-engine-core.js` içinden kapatılmalı.
7. **Öğrenciye görünen 5 geliştirici/şablon metni** öğrenci diline çevrildi. Bunlardan biri SSS'teki "standalone version… backend would be required" cevabı.

8. **Ana sayfa kısaltıldı.** Şu bölümler de gizlendi: Official Date Planner, Study Plan, Adaptive Learning Workflow ve "Everything you need" kutusu. Bunların işini artık panel yapıyor. Daily focus/hedefler/flashcard ile Teacher Toolkit ise silinmedi; "More tools" düğmeleriyle tek dokunuşta açılıyor.
9. **"Quality checked" satırı eklendi:** "✓ Every question quality-checked · ✓ Original · ✓ Every answer explained", Editorial Standards sayfasına link veriyor.
10. **Desmos artık ilk açılışta yüklenmiyor.** Yaklaşık 1 MB'lık bu dosya, öğrenci SAT hesap makinesini ilk açtığında yükleniyor. Telefonda açılış hızlanıyor.

## Yeni özellikler (tsipp-insights.js)

- **Hidden Weaknesses:** Öğrenci "Confident" seçip yanlış yaptığında sayılıyor. Güven seçimi daha önce kaydedilmiyordu; artık `tsipp_log_v1` anahtarına kaydediliyor. Bu yüzden kart, yükleme yapıldıktan sonra çözülen sorularla dolmaya başlar.
- **Patterns we noticed:** Kendine güvenilen ama düşük doğrulukla çözülen beceri, zor sorularda düşüş, soru özelliklerine göre kalıplar (negatif sayı, kesir, yüzde, üs, NOT/EXCEPT, birim, tablo/grafik, uzun problem), çok tahmin etme ve son 5 soruda çöküş. Yaklaşık 15 cevaptan sonra görünür.
- **Fix My Mistakes:** 3 eski hata + aynı beceriden 4 yeni soru + kural tekrarı + 2 kontrol sorusu. Sorular gerçek soru bankasından seçiliyor ve sitenin kendi `v9SetPending` / `v9Launch` fonksiyonlarıyla başlatılıyor.
- **Study Tutor:** "Hint (no answer)" önce strateji veriyor, ikinci basışta cevabı söylemeden bir yanlış şıkkı eletiyor. "Explain more simply" açıklamayı adım adım gösteriyor. Yeni "Try a similar question" düğmesi bankadan aynı beceride doğrulanmış bir soru açıyor. Soru uydurulmuyor.
- **Gerçek yapay zekâ sohbeti (isteğe bağlı):** Sayfaya `window.TSIPP_AI_ENDPOINT="https://…";` eklenirse Tutor'da bir soru kutusu açılır. Bunun için sunucu tarafında bir fonksiyon gerekir (örneğin Firebase Cloud Function + bir yapay zekâ API'si). Bu sunucu tarafı pakette yok.

## Panel hangi veriyi kullanıyor?

| Paneldeki kutu | Kaynak |
|---|---|
| Beceri haritası, doğruluk grafiği, tahmin | `store` / `satStore` / `actStore` → `.history[].skills`, `score`, `total` |
| Mistake DNA | `scorepath_error_reasons_v5` (öğrencinin açıklama altında seçtiği sebep) |
| Tekrar kuyruğu | `scorepath_review_schedule_v7` |
| Hedefler | `scorepathV13Goals` |
| Sınav tarihi | kendi anahtarı `tsipp_prefs_v1`, yoksa `scorepath_v2_goal` |
| "Continue where I left off" | `scorepathTSISession` / `SAT` / `ACT` |

SAT ve ACT tahmini, sitenin v7 betiğindeki doğruluk → puan tablosunun aynısıyla hesaplanıyor. Sonuç tek bir sayı yerine aralık olarak gösteriliyor. TSIA2 için ölçekli puan tahmini yapılmıyor; sitenin mevcut "readiness" etiketleri kullanılıyor.

## Test edilenler

- Chromium'da masaüstü, iPad (768/820/1024) ve telefon (390) genişliğinde denendi; yatay taşma yok.
- Tüm yeni kodun ES2015 sözdizimiyle ayrıştığı doğrulandı. iOS 10.3 ve sonrası Safari'de çalışması beklenir; gerçek Safari'de ayrıca denenmedi.
- Sahte bir motorla uçtan uca akış denendi: güven seçimi → cevap kaydı → Hidden Weaknesses → Fix My Mistakes oturumunun başlatılması → Tutor'un 5 düğmesi.
- Yeni kullanıcı için sayfa boyu: masaüstü 9.279 → 4.810 px (−48%), telefon 16.992 → 8.176 px (−52%).

## Kontrol edilmesi gerekenler

- `practice-engine-core.js` bana gelmedi. `store`, `satStore` ve `actStore` değişkenlerinin **global** olduğunu ve `.history` kayıtlarında `date`, `score`, `total`, `skills` alanlarının bulunduğunu `index.html`'deki kullanımlardan çıkardım. Panel boş görünürse o dosyayı gönderin, eşleştirmeyi düzelteyim.
- SSS'te artık "hesap açarsan ilerlemen cihazlar arası saklanır" yazıyor, çünkü sayfa `firebase-config.js` ve `sync-engine.js` yüklüyor. Senkronun gerçekten çalıştığını bir kez test edin.
