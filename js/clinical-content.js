/**
 * @file clinical-content.js
 * @description English clinical/dynamic content and locale helpers for pregnancy PWA.
 */
'use strict';

const faqsEn = {
  t1: [
    {
      q: 'Is it normal to feel sleepy all the time?',
      a: 'Yes. Your body is using a lot of energy to build the placenta and support early fetal development. Fatigue is very common in the first trimester. Rest when you can, prioritize sleep, and eat small balanced meals to keep energy steadier.',
    },
    {
      q: 'What helps with morning sickness?',
      a: 'Try a plain cracker or dry toast before getting out of bed. Eat small portions every 2–3 hours, stay hydrated, and avoid strong odors when possible. Ginger tea or ginger candies may help. Nausea often peaks around weeks 9–10 and usually improves by weeks 12–14.',
    },
    {
      q: 'Mild lower abdominal cramping — should I worry?',
      a: 'Light stretching or pulling sensations without severe pain can be normal as the uterus grows and ligaments stretch. Seek urgent care if pain is severe, rhythmic like contractions, or if you have heavy bleeding, dizziness, or shoulder pain.',
    },
    {
      q: 'Can I take a hot bath?',
      a: 'Avoid hot tubs, saunas, and baths above about 100°F (38°C), which can raise core body temperature. A warm, comfortable shower or lukewarm bath is generally fine and can help you relax.',
    },
    {
      q: 'When is the first ultrasound usually done?',
      a: 'The first-trimester screening ultrasound is typically performed at 11–13 weeks. It confirms dating, checks fetal heartbeat, and assesses early anatomy and screening markers. Schedule prenatal care early so timing can be planned with your provider.',
    },
    {
      q: 'Why is my breast tenderness so strong?',
      a: 'Hormonal changes prepare the breasts for lactation, so soreness, fullness, and nipple sensitivity are common. Symptoms often ease after the first trimester. Wear a supportive bra without underwire if it feels more comfortable.',
    },
    {
      q: 'Is sex safe during pregnancy?',
      a: 'In an uncomplicated pregnancy, sexual activity is usually safe unless your provider advises otherwise. Avoid intercourse if you have vaginal bleeding, preterm labor signs, ruptured membranes, placenta previa, or other specific restrictions given by your clinician.',
    },
    {
      q: 'Do I need to change my diet?',
      a: 'Avoid alcohol, raw or undercooked eggs, high-mercury fish, unpasteurized dairy, and deli meats unless reheated until steaming. Focus on folate-rich foods, iron, calcium, protein, fruits, and vegetables. Aim for about 8–12 cups of fluids daily and eat frequently rather than skipping meals.',
    },
  ],
  t2: [
    {
      q: 'My belly sometimes feels hard — what is that?',
      a: 'Irregular tightening is often Braxton Hicks — practice contractions that help the uterus prepare for labor. They are usually painless, infrequent, and stop with rest or hydration. Contact your provider if tightenings become regular, painful, or do not stop.',
    },
    {
      q: 'Can I sleep on my back?',
      a: 'After about 20 weeks, side sleeping — especially on the left side — is recommended because the uterus can compress the inferior vena cava when lying flat on your back. This may reduce blood flow and cause dizziness. A pillow between the knees often improves comfort.',
    },
    {
      q: 'The baby is moving less today — is that okay?',
      a: 'Fetal activity varies with sleep cycles. Try a snack or cold drink and lie on your side for 30–60 minutes to observe movement. Use the Cardiff method: 10 distinct movements within 2 hours while awake. Fewer than 10 movements in 2 hours warrants prompt medical evaluation.',
    },
    {
      q: 'Why is my lower back pain so bad?',
      a: 'Shifting center of gravity, postural changes, and relaxin-related ligament loosening increase back strain. Gentle prenatal stretching, good posture, supportive footwear, and a maternity support belt from around 20 weeks may help. Seek care for severe pain, numbness, or fever.',
    },
    {
      q: 'Should I wear a maternity support belt?',
      a: 'From about 20–22 weeks, a properly fitted support belt can reduce pelvic and lower-back pressure. Wear it while upright for limited periods (often 3–4 hours), apply while lying down, and remove at night unless your provider advises otherwise.',
    },
    {
      q: 'When is the second-trimester anatomy scan?',
      a: 'The detailed anatomy ultrasound is usually done at 18–22 weeks. It evaluates fetal organs, placenta, amniotic fluid, and cervical length, and sex may be visible if desired. Book in advance because appointment slots fill quickly.',
    },
    {
      q: 'Is air travel safe in pregnancy?',
      a: 'Most airlines allow routine travel until about 28–36 weeks depending on carrier policy and whether it is a domestic or international flight. After 28 weeks, many airlines require a provider note. Long flights increase clot risk — stay hydrated, move legs often, and consider compression stockings. Confirm plans with your clinician before booking.',
    },
    {
      q: 'Why is my appetite so strong now?',
      a: 'Energy needs rise as the fetus grows rapidly and first-trimester nausea often fades. Choose nutrient-dense foods rather than empty calories. Typical weight gain in the second trimester is about 0.5–1 lb (0.25–0.5 kg) per week for many people with a normal starting BMI.',
    },
  ],
  t3: [
    {
      q: 'How do I know real labor has started?',
      a: 'True labor contractions become regular, longer, stronger, and closer together over time. They persist despite rest, hydration, or position changes. When contractions are about 5 minutes apart for an hour, or if your provider\'s plan says to come in sooner, go to your birth facility.',
    },
    {
      q: 'Is shortness of breath normal?',
      a: 'Yes. The growing uterus pushes upward on the diaphragm, so breathlessness is common in late pregnancy. It often improves after the baby "drops" around 36–38 weeks. Seek urgent care for chest pain, blue lips, severe wheezing, or sudden worsening breathlessness at rest.',
    },
    {
      q: 'I am very afraid of childbirth — what can help?',
      a: 'Fear of birth is common and valid. Childbirth education, breathing techniques, a written birth plan, and discussing pain-management options with your provider can reduce anxiety. Consider a doula or trusted support person. Mental health support is appropriate if fear feels overwhelming.',
    },
    {
      q: 'The baby keeps kicking my ribs — what can I do?',
      a: 'Space is tight in the third trimester. Change position — stand, walk, or lie on the opposite side. Gentle pressure on the area and talking may encourage the baby to shift. Persistent severe pain under the ribs, especially with headache or vision changes, needs medical assessment.',
    },
    {
      q: 'What is the mucus plug and when does it come out?',
      a: 'The mucus plug seals the cervical canal during pregnancy. Before labor it may pass as thick, jelly-like discharge, sometimes streaked with blood ("bloody show"). This can happen hours or days before labor, or during early labor. Heavy bleeding is not normal — contact your provider.',
    },
    {
      q: 'How do I know if my water broke?',
      a: 'Amniotic fluid may gush or trickle continuously. It is usually clear or pale straw-colored and may smell sweet or neutral — unlike urine. If you suspect rupture of membranes, contact your birth facility promptly; most protocols recommend evaluation even without contractions.',
    },
    {
      q: 'What should I pack for the hospital first?',
      a: 'Priority items: photo ID, insurance card, prenatal records, birth plan, phone charger, slippers, labor gown or nightshirt, lip balm, water bottle with a sports cap, and postpartum pads. Partner documents if required by your hospital. Keep the bag ready from 36 weeks.',
    },
    {
      q: 'Will childbirth be painful?',
      a: 'Labor is typically intense and painful for most people, though experiences vary widely. The body releases endorphins and oxytocin that help you cope. Options include hydrotherapy, nitrous oxide, epidural analgesia, and other regional or systemic pain relief. Discuss preferences and availability with your birth team in advance.',
    },
  ],
};

