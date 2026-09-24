# GitHub'a yükleme (tsipracticeprep.com)

Bu klasördeki dosyalar deponuzdaki aynı adlı dosyaların yerine geçer. Klasör yapısı depoyla aynıdır.

## Yükleme (tek seferde)

1. github.com/gozetenhidayet/TSIPracticePrep adresini açın.
2. **Add file → Upload files**'a basın.
3. Bu klasörün **içindekileri** sürükleyip bırakın: `index.html`, diğer `.html` dosyaları ve `skills` klasörü. GitHub `skills` klasörünü de `skills/` içine koyar.
4. **Commit changes**'e basın.
5. 1–2 dakika sonra siteyi açıp Ctrl+F5 ile yenileyin.

## index.html'de düzelenler (soru bankası ve ana sayfa)

- **Testten önceki 5 saniyelik reklam ekranı** artık hiç açılmıyor.
- **"Try 5 questions" düğmesi** SAT ve ACT için hiçbir şey açmıyordu. Düzeltildi.
- **Bağlamı cevabı desteklemeyen kelime soruları kaldırıldı.** Bu sorularda aynı cümleye her seferinde başka bir kelime konuyordu. Örnek: "The committee called its plan robust / concise / novel…, signaling that it might still change".
- **Okumadan cevaplanabilen sorular kaldırıldı.** Bu sorular birçok pasajda aynı hazır yanlış şıkları kullanıyordu. Örnekler: "The character cannot read.", "The passage proves the same result will occur everywhere".
- **Kopya sorular kaldırıldı.** Bir kelime dışında birebir aynı olan sorulardan yalnızca biri kaldı.
- **246 sorunun zorluk etiketi düzeltildi.** Bu tek adımlı sorular, döngü sırası yüzünden "Hard" etiketi almıştı. Artık "Easy" ya da "Medium".
- **102 yeni, elle yazılmış soru eklendi:**
  - 30 ACT Science: tablolu deneyler, iki deney karşılaştırması, bilim insanlarının görüş ayrılığı
  - 32 ACT Reading: 4 tam pasaj
  - 40 TSIA2 ELAR
- **Cevaplar ayrıca kontrol edildi.** 102 yeni sorunun cevabı ayrı bir kontrolle yeniden çözüldü; 102'si de anahtarla eşleşti. Elle yazılmış soru sayısı toplam 467 oldu.
- **Ana sayfadaki soru sayısı** bankadan canlı hesaplanıyor.

## Diğer sayfalarda düzelenler

- **5 TSIA2 beceri sayfası 404 veriyordu.** tsia2.html ve sitemap.xml bu sayfalara bağlantı veriyor ama dosyalar `skills/` klasöründe yoktu. Eklendi:
  - literary-analysis
  - informational-text-analysis
  - vocabulary-in-context
  - sentence-structure-grammar
  - essay-revision-editing
- **12 eski `skills/` sayfası "ScorePath" adını taşıyordu.** Yanlış alan adına işaret ediyorlardı ve linkleri kırıktı. Artık güncel sayfaya yönlendiriyorlar.
- **"sAT / aCT / tSIA2" yazım hatası düzeltildi.** Hata 20 sayfada vardı.
- **Öğrenciye görünen geliştirici notu kaldırıldı:** "AdSense requires the site owner's real Google publisher ID".
- **Örnek soruların doğru şıkkı artık A/B/C/D arasında dengeli dağılıyor.** Önceden 54 örneğin 52'sinde cevap "A" idi.
- **Ana dizindeki 26 kopya beceri sayfası** artık `skills/` içindeki güncel sayfaya yönlendiriyor. Böylece Google'da aynı sayfanın iki sürümü görünmüyor.
- **13 tanıtım sayfasındaki soru sayıları gerçek sayılarla değiştirildi:**
  - SAT: 462 soru (278 Math, 184 Reading & Writing)
  - ACT: 342 soru (72 English, 120 Math, 82 Reading, 68 Science)
  - TSIA2: 434 soru (306 Math, 128 ELAR)

## Depodan silebileceğiniz dosyalar

Silmek için dosyayı açın, ⋯ menüsünden **Delete file**'ı seçin.

- `practice-engine-core.txt`
- `practice-engine-core-INDIRIP-JS-YAP.txt`
- `404 (1).html`
- `deploy-pages.yml`: ana dizindeki kopya. `.github/workflows/` içindekine dokunmayın.
- `tsipp-dashboard.js`, `tsipp-data.js`, `tsipp-insights.js`, `tsipp.css`

`question-bank-core.js` ve `practice-engine-core.js` dosyalarına **dokunmayın**.
