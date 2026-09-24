# TSI Practice Prep – 1. Aşama kurulumu

## Tek dosya

Her şey artık **tek bir `index.html` dosyasının içinde**. Panel, 365 yeni soru, soru bankası temizliği, düzeltmeler ve stiller bu dosyaya gömülü. Ayrı `.js` ya da `.css` dosyası yüklemeniz gerekmiyor.

| Dosya | Ne yapmalı |
|---|---|
| `index.html` | GitHub'daki eski `index.html`'in yerine koyun. |
| `question-bank-core.js` | **Dokunmayın.** Eski iPhone/iPad hatasını `index.html` kendisi düzeltiyor. |
| `practice-engine-core.js` | **Dokunmayın** (isteğe bağlı olarak düzeltilmiş hali yüklenebilir, gerekli değil). |
| Daha önce yüklediyseniz `tsipp-*.js`, `tsipp.css` | Artık kullanılmıyor. Silebilir ya da bırakabilirsiniz, zararı yok. |

## GitHub'a yükleme

1. GitHub'da deponuzu açın → **Add file → Upload files**.
2. Yeni `index.html` dosyasını sürükleyip bırakın. GitHub "aynı adlı dosyayı değiştir" olarak alır.
3. Alttaki yeşil **Commit changes** düğmesine basın.
4. 1–2 dakika sonra siteyi açıp **Ctrl+F5** ile yenileyin (telefonda sekmeyi kapatıp yeniden açın).

**Kontrol:** Ana sayfadaki "Questions" kutusunda **1,200+** görünmeli. Bilgisayarda F12 → Console'a `TSIPP.bankStats()` yazınca `added: 365` görünmeli.

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
11. **"5,800+ Questions" kaldırıldı.** Bankada gerçekte 3.896 soru vardı ve çoğu kopyaydı. Sayı artık bankadan canlı hesaplanıyor. Temizlikten sonra "1,200+" görünür. İsterseniz başka bir yere de `<span data-tsipp-count="all"></span>` ekleyebilirsiniz. Tek sınav için `data-tsipp-count="SAT"` kullanın.
12. **ACT ipucu düzeltildi:** Enhanced ACT English 50 soru / 35 dakika, yani soru başına yaklaşık 42 saniye.
13. **Tüm eklentiler sayfanın içine gömüldü** (tek dosya).
14. **Eski Safari kurtarıcısı (`tsipp-rescue`) ve sürüm etiketleri (`?v=20260923`) eklendi.** Sürüm etiketi, tarayıcının eski JS dosyalarını önbellekten kullanmasını önler.


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

- Tek dosyalık `index.html`, gerçek `practice-engine-core.js` ile Chromium'da açıldı: sayfa hatası 0. Soru bankası temizlendi (1.291 soru, 365 yeni). Panel çizildi, soru sayısı kutusu "1,200+" gösterdi. (`question-bank-core.js` elimde olmadığı için onun yerine boş bir taklit dosya kullanıldı.)

- Chromium'da masaüstü, iPad (768/820/1024) ve telefon (390) genişliğinde denendi; yatay taşma yok.
- Tüm yeni kodun ES5 sözdizimiyle ayrıştığı doğrulandı (acorn). iOS 10.3 ve sonrası Safari'de çalışması beklenir; gerçek Safari'de ayrıca denenmedi.
- Sahte bir motorla uçtan uca akış denendi: güven seçimi → cevap kaydı → Hidden Weaknesses → Fix My Mistakes oturumunun başlatılması → Tutor'un 5 düğmesi.
- Yeni kullanıcı için sayfa boyu: masaüstü 9.279 → 4.810 px (−48%), telefon 16.992 → 8.176 px (−52%).

## Kontrol edilmesi gerekenler

- `practice-engine-core.js` ile eşleşme doğrulandı. Motor da `store` / `satStore` / `actStore` değişkenlerini ve `.history[].skills` kayıtlarını (`{correct, total}`) aynı biçimde kullanıyor.
- Soru bankası testleri sunucu ortamında motorun kendisiyle çalıştırıldı. Bölümlerin hepsinde tam uzunlukta test oluşuyor: SAT 54 + 44, ACT 50 + 45 + 36 (+ Science 40), TSIA2 20 + 24. Bu, dört zorluk yolunun (tam test, foundation, standard, hard) her biri için 40'ar kez denendi.
- `question-bank-core.js` elimde yok, o yüzden sitenin tamamı gerçek tarayıcıda birlikte çalıştırılamadı. Yüklemeden sonra bir SAT, bir ACT ve bir TSIA2 testi açıp birkaç soru çözmenizi öneririm.
- SSS'te artık "hesap açarsan ilerlemen cihazlar arası saklanır" yazıyor, çünkü sayfa `firebase-config.js` ve `sync-engine.js` yüklüyor. Senkronun gerçekten çalıştığını bir kez test edin.