function getSmartTipsEn(w) {
  const tips = [];

  if (w >= 4 && w <= 6) {
    tips.push({
      c: 'st-r',
      i: '🩸',
      t: '<b>Implantation spotting:</b> Light pink or brown spotting can occur when the embryo implants. Heavy bleeding with pain needs urgent evaluation.',
    });
  }
  if (w >= 5 && w <= 12) {
    tips.push({
      c: 'st-g',
      i: '🌿',
      t: '<b>Folic acid is critical now:</b> Adequate folate supports neural tube closure. Take prenatal vitamins as prescribed by your provider.',
    });
  }
  if (w >= 6 && w <= 13) {
    tips.push({
      c: 'st-b',
      i: '🤢',
      t: '<b>Morning sickness:</b> Crackers before rising, small meals every 2–3 hours, and ginger tea may help. Peak is often weeks 9–10; improvement usually by weeks 12–14.',
    });
  }
  if (w >= 9 && w <= 10) {
    tips.push({
      c: 'st-p',
      i: '🧬',
      t: '<b>NIPT:</b> Non-invasive prenatal testing is available from about 9–10 weeks with >99% sensitivity for common chromosomal conditions. Discuss timing and coverage with your clinician.',
    });
  }
  if (w >= 11 && w <= 13) {
    tips.push({
      c: 'st-p',
      i: '🔬',
      t: '<b>First-trimester screening (11–13 weeks):</b> Key ultrasound measuring NT, fetal heart rate, and nasal bone. Book early — slots fill quickly.',
    });
  }
  if (w >= 14 && w <= 16) {
    tips.push({
      c: 'st-g',
      i: '✨',
      t: '<b>Second trimester begins:</b> Nausea often eases and energy may return. This is a good time for gentle exercise and prenatal classes.',
    });
  }
  if (w >= 16 && w <= 19) {
    tips.push({
      c: 'st-g',
      i: '🦋',
      t: '<b>First movements soon:</b> First-time parents often feel quickening at 18–22 weeks — like bubbles or light fluttering low in the abdomen.',
    });
  }
  if (w >= 18 && w <= 22) {
    tips.push({
      c: 'st-b',
      i: '🔭',
      t: '<b>Anatomy scan (18–22 weeks):</b> Detailed review of fetal organs, placenta, and fluid. Fetal sex may be visible if you wish to know.',
    });
  }
  if (w >= 20) {
    tips.push({
      c: 'st-g',
      i: '💤',
      t: '<b>Sleep position:</b> Left side-lying improves uteroplacental blood flow. Place a pillow between your knees for support.',
    });
  }
  if (w >= 20 && w <= 35) {
    tips.push({
      c: 'st-p',
      i: '🦶',
      t: '<b>Kick counts:</b> Cardiff method — 10 distinct movements within 2 hours while awake is reassuring. Use the kick counter on the home screen.',
    });
  }
  if (w >= 24 && w <= 28) {
    tips.push({
      c: 'st-o',
      i: '🧪',
      t: '<b>OGTT for gestational diabetes:</b> Screening at 24–28 weeks. Fasting glucose ≥92 mg/dL (5.1 mmol/L) on the 1-hour test may indicate GDM — follow your lab\'s protocol.',
    });
  }
  if (w >= 26 && w <= 28) {
    tips.push({
      c: 'st-b',
      i: '💉',
      t: '<b>Tdap vaccine:</b> Recommended at 27–36 weeks so protective antibodies transfer to the baby and reduce newborn pertussis risk.',
    });
  }
  if (w >= 28 && w <= 35) {
    tips.push({
      c: 'st-o',
      i: '⚠️',
      t: '<b>Third trimester monitoring:</b> Count fetal movements daily with the Cardiff method. Fewer than 10 movements in 2 hours while awake requires prompt evaluation.',
    });
  }
  if (w >= 28) {
    tips.push({
      c: 'st-b',
      i: '🩺',
      t: '<b>CTG / NST from 28 weeks:</b> Normal fetal heart rate 110–160 bpm with moderate variability and accelerations. Your unit will interpret tracing per local guidelines.',
    });
  }
  if (w >= 30) {
    tips.push({
      c: 'st-b',
      i: '🏋️',
      t: '<b>Kegel exercises:</b> 3 sets of 10 daily strengthen the pelvic floor, which may support the second stage of labor and reduce perineal trauma.',
    });
  }
  if (w >= 32) {
    tips.push({
      c: 'st-p',
      i: '🎒',
      t: '<b>Hospital bag time:</b> Open the Bag tab for a full checklist. Keep documents in an easy-to-reach pocket.',
    });
  }
  if (w >= 34) {
    tips.push({
      c: 'st-b',
      i: '💆',
      t: '<b>Perineal massage:</b> From 34–35 weeks, 5–10 minutes daily with oil may reduce third- and fourth-degree tears. Ask your provider if it is appropriate for you.',
    });
  }
  if (w >= 35 && w <= 37) {
    tips.push({
      c: 'st-p',
      i: '🦠',
      t: '<b>GBS screening:</b> Vaginal-rectal culture at 35–37 weeks. GBS-positive status usually means IV penicillin in labor to reduce neonatal sepsis risk.',
    });
  }
  if (w >= 35) {
    tips.push({
      c: 'st-r',
      i: '🚨',
      t: '<b>Labor warning signs:</b> Regular painful contractions, ruptured membranes, or decreased fetal movement — go to your birth facility or call emergency services per your plan.',
    });
  }
  if (w >= 36) {
    tips.push({
      c: 'st-g',
      i: '🌟',
      t: '<b>Term at 37 weeks:</b> Labor can start anytime now. Keep your phone charged and your hospital bag accessible — many keep it in the car from 36 weeks.',
    });
  }

  return tips;
}

