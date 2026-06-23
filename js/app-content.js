/**
 * @file app-content.js
 * @description Bilingual UI copy (Russian & English) — warm, empathetic, gender-neutral support.
 * Loaded before the main application bundle. Access via AppI18n.bindContentGlobals().
 */
'use strict';

const APP_CONTENT = {
  ru: {
    petNames: [
      'родная', 'солнышко', 'любимая', 'красавица', 'нежная', 'хорошая',
      'звёздочка', 'радость', 'королева', 'малышка', 'сокровище', 'дорогая',
    ],

    heroG: {
      morning: [
        (n) => `Доброе утро, ${n}! ☀️ Новый день — новая маленькая победа`,
        (n) => `С добрым утром, ${n}! Не торопись — малышу нужна твоя спокойная энергия`,
        (n) => `${n}, просыпайся потихоньку. Завтрак, вода и витамины — и ты уже молодец ✨`,
        (n) => `Утро, ${n}! Сегодня будет хороший день — я в это верю 🤍`,
        (n) => `Доброе утро, ${n}! Положи руку на животик — передай малышу привет 💕`,
      ],
      afternoon: [
        (n) => `Добрый день, ${n}! Как ты? Не забывай пить воду 💧`,
        (n) => `${n}, сделай перерыв и поешь — малышу нужна твоя энергия 🍊`,
        (n) => `Привет, ${n}! Если устала — полежи. Это не лень, это забота о себе 🛋️`,
        (n) => `Добрый день, ${n}! Ты справляешься лучше, чем думаешь ❤️`,
        (n) => `${n}, как малыш? Если пинается — это хороший знак 🦶`,
      ],
      evening: [
        (n) => `Добрый вечер, ${n}! Пора расслабиться — ты заслужила отдых 🌙`,
        (n) => `Вечер, ${n}! Тёплый душ, чай и никаких тяжёлых дел ✨`,
        (n) => `${n}, ты сегодня умница. Я это знаю, даже если ты сомневаешься 🌟`,
        (n) => `Добрый вечер, ${n}! Погладь животик — малыш это чувствует 🥰`,
        (n) => `Вечер, ${n}! Лёгкий ужин и пора готовиться ко сну 💤`,
      ],
      night: [
        (n) => `Ночь, ${n}. Пора отдыхать — малыш растёт во сне 🌙`,
        (n) => `${n}, ложись спать. Не читай тревожное в интернете — всё хорошо 💤`,
        (n) => `Доброй ночи, ${n}! Ты в безопасности. Дыши спокойно 🤍`,
        (n) => `${n}, спи хорошо. Завтра будет новый, более лёгкий день ✨`,
      ],
    },

    timeMsgs: {
      morning: {
        icon: '🌅', badge: 'Утро ☀️', bgKey: '--tmm',
        msgs: [
          'Доброе утро! Начни день с воды и спокойного завтрака. Малышу нужна твоя забота — а тебе нужен отдых и питание. Ты уже делаешь невероятное. 🌸',
          'Утро — лучшее время не торопиться. Потянись, выпей воды, прими витамины во время еды. Сегодня достаточно маленьких шагов. ☀️',
          'Новый день — новая возможность позаботиться о себе. Ты не обязана быть идеальной. Достаточно быть рядом с малышом и слушать своё тело. 💕',
          'Если утром тошнит — держи крекер у кровати, съешь до того, как встанешь. Это частая история первого триместра, и она проходит. 🤍',
        ],
      },
      afternoon: {
        icon: '☀️', badge: 'День 🌤️', bgKey: '--tmd',
        msgs: [
          'День в разгаре — не забывай про воду. Обезвоживание усиливает усталость и тонус матки. Несколько глотков прямо сейчас — уже победа. 💧',
          'Сделай паузу: перекус, несколько минут на левом боку, глубокий вдох. Твоё тело сейчас работает на двоих — отдых это часть плана. 🥗',
          'Если тревожно — положи руку на животик и подыши: 4 секунды вдох, 4 задержка, 6–8 выдох. Три раза. Малыш чувствует твоё спокойствие. 🫧',
          'Ты справляешься. Даже если день кажется обычным — внутри происходит настоящее чудо. Гордись собой. ❤️',
        ],
      },
      evening: {
        icon: '🌙', badge: 'Вечер 🌆', bgKey: '--tme',
        msgs: [
          'Вечер — время замедлиться. Лёгкий ужин, тёплый душ, любимая музыка или сериал. Никаких «надо успеть всё». 🌙',
          'Проверь расписание препаратов на вечер — отметь принятые. Маленькая рутина даёт большое спокойствие. 💊',
          'Если ноги отекают — подними их на подушку 15 минут. Это простой способ помочь себе без лишних усилий. 💆',
          'Ты сделала достаточно на сегодня. Поблагодари себя — буквально вслух, если хочется. Ты заслуживаешь нежности. 🤍',
        ],
      },
      night: {
        icon: '💤', badge: 'Ночь 🌛', bgKey: '--tmn',
        msgs: [
          'Ночь — для сна. Малыш часто активен вечером, и это нормально. Сон на левом боку, подушка между коленями — твоим телом уже всё продумано. 💤',
          'Не гугли симптомы ночью — утром всё кажется иначе. Если что-то действительно беспокоит, запиши вопрос для врача. 📝',
          'Доброй ночи. Завтра новый день, а сегодня ты уже была храброй. Спи спокойно. 🌙',
        ],
      },
    },

    babyMsgs: [
      'Мамочка, мне так уютно у тебя в животике! Здесь тепло и безопасно. 🥰',
      'Я слышу твой голос — он для меня самая лучшая колыбельная. 👶',
      'Сегодня я тренировался двигаться. Надеюсь, не слишком потревожил! 🤸',
      'Твоё сердечко стучит так ровно — мне от этого хорошо. 💓',
      'Мамочка, ты самая красивая. Я это чувствую изнутри. ✨',
      'Я жду нашей встречи так же сильно, как и ты. 🍼',
      'Спасибо, что заботишься обо мне каждый день. Я расту! 💪',
      'Когда ты гладишь животик — мне становится очень тепло. 🤲',
      'Мам, не переживай. Нам с тобой здесь очень хорошо. 🛡️',
      'Я слышу, как ты поёшь. Пой ещё — мне нравится. 🎶',
      'Мамочка, отдыхай побольше. Мне это тоже на пользу! 🛋️',
      'Мам, я тебя люблю. Ты мой целый мир. ❤️',
      'Каждый твой вдох даёт мне кислород. Спасибо, мамочка! 🌬️',
      'Мамочка, улыбнись! Твоя улыбка — мой свет. ☀️',
      'Ты справляешься отлично. Я горжусь своей мамой. 🏆',
      'Скоро встретимся! Я уже хочу увидеть твои глаза. 💕',
      'Ты не одна — я всегда с тобой. 🤍',
    ],

    quotes: [
      'Ты делаешь невероятное прямо сейчас. Горжусь тобой. ✨',
      'Твоя улыбка делает день светлее. Улыбнись себе в зеркало! 😊',
      'Обещаю: ты не обязана быть идеальной — достаточно быть собой. 🤍',
      'Отдыхай больше. Твоя главная задача — беречь себя и малыша.',
      'Дыши глубоко. Ты в безопасности. Всё идёт как нужно. 🛡️',
      'Малыш слышит твой голос и успокаивается — ты его первый мир.',
      'Ты — центр своей вселенной, и это прекрасно.',
      'Беременность меняет тело — и каждое изменение говорит о любви.',
      'Позволь себе слабость. Это не поражение, это честность.',
      'Ты справляешься лучше, чем думаешь. Каждый день — доказательство.',
      'Скоро вы встретитесь — держись, финишная прямая ближе, чем кажется.',
      'Твоё тело знает, что делать. Доверься ему и врачу.',
      'Один стакан воды прямо сейчас — маленький подарок себе. 💧',
      'Ты создаёшь человека. Это не метафора — это ты, сегодня.',
      'Даже трудный день — это день, когда малыш растёт сильнее.',
      'Попроси о помощи, если нужно. Забота о себе — не эгоизм.',
      'Ты прекрасна. Беременность не отнимает красоту — добавляет смысл.',
      'Любовь к малышу начинается с любви к себе. Начни с чашки чая. ☕',
      'Ты не одна на этом пути — рядом врачи, близкие и это приложение 🤍',
      'Каждый отмеченный приём, каждый стакан воды — это забота, которая работает.',
    ],

    letters: {
      anxiety: {
        title: 'Мне тревожно 🥺',
        ls: [
          'Сделай глубокий вдох. Положи руку на животик — там бьётся маленькое сердце. Тревога при беременности часто от усталости и гормонов, а не от реальной опасности. Не читай пугающие форумы. Если симптом сильный — звони врачу. А пока — дыши: 4-7-8, три раза. Ты не одна. 🤍',
          'Тревога — это иногда просто любовь, которая не знает, куда деться. Ты уже заботишься о малыше. Сделай одно простое действие: водичка, окно, пять минут тишины. Этого достаточно на сейчас.',
          'Попробуй назвать вслух три вещи, которые ты видишь, две — слышишь, одну — чувствуешь телом. Это помогает вернуться в настоящий момент. Малыш с тобой — и это главное.',
        ],
      },
      tired: {
        title: 'Я устала 😫',
        ls: [
          'Усталость — нормальная часть беременности. Твоё тело строит человека 24/7. Брось лишние дела, ляг на бок, укутайся. Отдых — это не лень, это лечение.',
          'Сегодня можно «ничего не успеть» — и это нормально. Лёгкий перекус, вода, двадцать минут с закрытыми глазами. Завтра будет легче.',
          'Ты делаешь огромную работу. Позволь себе быть уставшей без чувства вины. Малышу нужна отдохнувшая мама — не идеальная.',
        ],
      },
      sad: {
        title: 'Мне грустно 😢',
        ls: [
          'Если хочется плакать — плачь. Эмоции не нужно «исправлять». Гормоны, усталость, перемены — всё это настоящее. Ты имеешь право на грусть.',
          'Поговори с близким человеком или запиши мысли в дневник. Иногда грусть просто просит, чтобы её заметили — и она уходит.',
          'Ты самая ценная в этой истории. Малыш уже любит тебя — даже не видя. Это не пройдёт мимо.',
        ],
      },
      love: {
        title: 'Нужна поддержка ❤️',
        ls: [
          'Ты не обязана быть сильной каждый день. Достаточно того, что ты здесь, заботишься и идёшь дальше. Это уже любовь в действии.',
          'Напоминаю: ты прекрасна, нужна и важна. Беременность — не экзамен на идеальность. Это путь, который ты проходишь достойно.',
          'Обними себя — буквально, скрестив руки. Малыш рядом. Вы справитесь вместе.',
        ],
      },
      games: {
        title: 'Хочу отвлечься 🎮',
        ls: [
          'Отвлечься — тоже забота о себе! Короткая игра, подкаст, прогулка, любимая песня — всё считается. Главное — не залипать в тревожные новости.',
          'Предложение: 15 минут чего-то приятного только для тебя. Потом — стакан воды и отдых на боку. Малыш одобряет перерывы 😄',
          'Скоро будет много нового — а сейчас можно позволить себе лёгкость. Смейся, если получается. Смех тоже полезен.',
        ],
      },
    },

    coupons: [
      '30 минут массажа ног — прямо сейчас! 🦶',
      'Расслабляющий душ или ванна перед сном 🛁',
      'Любимый перекус без угрызений совести 🍓',
      'День без домашних дел — всё подождёт 🏠',
      'Завтрак в постель ☕',
      'Фильм или сериал на твой выбор 🎬',
      'Прогулка на свежем воздухе 🌸',
      'Час тишины и сна 🤫',
      'Любимая музыка без прерываний 🎵',
      'Один «каприз» без объяснений 😇',
      'Доставка вкусной еды 🛵',
      'Вечер только для отдыха — никаких задач 🛋️',
    ],

    DEFAULT_MEDS: [
      {
        id: 'prenatal_am',
        time: '08:30',
        name: 'Витамины для беременных',
        dose: '1 таб.',
        icon: '☀️',
        det: '<b>Зачем:</b> Комплекс витаминов для беременных — фолаты, железо, йод, витамин D.<br><br><b>Как:</b> Во время или сразу после завтрака — так меньше тошноты.',
      },
      {
        id: 'iron_pm',
        time: '16:30',
        name: 'Железо',
        dose: '1 таб.',
        icon: '💎',
        det: '<b>Зачем:</b> Профилактика анемии, энергия, снабжение малыша кислородом.<br><br>🍋 Запивай соком с витамином C. Не совмещай с чаем, кофе и молоком 2 часа.',
      },
      {
        id: 'omega_eve',
        time: '21:00',
        name: 'Омега-3',
        dose: '1 капс.',
        icon: '🌙',
        det: '<b>Зачем:</b> Поддержка развития мозга и зрения плода (по назначению врача).<br><br><b>Как:</b> С ужином, если так рекомендовал акушер.',
      },
    ],

    moodR: {
      '😊': ['Здорово видеть твоё хорошее настроение! Счастье мамы — подарок малышу. 🌟', 'Улыбка — лучший витамин. Продолжай в том же духе!', 'Отличный день начинается с хорошего настроения. ✨'],
      '🥰': ['Какая нежность! Передай малышу эту любовь — он чувствует. 💕', 'Ты сияешь. Так и должно быть.', 'Любовь к себе — лучшая подготовка к материнству. 🥰'],
      '🥱': ['Отдых — часть плана. Приляг, если можешь. ☕', 'Усталость нормальна. Сегодня можно меньше дел.', 'Тело просит паузу — послушай его.'],
      '🤢': ['Попробуй сухарик и воду с лимоном. Дыши медленно. 🌬️', 'Тошнота часто проходит к II триместру. Ты справляешься.', 'Лёгкий перекус и свежий воздух — первые помощники.'],
      '✨': ['Ты сияешь! Беременность делает тебя особенной. 👑', 'Королева дня — это ты.', 'Пусть это сияние останется с тобой. 🌟'],
    },

    careTips: [
      { h: [5, 12], icon: '☀️', tip: 'Утро: Витамины с завтраком, стакан воды, не вставай резко. Малышу нужна твоя спокойная энергия. 🥰' },
      { h: [5, 12], icon: '🍋', tip: 'Если тошнит — крекер до подъёма и вода с лимоном рядом. Это помогает многим. 💛' },
      { h: [5, 12], icon: '🌡️', tip: 'Утром легче почувствовать шевеления. Пять минут на боку — и прислушайся к животику. 🤲' },
      { h: [12, 18], icon: '💧', tip: 'К полудню — минимум половины дневной нормы воды. Обезвоживание усиливает усталость. 💧' },
      { h: [12, 18], icon: '🦶', tip: '15–20 минут прогулки улучшают кровоток и настроение. Движение — забота о двоих. 🚶‍♀️' },
      { h: [12, 18], icon: '🛋️', tip: 'После обеда — 20 минут на левом боку. Лучшая поза для кровоснабжения плаценты. 🥰' },
      { h: [18, 23], icon: '🧘', tip: 'Вечер: дыхание 4–4–8, три цикла. Малыш успокоится вместе с тобой. 🫧' },
      { h: [18, 23], icon: '🦵', tip: 'Подними ноги на подушку — помогает при отёках. 💆' },
      { h: [18, 23], icon: '🍵', tip: 'Лёгкий ужин, без острой еды перед сном. Травяной чай — отличный финал дня. 🌿' },
      { h: [23, 5], icon: '💤', tip: 'Сон на левом боку, подушка между коленями — комфорт для спины и малыша. 🛏️' },
      { h: [23, 5], icon: '🌙', tip: 'Ночная активность малыша — норма. Погладь животик и дыши спокойно. 🤲' },
    ],
  },

  en: {
    petNames: [
      'dear one', 'sunshine', 'beloved', 'beautiful', 'gentle soul', 'sweet one',
      'little star', 'joy', 'queen', 'little one', 'treasure', 'darling',
    ],

    heroG: {
      morning: [
        (n) => `Good morning, ${n}! ☀️ A new day — a new small victory`,
        (n) => `Morning, ${n}! Take your time — your baby needs your calm energy`,
        (n) => `${n}, wake up gently. Breakfast, water, and vitamins — and you're already doing great ✨`,
        (n) => `Morning, ${n}! Today will be a good day — I believe in you 🤍`,
        (n) => `Good morning, ${n}! Place a hand on your belly — say hello to your baby 💕`,
      ],
      afternoon: [
        (n) => `Good afternoon, ${n}! How are you? Don't forget to drink water 💧`,
        (n) => `${n}, take a break and eat — your baby needs your energy 🍊`,
        (n) => `Hi, ${n}! If you're tired, rest. That's not laziness — it's self-care 🛋️`,
        (n) => `Good afternoon, ${n}! You're doing better than you think ❤️`,
        (n) => `${n}, how is baby? If you feel kicks — that's a good sign 🦶`,
      ],
      evening: [
        (n) => `Good evening, ${n}! Time to unwind — you've earned rest 🌙`,
        (n) => `Evening, ${n}! A warm shower, tea, and no heavy chores ✨`,
        (n) => `${n}, you did wonderfully today. I know it, even if you doubt it 🌟`,
        (n) => `Good evening, ${n}! Rub your belly — baby feels it 🥰`,
        (n) => `Evening, ${n}! A light dinner and time to get ready for sleep 💤`,
      ],
      night: [
        (n) => `Nighttime, ${n}. Time to rest — baby grows while you sleep 🌙`,
        (n) => `${n}, get some sleep. Skip the scary internet scroll — you're okay 💤`,
        (n) => `Good night, ${n}! You're safe. Breathe calmly 🤍`,
        (n) => `${n}, sleep well. Tomorrow will be a new, lighter day ✨`,
      ],
    },

    timeMsgs: {
      morning: {
        icon: '🌅', badge: 'Morning ☀️', bgKey: '--tmm',
        msgs: [
          "Good morning! Start with water and a calm breakfast. Your baby needs your care — and you need rest and nourishment. You're already doing something incredible. 🌸",
          'Morning is the best time to go slow. Stretch, drink water, take your prenatal vitamins with food. Small steps are enough today. ☀️',
          "A new day is a new chance to care for yourself. You don't have to be perfect. Being present with your baby and listening to your body is enough. 💕",
          "If mornings bring nausea, keep a cracker by the bed and eat before getting up. It's common in the first trimester, and it usually eases. 🤍",
        ],
      },
      afternoon: {
        icon: '☀️', badge: 'Afternoon 🌤️', bgKey: '--tmd',
        msgs: [
          "The day is in full swing — don't forget water. Dehydration can worsen fatigue and uterine tone. A few sips right now is already a win. 💧",
          'Take a pause: a snack, a few minutes on your left side, a deep breath. Your body is working for two — rest is part of the plan. 🥗',
          'If anxiety rises, place a hand on your belly and breathe: 4 seconds in, 4 hold, 6–8 out. Three times. Your baby senses your calm. 🫧',
          "You're doing enough. Even on an ordinary day, something miraculous is happening inside. Be proud of yourself. ❤️",
        ],
      },
      evening: {
        icon: '🌙', badge: 'Evening 🌆', bgKey: '--tme',
        msgs: [
          'Evening is time to slow down. A light dinner, a warm shower, favorite music or a show. No "must finish everything." 🌙',
          "Check your evening medication schedule — mark what you've taken. A small routine brings real peace of mind. 💊",
          'If your legs feel swollen, elevate them on a pillow for 15 minutes. A simple way to help yourself without extra effort. 💆',
          "You've done enough for today. Thank yourself — out loud if you like. You deserve tenderness. 🤍",
        ],
      },
      night: {
        icon: '💤', badge: 'Night 🌛', bgKey: '--tmn',
        msgs: [
          "Night is for sleep. Babies are often active in the evening, and that's normal. Sleep on your left side, pillow between knees — your body knows the drill. 💤",
          "Don't google symptoms at night — everything feels different by morning. If something truly worries you, jot a question for your provider. 📝",
          'Good night. Tomorrow is a new day, and today you were already brave. Sleep peacefully. 🌙',
        ],
      },
    },

    babyMsgs: [
      "Mommy, I'm so cozy in your belly! It's warm and safe here. 🥰",
      "I hear your voice — it's the best lullaby in the world. 👶",
      "Today I practiced moving. Hope I didn't startle you too much! 🤸",
      'Your heartbeat is so steady — it makes me feel good. 💓',
      "Mommy, you're the most beautiful. I can feel it from inside. ✨",
      "I'm waiting for our meeting just as much as you are. 🍼",
      "Thank you for caring for me every day. I'm growing! 💪",
      'When you rub your belly, I feel so warm. 🤲',
      "Mom, don't worry. You and I are doing great right here. 🛡️",
      'I hear you singing. Sing more — I love it. 🎶',
      "Mommy, rest more. It's good for me too! 🛋️",
      "Mom, I love you. You're my whole world. ❤️",
      'Every breath you take gives me oxygen. Thank you, mommy! 🌬️',
      'Mommy, smile! Your smile is my light. ☀️',
      "You're doing amazing. I'm proud of my mom. 🏆",
      "We'll meet soon! I already want to see your eyes. 💕",
      "You're not alone — I'm always with you. 🤍",
    ],

    quotes: [
      "You're doing something incredible right now. I'm proud of you. ✨",
      'Your smile brightens the day. Smile at yourself in the mirror! 😊',
      "Remember: you don't have to be perfect — being yourself is enough. 🤍",
      'Rest more. Your main job is to protect yourself and your baby.',
      "Breathe deeply. You're safe. Things are unfolding as they should. 🛡️",
      'Your baby hears your voice and settles — you are their first world.',
      "You are the center of your universe, and that's beautiful.",
      'Pregnancy changes your body — and every change speaks of love.',
      "Allow yourself to feel fragile. That's not failure — it's honesty.",
      "You're doing better than you think. Every day proves it.",
      "You'll meet soon — hang in there, the finish line is closer than it feels.",
      'Your body knows what to do. Trust it and your care team.',
      'One glass of water right now — a small gift to yourself. 💧',
      "You're growing a person. That's not a metaphor — that's you, today.",
      'Even a hard day is a day your baby grows stronger.',
      'Ask for help if you need it. Self-care is not selfish.',
      "You are beautiful. Pregnancy doesn't take beauty away — it adds meaning.",
      'Love for your baby starts with love for yourself. Begin with a cup of tea. ☕',
      "You're not alone on this path — providers, loved ones, and this app are with you 🤍",
      'Every logged dose, every glass of water — care that truly works.',
    ],

    letters: {
      anxiety: {
        title: 'I feel anxious 🥺',
        ls: [
          "Take a deep breath. Place a hand on your belly — a little heart beats there. Pregnancy anxiety often comes from fatigue and hormones, not real danger. Avoid scary forums. If a symptom feels severe, call your provider. For now — breathe 4-7-8, three times. You're not alone. 🤍",
          "Anxiety is sometimes love that doesn't know where to go. You're already caring for your baby. Do one simple thing: water, fresh air, five minutes of quiet. That's enough for now.",
          'Try naming three things you see, two you hear, and one you feel in your body. It helps you return to the present. Your baby is with you — and that matters most.',
        ],
      },
      tired: {
        title: "I'm exhausted 😫",
        ls: [
          "Fatigue is a normal part of pregnancy. Your body is building a human 24/7. Drop extra tasks, lie on your side, wrap up warm. Rest isn't laziness — it's medicine.",
          "Today you can \"get nothing done\" — and that's okay. A light snack, water, twenty minutes with eyes closed. Tomorrow may feel lighter.",
          "You're doing enormous work. Let yourself be tired without guilt. Your baby needs a rested parent — not a perfect one.",
        ],
      },
      sad: {
        title: 'I feel sad 😢',
        ls: [
          "If you want to cry — cry. Feelings don't need fixing. Hormones, fatigue, change — all of it is real. You have every right to sadness.",
          'Talk to someone you trust or write in your journal. Sometimes sadness just wants to be noticed — and then it loosens.',
          'You are the most precious part of this story. Your baby already loves you — even unseen. That love is real.',
        ],
      },
      love: {
        title: 'I need support ❤️',
        ls: [
          "You don't have to be strong every day. Showing up, caring, and keeping going — that's already love in action.",
          "Reminder: you are beautiful, needed, and important. Pregnancy isn't a test of perfection. You're walking this path with courage.",
          "Give yourself a hug — literally, arms crossed. Your baby is right there. You'll get through this together.",
        ],
      },
      games: {
        title: 'I need a distraction 🎮',
        ls: [
          'Distraction is self-care too! A short game, podcast, walk, favorite song — it all counts. Just skip anxious news scrolling.',
          'Try this: 15 minutes of something pleasant just for you. Then — water and rest on your side. Baby approves of breaks 😄',
          'Soon there will be so much new — for now, allow yourself lightness. Laugh if you can. Laughter helps too.',
        ],
      },
    },

    coupons: [
      '30 minutes of foot massage — right now! 🦶',
      'A relaxing shower or bath before bed 🛁',
      'Your favorite snack — no guilt 🍓',
      'A day off chores — everything can wait 🏠',
      'Breakfast in bed ☕',
      'A movie or show of your choice 🎬',
      'A walk in fresh air 🌸',
      'An hour of quiet and sleep 🤫',
      'Your favorite music, uninterrupted 🎵',
      'One indulgence — no explanation needed 😇',
      'Delivery of your favorite food 🛵',
      'An evening for rest only — no tasks 🛋️',
    ],

    DEFAULT_MEDS: [
      {
        id: 'prenatal_am',
        time: '08:30',
        name: 'Prenatal Vitamins',
        dose: '1 tab.',
        icon: '☀️',
        det: '<b>Why:</b> Prenatal vitamin complex — folic acid, iron, iodine, vitamin D.<br><br><b>How:</b> With or right after breakfast — often easier on nausea.',
      },
      {
        id: 'iron_pm',
        time: '16:30',
        name: 'Iron Supplementation',
        dose: '1 tab.',
        icon: '💎',
        det: '<b>Why:</b> Helps prevent anemia, supports energy, and oxygen delivery to your baby.<br><br>🍋 Take with vitamin C juice. Avoid tea, coffee, and milk for 2 hours.',
      },
      {
        id: 'omega_eve',
        time: '21:00',
        name: 'Omega-3 DHA',
        dose: '1 cap.',
        icon: '🌙',
        det: '<b>Why:</b> Supports fetal brain and vision development (as prescribed by your provider).<br><br><b>How:</b> With dinner, if your obstetrician recommended it.',
      },
    ],

    moodR: {
      '😊': ['So good to see your bright mood! A happy parent is a gift to your baby. 🌟', 'A smile is the best vitamin. Keep it up!', 'A great day starts with a good mood. ✨'],
      '🥰': ['What tenderness! Share that love with your baby — they feel it. 💕', "You're glowing. Exactly as you should be.", 'Self-love is the best preparation for parenthood. 🥰'],
      '🥱': ['Rest is part of the plan. Lie down if you can. ☕', 'Fatigue is normal. You can do less today.', 'Your body is asking for a pause — listen to it.'],
      '🤢': ['Try a plain cracker and lemon water. Breathe slowly. 🌬️', "Nausea often eases by the second trimester. You're managing.", 'A light snack and fresh air are your first helpers.'],
      '✨': ["You're glowing! Pregnancy makes you extraordinary. 👑", "Queen of the day — that's you.", 'May that glow stay with you. 🌟'],
    },

    careTips: [
      { h: [5, 12], icon: '☀️', tip: 'Morning: Prenatal vitamins with breakfast, a glass of water, rise slowly. Your baby needs your calm energy. 🥰' },
      { h: [5, 12], icon: '🍋', tip: 'If nauseous — a cracker before getting up and lemon water nearby. It helps many people. 💛' },
      { h: [5, 12], icon: '🌡️', tip: 'Movements are often easier to feel in the morning. Five minutes on your side — listen to your belly. 🤲' },
      { h: [12, 18], icon: '💧', tip: 'By midday — at least half your daily water goal. Dehydration worsens fatigue. 💧' },
      { h: [12, 18], icon: '🦶', tip: 'A 15–20 minute walk improves circulation and mood. Movement cares for both of you. 🚶‍♀️' },
      { h: [12, 18], icon: '🛋️', tip: 'After lunch — 20 minutes on your left side. Best position for placental blood flow. 🥰' },
      { h: [18, 23], icon: '🧘', tip: 'Evening: breathe 4–4–8, three cycles. Your baby will settle with you. 🫧' },
      { h: [18, 23], icon: '🦵', tip: 'Elevate your legs on a pillow — helps with swelling. 💆' },
      { h: [18, 23], icon: '🍵', tip: 'Light dinner, skip spicy food before bed. Herbal tea is a lovely end to the day. 🌿' },
      { h: [23, 5], icon: '💤', tip: 'Sleep on your left side, pillow between knees — comfort for your back and baby. 🛏️' },
      { h: [23, 5], icon: '🌙', tip: 'Nighttime baby activity is normal. Rub your belly and breathe calmly. 🤲' },
    ],
  },
};
