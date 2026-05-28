# Индексация в Google (обязательный шаг)

Технические файлы (`robots.txt`, `sitemap.xml`, JSON-LD) уже на сайте. Без Search Console Google может не найти страницу неделями.

## Google Search Console

1. Откройте https://search.google.com/search-console  
2. **Добавить ресурс** → префикс URL: `https://pashavleon.github.io/vote/`  
3. Подтвердите владение (HTML-файл в корне репо или meta-тег в `index.html`).  
4. **Файлы Sitemap** → добавьте: `https://pashavleon.github.io/vote/sitemap.xml`  
5. **Проверка URL** → вставьте `https://pashavleon.github.io/vote/` → **Запросить индексирование**

## Проверка

Через 3–7 дней в Google: `site:pashavleon.github.io/vote`

## Bing (опционально)

https://www.bing.com/webmasters — тот же URL и sitemap.