const genderMsgsEn = {
  g: {
    reveal: 'It\'s a girl! 🎀 A little princess is on the way — congratulations! 💗',
    banner: {
      bg: 'linear-gradient(135deg,#D63077,#F06BA0,#C966D0)',
      emoji: '🎀',
      text: 'It\'s a girl!',
      sub: 'A little princess is already waiting to meet you 💗',
    },
    heroNote: 'our princess 🎀',
    kickLabel: 'princess kicks',
    streakLabel: 'days of care for baby girl',
  },
  b: {
    reveal: 'It\'s a boy! 🩵 A little champion is on the way — congratulations! 💙',
    banner: {
      bg: 'linear-gradient(135deg,#1878C8,#4CA8F0,#1452A0)',
      emoji: '🩵',
      text: 'It\'s a boy!',
      sub: 'A little champion is growing strong 💙',
    },
    heroNote: 'our little one 🩵',
    kickLabel: 'baby kicks',
    streakLabel: 'days of care for baby boy',
  },
  n: {
    reveal: null,
    banner: null,
    heroNote: 'our baby 🤍',
    kickLabel: 'baby kicks',
    streakLabel: 'days of care',
  },
};

const genderFactsEn = {
  g: {
    16: 'In female fetuses, the ovaries already contain about 7 million oocytes. Only ~2 million remain at birth and ~400,000 at puberty — the foundation of future reproductive cells.',
    19: 'By 19 weeks, the uterus and fallopian tubes are fully formed in female fetuses. Ovaries hold roughly 7 million oocytes at this stage.',
    26: 'Female fetuses continue ovarian development; sex-specific hormone patterns differ from male fetuses but both follow steady growth curves on ultrasound.',
    28: 'Female infants are born about 2–3 days earlier on average than males. Estrogen may contribute to slightly earlier fetal lung maturation in some studies.',
    32: 'The corpus callosum — the bridge between brain hemispheres — shows sex-related developmental patterns. Research notes subtle differences in social responsiveness from birth.',
    36: 'Female newborns average about 100–200 g lighter than males but often have favorable outcomes in prematurity statistics — a well-documented epidemiologic pattern.',
  },
  b: {
    16: 'In male fetuses, the scrotum is formed and testes remain in the abdomen. Fetal testosterone has been active since about week 8, driving male differentiation.',
    19: 'The prostate is fully formed — about the size of a pea. Testes are still intra-abdominal and typically descend through the inguinal canal around 26–28 weeks.',
    26: 'Testicular descent begins from the abdomen into the scrotum via the inguinal canal. The process continues over several weeks and usually completes by 32–35 weeks.',
    28: 'Male fetuses tend to weigh about 150–200 g more at birth and may reach lung maturity 1–2 days later than females on average.',
    32: 'Testosterone continues shaping the male phenotype. In preterm birth, male infants statistically face slightly higher respiratory morbidity than females at the same gestational age.',
    36: 'Undescended testes at birth (cryptorchidism) are monitored if descent is incomplete. Most cases resolve spontaneously in the first months of life.',
  },
};

