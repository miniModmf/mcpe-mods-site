import React, { useState, useMemo } from 'react';

// Single-file React component for a small documentation site.
// Tailwind classes are used for styling (no import needed in this file).
// Default export is the page component.

const COMMANDS = [
  {
    id: 'sv_infinite_ammo',
    versions: ['CS2', 'CS:GO'],
    category: 'Practice',
    en: {
      name: 'Infinite ammo',
      cmd: 'sv_infinite_ammo 1',
      desc: 'Gives unlimited ammo without reloading (set 2 to allow reloads). Requires sv_cheats 1 in local/server.'
    },
    ru: {
      name: 'Бесконечные патроны',
      cmd: 'sv_infinite_ammo 1',
      desc: 'Дает бесконечные патроны без перезарядки (значение 2 — бесконечные патроны, но с перезарядкой). Требует sv_cheats 1 в локальной игре/сервере.'
    }
  },
  {
    id: 'mp_roundtime_defuse',
    versions: ['CS2', 'CS:GO'],
    category: 'Round time',
    en: { name: 'Round time (defuse)', cmd: 'mp_roundtime_defuse 60', desc: 'Sets the round time for defuse maps (60 is commonly used for effectively unlimited practice).' },
    ru: { name: 'Время раунда (обезвреживание)', cmd: 'mp_roundtime_defuse 60', desc: 'Устанавливает время раунда на картах с бомбой (60 минут часто используется как практически бесконечное для практики).' }
  },
  {
    id: 'mp_maxrounds',
    versions: ['CS2','CS:GO'],
    category: 'Round time',
    en: { name: 'Max rounds / infinite rounds', cmd: 'mp_maxrounds 0', desc: 'Set max rounds to 0 to disable round limit (combine with roundtime commands to keep map running).' },
    ru: { name: 'Макс раундов / бесконечные раунды', cmd: 'mp_maxrounds 0', desc: 'Установка 0 отключит лимит по раундам (используйте вместе с командами времени раунда).' }
  },
  {
    id: 'bot_place',
    versions: ['CS2','CS:GO'],
    category: 'Bots',
    en: { name: 'Place a bot', cmd: 'bot_place', desc: 'Spawns a bot at your crosshair position — useful for boosts/aim practice.' },
    ru: { name: 'Поставить бота', cmd: 'bot_place', desc: 'Спавнит бота перед прицелом — удобно для практики подбрасываний/прицеливания.' }
  },
  {
    id: 'bot_add',
    versions: ['CS2','CS:GO'],
    category: 'Bots',
    en: { name: 'Add bot', cmd: 'bot_add <T|CT> <count>', desc: 'Adds bot(s) to the chosen team. You can specify count and difficulty with additional args in some builds.' },
    ru: { name: 'Добавить бота', cmd: 'bot_add <T|CT> <count>', desc: 'Добавляет бота(ов) в выбранную команду. Можно указывать количество и сложность в некоторых сборках.' }
  },
  {
    id: 'mp_buytime',
    versions: ['CS2','CS:GO'],
    category: 'Buy / Economy',
    en: { name: 'Buy time', cmd: 'mp_buytime 9999', desc: 'Extend the buy time (good for long-practice setups).' },
    ru: { name: 'Время покупки', cmd: 'mp_buytime 9999', desc: 'Увеличивает время покупки (удобно для длительной практики).' }
  },
  {
    id: 'mp_buy_anywhere',
    versions: ['CS2','CS:GO'],
    category: 'Buy / Economy',
    en: { name: 'Buy anywhere', cmd: 'mp_buy_anywhere 1', desc: 'Allows buying from anywhere on the map.' },
    ru: { name: 'Покупка в любом месте', cmd: 'mp_buy_anywhere 1', desc: 'Позволяет покупать оружие/экипировку из любой точки карты.' }
  },
  {
    id: 'sv_cheats',
    versions: ['CS2','CS:GO','CS 1.6'],
    category: 'Server / Cheats',
    en: { name: 'Enable cheats', cmd: 'sv_cheats 1', desc: 'Enables developer/cheat commands in a local server. Required for many practice commands.' },
    ru: { name: 'Включить читы', cmd: 'sv_cheats 1', desc: 'Включает команды разработчика/читы на локальном сервере. Требуется для многих команд практики.' }
  }
];

