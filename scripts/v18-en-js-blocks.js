'use strict';

/** Whole-block RU→EN replacements for v18 inline JS (dashboard, plurals, reports). */
module.exports = [
  [
    `function pluralMeds(n){
  const m=n%10,l=n%100;
  if(l>=11&&l<=14)return 'приёмов';
  if(m===1)return 'приём';
  if(m>=2&&m<=4)return 'приёма';
  return 'приёмов';
}`,
    `function pluralMeds(n){return n===1?'dose':'doses';}`,
  ],
  [
    `function pluralDays(n){
  const m=n%10,l=n%100;
  if(l>=11&&l<=14)return 'дней';
  if(m===1)return 'день';
  if(m>=2&&m<=4)return 'дня';
  return 'дней';
}`,
    `function pluralDays(n){return n===1?'day':'days';}`,
  ],
  [
    `function pluralSessions(n){
  const m=n%10,l=n%100;
  if(l>=11&&l<=14)return 'сессий';
  if(m===1)return 'сессия';
  if(m>=2&&m<=4)return 'сессии';
  return 'сессий';
}`,
    `function pluralSessions(n){return n===1?'session':'sessions';}`,
  ],
  [
    `function pluralMeasurements(n){
  const m=n%10,l=n%100;
  if(l>=11&&l<=14)return 'замеров';
  if(m===1)return 'замер';
  if(m>=2&&m<=4)return 'замера';
  return 'замеров';
}`,
    `function pluralMeasurements(n){return n===1?'reading':'readings';}`,
  ],
  [
    `const streakSub=g==='b'?'забота о сыне':g==='g'?'забота о дочке':'серия заботы';
  return 'Сводка недели '+week+' 🤍\\n'+
    'Индекс заботы: '+score+' из 100\\n'+
    'Серия: '+streak+' '+pluralDays(parseInt(streak,10)||0)+' · '+streakSub+'\\n'+
    'Всего завершённых дней: '+total+'\\n'+
    'Настроение отмечено: '+moodCount+' из 7 дней · Сумка: '+bagStats.done+' из '+bagStats.total+'\\n'+
    '— Приложение «Для Индиры»';`,
    `const streakSub=g==='b'?'care streak (boy theme)':g==='g'?'care streak (girl theme)':'care streak';
  return 'Weekly summary · week '+week+' 🤍\\n'+
    'Care index: '+score+' of 100\\n'+
    'Streak: '+streak+' '+pluralDays(parseInt(streak,10)||0)+' · '+streakSub+'\\n'+
    'Total completed days: '+total+'\\n'+
    'Mood logged: '+moodCount+' of 7 days · Bag: '+bagStats.done+' of '+bagStats.total+'\\n'+
    '— Caring Diary app';`,
  ],
  [
    `navigator.share({title:'Моя неделя — Для Индиры',text})`,
    `navigator.share({title:'My week — Caring Diary',text})`,
  ],
  [
    `const sub=g==='b'?'забота о сыне':g==='g'?'забота о дочке':'серия заботы';
  return {val:'<b>'+n+'</b> '+d+' подряд',lbl:sub};`,
    `const sub=g==='b'?'care streak':g==='g'?'care streak':'care streak';
  return {val:'<b>'+n+'</b> '+d+' in a row',lbl:sub};`,
  ],
  [
    `let msg='Индекс '+score+' из 100 — ';
  if(score>=70)msg+='отличная неделя заботы! 💚';
  else if(score>=40)msg+='хорошо, но есть куда расти 💛';
  else msg+='начни с малого: вода, настроение, препараты 💗';
  msg+=' Считается по настроению, воде, лекарствам, давлению и серии за 7 дней.';`,
    `let msg='Index '+score+' of 100 — ';
  if(score>=70)msg+='excellent care week! 💚';
  else if(score>=40)msg+='good, with room to grow 💛';
  else msg+='start small: water, mood, medications 💗';
  msg+=' Based on mood, water, meds, blood pressure, and streak over 7 days.';`,
  ],
  [
    `hint.textContent='Начни с простого: отметь настроение, выпей воды или прими витамины — индекс вырастет сам ✨';`,
    `hint.textContent='Start simple: log mood, drink water, or take vitamins — your index will rise ✨';`,
  ],
  [
    `if(moodCount<4)tips.push('настроение');
  if(waterDays<4)tips.push('вода');
  if(bpCount<2)tips.push('давление');
  if(kickWeek<1)tips.push('шевеления');
  hint.textContent=tips.length?'Подтянуть индекс: '+tips.join(', ')+' — нажми на карточку ниже':'Каждый день понемногу — и индекс растёт 💪';`,
    `if(moodCount<4)tips.push('mood');
  if(waterDays<4)tips.push('water');
  if(bpCount<2)tips.push('blood pressure');
  if(kickWeek<1)tips.push('kicks');
  hint.textContent=tips.length?'Boost your index: '+tips.join(', ')+' — tap a card below':'A little each day — your index grows 💪';`,
  ],
  [
    `const WEEK_MILESTONES={12:{t:'Первый триместр позади! 🌸',s:'Малыш уже сформирован — ты прошла важнейший этап'},20:{t:'Половина пути! 🎀',s:'20 недель — середина беременности, гордись собой'},28:{t:'III триместр! 👑',s:'Финишная прямая началась — каждый день ближе к встрече'},36:{t:'Малыш скоро готов! 🍼',s:'36 недель — малыш считается доношенным'},40:{t:'Срок подошёл! 🤍',s:'Ты невероятная — скоро обнимешь малыша'}};`,
    `const WEEK_MILESTONES={12:{t:'First trimester complete! 🌸',s:'Baby is fully formed — you passed a major milestone'},20:{t:'Halfway there! 🎀',s:'20 weeks — mid-pregnancy, be proud of yourself'},28:{t:'Third trimester! 👑',s:'The home stretch — every day closer to meeting baby'},36:{t:'Baby is almost ready! 🍼',s:'36 weeks — baby is considered full-term'},40:{t:'Due date is here! 🤍',s:'You are amazing — soon you will hold your baby'}};`,
  ],
  [
    `document.getElementById('msLbl').textContent=m.days===0?'Сегодня!':m.days===1?'Завтра':'Ближайшее событие';`,
    `document.getElementById('msLbl').textContent=m.days===0?'Today!':m.days===1?'Tomorrow':'Upcoming event';`,
  ],
  [
    `if(m.days<0)cdEl.innerHTML='Недавно прошло · <b>запиши результат</b>';
  else if(m.days===0)cdEl.innerHTML='Сегодня · <b>не пропусти!</b>';
  else if(m.days===1)cdEl.innerHTML='Завтра · через <b>1</b> день';
  else cdEl.innerHTML='Через <b>'+m.days+'</b> '+pluralDays(m.days);`,
    `if(m.days<0)cdEl.innerHTML='Recently passed · <b>log the result</b>';
  else if(m.days===0)cdEl.innerHTML='Today · <b>do not miss it!</b>';
  else if(m.days===1)cdEl.innerHTML='Tomorrow · in <b>1</b> day';
  else cdEl.innerHTML='In <b>'+m.days+'</b> '+pluralDays(m.days);`,
  ],
  [
    `const VISIT_PREP_DEFAULT=[
  {id:'docs',label:'Обменная карта и паспорт'},
  {id:'analyses',label:'Свежие анализы и результаты УЗИ'},
  {id:'bp',label:'Записать давление утром'},
  {id:'questions',label:'Список вопросов врачу'},
  {id:'snack',label:'Перекус и вода с собой'}
];`,
    `const VISIT_PREP_DEFAULT=[
  {id:'docs',label:'Medical records and ID'},
  {id:'analyses',label:'Recent labs and ultrasound results'},
  {id:'bp',label:'Log blood pressure in the morning'},
  {id:'questions',label:'List of questions for provider'},
  {id:'snack',label:'Snack and water packed'}
];`,
  ],
  [
    `if(sub)sub.textContent=(days===0?'Сегодня':'Через '+days+' '+pluralDays(days))+' — '+appt.title+'. Отметь что готово:';`,
    `if(sub)sub.textContent=(days===0?'Today':'In '+days+' '+pluralDays(days))+' — '+appt.title+'. Check off what is ready:';`,
  ],
  [
    `if(wkEl)wkEl.textContent=week+' нед.';`,
    `if(wkEl)wkEl.textContent=week+' wk.';`,
  ],
  [
    `weekStatHtml('😊','<b>'+moodCount+'/7</b> дней','настроение отмечено','mood'),
    weekStatHtml('💧','<b>'+waterDays+'/7</b> дней','норма воды выполнена','water'),
    weekStatHtml('🩺','<b>'+bpCount+'/7</b> '+pluralMeasurements(bpCount),'давление записано','bp'),
    weekStatHtml('🦶','<b>'+kickWeek+'</b> '+pluralSessions(kickWeek),'подсчёт шевелений','kick')`,
    `weekStatHtml('😊','<b>'+moodCount+'/7</b> days','mood logged','mood'),
    weekStatHtml('💧','<b>'+waterDays+'/7</b> days','water goal met','water'),
    weekStatHtml('🩺','<b>'+bpCount+'/7</b> '+pluralMeasurements(bpCount),'blood pressure logged','bp'),
    weekStatHtml('🦶','<b>'+kickWeek+'</b> '+pluralSessions(kickWeek),'kick count sessions','kick')`,
  ],
  [
    `scoreEl.setAttribute('aria-label','Индекс заботы: '+score+' из 100');`,
    `scoreEl.setAttribute('aria-label','Care index: '+score+' of 100');`,
  ],
  [
    `if(wrap)wrap.title='Индекс заботы: '+score+' из 100 · нажми для пояснения';`,
    `if(wrap)wrap.title='Care index: '+score+' of 100 · tap for details';`,
  ],
  [
    `setNextAction('💊',urgent?'Пора принять!':'Следующий препарат',nextMed.time+' — '+nextMed.name,()=>switchTabById('meds'),urgent);`,
    `setNextAction('💊',urgent?'Time to take!':'Next medication',nextMed.time+' — '+nextMed.name,()=>switchTabById('meds'),urgent);`,
  ],
  [
    `setNextAction('🗓️','Сегодня визит',appt.title,()=>switchTabById('journal'),true);`,
    `setNextAction('🗓️','Visit today',appt.title,()=>switchTabById('journal'),true);`,
  ],
  [
    `setNextAction('💧',urgent?'Пора пить воду!':'Выпей воды',w.length+' из 8 · цель к '+h+':00 — '+target,()=>goHomeSection('daily'),urgent);`,
    `setNextAction('💧',urgent?'Time to hydrate!':'Drink water',w.length+' of 8 · goal by '+h+':00 — '+target,()=>goHomeSection('daily'),urgent);`,
  ],
  [
    `setNextAction('🤍','Как настроение?','Отметь — я хочу знать',()=>goHomeSection('wellness'),false);`,
    `setNextAction('🤍','How is your mood?','Log it — I want to know',()=>goHomeSection('wellness'),false);`,
  ],
  [
    `document.getElementById('ahLbl').textContent=days===0?'Сегодня визит!':days===1?'Завтра визит':'Следующий визит';`,
    `document.getElementById('ahLbl').textContent=days===0?'Visit today!':days===1?'Visit tomorrow':'Next visit';`,
  ],
  [
    `document.getElementById('ahSub').textContent=d.toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'})+(days>1?' · через '+days+' '+pluralDays(days):'');`,
    `document.getElementById('ahSub').textContent=d.toLocaleDateString('en-US',{weekday:'long',day:'numeric',month:'long'})+(days>1?' · in '+days+' '+pluralDays(days):'');`,
  ],
  [
    `let text='ДНЕВНИК БЕРЕМЕННОСТИ — Для Индиры\\n';
  text+='Экспорт: '+new Date().toLocaleString('ru-RU')+'\\n';
  text+='Записей: '+log.length+'\\n';
  if(!log.length){text+='(Пока нет записей)\\n';return text;}`,
    `let text='PREGNANCY JOURNAL — Caring Diary\\n';
  text+='Export: '+new Date().toLocaleString('en-US')+'\\n';
  text+='Entries: '+log.length+'\\n';
  if(!log.length){text+='(No entries yet)\\n';return text;}`,
  ],
  [
    `const label=tm>=nowM-15&&tm<=nowM+45?'Сейчас: '+pick.name:pick.time+' — '+pick.name;`,
    `const label=tm>=nowM-15&&tm<=nowM+45?'Now: '+pick.name:pick.time+' — '+pick.name;`,
  ],
  [
    `document.getElementById('medsInfo').textContent='Расписание на '+now.toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'})+' · '+active.length+' '+pluralMeds(active.length);`,
    `document.getElementById('medsInfo').textContent='Schedule for '+now.toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'})+' · '+active.length+' '+pluralMeds(active.length);`,
  ],
  [
    `if(sub)sub.textContent=total>0?total+' '+pluralDays(total)+' · всего':'подряд';`,
    `if(sub)sub.textContent=total>0?total+' '+pluralDays(total)+' · total':'streak';`,
  ],
  [
    `takeLabel='Отметь приём — ещё не поздно!';
    takeSub=\`Время: \${escapeHtml(t.time)} · через \${mins} мин.\`;`,
    `takeLabel='Mark dose — still time!';
    takeSub=\`Time: \${escapeHtml(t.time)} · in \${mins} min.\`;`,
  ],
  [
    `takeSub=\`Время было \${escapeHtml(t.time)} · нажми чтобы отметить\`;`,
    `takeSub=\`Was due at \${escapeHtml(t.time)} · tap to mark\`;`,
  ],
  [
    `quotaEl.textContent=\`Хранилище сайта: \${formatPhotoBytes(est.usage||0)} из ~\${formatPhotoBytes(est.quota||limit)} — это не занятость памяти телефона\`;`,
    `quotaEl.textContent=\`Site storage: \${formatPhotoBytes(est.usage||0)} of ~\${formatPhotoBytes(est.quota||limit)} — not the same as phone memory usage\`;`,
  ],
  [
    `el.textContent='Safari → Поделиться ↑ → «На экран Домой». Так фото с камеры не будут перегружать вкладку браузера.';`,
    `el.textContent='Safari → Share ↑ → Add to Home Screen. Camera photos will not overload the browser tab.';`,
  ],
  [
    `badgeEl.textContent=getPhotoMode()==='full'?'Неделя сохранена ✨':'Превью сохранено · оригинал в галерее';`,
    `badgeEl.textContent=getPhotoMode()==='full'?'Week saved ✨':'Preview saved · original in gallery';`,
  ],
  [
    `toast(getPhotoMode()==='full'?'Фото недели '+curGW+' сохранено! 📷':'Превью сохранено — оригинал остаётся в галерее 📱');`,
    `toast(getPhotoMode()==='full'?'Week '+curGW+' photo saved! 📷':'Preview saved — original stays in gallery 📱');`,
  ],
  [
    `document.getElementById('brSec').textContent=brS+'с';`,
    `document.getElementById('brSec').textContent=brS+'s';`,
  ],
  [
    `await navigator.share({title:'Животик · неделя '+curGW,files:[file]});`,
    `await navigator.share({title:'Bump · week '+curGW,files:[file]});`,
  ],
  [
    `await navigator.share({title:'Животик · неделя '+curGW,text:'Неделя '+curGW+' 🤍 · Caring Diary'});`,
    `await navigator.share({title:'Bump · week '+curGW,text:'Week '+curGW+' 🤍 · Caring Diary'});`,
  ],
  [
    `}else toast('Поделиться не поддерживается на этом устройстве');`,
    `}else toast('Sharing not supported on this device');`,
  ],
  [
    `if(cnt>=8)return {text:'Умница! Все 8 стаканов — идеально 💧🏆',urgent:false};`,
    `if(cnt>=8)return {text:'Well done! All 8 glasses — perfect 💧🏆',urgent:false};`,
  ],
  [
    `if(cnt>=target)return {text:cnt+' из 8 · ты в графике на сегодня 💪',urgent:false};`,
    `if(cnt>=target)return {text:cnt+' of 8 · on track for today 💪',urgent:false};`,
  ],
  [
    `if(h>=18&&cnt<6)return {text:'Вечер — добей до 8 стаканов, осталось '+(8-cnt)+' 💧',urgent:true};`,
    `if(h>=18&&cnt<6)return {text:'Evening — reach 8 glasses, '+ (8-cnt)+' left 💧',urgent:true};`,
  ],
  [
    `if(h>=14&&cnt<4)return {text:'К обеду лучше 4+ стакана — сейчас '+cnt+' из 8',urgent:true};`,
    `if(h>=14&&cnt<4)return {text:'By lunch aim for 4+ glasses — now '+cnt+' of 8',urgent:true};`,
  ],
  [
    `if(h>=10&&cnt<2)return {text:'Утро — начни с воды, '+cnt+' из 8 стаканов',urgent:false};`,
    `if(h>=10&&cnt<2)return {text:'Morning — start with water, '+cnt+' of 8 glasses',urgent:false};`,
  ],
  [
    `return {text:cnt+' из 8 · к этому времени лучше '+target+' стакан'+(target===1?'':'а'),urgent:behind>=2&&h>=12};`,
    `return {text:cnt+' of 8 · by now aim for '+target+' glass'+(target===1?'':'es'),urgent:behind>=2&&h>=12};`,
  ],
  [
    `legendEl.innerHTML='🟢 Коридор ВОЗ ('+corridor.label+'): <b>'+corridor.minW.toFixed(1)+'–'+corridor.maxW.toFixed(1)+' кг</b> на '+week+' нед.'+(inCorridor?' · ты в норме ✅':' · обсуди с врачом 💛');`,
    `legendEl.innerHTML='🟢 WHO range ('+corridor.label+'): <b>'+corridor.minW.toFixed(1)+'–'+corridor.maxW.toFixed(1)+' kg</b> at week '+week+(inCorridor?' · within range ✅':' · discuss with provider 💛');`,
  ],
  [
    `return '<div class="today-med-row" onclick="tTask(\\''+sid+'\\')" role="button" aria-label="Отметить '+escapeHtml(t.name)+'">`,
    `return '<div class="today-med-row" onclick="tTask(\\''+sid+'\\')" role="button" aria-label="Mark '+escapeHtml(t.name)+'">`,
  ],
];