function buildDefaultBag() {
  return [
    { isC: true, t: AppI18n.t('bag.cat.documents') },
    { id: 'd1', t: AppI18n.t('bag.item.d1'), done: false },
    { id: 'd2', t: AppI18n.t('bag.item.d2'), done: false },
    { id: 'd3', t: AppI18n.t('bag.item.d3'), done: false },
    { id: 'd4', t: AppI18n.t('bag.item.d4'), done: false },
    { id: 'd5', t: AppI18n.t('bag.item.d5'), done: false },
    { isC: true, t: AppI18n.t('bag.cat.momLabor') },
    { id: 'm1', t: AppI18n.t('bag.item.m1'), done: false },
    { id: 'm2', t: AppI18n.t('bag.item.m2'), done: false },
    { id: 'm3', t: AppI18n.t('bag.item.m3'), done: false },
    { id: 'm4', t: AppI18n.t('bag.item.m4'), done: false },
    { id: 'm5', t: AppI18n.t('bag.item.m5'), done: false },
    { id: 'm6', t: AppI18n.t('bag.item.m6'), done: false },
    { isC: true, t: AppI18n.t('bag.cat.momPost') },
    { id: 'p1', t: AppI18n.t('bag.item.p1'), done: false },
    { id: 'p2', t: AppI18n.t('bag.item.p2'), done: false },
    { id: 'p3', t: AppI18n.t('bag.item.p3'), done: false },
    { id: 'p4', t: AppI18n.t('bag.item.p4'), done: false },
    { id: 'p5', t: AppI18n.t('bag.item.p5'), done: false },
    { isC: true, t: AppI18n.t('bag.cat.baby') },
    { id: 'b1', t: AppI18n.t('bag.item.b1'), done: false },
    { id: 'b2', t: AppI18n.t('bag.item.b2'), done: false },
    { id: 'b3', t: AppI18n.t('bag.item.b3'), done: false },
    { id: 'b4', t: AppI18n.t('bag.item.b4'), done: false },
    { isC: true, t: AppI18n.t('bag.cat.discharge') },
    { id: 'o1', t: AppI18n.t('bag.item.o1'), done: false },
    { id: 'o2', t: AppI18n.t('bag.item.o2'), done: false },
    { id: 'o3', t: AppI18n.t('bag.item.o3'), done: false },
    { isC: true, t: AppI18n.t('bag.cat.org') },
    { id: 'r1', t: AppI18n.t('bag.item.r1'), done: false },
    { id: 'r2', t: AppI18n.t('bag.item.r2'), done: false },
    { id: 'r3', t: AppI18n.t('bag.item.r3'), done: false },
    { id: 'r4', t: AppI18n.t('bag.item.r4'), done: false },
  ];
}