export default function CSCommandsSite() {
  const [lang, setLang] = useState('ru');
  const [version, setVersion] = useState('CS2');
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(COMMANDS.map(c => c.category)))], []);

  const filtered = useMemo(() => {
    return COMMANDS.filter(c => c.versions.includes(version))
      .filter(c => categoryFilter === 'All' ? true : c.category === categoryFilter)
      .filter(c => {
        const text = (c[lang]?.name + ' ' + c[lang]?.cmd + ' ' + c[lang]?.desc).toLowerCase();
        return text.includes(query.toLowerCase());
      });
  }, [version, categoryFilter, query, lang]);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      // small visual feedback could be added here
      alert((lang === 'ru') ? 'Скопировано в буфер обмена' : 'Copied to clipboard');
    }).catch(() => {
      alert((lang === 'ru') ? 'Не удалось скопировать' : 'Copy failed');
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6">
      <header className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">CS Commands Hub</h1>
          <div className="flex gap-3 items-center">
            <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} className="px-3 py-1 rounded-2xl bg-gray-700 hover:bg-gray-600">{lang === 'ru' ? 'Русский' : 'English'}</button>
            <select value={version} onChange={e => setVersion(e.target.value)} className="bg-gray-700 rounded p-1">
              <option>CS2</option>
              <option>CS:GO</option>
              <option>CS 1.6</option>
            </select>
          </div>
        </div>
        <p className="mt-2 text-gray-300">{lang === 'ru' ? 'Собрано популярные консольные команды для практики и настройки локальных серверов.' : 'Popular console commands for practice and local server setup.'}</p>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="col-span-1 md:col-span-1 bg-gray-900/50 rounded p-4">
          <div>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={lang === 'ru' ? 'Поиск команд, пример: "бесконечные"' : 'Search commands, e.g. "infinite"'} className="w-full p-2 rounded bg-gray-800" />
          </div>

          <div className="mt-4">
            <label className="block mb-2">{lang === 'ru' ? 'Категория' : 'Category'}</label>
            <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} className="w-full p-2 rounded bg-gray-800">
              {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <p>{lang === 'ru' ? 'Как использовать' : 'How to use'}:</p>
            <ol className="list-decimal ml-5">
              <li>{lang === 'ru' ? 'Откройте консоль в игре (~) и вставьте команду.' : 'Open console in-game (~) and paste the command.'}</li>
              <li>{lang === 'ru' ? 'Многие команды требуют sv_cheats 1 для локальной практики.' : 'Many commands require sv_cheats 1 for local practice.'}</li>
            </ol>
          </div>
        </aside>

        <section className="col-span-1 md:col-span-2">
          <div className="grid gap-4">
            {filtered.length === 0 && <div className="p-4 bg-gray-900/50 rounded">{lang === 'ru' ? 'Команды не найдены' : 'No commands found'}</div>}

            {filtered.map(cmd => (
              <div key={cmd.id} className="p-4 bg-gray-900/60 rounded border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-lg">{cmd[lang].name}</div>
                    <div className="text-sm text-gray-300">{cmd.category} • {cmd.versions.join(', ')}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => copyToClipboard(cmd[lang].cmd)} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">{lang === 'ru' ? 'Копировать' : 'Copy'}</button>
                    <button onClick={() => { navigator.clipboard.writeText(cmd[lang].cmd + '\n// ' + cmd[lang].desc); alert(lang==='ru'? 'Копированo с описанием' : 'Copied with description') }} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">{lang === 'ru' ? 'Коп с описанием' : 'Copy with desc'}</button>
                  </div>
                </div>

                <pre className="mt-3 bg-gray-800 p-3 rounded font-mono text-sm overflow-x-auto">{cmd[lang].cmd}</pre>
                <p className="mt-2 text-gray-300 text-sm">{cmd[lang].desc}</p>

                <div className="mt-3 text-xs text-gray-400">{lang === 'ru' ? 'Совет: используйте mp_restartgame 1 после изменения настроек, чтобы применить их.' : 'Tip: use mp_restartgame 1 after changing settings to apply them.'}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <div>Made for practice — switch languages, filter by version, copy commands.</div>
        <div className="mt-2">{lang === 'ru' ? 'Примечание: некоторые команды работают только в локальной игре или при включенных sv_cheats.' : 'Note: some commands only work in local games or with sv_cheats enabled.'}</div>
      </footer>
    </div>
  );
}
