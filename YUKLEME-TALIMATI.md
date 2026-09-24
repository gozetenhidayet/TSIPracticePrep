# GitHub'a yükleme (tsipracticeprep.com)

Bu klasördeki dosyalar deponuzdaki aynı adlı dosyaların yerine geçer. Klasör yapısı depoyla aynıdır.

## Yükleme (tek seferde)

1. github.com/gozetenhidayet/TSIPracticePrep adresini açın.
2. **Add file → Upload files**'a basın.
3. Bu klasörün **içindekileri** (`index.html`, diğer `.html` dosyaları ve `skills` klasörü) sürükleyip bırakın. `skills` klasörünü de sürükleyin; GitHub onu `skills/` içine koyar.
4. **Commit changes**'e basın.
5. 1–2 dakika sonra siteyi Ctrl+F5 ile yenileyin.

## Bu paketle düzelenler

- **5 TSIA2 beceri sayfası 404 veriyordu.** tsia2.html ve sitemap.xml şu sayfalara bağlantı veriyor, ama dosyalar `skills/` klasöründe yoktu:
  - `skills/tsia2-literary-analysis.html`
  - `skills/tsia2-informational-text-analysis.html`
  - `skills/tsia2-vocabulary-in-context.html`
  - `skills/tsia2-sentence-structure-grammar.html`
  - `skills/tsia2-essay-revision-editing.html`
- **12 eski `skills/` sayfası hâlâ "ScorePath" adını taşıyordu.** Yanlış alan adına (scorepathpractice.com) işaret ediyorlardı ve kırık bir "Start Practice" linkleri vardı. Artık güncel sayfalara yönlendiriyorlar.
- **Beceri sayfalarındaki "sAT / aCT / tSIA2" yazım hatası düzeltildi.** Örnek: "questions on sAT Algebra". Hata 20 sayfada vardı.
- **Beceri sayfalarında öğrenciye gösterilen geliştirici notu kaldırıldı:** "live AdSense requires the site owner's real Google publisher ID".
- **Örnek soruların doğru cevabı 54 örneğin 52'sinde "A" idi.** Artık A/B/C/D arasında dengeli dağılıyor. Cevaplar değişmedi; yalnızca şıkların sırası değişti.
- **Ana dizindeki 26 beceri sayfası, `skills/` içindekilerin eski birer kopyasıydı.** Artık `skills/` içindeki güncel sayfaya yönlendiriyorlar. Böylece aynı sayfanın iki farklı sürümü olmuyor.
- **13 tanıtım sayfasında (SAT/ACT/TSI practice) soru sayıları gerçeğe uymuyordu.** Örnekler: "2,387 questions", "1,253-question ACT bank". Artık gerçek sayılar yazıyor:
  - SAT: 507 soru (278 Math, 229 Reading & Writing)
  - ACT: 376 soru (100 English, 120 Math, 103 Reading, 53 Science)
  - TSIA2: 473 soru (306 Math, 167 ELAR)
- **index.html:** ana sayfadaki "Try 5 questions" düğmesi SAT ve ACT için hiçbir şey açmıyordu. Düzeltildi.

## Depodan silebileceğiniz dosyalar

Bu dosyalar artık kullanılmıyor, silinmeleri sitede hiçbir şeyi bozmaz. Silmek için dosyayı açın, sağ üstteki ⋯ menüsünden **Delete file**'ı seçin.

- `practice-engine-core.txt` (3,5 MB, kopya)
- `practice-engine-core-INDIRIP-JS-YAP.txt` (3,5 MB, kopya)
- `404 (1).html` (404.html'in kopyası)
- `deploy-pages.yml`: ana dizindeki kopya. `.github/workflows/` içindeki asıl dosyaya dokunmayın.
- `tsipp-dashboard.js`, `tsipp-data.js`, `tsipp-insights.js`, `tsipp.css`: artık index.html'in içinde.

`question-bank-core.js` ve `practice-engine-core.js` dosyalarına **dokunmayın**. Eski iPhone/iPad'lerdeki hatayı index.html kendisi düzeltiyor.