function getLocalizedFaqs() {
  return AppI18n.getLocale() === 'en' ? faqsEn : null;
}

function getLocalizedSmartTips(w) {
  if (AppI18n.getLocale() === 'en') return getSmartTipsEn(w);
  if (typeof getSmartTipsRu === 'function') return getSmartTipsRu(w);
  return [];
}

function getLocalizedGenderMsgs() {
  return AppI18n.getLocale() === 'en' ? genderMsgsEn : null;
}

function getLocalizedGenderFacts() {
  return AppI18n.getLocale() === 'en' ? genderFactsEn : null;
}

/** English trimester body-change cards (week-specific RU cards in body-changes-ru.js). */
const bodyChangesEn = {
  t1: [
    { type: 'bc-warn', icon: '🤢', title: 'Morning sickness', text: 'Nausea is driven by rising hCG and estrogen, often peaking around weeks 9–10 and easing by 12–14. A plain cracker before getting up may help.' },
    { type: 'bc-info', icon: '😴', title: 'Fatigue', text: 'Progesterone lowers alertness while the placenta forms — a high-energy process. Rest when you need to; this is normal in early pregnancy.' },
    { type: 'bc-pink', icon: '🌡️', title: 'Basal temperature', text: 'Progesterone keeps basal temperature about 0.3–0.5°C higher throughout pregnancy. This is expected.' },
    { type: 'bc-good', icon: '👃', title: 'Heightened smell', text: 'Hyperosmia — a sharper sense of smell — may help you avoid harmful odors. It often improves after the first trimester.' },
    { type: 'bc-warn', icon: '🍶', title: 'Frequent urination', text: 'The growing uterus presses on the bladder and blood volume rises 40–50%. More bathroom trips are normal now.' },
    { type: 'bc-info', icon: '💆', title: 'Headaches', text: 'Vascular changes from estrogen can trigger headaches. Stay hydrated, avoid triggers, and acetaminophen is generally considered safe if your provider agrees.' },
  ],
  t2: [
    { type: 'bc-good', icon: '✨', title: 'Second-trimester glow', text: 'Nausea often fades, energy returns, and the bump is still manageable. Many people feel their best during these weeks.' },
    { type: 'bc-info', icon: '🫀', title: 'Circulation', text: 'Blood volume increases about 40–50%. The heart pumps 30–40% more blood. Mild palpitations can occur and should be discussed if persistent.' },
    { type: 'bc-warn', icon: '🦵', title: 'Varicose veins & swelling', text: 'Uterine pressure on pelvic veins can cause leg swelling. Compression stockings, leg elevation, and movement breaks help.' },
    { type: 'bc-pink', icon: '🎯', title: 'Stretch marks', text: 'Skin stretches faster than it can remodel. Moisturizing from mid-pregnancy may help comfort; genetics strongly influence stretch marks.' },
    { type: 'bc-good', icon: '💇', title: 'Thicker hair', text: 'Estrogen prolongs the growth phase — less shedding, faster nail growth. Enjoy it while it lasts!' },
    { type: 'bc-info', icon: '🦷', title: 'Gums', text: 'Hormones increase gum blood flow — tenderness and bleeding are common. Use a soft brush and keep dental checkups.' },
  ],
  t3: [
    { type: 'bc-warn', icon: '😮‍💨', title: 'Shortness of breath', text: 'The uterus rises toward the diaphragm. Breathing often eases after the baby drops (around 36–38 weeks). Side sleeping helps.' },
    { type: 'bc-info', icon: '🔥', title: 'Heartburn', text: 'Progesterone relaxes the lower esophageal sphincter. Smaller meals, staying upright after eating, and head elevation at night help.' },
    { type: 'bc-warn', icon: '💤', title: 'Insomnia', text: 'Discomfort, nighttime bathroom trips, and anticipation are common. A pillow between knees and limiting fluids before bed may help.' },
    { type: 'bc-pink', icon: '🤱', title: 'Breast changes', text: 'Colostrum may appear from 16–20 weeks. Breast fullness is normal — no special nipple prep is needed.' },
    { type: 'bc-good', icon: '💪', title: 'Braxton Hicks', text: 'Practice contractions from ~20 weeks are irregular and stop with rest. Contact your provider if they become regular or painful.' },
    { type: 'bc-info', icon: '🦴', title: 'Pelvic pain', text: 'Relaxin softens pelvic ligaments for birth. Symphysis pain (SPD) — use a support belt and avoid wide steps.' },
  ],
};

