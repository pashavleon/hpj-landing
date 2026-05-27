/**
 * i18n: 13 languages. Default: en.
 * Priority: localStorage → navigator.languages → en
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'ucl_vote_locale';
  var DEFAULT_LOCALE = 'en';
  var SUPPORTED = [
    'en', 'ru', 'es', 'de', 'fr', 'pt', 'it', 'pl', 'uk', 'tr', 'zh', 'ja', 'hi',
  ];

  var LOCALE_NUMBER = {
    en: 'en-US', ru: 'ru-RU', es: 'es-ES', de: 'de-DE', fr: 'fr-FR',
    pt: 'pt-BR', it: 'it-IT', pl: 'pl-PL', uk: 'uk-UA', tr: 'tr-TR',
    zh: 'zh-CN', ja: 'ja-JP', hi: 'hi-IN',
  };

  var STRINGS = {
    en: {
      'page.title': 'UCL Final 2026 — vote',
      'meta.description': 'Fan poll: who wins the Champions League final in Budapest?',
      'head.event': 'UCL Final · 30 May · Budapest',
      'head.question': 'Who lifts the trophy?',
      'vote.hint': "Tap your team's art — your vote counts instantly",
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Vote for Arsenal', 'vote.psgAria': 'Vote for Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} votes · live',
      'vote.totalLiveEmpty': '… votes · live',
      'footer.disclaimer': 'Unofficial fan poll · not affiliated with UEFA',
      'lang.label': 'Language',
      'msg.demoNoSdk': 'Supabase SDK not loaded — demo mode',
      'msg.demoConfig': 'Demo: set URL and anon key in js/config.js',
      'msg.statsError': 'Could not load statistics',
      'msg.alreadyVoted': 'You have already voted',
      'msg.sending': 'Submitting your vote…',
      'msg.demoVote': 'Demo vote saved locally',
      'msg.thanks': 'Thanks! Your vote has been counted',
      'msg.sendError': 'Failed to submit. Please try again',
    },
    ru: {
      'page.title': 'Финал ЛЧ 2026 — голосование',
      'meta.description': 'Фан-опрос: кто выиграет финал Лиги чемпионов в Будапеште?',
      'head.event': 'Финал ЛЧ · 30 мая · Будапешт',
      'head.question': 'Кто поднимет кубок?',
      'vote.hint': 'Нажми на арт своей команды — голос сразу засчитается',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Голосовать за Arsenal', 'vote.psgAria': 'Голосовать за Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} голосов · обновляется live',
      'vote.totalLiveEmpty': '… голосов · обновляется live',
      'footer.disclaimer': 'Неофициальный фан-опрос · не связан с УЕФА',
      'lang.label': 'Язык',
      'msg.demoNoSdk': 'Supabase SDK не загружен — демо-режим',
      'msg.demoConfig': 'Демо: укажите URL и anon key в js/config.js',
      'msg.statsError': 'Не удалось загрузить статистику',
      'msg.alreadyVoted': 'Вы уже голосовали',
      'msg.sending': 'Отправляем голос…',
      'msg.demoVote': 'Демо-голос учтён локально',
      'msg.thanks': 'Спасибо! Ваш голос учтён',
      'msg.sendError': 'Ошибка при отправке. Попробуйте ещё раз',
    },
    es: {
      'page.title': 'Final de la UCL 2026 — votación',
      'meta.description': 'Encuesta: ¿quién gana la final de la Champions en Budapest?',
      'head.event': 'Final UCL · 30 may · Budapest',
      'head.question': '¿Quién levanta el trofeo?',
      'vote.hint': 'Toca el arte de tu equipo — el voto cuenta al instante',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Votar por Arsenal', 'vote.psgAria': 'Votar por Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} votos · en vivo',
      'vote.totalLiveEmpty': '… votos · en vivo',
      'footer.disclaimer': 'Encuesta no oficial · no afiliada a la UEFA',
      'lang.label': 'Idioma',
      'msg.demoNoSdk': 'SDK de Supabase no cargado — modo demo',
      'msg.demoConfig': 'Demo: indica URL y anon key en js/config.js',
      'msg.statsError': 'No se pudieron cargar las estadísticas',
      'msg.alreadyVoted': 'Ya has votado',
      'msg.sending': 'Enviando tu voto…',
      'msg.demoVote': 'Voto demo guardado localmente',
      'msg.thanks': '¡Gracias! Tu voto ha sido registrado',
      'msg.sendError': 'Error al enviar. Inténtalo de nuevo',
    },
    de: {
      'page.title': 'UCL-Finale 2026 — Abstimmung',
      'meta.description': 'Fan-Umfrage: Wer gewinnt das Champions-League-Finale in Budapest?',
      'head.event': 'UCL-Finale · 30. Mai · Budapest',
      'head.question': 'Wer hebt den Pokal?',
      'vote.hint': 'Tippe auf das Artwork deines Teams — deine Stimme zählt sofort',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Für Arsenal stimmen', 'vote.psgAria': 'Für Paris SG stimmen',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} Stimmen · live',
      'vote.totalLiveEmpty': '… Stimmen · live',
      'footer.disclaimer': 'Inoffizielle Fan-Umfrage · nicht mit der UEFA verbunden',
      'lang.label': 'Sprache',
      'msg.demoNoSdk': 'Supabase SDK nicht geladen — Demo-Modus',
      'msg.demoConfig': 'Demo: URL und anon key in js/config.js eintragen',
      'msg.statsError': 'Statistik konnte nicht geladen werden',
      'msg.alreadyVoted': 'Du hast bereits abgestimmt',
      'msg.sending': 'Stimme wird gesendet…',
      'msg.demoVote': 'Demo-Stimme lokal gespeichert',
      'msg.thanks': 'Danke! Deine Stimme wurde gezählt',
      'msg.sendError': 'Senden fehlgeschlagen. Bitte erneut versuchen',
    },
    fr: {
      'page.title': 'Finale LDC 2026 — vote',
      'meta.description': 'Sondage : qui gagne la finale de la Ligue des champions à Budapest ?',
      'head.event': 'Finale LDC · 30 mai · Budapest',
      'head.question': 'Qui soulève le trophée ?',
      'vote.hint': 'Appuie sur l\'art de ton équipe — ton vote compte tout de suite',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Voter pour Arsenal', 'vote.psgAria': 'Voter pour Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} votes · en direct',
      'vote.totalLiveEmpty': '… votes · en direct',
      'footer.disclaimer': 'Sondage non officiel · non affilié à l\'UEFA',
      'lang.label': 'Langue',
      'msg.demoNoSdk': 'SDK Supabase non chargé — mode démo',
      'msg.demoConfig': 'Démo : renseigne l\'URL et la clé anon dans js/config.js',
      'msg.statsError': 'Impossible de charger les statistiques',
      'msg.alreadyVoted': 'Tu as déjà voté',
      'msg.sending': 'Envoi du vote…',
      'msg.demoVote': 'Vote démo enregistré localement',
      'msg.thanks': 'Merci ! Ton vote a été pris en compte',
      'msg.sendError': 'Échec de l\'envoi. Réessaie',
    },
    pt: {
      'page.title': 'Final da UCL 2026 — votação',
      'meta.description': 'Enquete: quem vence a final da Champions em Budapeste?',
      'head.event': 'Final da UCL · 30 de maio · Budapeste',
      'head.question': 'Quem levanta o troféu?',
      'vote.hint': 'Toque na arte do seu time — o voto vale na hora',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Votar no Arsenal', 'vote.psgAria': 'Votar no Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} votos · ao vivo',
      'vote.totalLiveEmpty': '… votos · ao vivo',
      'footer.disclaimer': 'Enquete não oficial · não afiliada à UEFA',
      'lang.label': 'Idioma',
      'msg.demoNoSdk': 'SDK do Supabase não carregado — modo demo',
      'msg.demoConfig': 'Demo: defina URL e anon key em js/config.js',
      'msg.statsError': 'Não foi possível carregar as estatísticas',
      'msg.alreadyVoted': 'Você já votou',
      'msg.sending': 'Enviando seu voto…',
      'msg.demoVote': 'Voto demo salvo localmente',
      'msg.thanks': 'Obrigado! Seu voto foi registrado',
      'msg.sendError': 'Falha ao enviar. Tente novamente',
    },
    it: {
      'page.title': 'Finale UCL 2026 — voto',
      'meta.description': 'Sondaggio: chi vince la finale di Champions a Budapest?',
      'head.event': 'Finale UCL · 30 maggio · Budapest',
      'head.question': 'Chi alza il trofeo?',
      'vote.hint': 'Tocca l\'arte della tua squadra — il voto conta subito',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Vota Arsenal', 'vote.psgAria': 'Vota Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} voti · live',
      'vote.totalLiveEmpty': '… voti · live',
      'footer.disclaimer': 'Sondaggio non ufficiale · non affiliato all\'UEFA',
      'lang.label': 'Lingua',
      'msg.demoNoSdk': 'SDK Supabase non caricato — modalità demo',
      'msg.demoConfig': 'Demo: imposta URL e anon key in js/config.js',
      'msg.statsError': 'Impossibile caricare le statistiche',
      'msg.alreadyVoted': 'Hai già votato',
      'msg.sending': 'Invio del voto…',
      'msg.demoVote': 'Voto demo salvato in locale',
      'msg.thanks': 'Grazie! Il tuo voto è stato registrato',
      'msg.sendError': 'Invio non riuscito. Riprova',
    },
    pl: {
      'page.title': 'Finał LM 2026 — głosowanie',
      'meta.description': 'Ankieta: kto wygra finał Ligi Mistrzów w Budapeszcie?',
      'head.event': 'Finał LM · 30 maja · Budapeszt',
      'head.question': 'Kto podniesie trofeum?',
      'vote.hint': 'Kliknij grafikę swojej drużyny — głos liczy się od razu',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Głosuj na Arsenal', 'vote.psgAria': 'Głosuj na Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} głosów · na żywo',
      'vote.totalLiveEmpty': '… głosów · na żywo',
      'footer.disclaimer': 'Nieoficjalna ankieta fanów · bez powiązania z UEFA',
      'lang.label': 'Język',
      'msg.demoNoSdk': 'Nie załadowano SDK Supabase — tryb demo',
      'msg.demoConfig': 'Demo: ustaw URL i anon key w js/config.js',
      'msg.statsError': 'Nie udało się załadować statystyk',
      'msg.alreadyVoted': 'Już głosowałeś',
      'msg.sending': 'Wysyłanie głosu…',
      'msg.demoVote': 'Głos demo zapisany lokalnie',
      'msg.thanks': 'Dzięki! Twój głos został zaliczony',
      'msg.sendError': 'Błąd wysyłki. Spróbuj ponownie',
    },
    uk: {
      'page.title': 'Фінал ЛЧ 2026 — голосування',
      'meta.description': 'Фан-опитування: хто виграє фінал Ліги чемпіонів у Будапешті?',
      'head.event': 'Фінал ЛЧ · 30 травня · Будапешт',
      'head.question': 'Хто підніме кубок?',
      'vote.hint': 'Натисни на арт своєї команди — голос одразу зарахують',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Голосувати за Arsenal', 'vote.psgAria': 'Голосувати за Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} голосів · оновлюється live',
      'vote.totalLiveEmpty': '… голосів · оновлюється live',
      'footer.disclaimer': 'Неофіційне фан-опитування · не пов\'язане з УЄФА',
      'lang.label': 'Мова',
      'msg.demoNoSdk': 'SDK Supabase не завантажено — демо-режим',
      'msg.demoConfig': 'Демо: вкажіть URL та anon key у js/config.js',
      'msg.statsError': 'Не вдалося завантажити статистику',
      'msg.alreadyVoted': 'Ви вже голосували',
      'msg.sending': 'Надсилаємо голос…',
      'msg.demoVote': 'Демо-голос збережено локально',
      'msg.thanks': 'Дякуємо! Ваш голос зараховано',
      'msg.sendError': 'Помилка надсилання. Спробуйте ще раз',
    },
    tr: {
      'page.title': 'Şampiyonlar Ligi finali 2026 — oy',
      'meta.description': 'Anket: Budapeşte\'de Şampiyonlar Ligi finalini kim kazanır?',
      'head.event': 'Şampiyonlar Ligi finali · 30 Mayıs · Budapeşte',
      'head.question': 'Kupayı kim kaldıracak?',
      'vote.hint': 'Takımının görseline dokun — oyun anında sayılır',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Arsenal\'e oy ver', 'vote.psgAria': 'Paris SG\'ye oy ver',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} oy · canlı',
      'vote.totalLiveEmpty': '… oy · canlı',
      'footer.disclaimer': 'Resmi olmayan taraftar anketi · UEFA ile bağlantılı değil',
      'lang.label': 'Dil',
      'msg.demoNoSdk': 'Supabase SDK yüklenmedi — demo modu',
      'msg.demoConfig': 'Demo: js/config.js içinde URL ve anon key girin',
      'msg.statsError': 'İstatistikler yüklenemedi',
      'msg.alreadyVoted': 'Zaten oy kullandınız',
      'msg.sending': 'Oy gönderiliyor…',
      'msg.demoVote': 'Demo oy yerel olarak kaydedildi',
      'msg.thanks': 'Teşekkürler! Oyunuz kaydedildi',
      'msg.sendError': 'Gönderilemedi. Lütfen tekrar deneyin',
    },
    zh: {
      'page.title': '2026欧冠决赛 — 投票',
      'meta.description': '球迷投票：谁将赢得布达佩斯欧冠决赛？',
      'head.event': '欧冠决赛 · 5月30日 · 布达佩斯',
      'head.question': '谁将举起奖杯？',
      'vote.hint': '点击你支持球队的作品 — 立即计票',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': '投票支持 Arsenal', 'vote.psgAria': '投票支持 Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} 票 · 实时',
      'vote.totalLiveEmpty': '… 票 · 实时',
      'footer.disclaimer': '非官方球迷投票 · 与欧足联无关',
      'lang.label': '语言',
      'msg.demoNoSdk': '未加载 Supabase SDK — 演示模式',
      'msg.demoConfig': '演示：请在 js/config.js 中设置 URL 和 anon key',
      'msg.statsError': '无法加载统计数据',
      'msg.alreadyVoted': '您已经投过票',
      'msg.sending': '正在提交投票…',
      'msg.demoVote': '演示票已保存在本地',
      'msg.thanks': '谢谢！您的投票已记录',
      'msg.sendError': '提交失败，请重试',
    },
    ja: {
      'page.title': 'UCL決勝 2026 — 投票',
      'meta.description': 'ファン投票：ブダペストのチャンピオンズリーグ決勝はどちらが勝つ？',
      'head.event': 'UCL決勝 · 5月30日 · ブダペスト',
      'head.question': '誰がトロフィーを掲げる？',
      'vote.hint': '応援チームのアートをタップ — すぐに投票が反映',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Arsenal に投票', 'vote.psgAria': 'Paris SG に投票',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} 票 · ライブ',
      'vote.totalLiveEmpty': '… 票 · ライブ',
      'footer.disclaimer': '非公式ファン投票 · UEFAとは無関係',
      'lang.label': '言語',
      'msg.demoNoSdk': 'Supabase SDK が読み込まれていません — デモモード',
      'msg.demoConfig': 'デモ：js/config.js に URL と anon key を設定',
      'msg.statsError': '統計を読み込めませんでした',
      'msg.alreadyVoted': 'すでに投票済みです',
      'msg.sending': '投票を送信中…',
      'msg.demoVote': 'デモ投票をローカルに保存しました',
      'msg.thanks': 'ありがとう！投票が記録されました',
      'msg.sendError': '送信に失敗しました。もう一度お試しください',
    },
    hi: {
      'page.title': 'UCL फाइनल 2026 — वोट',
      'meta.description': 'फैन पोल: बुडापेस्ट में चैंपियंस लीग फाइनल कौन जीतेगा?',
      'head.event': 'UCL फाइनल · 30 मई · बुडापेस्ट',
      'head.question': 'ट्रॉफी कौन उठाएगा?',
      'vote.hint': 'अपनी टीम की आर्ट पर टैप करें — वोट तुरंत गिना जाएगा',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Arsenal को वोट दें', 'vote.psgAria': 'Paris SG को वोट दें',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} वोट · लाइव',
      'vote.totalLiveEmpty': '… वोट · लाइव',
      'footer.disclaimer': 'अनौपचारिक फैन पोल · UEFA से संबद्ध नहीं',
      'lang.label': 'भाषा',
      'msg.demoNoSdk': 'Supabase SDK लोड नहीं हुआ — डेमो मोड',
      'msg.demoConfig': 'डेमो: js/config.js में URL और anon key सेट करें',
      'msg.statsError': 'आँकड़े लोड नहीं हो सके',
      'msg.alreadyVoted': 'आप पहले ही वोट कर चुके हैं',
      'msg.sending': 'वोट भेजा जा रहा है…',
      'msg.demoVote': 'डेमो वोट स्थानीय रूप से सहेजा गया',
      'msg.thanks': 'धन्यवाद! आपका वोट दर्ज हो गया',
      'msg.sendError': 'भेजने में विफल। फिर कोशिश करें',
    },
  };

  var currentLocale = DEFAULT_LOCALE;
  var switcherBound = false;

  function normalizeLang(tag) {
    if (!tag || typeof tag !== 'string') return null;
    var base = tag.toLowerCase().split('-')[0];
    if (base === 'nb' || base === 'nn') base = 'no';
    return SUPPORTED.indexOf(base) >= 0 ? base : null;
  }

  function detectLocale() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) >= 0) return saved;
    var langs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var match = normalizeLang(langs[i]);
      if (match) return match;
    }
    return DEFAULT_LOCALE;
  }

  function formatTemplate(str, params) {
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, function (_, key) {
      return params[key] !== undefined ? String(params[key]) : '{' + key + '}';
    });
  }

  function t(key, params) {
    var pack = STRINGS[currentLocale] || STRINGS[DEFAULT_LOCALE];
    var str = pack[key] || STRINGS[DEFAULT_LOCALE][key] || key;
    return formatTemplate(str, params);
  }

  function renderLangButtons() {
    var container = document.getElementById('lang-buttons');
    if (!container) return;
    container.innerHTML = '';
    SUPPORTED.forEach(function (code) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-lang', code);
      btn.textContent = code.toUpperCase();
      btn.setAttribute('aria-label', code);
      container.appendChild(btn);
    });
  }

  function apply(root) {
    root = root || document;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('meta.description'));
    document.title = t('page.title');
    document.documentElement.lang = currentLocale;

    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var attr = el.getAttribute('data-i18n-attr');
      var text = t(key);
      if (attr) el.setAttribute(attr, text);
      else el.textContent = text;
    });

    root.querySelectorAll('[data-lang]').forEach(function (btn) {
      var code = btn.getAttribute('data-lang');
      btn.classList.toggle('is-active', code === currentLocale);
      btn.setAttribute('aria-pressed', code === currentLocale ? 'true' : 'false');
    });
  }

  function setLocale(code) {
    if (SUPPORTED.indexOf(code) < 0) return;
    currentLocale = code;
    localStorage.setItem(STORAGE_KEY, code);
    apply(document);
    document.dispatchEvent(
      new CustomEvent('ucl-locale-change', { detail: { locale: code } })
    );
  }

  function bindSwitcher(root) {
    if (switcherBound) return;
    root = root || document;
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-lang]');
      if (!btn) return;
      setLocale(btn.getAttribute('data-lang'));
    });
    switcherBound = true;
  }

  function init() {
    currentLocale = detectLocale();
    renderLangButtons();
    bindSwitcher(document);
    apply(document);
  }

  function formatNumber(n) {
    var loc = LOCALE_NUMBER[currentLocale] || currentLocale;
    return Number(n).toLocaleString(loc);
  }

  window.I18n = {
    t: t,
    init: init,
    apply: apply,
    setLocale: setLocale,
    detectLocale: detectLocale,
    getLocale: function () { return currentLocale; },
    formatNumber: formatNumber,
    supported: SUPPORTED.slice(),
  };
})();
