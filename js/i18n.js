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

  var SITE_URL = 'https://pashavleon.github.io/vote/';
  var OG_IMAGE = SITE_URL + 'assets/arsenal-1280.jpg';

  var STRINGS = {
    en: {
      'page.title': 'Arsenal vs PSG — UCL Final 2026 Fan Poll | Live',
      'meta.description': 'Who wins in Budapest? Live fan poll: defending champions PSG vs unbeaten Arsenal in the Champions League final. Vote now — instant results.',
      'head.event': 'Champions League Final 2026 · 30 May · Budapest',
      'head.question': 'Arsenal or PSG — who lifts the trophy?',
      'head.subtitle': 'Semi-final rematch at Puskás Aréna · holders vs Europe\'s unbeaten UCL run',
      'vote.hint': 'Tap your team\'s art — your vote shapes the live fan prediction',
      'img.alt.arsenal': 'Arsenal — fan poll art for UCL Final 2026 vs PSG',
      'img.alt.psg': 'PSG — fan poll art for Champions League Final 2026 in Budapest',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Vote for Arsenal', 'vote.psgAria': 'Vote for Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} votes · live',
      'vote.totalLiveEmpty': '… votes · live',
      'footer.disclaimer': 'Unofficial fan poll · not affiliated with UEFA',
      'share.label': 'Share this poll',
      'share.native': 'Share',
      'share.copy': 'Copy link',
      'share.copied': 'Link copied!',
      'share.text': 'Arsenal vs PSG — who wins the UCL Final 2026 in Budapest? Vote in this live fan poll:',
      'share.textVoted': 'I voted {team} in the Arsenal vs PSG UCL Final 2026 fan poll — join in:',
      'share.x': 'Share on X',
      'share.facebook': 'Share on Facebook',
      'share.whatsapp': 'Share on WhatsApp',
      'share.telegram': 'Share on Telegram',
      'share.vk': 'Share on VK',
      'share.reddit': 'Share on Reddit',
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
      'page.title': 'Арсенал — ПСЖ: голосование за финал ЛЧ 2026',
      'meta.description': 'Кто выиграет в Будапеште? Живой фан-опрос: действующие чемпионы ПСЖ против непобеждённого Арсенала в Лиге чемпионов. Голосуй — результат онлайн.',
      'head.event': 'Финал Лиги чемпионов 2026 · 30 мая · Будапешт',
      'head.question': 'Арсенал или ПСЖ — кто поднимет кубок?',
      'head.subtitle': 'Реванш полуфинала на «Пушкаш Арене» · чемпионы vs непобедимая серия в ЛЧ',
      'vote.hint': 'Нажми на арт команды — твой голос влияет на живой фан-прогноз',
      'img.alt.arsenal': 'Арсенал — арт для голосования в финале ЛЧ 2026 против ПСЖ',
      'img.alt.psg': 'ПСЖ — арт для голосования в финале Лиги чемпионов в Будапеште',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Голосовать за Arsenal', 'vote.psgAria': 'Голосовать за Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} голосов · обновляется live',
      'vote.totalLiveEmpty': '… голосов · обновляется live',
      'footer.disclaimer': 'Неофициальный фан-опрос · не связан с УЕФА',
      'share.label': 'Поделиться опросом',
      'share.native': 'Поделиться',
      'share.copy': 'Скопировать ссылку',
      'share.copied': 'Ссылка скопирована!',
      'share.text': 'Арсенал — ПСЖ: кто выиграет финал ЛЧ 2026 в Будапеште? Голосуй в живом фан-опросе:',
      'share.textVoted': 'Я проголосовал за {team} в опросе на финал ЛЧ 2026 — присоединяйся:',
      'share.x': 'Поделиться в X',
      'share.facebook': 'Поделиться в Facebook',
      'share.whatsapp': 'Поделиться в WhatsApp',
      'share.telegram': 'Поделиться в Telegram',
      'share.vk': 'Поделиться ВКонтакте',
      'share.reddit': 'Поделиться в Reddit',
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
      'page.title': 'Arsenal vs PSG — encuesta final UCL 2026',
      'meta.description': '¿Quién gana en Budapest? Encuesta en vivo: PSG campeón defensor vs Arsenal invicto en la Champions. Vota y mira el resultado al instante.',
      'head.event': 'Final Champions League 2026 · 30 may · Budapest',
      'head.question': '¿Arsenal o PSG — quién levanta el trofeo?',
      'head.subtitle': 'Revancha de semifinales en el Puskás · campeones vs racha invicta en Europa',
      'vote.hint': 'Toca el arte de tu equipo — tu voto forma el pronóstico fan en vivo',
      'img.alt.arsenal': 'Arsenal — arte para votar en la final UCL 2026 vs PSG',
      'img.alt.psg': 'PSG — arte para la encuesta de la final de Champions en Budapest',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Votar por Arsenal', 'vote.psgAria': 'Votar por Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} votos · en vivo',
      'vote.totalLiveEmpty': '… votos · en vivo',
      'footer.disclaimer': 'Encuesta no oficial · no afiliada a la UEFA',
      'share.label': 'Compartir encuesta',
      'share.native': 'Compartir',
      'share.copy': 'Copiar enlace',
      'share.copied': '¡Enlace copiado!',
      'share.text': 'Arsenal vs PSG — ¿quién gana la final de la UCL 2026 en Budapest? Vota en la encuesta en vivo:',
      'share.textVoted': 'Voté por {team} en la encuesta del final UCL 2026 — únete:',
      'share.x': 'Compartir en X',
      'share.facebook': 'Compartir en Facebook',
      'share.whatsapp': 'Compartir en WhatsApp',
      'share.telegram': 'Compartir en Telegram',
      'share.vk': 'Compartir en VK',
      'share.reddit': 'Compartir en Reddit',
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
      'page.title': 'Arsenal vs PSG — UCL-Finale 2026 Fan-Umfrage',
      'meta.description': 'Wer gewinnt in Budapest? Live-Umfrage: Titelverteidiger PSG vs ungeschlagener Arsenal im Champions-League-Finale. Jetzt abstimmen.',
      'head.event': 'Champions-League-Finale 2026 · 30. Mai · Budapest',
      'head.question': 'Arsenal oder PSG — wer hebt den Pokal?',
      'head.subtitle': 'Halbfinal-Revanche in der Puskás Aréna · Titelverteidiger vs ungeschlagene CL-Serie',
      'vote.hint': 'Tippe auf das Team-Artwork — deine Stimme fließt in die Live-Fan-Prognose ein',
      'img.alt.arsenal': 'Arsenal — Fan-Art für die UCL-Finale-Umfrage 2026 gegen PSG',
      'img.alt.psg': 'PSG — Fan-Art für die Champions-League-Finale-Umfrage in Budapest',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Für Arsenal stimmen', 'vote.psgAria': 'Für Paris SG stimmen',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} Stimmen · live',
      'vote.totalLiveEmpty': '… Stimmen · live',
      'footer.disclaimer': 'Inoffizielle Fan-Umfrage · nicht mit der UEFA verbunden',
      'share.label': 'Umfrage teilen',
      'share.native': 'Teilen',
      'share.copy': 'Link kopieren',
      'share.copied': 'Link kopiert!',
      'share.text': 'Arsenal vs PSG — wer gewinnt das UCL-Finale 2026 in Budapest? Stimme in der Live-Fan-Umfrage ab:',
      'share.textVoted': 'Ich habe für {team} im UCL-Finale-2026-Fan-Poll gestimmt — mach mit:',
      'share.x': 'Auf X teilen',
      'share.facebook': 'Auf Facebook teilen',
      'share.whatsapp': 'Auf WhatsApp teilen',
      'share.telegram': 'Auf Telegram teilen',
      'share.vk': 'Auf VK teilen',
      'share.reddit': 'Auf Reddit teilen',
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
      'page.title': 'Arsenal vs PSG — sondage finale LDC 2026',
      'meta.description': 'Qui gagne à Budapest ? Sondage live : PSG tenant du titre vs Arsenal invaincu en Ligue des champions. Vote — résultats instantanés.',
      'head.event': 'Finale Ligue des champions 2026 · 30 mai · Budapest',
      'head.question': 'Arsenal ou PSG — qui soulève le trophée ?',
      'head.subtitle': 'Revanche des demi-finales au Puskás · champions vs série invaincue en Europe',
      'vote.hint': 'Appuie sur l\'art de ton équipe — ton vote alimente le pronostic fan en direct',
      'img.alt.arsenal': 'Arsenal — art du sondage fan pour la finale LDC 2026 vs PSG',
      'img.alt.psg': 'PSG — art du sondage pour la finale de Champions League à Budapest',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Voter pour Arsenal', 'vote.psgAria': 'Voter pour Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} votes · en direct',
      'vote.totalLiveEmpty': '… votes · en direct',
      'footer.disclaimer': 'Sondage non officiel · non affilié à l\'UEFA',
      'share.label': 'Partager le sondage',
      'share.native': 'Partager',
      'share.copy': 'Copier le lien',
      'share.copied': 'Lien copié !',
      'share.text': 'Arsenal vs PSG — qui gagne la finale UCL 2026 à Budapest ? Vote dans le sondage fan en direct :',
      'share.textVoted': 'J\'ai voté {team} dans le sondage de la finale UCL 2026 — à toi :',
      'share.x': 'Partager sur X',
      'share.facebook': 'Partager sur Facebook',
      'share.whatsapp': 'Partager sur WhatsApp',
      'share.telegram': 'Partager sur Telegram',
      'share.vk': 'Partager sur VK',
      'share.reddit': 'Partager sur Reddit',
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
      'page.title': 'Arsenal vs PSG — votação final UCL 2026',
      'meta.description': 'Quem vence em Budapeste? Enquete ao vivo: PSG campeão defensor vs Arsenal invicto na Champions. Vote — resultado na hora.',
      'head.event': 'Final da Champions League 2026 · 30 de maio · Budapeste',
      'head.question': 'Arsenal ou PSG — quem levanta o troféu?',
      'head.subtitle': 'Revanche da semifinal na Puskás · campeões vs invencibilidade na Champions',
      'vote.hint': 'Toque na arte do seu time — seu voto forma o palpite fan ao vivo',
      'img.alt.arsenal': 'Arsenal — arte da enquete da final UCL 2026 vs PSG',
      'img.alt.psg': 'PSG — arte da enquete da final da Champions em Budapeste',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Votar no Arsenal', 'vote.psgAria': 'Votar no Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} votos · ao vivo',
      'vote.totalLiveEmpty': '… votos · ao vivo',
      'footer.disclaimer': 'Enquete não oficial · não afiliada à UEFA',
      'share.label': 'Compartilhar enquete',
      'share.native': 'Compartilhar',
      'share.copy': 'Copiar link',
      'share.copied': 'Link copiado!',
      'share.text': 'Arsenal vs PSG — quem vence a final da UCL 2026 em Budapeste? Vote na enquete ao vivo:',
      'share.textVoted': 'Votei no {team} na enquete da final UCL 2026 — participe:',
      'share.x': 'Compartilhar no X',
      'share.facebook': 'Compartilhar no Facebook',
      'share.whatsapp': 'Compartilhar no WhatsApp',
      'share.telegram': 'Compartilhar no Telegram',
      'share.vk': 'Compartilhar no VK',
      'share.reddit': 'Compartilhar no Reddit',
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
      'page.title': 'Arsenal vs PSG — sondaggio finale UCL 2026',
      'meta.description': 'Chi vince a Budapest? Sondaggio live: PSG campione in carica vs Arsenal imbattuto in Champions. Vota — risultati istantanei.',
      'head.event': 'Finale Champions League 2026 · 30 maggio · Budapest',
      'head.question': 'Arsenal o PSG — chi alza il trofeo?',
      'head.subtitle': 'Rivincita delle semifinali alla Puskás · campioni vs imbattibilità in Europa',
      'vote.hint': 'Tocca l\'arte della tua squadra — il tuo voto alimenta il pronostico fan live',
      'img.alt.arsenal': 'Arsenal — arte per il sondaggio finale UCL 2026 vs PSG',
      'img.alt.psg': 'PSG — arte per il sondaggio della finale Champions a Budapest',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Vota Arsenal', 'vote.psgAria': 'Vota Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} voti · live',
      'vote.totalLiveEmpty': '… voti · live',
      'footer.disclaimer': 'Sondaggio non ufficiale · non affiliato all\'UEFA',
      'share.label': 'Condividi il sondaggio',
      'share.native': 'Condividi',
      'share.copy': 'Copia link',
      'share.copied': 'Link copiato!',
      'share.text': 'Arsenal vs PSG — chi vince la finale UCL 2026 a Budapest? Vota nel sondaggio fan live:',
      'share.textVoted': 'Ho votato {team} nel sondaggio finale UCL 2026 — partecipa:',
      'share.x': 'Condividi su X',
      'share.facebook': 'Condividi su Facebook',
      'share.whatsapp': 'Condividi su WhatsApp',
      'share.telegram': 'Condividi su Telegram',
      'share.vk': 'Condividi su VK',
      'share.reddit': 'Condividi su Reddit',
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
      'page.title': 'Arsenal vs PSG — głosowanie finał LM 2026',
      'meta.description': 'Kto wygra w Budapeszcie? Ankieta na żywo: mistrz PSG vs niepokonany Arsenal w Lidze Mistrzów. Głosuj — wynik od razu.',
      'head.event': 'Finał Ligi Mistrzów 2026 · 30 maja · Budapeszt',
      'head.question': 'Arsenal czy PSG — kto podniesie trofeum?',
      'head.subtitle': 'Rewanż półfinału na Puskás · obrońcy tytułu vs seria bez porażki w LM',
      'vote.hint': 'Kliknij grafikę drużyny — twój głos buduje live prognozę fanów',
      'img.alt.arsenal': 'Arsenal — grafika ankiety finału LM 2026 vs PSG',
      'img.alt.psg': 'PSG — grafika ankiety finału Ligi Mistrzów w Budapeszcie',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Głosuj na Arsenal', 'vote.psgAria': 'Głosuj na Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} głosów · na żywo',
      'vote.totalLiveEmpty': '… głosów · na żywo',
      'footer.disclaimer': 'Nieoficjalna ankieta fanów · bez powiązania z UEFA',
      'share.label': 'Udostępnij ankietę',
      'share.native': 'Udostępnij',
      'share.copy': 'Kopiuj link',
      'share.copied': 'Link skopiowany!',
      'share.text': 'Arsenal vs PSG — kto wygra finał LM 2026 w Budapeszcie? Zagłosuj w ankiecie na żywo:',
      'share.textVoted': 'Głosowałem na {team} w ankiecie finału LM 2026 — dołącz:',
      'share.x': 'Udostępnij na X',
      'share.facebook': 'Udostępnij na Facebooku',
      'share.whatsapp': 'Udostępnij na WhatsApp',
      'share.telegram': 'Udostępnij na Telegramie',
      'share.vk': 'Udostępnij na VK',
      'share.reddit': 'Udostępnij na Reddit',
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
      'page.title': 'Арсенал — ПСЖ: голосування за фінал ЛЧ 2026',
      'meta.description': 'Хто виграє в Будапешті? Живе фан-опитування: чемпіони ПСЖ проти непереможного Арсенала в Лізі чемпіонів. Голосуй — результат онлайн.',
      'head.event': 'Фінал Ліги чемпіонів 2026 · 30 травня · Будапешт',
      'head.question': 'Арсенал чи ПСЖ — хто підніме кубок?',
      'head.subtitle': 'Реванш півфіналу на «Пушкаш Арені» · чемпіони vs непереможна серія в ЛЧ',
      'vote.hint': 'Натисни на арт команди — твій голос формує живий фан-прогноз',
      'img.alt.arsenal': 'Арсенал — арт для голосування у фіналі ЛЧ 2026 проти ПСЖ',
      'img.alt.psg': 'ПСЖ — арт для голосування у фіналі Ліги чемпіонів у Будапешті',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Голосувати за Arsenal', 'vote.psgAria': 'Голосувати за Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} голосів · оновлюється live',
      'vote.totalLiveEmpty': '… голосів · оновлюється live',
      'footer.disclaimer': 'Неофіційне фан-опитування · не пов\'язане з УЄФА',
      'share.label': 'Поділитися опитуванням',
      'share.native': 'Поділитися',
      'share.copy': 'Скопіювати посилання',
      'share.copied': 'Посилання скопійовано!',
      'share.text': 'Арсенал — ПСЖ: хто виграє фінал ЛЧ 2026 у Будапешті? Голосуй у живому фан-опитуванні:',
      'share.textVoted': 'Я проголосував за {team} в опитуванні на фінал ЛЧ 2026 — приєднуйся:',
      'share.x': 'Поділитися в X',
      'share.facebook': 'Поділитися у Facebook',
      'share.whatsapp': 'Поділитися в WhatsApp',
      'share.telegram': 'Поділитися в Telegram',
      'share.vk': 'Поділитися у VK',
      'share.reddit': 'Поділитися в Reddit',
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
      'page.title': 'Arsenal vs PSG — Şampiyonlar Ligi finali 2026 anketi',
      'meta.description': 'Budapeşte\'de kim kazanır? Canlı taraftar anketi: şampiyon PSG vs yenilgisiz Arsenal. Oy ver — anında sonuç.',
      'head.event': 'Şampiyonlar Ligi finali 2026 · 30 Mayıs · Budapeşte',
      'head.question': 'Arsenal mi PSG mi — kupayı kim kaldıracak?',
      'head.subtitle': 'Yarı final rövanşı Puskás\'ta · şampiyonlar vs Avrupa\'da yenilgisiz seri',
      'vote.hint': 'Takımının görseline dokun — oyun canlı fan tahminini şekillendirir',
      'img.alt.arsenal': 'Arsenal — PSG\'ye karşı 2026 Şampiyonlar Ligi finali anket görseli',
      'img.alt.psg': 'PSG — Budapeşte Şampiyonlar Ligi finali anket görseli',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Arsenal\'e oy ver', 'vote.psgAria': 'Paris SG\'ye oy ver',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} oy · canlı',
      'vote.totalLiveEmpty': '… oy · canlı',
      'footer.disclaimer': 'Resmi olmayan taraftar anketi · UEFA ile bağlantılı değil',
      'share.label': 'Anketi paylaş',
      'share.native': 'Paylaş',
      'share.copy': 'Bağlantıyı kopyala',
      'share.copied': 'Bağlantı kopyalandı!',
      'share.text': 'Arsenal vs PSG — Budapeşte\'de UCL finalini kim kazanır? Canlı taraftar anketine oy ver:',
      'share.textVoted': 'UCL finali 2026 anketinde {team} için oy verdim — sen de katıl:',
      'share.x': 'X\'te paylaş',
      'share.facebook': 'Facebook\'ta paylaş',
      'share.whatsapp': 'WhatsApp\'ta paylaş',
      'share.telegram': 'Telegram\'da paylaş',
      'share.vk': 'VK\'da paylaş',
      'share.reddit': 'Reddit\'te paylaş',
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
      'page.title': '阿森纳 vs 巴黎圣日耳曼 — 2026欧冠决赛球迷投票',
      'meta.description': '布达佩斯谁夺冠？实时球迷投票：卫冕冠军巴黎 vs 欧冠不败阿森纳。立即投票，即时看结果。',
      'head.event': '2026欧冠决赛 · 5月30日 · 布达佩斯普斯卡什球场',
      'head.question': '阿森纳还是巴黎 — 谁将举起奖杯？',
      'head.subtitle': '半决赛重演 · 卫冕冠军 vs 欧冠全胜纪录',
      'vote.hint': '点击你支持球队的作品 — 你的投票塑造实时球迷预测',
      'img.alt.arsenal': '阿森纳 — 2026欧冠决赛对阵巴黎的球迷投票图',
      'img.alt.psg': '巴黎圣日耳曼 — 布达佩斯欧冠决赛球迷投票图',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': '投票支持 Arsenal', 'vote.psgAria': '投票支持 Paris SG',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} 票 · 实时',
      'vote.totalLiveEmpty': '… 票 · 实时',
      'footer.disclaimer': '非官方球迷投票 · 与欧足联无关',
      'share.label': '分享投票',
      'share.native': '分享',
      'share.copy': '复制链接',
      'share.copied': '链接已复制！',
      'share.text': '阿森纳 vs 巴黎圣日耳曼 — 2026欧冠决赛布达佩斯谁夺冠？参与实时球迷投票：',
      'share.textVoted': '我在2026欧冠决赛投票中选了{team} — 快来参与：',
      'share.x': '分享到 X',
      'share.facebook': '分享到 Facebook',
      'share.whatsapp': '分享到 WhatsApp',
      'share.telegram': '分享到 Telegram',
      'share.vk': '分享到 VK',
      'share.reddit': '分享到 Reddit',
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
      'page.title': 'アーセナル vs PSG — UCL決勝2026ファン投票',
      'meta.description': 'ブダペストで誰が勝つ？ライブ投票：王者PSG vs CL無敗のアーセナル。今すぐ投票 — 結果は即時反映。',
      'head.event': '2026 UEFAチャンピオンズリーグ決勝 · 5月30日 · ブダペスト',
      'head.question': 'アーセナルかPSGか — 誰がトロフィーを掲げる？',
      'head.subtitle': '準決勝の再戦 · プシュカシュ・アレーナ · 王者 vs 欧州無敗',
      'vote.hint': 'チームのアートをタップ — あなたの一票がライブファン予想に反映',
      'img.alt.arsenal': 'アーセナル — UCL決勝2026対PSGのファン投票アート',
      'img.alt.psg': 'PSG — ブダペストUCL決勝ファン投票アート',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Arsenal に投票', 'vote.psgAria': 'Paris SG に投票',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} 票 · ライブ',
      'vote.totalLiveEmpty': '… 票 · ライブ',
      'footer.disclaimer': '非公式ファン投票 · UEFAとは無関係',
      'share.label': '投票をシェア',
      'share.native': 'シェア',
      'share.copy': 'リンクをコピー',
      'share.copied': 'リンクをコピーしました！',
      'share.text': 'アーセナル vs PSG — ブダペストのUCL決勝2026、誰が勝つ？ライブファン投票に参加：',
      'share.textVoted': 'UCL決勝2026の投票で{team}に投票しました — 参加しよう：',
      'share.x': 'Xでシェア',
      'share.facebook': 'Facebookでシェア',
      'share.whatsapp': 'WhatsAppでシェア',
      'share.telegram': 'Telegramでシェア',
      'share.vk': 'VKでシェア',
      'share.reddit': 'Redditでシェア',
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
      'page.title': 'Arsenal vs PSG — UCL फाइनल 2026 फैन वोट',
      'meta.description': 'बुडापेस्ट में कौन जीतेगा? लाइव फैन पोल: चैंपियन PSG बनाम अपराजित Arsenal। अभी वोट करें — तुरंत परिणाम।',
      'head.event': 'चैंपियंस लीग फाइनल 2026 · 30 मई · बुडापेस्ट',
      'head.question': 'Arsenal या PSG — ट्रॉफी कौन उठाएगा?',
      'head.subtitle': 'सेमीफाइनल रीमैच · पुस्कास अखाड़ा · चैंपियन बनाम यूरोप में अपराजित',
      'vote.hint': 'अपनी टीम की आर्ट पर टैप करें — आपका वोट लाइव फैन प्रेडिक्शन बनाता है',
      'img.alt.arsenal': 'Arsenal — PSG के खिलाफ UCL फाइनल 2026 फैन पोल आर्ट',
      'img.alt.psg': 'PSG — बुडापेस्ट चैंपियंस लीग फाइनल फैन पोल आर्ट',
      'team.arsenal': 'Arsenal', 'team.psg': 'Paris SG',
      'vote.arsenalAria': 'Arsenal को वोट दें', 'vote.psgAria': 'Paris SG को वोट दें',
      'stats.arsenal': 'Arsenal {pct}%', 'stats.psg': 'PSG {pct}%',
      'vote.totalLive': '{count} वोट · लाइव',
      'vote.totalLiveEmpty': '… वोट · लाइव',
      'footer.disclaimer': 'अनौपचारिक फैन पोल · UEFA से संबद्ध नहीं',
      'share.label': 'पोल शेयर करें',
      'share.native': 'शेयर',
      'share.copy': 'लिंक कॉपी करें',
      'share.copied': 'लिंक कॉपी हो गया!',
      'share.text': 'Arsenal vs PSG — बुडापेस्ट में UCL फाइनल 2026 कौन जीतेगा? लाइव फैन पोल में वोट करें:',
      'share.textVoted': 'मैंने UCL फाइनल 2026 पोल में {team} को वोट दिया — आप भी जुड़ें:',
      'share.x': 'X पर शेयर करें',
      'share.facebook': 'Facebook पर शेयर करें',
      'share.whatsapp': 'WhatsApp पर शेयर करें',
      'share.telegram': 'Telegram पर शेयर करें',
      'share.vk': 'VK पर शेयर करें',
      'share.reddit': 'Reddit पर शेयर करें',
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

  function setMetaContent(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  }

  function applyStructuredData() {
    var el = document.getElementById('json-ld');
    if (!el) return;
    var title = t('page.title');
    var desc = t('meta.description');
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: desc,
      url: SITE_URL,
      inLanguage: currentLocale,
      about: {
        '@type': 'SportsEvent',
        name: 'UEFA Champions League Final 2026',
        startDate: '2026-05-30T18:00:00+02:00',
        location: {
          '@type': 'Place',
          name: 'Puskás Aréna',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Budapest',
            addressCountry: 'HU',
          },
        },
        competitor: [
          { '@type': 'SportsTeam', name: 'Arsenal FC' },
          { '@type': 'SportsTeam', name: 'Paris Saint-Germain' },
        ],
      },
    });
  }

  function applyMeta() {
    var title = t('page.title');
    var desc = t('meta.description');
    document.title = title;
    setMetaContent('meta[name="description"]', desc);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', desc);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', desc);
    applyStructuredData();
  }

  function apply(root) {
    root = root || document;
    applyMeta();
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
