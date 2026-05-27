# Голосование на GitHub Pages + Supabase

## Файлы

| Файл | Назначение |
|------|------------|
| `vote.html` | **Продакшен-лендинг** для публикации (укажите как `index.html` на Pages) |
| `index.html` | Макеты A/B/C + живое голосование в блоке A |
| `js/vote.js` | Логика опроса |
| `js/config.js` | URL и anon key (не коммитьте ключи в публичный репо при желании) |
| `js/config.example.js` | Шаблон конфига |
| `supabase/schema.sql` | Таблицы, RLS, RPC `get_poll_stats` |

## 1. Supabase (≈10 мин)

1. [supabase.com](https://supabase.com) → New project.
2. **SQL Editor** → вставьте содержимое `supabase/schema.sql` → **Run**.
3. **Project Settings → API**:
   - **Project URL** → `js/config.js` → `supabaseUrl`
   - **anon public** key → `supabaseAnonKey`

## 2. Локальная проверка

```bash
cd docs/cl-vote-mockup
npx --yes serve .
# откройте http://localhost:3000/vote.html
```

Без ключей в `config.js` работает **демо-режим** (голоса только в `localStorage` этого браузера).

## 3. GitHub Pages

1. Settings → Pages → Source: ветка `main`, папка `/docs` или `/root` с содержимым `cl-vote-mockup`.
2. Проще всего: скопировать папку `cl-vote-mockup` в корень репо и переименовать `vote.html` → `index.html`.
3. Убедитесь, что в репозитории есть `assets/arsenal.png` и `assets/psg.png`.

## 4. Поведение

- Один голос на браузер: `voter_token` в `localStorage` + уникальный индекс в БД.
- Статистика: RPC `get_poll_stats`, автообновление каждые 15 с.
- Повторный голос: сообщение «Вы уже голосовали».

## 5. Закрыть опрос после финала

```sql
update public.polls set closes_at = now() where id = 'ucl-final-2026';
```

Опционально в `vote.js` добавьте проверку `closes_at` через отдельный запрос к `polls`.

## 6. Безопасность

- В репозиторий кладите только **anon** key, не `service_role`.
- RLS разрешает только `INSERT` в `votes` и `SELECT` + RPC для статистики.
- Накрутка возможна (новый браузер / токен) — для фан-опроса обычно достаточно.