function getLocalizedBodyChanges() {
  return AppI18n.getLocale() === 'en' ? bodyChangesEn : null;
}

function getWeekData() {
  return AppI18n.getLocale() === 'en' ? wkDataEn : wkData;
}

/** English size-comparison labels for fetus visual (weeks 5–40). */
const fetusCompareEn = {
  5: { e1: '🌾', l1: 'sesame seed', e2: '💧', l2: 'a drop' },
  6: { e1: '🫘', l1: 'lentil', e2: '🐜', l2: 'an ant' },
  7: { e1: '🫐', l1: 'blueberry', e2: '💅', l2: 'a fingernail' },
  8: { e1: '🍒', l1: 'cherry', e2: '🍬', l2: 'a candy' },
  9: { e1: '🫒', l1: 'olive', e2: '🍇', l2: 'a grape' },
  10: { e1: '🍊', l1: 'kumquat', e2: '🌰', l2: 'a chestnut' },
  11: { e1: '🍓', l1: 'strawberry', e2: '🐞', l2: 'a ladybug' },
  12: { e1: '🍋', l1: 'lime', e2: '🌷', l2: 'a tulip' },
  13: { e1: '🍑', l1: 'peach', e2: '🐹', l2: 'a hamster' },
  14: { e1: '🍋', l1: 'lemon', e2: '✊', l2: 'a fist' },
  15: { e1: '🍏', l1: 'apple', e2: '🧸', l2: 'a small teddy' },
  16: { e1: '🥑', l1: 'avocado', e2: '🖐', l2: 'a palm' },
  17: { e1: '🍐', l1: 'pear', e2: '👟', l2: 'a baby shoe' },
  18: { e1: '🍠', l1: 'sweet potato', e2: '📏', l2: 'a 30 cm ruler' },
  19: { e1: '🥭', l1: 'mango', e2: '✋', l2: 'a hand' },
  20: { e1: '🍌', l1: 'banana', e2: '💼', l2: 'an adult hand' },
  21: { e1: '🥕', l1: 'carrot', e2: '🎾', l2: 'a tennis ball' },
  22: { e1: '🥥', l1: 'coconut', e2: '🍼', l2: 'a bottle' },
  23: { e1: '🍊', l1: 'grapefruit', e2: '🐰', l2: 'a rabbit' },
  24: { e1: '🌽', l1: 'corn', e2: '📖', l2: 'a book' },
  25: { e1: '🥦', l1: 'cauliflower', e2: '⚽', l2: 'a small ball' },
  26: { e1: '🥒', l1: 'zucchini', e2: '🐈', l2: 'a kitten' },
  27: { e1: '🥬', l1: 'head of lettuce', e2: '🧸', l2: 'a plush toy' },
  28: { e1: '🍆', l1: 'eggplant', e2: '📦', l2: 'a small box' },
  29: { e1: '🎃', l1: 'mini pumpkin', e2: '🎒', l2: 'a small backpack' },
  30: { e1: '🥬', l1: 'large cabbage', e2: '💻', l2: 'a laptop' },
  31: { e1: '🍍', l1: 'pineapple', e2: '🐶', l2: 'a puppy' },
  32: { e1: '🍈', l1: 'melon', e2: '👜', l2: 'a handbag' },
  33: { e1: '🍍', l1: 'large pineapple', e2: '🐇', l2: 'a rabbit' },
  34: { e1: '🎃', l1: 'small pumpkin', e2: '🐱', l2: 'a pet cat' },
  35: { e1: '🍈', l1: 'honeydew', e2: '🏈', l2: 'a football' },
  36: { e1: '🥬', l1: 'romaine', e2: '🎈', l2: 'a balloon' },
  37: { e1: '🍉', l1: 'small watermelon', e2: '🐕', l2: 'a small dog' },
  38: { e1: '🍉', l1: 'large watermelon', e2: '💪', l2: 'your strength' },
  39: { e1: '🎃', l1: 'pumpkin', e2: '❤️', l2: 'your love' },
  40: { e1: '🎉', l1: 'a miracle', e2: '👶', l2: 'your baby' },
};

function getFetusCompareData() {
  return AppI18n.getLocale() === 'en' ? fetusCompareEn : null;
}
