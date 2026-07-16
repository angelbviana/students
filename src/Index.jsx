import { useState, useEffect } from "react";

// ── SUPABASE CONFIG ──
const SUPABASE_URL = "https://njqltdokhdychsnbvwlc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcWx0ZG9raGR5Y2hzbmJ2d2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MjI2NzcsImV4cCI6MjA5OTI5ODY3N30.rxbBoSs55B41UD5peV9nfk84NseekLA8fWeUcjO8-8M";

async function fetchAppState() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/app_state?select=data&limit=1`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  const rows = await res.json();
  return rows?.[0]?.data || null;
}

const TEACHER = { name: "Angel Viana", whatsapp: "5548996968856" };

const STUDENTS = {
  "angelica-viana": {
    email: "hello.angelicaviana@gmail.com", code: "ANGEL2025", name: "Angélica Viana",
    currentLevel: "C1", startDate: "2026-07-15", unlockedLevels: ["A1","A2","B1","B2","C1"],
    lessons: { A1:[], A2:[], B1:[], B2:[], C1:[], C2:[] },
    tasks: { A1:[], A2:[], B1:[], B2:[], C1:[], C2:[] },
    music: { A1:[], A2:[], B1:[], B2:[], C1:[], C2:[] },
    pdfs: { A1:[], A2:[], B1:[], B2:[], C1:[], C2:[] },
    wordBank: { A1:[], A2:[], B1:[], B2:[], C1:[], C2:[] },
  },
  "maria-silva": {
    email: "maria@email.com", code: "ANGEL2025", name: "Maria Silva",
    currentLevel: "A2", startDate: "2025-03-01", unlockedLevels: ["A1", "A2"],
    lessons: {
      A1: [
        { title: "Greetings & Introductions", url: "https://youtube.com/watch?v=dQw4w9WgXcQ", date: "05 Mar", dur: "45 min", skills: ["Speaking","Listening"], about: "Cumprimentos, apresentações, How are you?" },
        { title: "Numbers, Colors & Age", url: "https://youtube.com/watch?v=dQw4w9WgXcQ", date: "12 Mar", dur: "50 min", skills: ["Vocabulary"], about: "Números 1-100, cores, telling your age" },
        { title: "Family & Possessives", url: "https://youtube.com/watch?v=dQw4w9WgXcQ", date: "19 Mar", dur: "42 min", skills: ["Speaking","Grammar"], about: "Membros da família, my/your/his/her" },
        { title: "Daily Routine & Present Simple", url: "https://youtube.com/watch?v=dQw4w9WgXcQ", date: "26 Mar", dur: "48 min", skills: ["Grammar","Speaking"], about: "Rotina, verbos, advérbios de frequência" },
      ],
      A2: [
        { title: "Past Simple — Regular Verbs", url: "https://youtube.com/watch?v=dQw4w9WgXcQ", date: "02 Apr", dur: "55 min", skills: ["Grammar"], about: "Formação -ed, pronúncia /t/ /d/ /ɪd/" },
        { title: "Past Simple — Irregular Verbs", url: "https://youtube.com/watch?v=dQw4w9WgXcQ", date: "09 Apr", dur: "50 min", skills: ["Grammar","Vocabulary"], about: "Top 50 irregulares, was/were, storytelling" },
        { title: "Comparatives & Superlatives", url: "", date: "", dur: "", skills: ["Grammar"], about: "Comparações, -er/-est, more/most" },
      ],
      B1: [], B2: [], C1: [], C2: [],
    },
    tasks: {
      A1: [],
      A2: [
        { title: "Escrever 10 frases no Past Simple", due: "15 Jul", details: "Use 5 regulares e 5 irregulares. Mande foto no WhatsApp.", done: false },
        { title: "Assistir vídeo e anotar 10 palavras", due: "18 Jul", details: "Assista a Aula 2 e anote palavras novas.", done: false },
        { title: "Quiz no Quizlet — Irregular Verbs", due: "20 Jul", details: "Complete o set de flashcards.", done: true },
      ],
      B1: [], B2: [], C1: [], C2: [],
    },
    music: {
      A1: [
        {
          title: "Hello — Adele",
          video: "https://youtube.com/watch?v=YQHsXMglC9A",
          diff: "Beginner",
          tip: "Ouça o refrão e complete as palavras que faltam!",
          lyrics: "Hello, it's [me]\nI was wondering if after all these [years]\nYou'd like to [meet]\nTo go over [everything]\nThey say that [time's] supposed to heal ya\nBut I ain't done much [healing]"
        },
        {
          title: "Count on Me — Bruno Mars",
          video: "https://youtube.com/watch?v=xs3gJCx74hA",
          diff: "Beginner",
          tip: "Foque nos verbos e nas palavras de amizade!",
          lyrics: "If you ever find yourself stuck in the [middle] of the sea\nI'll [sail] the world to [find] you\nIf you ever find yourself lost in the [dark] and you can't see\nI'll be the [light] to guide you"
        },
      ],
      A2: [
        {
          title: "Someone Like You — Adele",
          video: "https://youtube.com/watch?v=hLQl3WQQoQ0",
          diff: "Intermediate",
          tip: "Identifique os verbos no Past Simple!",
          lyrics: "I [heard] that you're [settled] down\nThat you [found] a girl and you're [married] now\nI heard that your [dreams] came true\nGuess she [gave] you things I didn't [give] to you"
        },
        {
          title: "Yesterday — The Beatles",
          video: "https://youtube.com/watch?v=NrgmdOz227I",
          diff: "Beginner",
          tip: "Uma música clássica com vocabulário simples!",
          lyrics: "[Yesterday], all my [troubles] seemed so far [away]\nNow it [looks] as though they're here to [stay]\nOh, I [believe] in yesterday"
        },
        {
          title: "Perfect — Ed Sheeran",
          video: "https://youtube.com/watch?v=2Vv-BfVoq4g",
          diff: "Intermediate",
          tip: "Listening comprehension — preste atenção nos adjetivos!",
          lyrics: "I found a [love] for me\nOh darling, just [dive] right in and follow my [lead]\nWell, I found a [girl], [beautiful] and sweet\nOh, I never [knew] you were the someone waiting for [me]"
        },
      ],
      B1: [], B2: [], C1: [], C2: [],
    },
    pdfs: {
      A1: [{ title: "Resumo — Greetings", url: "#" },{ title: "Resumo — Numbers", url: "#" },{ title: "Exercícios — Family", url: "#" },{ title: "Resumo — Daily Routine", url: "#" }],
      A2: [{ title: "Resumo — Past Simple", url: "#" },{ title: "Verbos Irregulares", url: "#" }],
      B1: [], B2: [], C1: [], C2: [],
    },
    wordBank: {
      A1: [
        { en: "Hello", pt: "Olá", ex: "Hello! How are you today?" },
        { en: "Goodbye", pt: "Tchau", ex: "Goodbye, see you next week!" },
        { en: "Please", pt: "Por favor", ex: "Can I have water, please?" },
        { en: "Thank you", pt: "Obrigado(a)", ex: "Thank you for your help!" },
        { en: "Morning", pt: "Manhã", ex: "I wake up every morning at 7." },
        { en: "Beautiful", pt: "Bonito(a)", ex: "What a beautiful day!" },
        { en: "Family", pt: "Família", ex: "My family is very small." },
        { en: "Always", pt: "Sempre", ex: "She always drinks coffee." },
        { en: "Never", pt: "Nunca", ex: "I never eat breakfast." },
      ],
      A2: [
        { en: "Actually", pt: "Na verdade", ex: "Actually, I changed my mind." },
        { en: "Although", pt: "Embora", ex: "Although it rained, we had fun." },
        { en: "Bought", pt: "Comprou", ex: "She bought a new car last week." },
        { en: "Thought", pt: "Pensou", ex: "I thought about you yesterday." },
        { en: "Already", pt: "Já", ex: "I've already seen that movie." },
        { en: "Taller", pt: "Mais alto", ex: "He's taller than his father." },
      ],
      B1: [], B2: [], C1: [], C2: [],
    },
    notes: {
      A1: "Parabéns pela conclusão do A1! Foco agora no Past Simple.",
      A2: "Progresso fantástico! Vamos reforçar os irregulares com Quizlet.",
      B1: "", B2: "", C1: "", C2: [],
    },
  },
};

const RESOURCES = [
  { name: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/", desc: "Dicionário completo com pronúncia", cat: "tools" },
  { name: "YouGlish", url: "https://youglish.com/", desc: "Nativos pronunciando em vídeos reais", cat: "tools" },
  { name: "Forvo", url: "https://forvo.com/", desc: "Áudios de pronúncia por nativos", cat: "tools" },
  { name: "ELSA Speak", url: "https://elsaspeak.com/", desc: "IA que treina seu sotaque", cat: "tools" },
  { name: "Write & Improve", url: "https://writeandimprove.com/", desc: "Escrita com correção de Cambridge", cat: "tools" },
  { name: "Wordwall", url: "https://wordwall.net/", desc: "Jogos educativos e atividades prontas", cat: "practice" },
  { name: "Quizlet", url: "https://quizlet.com/", desc: "Flashcards e jogos de vocabulário", cat: "practice" },
  { name: "Kahoot", url: "https://kahoot.it/", desc: "Quizzes interativos e divertidos", cat: "practice" },
  { name: "Lyrics Training", url: "https://lyricstraining.com/", desc: "Aprenda inglês com músicas", cat: "music" },
  { name: "Spotify Playlists", url: "https://open.spotify.com/", desc: "Playlists curadas para listening", cat: "music" },
  { name: "BBC In Our Time", url: "https://www.bbc.co.uk/programmes/b006qykl", desc: "Podcast sobre história, ciência e cultura", cat: "listen" },
  { name: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish", desc: "Cursos e podcasts gratuitos da BBC", cat: "listen" },
  { name: "News in Levels", url: "https://www.newsinlevels.com/", desc: "Notícias adaptadas para seu nível", cat: "listen" },
  { name: "TED Talks", url: "https://www.ted.com/talks", desc: "Palestras inspiradoras com legendas", cat: "listen" },
];

const LEVELS = ["A1","A2","B1","B2","C1","C2"];
const LLABEL = {A1:"Beginner",A2:"Elementary",B1:"Intermediate",B2:"Upper-Int.",C1:"Advanced",C2:"Proficiency"};
const SCOL = {Speaking:"#16a34a",Listening:"#2563eb",Grammar:"#7c3aed",Vocabulary:"#ea580c"};
const catN = {tools:"Dicionário & Ferramentas",practice:"Prática & Jogos",music:"Música",listen:"Podcasts & Listening"};

// ── SCHEDULING LINK ──
const BOOKING_LINK = "https://calendar.app.google/JZyuDGo68ZofNq337";

// ── MOTIVATIONAL MESSAGES (rotate randomly) ──
const MESSAGES = [
  "Cada aula é um passo a mais rumo à fluência. Você está indo muito bem! ♡",
  "Consistency is key! Que orgulho ver você aqui de novo. Keep going! 🌟",
  "Aprender inglês é uma jornada, não uma corrida. E você está no caminho certo! 💛",
  "Your English is getting better every single day. Acredite em você! ✨",
  "Que semana incrível de aprendizado! Continue assim, você está arrasando! 🎉",
  "Small steps every day lead to big results. Orgulho de você! ♡",
  "You've got this! Cada palavrinha nova é uma vitória. Celebre! 🏆",
  "Lembre-se: errar faz parte do processo. O importante é não parar! 💪",
  "Your dedication inspires me! Continue aparecendo e evoluindo. 🌸",
  "Inglês abre portas que você nem imagina. E você está abrindo todas elas! 🚪✨",
  "Que bom ter você aqui! Cada aula conta. Vamos juntas nessa! 💕",
  "Progress, not perfection! Você está evoluindo de um jeito lindo. 🦋",
  "I'm so proud of you! Sua dedicação me inspira todos os dias. ♡",
  "Keep showing up! O inglês que você sempre sonhou está mais perto do que parece. 🌈",
  "You are braver than you believe! Fale, erre, aprenda e repita. 💫",
  "Cada aula assistida é um tijolinho no seu castelo do inglês! 🏰",
  "Não existe atalho, mas existe consistência. E você tem de sobra! 💛",
  "Your journey is unique and beautiful. Keep going! ✨",
  "Que semana produtiva! Você está construindo algo incrível. 🌟",
  "I believe in you more than you know! Continue brilhando! ⭐",
];

// ── VOCABULARY BY LEVEL ──
const VOCAB = {
  A1: [
    {en:"hello",pt:"olá",audio:"hello"},{en:"goodbye",pt:"tchau",audio:"goodbye"},{en:"please",pt:"por favor",audio:"please"},{en:"thank you",pt:"obrigada",audio:"thank+you"},{en:"yes",pt:"sim",audio:"yes"},{en:"no",pt:"não",audio:"no"},{en:"sorry",pt:"desculpe",audio:"sorry"},{en:"help",pt:"ajuda",audio:"help"},{en:"water",pt:"água",audio:"water"},{en:"food",pt:"comida",audio:"food"},
    {en:"house",pt:"casa",audio:"house"},{en:"school",pt:"escola",audio:"school"},{en:"work",pt:"trabalho",audio:"work"},{en:"family",pt:"família",audio:"family"},{en:"friend",pt:"amigo",audio:"friend"},{en:"day",pt:"dia",audio:"day"},{en:"time",pt:"tempo/hora",audio:"time"},{en:"year",pt:"ano",audio:"year"},{en:"man",pt:"homem",audio:"man"},{en:"woman",pt:"mulher",audio:"woman"},
    {en:"child",pt:"criança",audio:"child"},{en:"book",pt:"livro",audio:"book"},{en:"car",pt:"carro",audio:"car"},{en:"money",pt:"dinheiro",audio:"money"},{en:"city",pt:"cidade",audio:"city"},{en:"country",pt:"país",audio:"country"},{en:"name",pt:"nome",audio:"name"},{en:"number",pt:"número",audio:"number"},{en:"color",pt:"cor",audio:"color"},{en:"happy",pt:"feliz",audio:"happy"},
  ],
  A2: [
    {en:"travel",pt:"viajar",audio:"travel"},{en:"weather",pt:"tempo/clima",audio:"weather"},{en:"health",pt:"saúde",audio:"health"},{en:"hobby",pt:"hobby",audio:"hobby"},{en:"restaurant",pt:"restaurante",audio:"restaurant"},{en:"shopping",pt:"compras",audio:"shopping"},{en:"sport",pt:"esporte",audio:"sport"},{en:"music",pt:"música",audio:"music"},{en:"movie",pt:"filme",audio:"movie"},{en:"weekend",pt:"fim de semana",audio:"weekend"},
    {en:"holiday",pt:"feriado/férias",audio:"holiday"},{en:"office",pt:"escritório",audio:"office"},{en:"meeting",pt:"reunião",audio:"meeting"},{en:"neighbour",pt:"vizinho",audio:"neighbour"},{en:"journey",pt:"jornada/viagem",audio:"journey"},{en:"language",pt:"idioma",audio:"language"},{en:"culture",pt:"cultura",audio:"culture"},{en:"market",pt:"mercado",audio:"market"},{en:"describe",pt:"descrever",audio:"describe"},{en:"suggest",pt:"sugerir",audio:"suggest"},
    {en:"prefer",pt:"preferir",audio:"prefer"},{en:"explain",pt:"explicar",audio:"explain"},{en:"improve",pt:"melhorar",audio:"improve"},{en:"practise",pt:"praticar",audio:"practise"},{en:"remember",pt:"lembrar",audio:"remember"},{en:"forget",pt:"esquecer",audio:"forget"},{en:"believe",pt:"acreditar",audio:"believe"},{en:"agree",pt:"concordar",audio:"agree"},{en:"imagine",pt:"imaginar",audio:"imagine"},{en:"appear",pt:"aparecer",audio:"appear"},
  ],
  B1: [
    {en:"achieve",pt:"alcançar/conquistar",audio:"achieve"},{en:"challenge",pt:"desafio",audio:"challenge"},{en:"confident",pt:"confiante",audio:"confident"},{en:"consequence",pt:"consequência",audio:"consequence"},{en:"contribute",pt:"contribuir",audio:"contribute"},{en:"despite",pt:"apesar de",audio:"despite"},{en:"environment",pt:"meio ambiente",audio:"environment"},{en:"experience",pt:"experiência",audio:"experience"},{en:"improve",pt:"melhorar",audio:"improve"},{en:"influence",pt:"influência",audio:"influence"},
    {en:"mention",pt:"mencionar",audio:"mention"},{en:"opportunity",pt:"oportunidade",audio:"opportunity"},{en:"opinion",pt:"opinião",audio:"opinion"},{en:"probably",pt:"provavelmente",audio:"probably"},{en:"purpose",pt:"propósito",audio:"purpose"},{en:"realize",pt:"perceber/realizar",audio:"realize"},{en:"recently",pt:"recentemente",audio:"recently"},{en:"relationship",pt:"relacionamento",audio:"relationship"},{en:"responsibility",pt:"responsabilidade",audio:"responsibility"},{en:"situation",pt:"situação",audio:"situation"},
    {en:"solve",pt:"resolver",audio:"solve"},{en:"support",pt:"apoiar/suporte",audio:"support"},{en:"surprisingly",pt:"surpreendentemente",audio:"surprisingly"},{en:"though",pt:"embora/porém",audio:"though"},{en:"throughout",pt:"ao longo de",audio:"throughout"},{en:"trend",pt:"tendência",audio:"trend"},{en:"unless",pt:"a menos que",audio:"unless"},{en:"whereas",pt:"enquanto/ao passo que",audio:"whereas"},{en:"worthwhile",pt:"que vale a pena",audio:"worthwhile"},{en:"outcome",pt:"resultado/desfecho",audio:"outcome"},
  ],
  B2: [
    {en:"acknowledge",pt:"reconhecer",audio:"acknowledge"},{en:"assumption",pt:"suposição",audio:"assumption"},{en:"comprehensive",pt:"abrangente",audio:"comprehensive"},{en:"controversial",pt:"controverso",audio:"controversial"},{en:"crucial",pt:"crucial",audio:"crucial"},{en:"dedicate",pt:"dedicar",audio:"dedicate"},{en:"distinguish",pt:"distinguir",audio:"distinguish"},{en:"emphasize",pt:"enfatizar",audio:"emphasize"},{en:"establish",pt:"estabelecer",audio:"establish"},{en:"evaluate",pt:"avaliar",audio:"evaluate"},
    {en:"furthermore",pt:"além disso",audio:"furthermore"},{en:"generate",pt:"gerar",audio:"generate"},{en:"highlight",pt:"destacar",audio:"highlight"},{en:"implement",pt:"implementar",audio:"implement"},{en:"indicate",pt:"indicar",audio:"indicate"},{en:"inevitable",pt:"inevitável",audio:"inevitable"},{en:"negotiate",pt:"negociar",audio:"negotiate"},{en:"nevertheless",pt:"no entanto",audio:"nevertheless"},{en:"obtain",pt:"obter",audio:"obtain"},{en:"perspective",pt:"perspectiva",audio:"perspective"},
    {en:"phenomenon",pt:"fenômeno",audio:"phenomenon"},{en:"prioritize",pt:"priorizar",audio:"prioritize"},{en:"profound",pt:"profundo",audio:"profound"},{en:"reinforce",pt:"reforçar",audio:"reinforce"},{en:"significant",pt:"significativo",audio:"significant"},{en:"straightforward",pt:"direto/simples",audio:"straightforward"},{en:"subsequent",pt:"subsequente",audio:"subsequent"},{en:"sustain",pt:"sustentar",audio:"sustain"},{en:"thorough",pt:"minucioso",audio:"thorough"},{en:"underlying",pt:"subjacente",audio:"underlying"},
  ],
  C1: [
    {en:"articulate",pt:"articular/eloquente",audio:"articulate"},{en:"candid",pt:"franco/sincero",audio:"candid"},{en:"circumvent",pt:"contornar/evitar",audio:"circumvent"},{en:"compelling",pt:"convincente/irresistível",audio:"compelling"},{en:"concise",pt:"conciso",audio:"concise"},{en:"convey",pt:"transmitir/expressar",audio:"convey"},{en:"deduce",pt:"deduzir",audio:"deduce"},{en:"discern",pt:"discernir",audio:"discern"},{en:"eloquent",pt:"eloquente",audio:"eloquent"},{en:"facilitate",pt:"facilitar",audio:"facilitate"},
    {en:"implication",pt:"implicação",audio:"implication"},{en:"inherent",pt:"inerente",audio:"inherent"},{en:"insight",pt:"percepção/visão",audio:"insight"},{en:"intricate",pt:"intrincado/complexo",audio:"intricate"},{en:"meticulous",pt:"meticuloso",audio:"meticulous"},{en:"nuance",pt:"nuance/detalhe",audio:"nuance"},{en:"paradox",pt:"paradoxo",audio:"paradox"},{en:"perception",pt:"percepção",audio:"perception"},{en:"plausible",pt:"plausível",audio:"plausible"},{en:"pragmatic",pt:"pragmático",audio:"pragmatic"},
    {en:"prevalent",pt:"predominante",audio:"prevalent"},{en:"scrutinize",pt:"examinar minuciosamente",audio:"scrutinize"},{en:"subtle",pt:"sutil",audio:"subtle"},{en:"tangible",pt:"tangível/concreto",audio:"tangible"},{en:"tenacious",pt:"tenaz/persistente",audio:"tenacious"},{en:"transparent",pt:"transparente",audio:"transparent"},{en:"unambiguous",pt:"inequívoco/claro",audio:"unambiguous"},{en:"validate",pt:"validar",audio:"validate"},{en:"versatile",pt:"versátil",audio:"versatile"},{en:"withstand",pt:"resistir/suportar",audio:"withstand"},
  ],
  C2: [
    {en:"aberrant",pt:"aberrante/anormal",audio:"aberrant"},{en:"acrimony",pt:"acrimônia/amargura",audio:"acrimony"},{en:"ameliorate",pt:"melhorar/amenizar",audio:"ameliorate"},{en:"apposite",pt:"apropriado/pertinente",audio:"apposite"},{en:"assiduous",pt:"assíduo/diligente",audio:"assiduous"},{en:"byzantine",pt:"bizantino/muito complexo",audio:"byzantine"},{en:"cogent",pt:"convincente/coerente",audio:"cogent"},{en:"commensurate",pt:"proporcional/equivalente",audio:"commensurate"},{en:"confound",pt:"confundir/desconcertar",audio:"confound"},{en:"convoluted",pt:"intrincado/confuso",audio:"convoluted"},
    {en:"disingenuous",pt:"desonesto/hipócrita",audio:"disingenuous"},{en:"equivocate",pt:"ser evasivo/equivocar",audio:"equivocate"},{en:"esoteric",pt:"esotérico/obscuro",audio:"esoteric"},{en:"euphemism",pt:"eufemismo",audio:"euphemism"},{en:"fastidious",pt:"meticuloso/exigente",audio:"fastidious"},{en:"idiosyncrasy",pt:"idiossincrasia/peculiaridade",audio:"idiosyncrasy"},{en:"imperceptible",pt:"imperceptível",audio:"imperceptible"},{en:"incongruent",pt:"incongruente",audio:"incongruent"},{en:"inveterate",pt:"inveterado/habitual",audio:"inveterate"},{en:"juxtapose",pt:"justapor",audio:"juxtapose"},
    {en:"labyrinthine",pt:"labiríntico/complexo",audio:"labyrinthine"},{en:"magnanimous",pt:"magnânimo/generoso",audio:"magnanimous"},{en:"nefarious",pt:"nefasto/perverso",audio:"nefarious"},{en:"obfuscate",pt:"obscurecer/confundir",audio:"obfuscate"},{en:"ostensibly",pt:"ostensivamente/aparentemente",audio:"ostensibly"},{en:"perfidious",pt:"pérfido/traiçoeiro",audio:"perfidious"},{en:"perspicacious",pt:"perspicaz/sagaz",audio:"perspicacious"},{en:"propitious",pt:"propício/favorável",audio:"propitious"},{en:"recalcitrant",pt:"recalcitrante/teimoso",audio:"recalcitrant"},{en:"sycophant",pt:"bajulador/adulador",audio:"sycophant"},
  ],
};

const CL = "#FFF8E7";
const SG = "#930500";
const CF = "#95BBEA";

// SVG heart pattern as data URI
const heartSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='80' height='80' fill='${encodeURIComponent(CL)}'/><circle cx='40' cy='40' r='28' fill='none' stroke='${encodeURIComponent(CF)}' stroke-width='6' opacity='0.4'/><path d='M40 55 C40 55 25 43 25 35 C25 30 29 27 33 27 C36 27 39 29 40 31 C41 29 44 27 47 27 C51 27 55 30 55 35 C55 43 40 55 40 55Z' fill='${encodeURIComponent(SG)}' opacity='0.25'/></svg>`;
const heartBg = `url("data:image/svg+xml,${heartSvg.replace(/#/g,'%23')}")`;

const LIGHT = {
  bg: CL, card: "#FFFFFF", alt: "#FFF0D4", line: "#E8D9C0", lh: CF+"60",
  sg: SG, sgSoft: SG+"10", sgMid: SG+"30", sgText: SG,
  cf: CF, cfSoft: CF+"25", cfMid: CF+"50",
  t1: "#2C1810", t2: "#6B4D3E", t3: "#A08979", inp: "#FFFFFF",
  sh: "0 3px 16px rgba(147,5,0,0.06)",
};
const DARK = {
  bg: "#0C0F18", card: "#141822", alt: "#1A1F2E", line: "#252B3A", lh: "#323A4E",
  sg: "#C4384A", sgSoft: "#C4384A15", sgMid: "#C4384A40", sgText: "#E8899A",
  cf: CF, cfSoft: CF+"15", cfMid: CF+"35",
  t1: "#EDE8E0", t2: "#A9A29A", t3: "#6B6660", inp: "#141822",
  sh: "0 3px 16px rgba(0,0,0,0.3)",
};

const Fd = "'Quicksand',sans-serif";
const Fb = "'Nunito',sans-serif";
function ytId(u){const m=(u||"").match(/(?:v=|\/)([\w-]{11})/);return m?m[1]:null;}
function daysSince(d){return Math.floor((new Date()-new Date(d))/864e5);}

const GRADS = [
  `linear-gradient(135deg, ${CF}40, ${CF}15)`,
  `linear-gradient(135deg, ${SG}15, ${CF}20)`,
  `linear-gradient(135deg, ${CF}30, ${CL})`,
  `linear-gradient(135deg, ${SG}12, ${SG}05)`,
  `linear-gradient(135deg, ${CF}25, ${SG}10)`,
  `linear-gradient(135deg, ${CL}, ${CF}30)`,
];

function Heart({size=16,color=SG,opacity=1}){
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity={opacity} style={{flexShrink:0}}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>;
}

function MusicSection({songs,T,isL}){
  const [active,setActive]=useState(null);
  const [answers,setAnswers]=useState({});
  const [checked,setChecked]=useState(false);
  const [score,setScore]=useState(null);

  const openSong=(i)=>{setActive(i);setAnswers({});setChecked(false);setScore(null);};

  const parseLyrics=(text)=>{
    const parts=[];
    let blankIdx=0;
    text.split("\n").forEach((line,li)=>{
      const segs=line.split(/\[([^\]]+)\]/);
      const lineParts=[];
      segs.forEach((seg,si)=>{
        if(si%2===0){lineParts.push({type:"text",value:seg});}
        else{lineParts.push({type:"blank",value:seg,idx:blankIdx});blankIdx++;}
      });
      parts.push(lineParts);
    });
    return {parts,totalBlanks:blankIdx};
  };

  const checkAnswers=(song)=>{
    const {parts}=parseLyrics(song.lyrics);
    let correct=0;let total=0;
    parts.forEach(line=>line.forEach(p=>{
      if(p.type==="blank"){
        total++;
        if((answers[p.idx]||"").toLowerCase().trim()===p.value.toLowerCase().trim())correct++;
      }
    }));
    setScore({correct,total});
    setChecked(true);
  };

  if(songs.length===0)return <p style={{textAlign:"center",padding:40,color:T.t3,fontWeight:500}}>Nenhuma atividade musical 🎵</p>;

  if(active===null){
    return(
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {songs.map((m,i)=>(
          <div key={i} className="hov" onClick={()=>openSong(i)} style={{
            borderRadius:14,overflow:"hidden",cursor:"pointer",
            background:T.card,border:`1.5px solid ${isL?SG+"20":T.line}`,boxShadow:T.sh,
          }}>
            <div style={{height:80,background:`linear-gradient(135deg,${SG}18,${CF}25)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
              <div style={{position:"absolute",inset:0,backgroundImage:heartBg,backgroundSize:"50px 50px",opacity:0.05}} />
              <span style={{fontSize:36,zIndex:1}}>🎵</span>
              <span style={{position:"absolute",top:8,right:10,fontSize:9,fontWeight:700,color:SG,background:CL,padding:"2px 8px",borderRadius:5}}>{m.diff}</span>
            </div>
            <div style={{padding:"14px 16px"}}>
              <div style={{fontSize:15,fontWeight:700,color:T.t1,fontFamily:Fd,marginBottom:4}}>{m.title}</div>
              <div style={{fontSize:12,color:T.t3,fontWeight:500}}>{m.tip}</div>
              <div style={{marginTop:10,padding:"7px",borderRadius:8,background:isL?CF+"15":T.sgSoft,textAlign:"center",fontSize:11,fontWeight:700,color:isL?SG:T.sgText}}>
                ▶ Ouvir & Praticar
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const song=songs[active];
  const {parts,totalBlanks}=parseLyrics(song.lyrics);
  const yt=ytId(song.video);

  return(
    <div>
      {/* Back button */}
      <button onClick={()=>setActive(null)} style={{
        background:"none",border:"none",cursor:"pointer",color:T.t3,fontSize:13,fontWeight:600,
        fontFamily:Fb,marginBottom:16,padding:0,display:"flex",alignItems:"center",gap:6,
      }}>← Voltar às músicas</button>

      {/* Song header */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <Heart size={16} color={SG} opacity={0.6}/>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:T.t1,fontFamily:Fd}}>{song.title}</div>
          <span style={{fontSize:10,fontWeight:700,color:SG,textTransform:"uppercase",letterSpacing:1}}>{song.diff}</span>
        </div>
      </div>

      {/* YouTube embed */}
      {yt&&(
        <div style={{marginBottom:20,borderRadius:14,overflow:"hidden",aspectRatio:"16/9",background:"#000",border:`2px solid ${isL?CF:T.line}`}}>
          <iframe src={`https://www.youtube.com/embed/${yt}?rel=0`}
            style={{width:"100%",height:"100%",border:"none"}}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      )}

      {/* Tip */}
      <div style={{padding:"12px 16px",borderRadius:10,background:isL?CF+"18":T.alt,marginBottom:16,
        border:`1.5px solid ${isL?CF+"30":T.line}`,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:16}}>💡</span>
        <span style={{fontSize:12,color:T.t2,fontWeight:600}}>{song.tip}</span>
      </div>

      {/* Lyrics with blanks */}
      <div style={{padding:"24px",borderRadius:14,background:T.card,border:`1.5px solid ${isL?CF+"30":T.line}`,boxShadow:T.sh,marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,color:T.t3,textTransform:"uppercase",letterSpacing:1.5,marginBottom:16}}>
          🎤 Complete a letra
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {parts.map((line,li)=>(
            <div key={li} style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:4,lineHeight:2}}>
              {line.map((p,pi)=>{
                if(p.type==="text")return <span key={pi} style={{fontSize:15,color:T.t1,fontWeight:500}}>{p.value}</span>;
                const val=answers[p.idx]||"";
                const isCorrect=checked&&val.toLowerCase().trim()===p.value.toLowerCase().trim();
                const isWrong=checked&&!isCorrect;
                return(
                  <span key={pi} style={{display:"inline-flex",flexDirection:"column",alignItems:"center"}}>
                    <input
                      value={checked&&isWrong?p.value:val}
                      onChange={e=>{if(!checked)setAnswers(prev=>({...prev,[p.idx]:e.target.value}));}}
                      disabled={checked}
                      placeholder="___"
                      style={{
                        width:Math.max(p.value.length*11,50),padding:"4px 8px",borderRadius:6,
                        border:`2px solid ${checked?(isCorrect?"#16a34a":SG):(isL?CF:T.lh)}`,
                        background:checked?(isCorrect?"#16a34a12":SG+"10"):(isL?CL:T.alt),
                        color:checked?(isCorrect?"#16a34a":SG):T.t1,
                        fontSize:14,fontWeight:700,fontFamily:Fb,textAlign:"center",
                        outline:"none",
                      }}
                    />
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Check / Score */}
      {!checked?(
        <button onClick={()=>checkAnswers(song)} style={{
          width:"100%",padding:"14px",borderRadius:10,border:"none",cursor:"pointer",
          background:`linear-gradient(135deg,${SG},#B91C1C)`,
          color:"#fff",fontSize:15,fontWeight:700,fontFamily:Fd,
          boxShadow:`0 4px 14px ${SG}30`,
        }}>Verificar Respostas ♡</button>
      ):(
        <div style={{padding:"20px",borderRadius:14,textAlign:"center",
          background:score.correct===score.total?`linear-gradient(135deg,#16a34a15,#16a34a08)`:`linear-gradient(135deg,${CF}15,${SG}08)`,
          border:`1.5px solid ${score.correct===score.total?"#16a34a30":CF+"30"}`,
        }}>
          <div style={{fontSize:32,marginBottom:8}}>{score.correct===score.total?"🎉":"💪"}</div>
          <div style={{fontSize:20,fontWeight:700,fontFamily:Fd,color:T.t1,marginBottom:4}}>
            {score.correct}/{score.total} {score.correct===score.total?"Perfeito!":"Continue praticando!"}
          </div>
          <p style={{fontSize:12,color:T.t3,fontWeight:500,margin:"0 0 12px"}}>
            {score.correct===score.total?"Mandou muito bem! 🇬🇧":"As respostas corretas estão em vermelho acima."}
          </p>
          <button onClick={()=>{setAnswers({});setChecked(false);setScore(null);}} style={{
            padding:"10px 24px",borderRadius:8,border:`1.5px solid ${isL?CF:T.line}`,
            background:"transparent",color:T.t2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:Fb,
          }}>Tentar de Novo</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("light");
  const [loggedIn, setLoggedIn] = useState(false);
  const [student, setStudent] = useState(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [level, setLevel] = useState("A1");
  const [tab, setTab] = useState("lessons");
  const [video, setVideo] = useState(null);
  const [search, setSearch] = useState("");
  const [done, setDone] = useState({});
  const [taskDone, setTaskDone] = useState({});
  const [navOpen, setNavOpen] = useState(false);
  const [sbHomework, setSbHomework] = useState([]);
  const [sbLessons, setSbLessons] = useState([]);
  const [dailyMsg] = useState(()=>MESSAGES[Math.floor(Math.random()*MESSAGES.length)]);
  const [vocabFlip, setVocabFlip] = useState({});
  const [vocabSearch, setVocabSearch] = useState("");

  // busca deveres do Supabase ao fazer login
  useEffect(() => {
    if (!loggedIn || !student) return;
    fetchAppState().then(data => {
      if (!data) return;
      // deveres ficam em data.homework ou data.deveres
      const hw = data.homework || data.deveres || data.tasks || [];
      // filtra só os deveres deste aluno pelo email
      const mine = Array.isArray(hw)
        ? hw.filter(h => h.studentEmail?.toLowerCase() === student.email?.toLowerCase() || h.student_email?.toLowerCase() === student.email?.toLowerCase())
        : [];
      setSbHomework(mine);
    }).catch(() => {});
  }, [loggedIn, student]);

  const T = mode==="light"?LIGHT:DARK;
  const isL = mode==="light";

  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    const emailClean = email.toLowerCase().trim();
    const codeClean = code.trim();
    if(!emailClean||!codeClean){setErr("Preencha email e código.");return;}
    if(codeClean!=="ANGEL2025"){setErr("Código inválido.");return;}
    setLoading(true);setErr("");
    try {
      const appData = await fetchAppState();
      if(!appData){setErr("Erro ao conectar. Tente novamente.");setLoading(false);return;}
      const allStudents = appData.students||[];
      const found = allStudents.find(s=>s.email?.toLowerCase()===emailClean && s.status==="ativo");
      if(!found){setErr("Email não encontrado ou aluno inativo.");setLoading(false);return;}
      // map level from "Básico (A1)" → "A1"
      const lvlMatch = (found.level||"A1").match(/\(([^)]+)\)/);
      const lvl = lvlMatch?lvlMatch[1]:"A1";
      // build student object compatible with portal
      const st = {
        ...found,
        currentLevel: lvl,
        unlockedLevels: ["A1","A2","B1","B2","C1","C2"].slice(0,["A1","A2","B1","B2","C1","C2"].indexOf(lvl)+1),
        lessons:{A1:[],A2:[],B1:[],B2:[],C1:[],C2:[]},
        tasks:{A1:[],A2:[],B1:[],B2:[],C1:[],C2:[]},
        music:{A1:[],A2:[],B1:[],B2:[],C1:[],C2:[]},
        pdfs:{A1:[],A2:[],B1:[],B2:[],C1:[],C2:[]},
        wordBank:{A1:[],A2:[],B1:[],B2:[],C1:[],C2:[]},
      };
      // get homework for this student
      const allHw = appData.homework||[];
      const myHw = allHw.filter(h=>h.studentId===found.id);
      setSbHomework(myHw);
      const allLessons = appData.lessons||[];
      const myLessons = allLessons.filter(l=>l.studentId===found.id);
      setSbLessons(myLessons);
      setStudent(st);setLevel(lvl);setLoggedIn(true);
    } catch(e){setErr("Erro de conexão. Tente novamente.");}
    setLoading(false);
  };
  const doLogout = ()=>{setLoggedIn(false);setStudent(null);setEmail("");setCode("");setDone({});setTaskDone({});setTab("lessons");setSbHomework([]);};

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
    *{scrollbar-width:thin;box-sizing:border-box}
    .hov{transition:all 0.25s ease}.hov:hover{transform:translateY(-2px);box-shadow:${isL?`0 8px 28px ${SG}10`:`0 8px 28px rgba(0,0,0,0.3)`}}
    .nav-btn:hover{background:${isL?CF+"22":T.sgSoft};color:${isL?SG:T.sgText}}
    .row-hov:hover{background:${isL?CF+"15":T.sgSoft}}
    .res-hov:hover{transform:translateY(-1px);border-color:${isL?CF:T.sgMid}}
    .av-input:focus{border-color:${isL?CF:T.sg};outline:none}
    .lesson-card-hover:hover .lesson-play-overlay{opacity:1;}
  `;

  // ── LOGIN ──
  if(!loggedIn){
    return(
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:Fb,padding:20,
        background:isL?CL:DARK.bg,backgroundImage:isL?heartBg:"none",backgroundSize:"80px 80px",
      }}>
        <style>{css}</style>
        <div style={{width:"100%",maxWidth:400,textAlign:"center",background:isL?"rgba(255,248,231,0.92)":DARK.card+"f0",borderRadius:20,padding:"40px 32px",
          border:`2px solid ${isL?CF+"50":DARK.line}`,boxShadow:isL?`0 12px 40px ${SG}10`:DARK.sh,backdropFilter:"blur(8px)",
        }}>
          <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:20}}>
            <Heart size={18} color={SG} opacity={0.6}/>
            <Heart size={22} color={SG} opacity={0.9}/>
            <Heart size={18} color={SG} opacity={0.6}/>
          </div>
          <h1 style={{fontFamily:Fd,fontSize:28,fontWeight:700,color:isL?LIGHT.t1:DARK.t1,margin:"0 0 4px"}}>Teacher Angel Viana</h1>
          <p style={{fontSize:14,color:isL?LIGHT.t3:DARK.t3,margin:"0 0 8px",fontWeight:500}}>Student Portal ♡</p>
          <button onClick={()=>setMode(mode==="light"?"dark":"light")} style={{
            background:"none",border:`1px solid ${isL?LIGHT.line:DARK.line}`,borderRadius:20,padding:"5px 16px",
            cursor:"pointer",fontSize:12,color:isL?LIGHT.t3:DARK.t3,fontFamily:Fb,marginBottom:28,fontWeight:600,
          }}>{isL?"🌙 Escuro":"☀️ Claro"}</button>

          <div style={{display:"flex",flexDirection:"column",gap:14,textAlign:"left"}}>
            <div>
              <label style={{fontSize:11,color:isL?LIGHT.t3:DARK.t3,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Email</label>
              <input className="av-input" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}}
                placeholder="seu@email.com" type="email"
                style={{width:"100%",padding:"12px 16px",borderRadius:10,border:`2px solid ${isL?CF+"50":DARK.line}`,background:isL?"#fff":DARK.inp,color:isL?LIGHT.t1:DARK.t1,fontSize:14,fontFamily:Fb,fontWeight:500}} />
            </div>
            <div>
              <label style={{fontSize:11,color:isL?LIGHT.t3:DARK.t3,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Código do Professor</label>
              <input className="av-input" value={code} onChange={e=>{setCode(e.target.value);setErr("");}}
                placeholder="ANGEL2025" type="text" onKeyDown={e=>e.key==="Enter"&&doLogin()}
                style={{width:"100%",padding:"12px 16px",borderRadius:10,border:`2px solid ${isL?CF+"50":DARK.line}`,background:isL?"#fff":DARK.inp,color:isL?LIGHT.t1:DARK.t1,fontSize:14,fontFamily:Fb,fontWeight:500}} />
            </div>
            {err&&<p style={{color:SG,fontSize:12,margin:0,fontWeight:600}}>{err}</p>}
            <button onClick={doLogin} disabled={loading} style={{
              padding:"14px",borderRadius:10,border:"none",cursor:loading?"not-allowed":"pointer",
              background:`linear-gradient(135deg, ${SG}, #B91C1C)`,
              color:"#fff",fontSize:15,fontWeight:700,fontFamily:Fd,marginTop:4,
              boxShadow:`0 4px 14px ${SG}30`,letterSpacing:0.5,opacity:loading?0.7:1,
            }}>{loading?"Entrando...":"Entrar ♡"}</button>
          </div>
          <p style={{fontSize:12,color:isL?LIGHT.t3:DARK.t3,marginTop:24,fontWeight:500}}>
            Sem acesso?{" "}
            <a href={`https://wa.me/${TEACHER.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{color:SG,textDecoration:"none",fontWeight:700}}>Fale com a Teacher Angel</a>
          </p>
        </div>
      </div>
    );
  }

  const s = student;
  const unlocked = s.unlockedLevels.includes(level);
  const totalDone = Object.keys(done).filter(k=>done[k]).length;
  const totalLessons = Object.values(s.lessons).flat().filter(l=>l.url).length;
  const pending = Object.values(s.tasks).flat().filter(t=>!t.done).length;
  const words = (s.wordBank[level]||[]).filter(w=>!search||w.en.toLowerCase().includes(search.toLowerCase())||w.pt.toLowerCase().includes(search.toLowerCase()));
  const tabs = [
    {id:"lessons",label:"Aulas",badge:null,icon:"📚"},
    {id:"tasks",label:"Tarefas",badge:pending||null,icon:"✏️"},
    {id:"music",label:"Música",badge:null,icon:"🎵"},
    {id:"pdfs",label:"Materiais",badge:null,icon:"📄"},
    {id:"words",label:"Vocabulário",badge:null,icon:"💬"},
    {id:"resources",label:"Recursos",badge:null,icon:"🌐"},
    {id:"progress",label:"Progresso",badge:null,icon:"📈"},
  ];

  return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.t2,fontFamily:Fb}}>
      <style>{css}</style>

      {/* HEADER */}
      <header style={{
        padding:"0 28px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",
        borderBottom:`2px solid ${isL?CF+"35":T.line}`,position:"sticky",top:0,zIndex:100,
        background:isL?CL+"f0":T.bg+"e8",backdropFilter:"blur(12px)",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setNavOpen(!navOpen)} style={{
            background:"none",border:"none",color:T.t2,fontSize:18,cursor:"pointer",padding:4,
            display:typeof window!=="undefined"&&window.innerWidth<720?"block":"none",
          }}>☰</button>
          <Heart size={14} color={SG} opacity={0.7}/>
          <span style={{fontFamily:Fd,fontSize:18,fontWeight:700,color:T.t1}}>Teacher Angel Viana</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setMode(mode==="light"?"dark":"light")} style={{
            background:isL?CF+"20":T.card,border:`1px solid ${isL?CF+"50":T.line}`,borderRadius:20,padding:"5px 14px",
            cursor:"pointer",fontSize:11,color:T.t2,fontFamily:Fb,fontWeight:600,
          }}>{isL?"🌙":"☀️"}</button>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:16,fontWeight:700,color:T.t1,fontFamily:Fd}}>{s.name}</div>
            <div style={{fontSize:11,color:T.t3,fontWeight:500}}>{s.currentLevel} · {LLABEL[s.currentLevel]}</div>
          </div>
          <div style={{
            width:36,height:36,borderRadius:"50%",
            background:`linear-gradient(135deg,${SG},${CF})`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:13,fontWeight:700,color:"#fff",fontFamily:Fd,
          }}>{s.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
        </div>
      </header>

      <div style={{display:"flex"}}>
        {/* SIDEBAR */}
        <aside style={{
          width:200,flexShrink:0,padding:"20px 10px",borderRight:`2px solid ${isL?CF+"30":T.line}`,
          position:"sticky",top:58,height:"calc(100vh - 58px)",overflowY:"auto",
          display:"flex",flexDirection:"column",gap:2,
          background:isL?`linear-gradient(180deg,${CL},#FFF0D8)`:T.bg,
          ...(typeof window!=="undefined"&&window.innerWidth<720?{
            position:"fixed",left:navOpen?0:-240,top:0,height:"100vh",width:220,
            zIndex:200,paddingTop:70,transition:"left 0.25s ease",
            background:isL?CL:T.card,boxShadow:navOpen?T.sh:"none",
          }:{}),
        }}>
          {tabs.map(t=>(
            <button key={t.id} className="nav-btn" onClick={()=>{setTab(t.id);setNavOpen(false);setVideo(null);}} style={{
              width:"100%",padding:"9px 12px",border:"none",borderRadius:8,cursor:"pointer",
              background:tab===t.id?(isL?CF+"25":T.sgSoft):"transparent",
              color:tab===t.id?(isL?SG:T.sgText):T.t3,
              fontSize:13,fontWeight:tab===t.id?700:500,textAlign:"left",fontFamily:Fb,
              borderLeft:tab===t.id?`3px solid ${isL?SG:T.sg}`:"3px solid transparent",
              display:"flex",alignItems:"center",gap:8,
            }}>
              <span style={{fontSize:14}}>{t.icon}</span>
              {t.label}
              {t.badge&&<span style={{fontSize:10,fontWeight:700,background:SG,color:"#fff",borderRadius:10,padding:"1px 7px",marginLeft:"auto"}}>{t.badge}</span>}
            </button>
          ))}
          <div style={{height:1,background:isL?CF+"30":T.line,margin:"12px 0"}} />
          <div style={{fontSize:9,color:T.t3,textTransform:"uppercase",letterSpacing:2,padding:"0 12px 6px",fontWeight:700}}>Níveis</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>
            {LEVELS.map(l=>{
              const on=s.unlockedLevels.includes(l);const act=level===l;
              return(
                <button key={l} onClick={()=>on&&setLevel(l)} style={{
                  padding:"7px 0",border:act?`2px solid ${isL?SG:T.sg}`:"2px solid transparent",
                  borderRadius:8,cursor:on?"pointer":"default",
                  background:act?(isL?SG+"12":T.sgSoft):"transparent",
                  color:act?(isL?SG:T.sgText):on?T.t3:T.t3+"40",
                  fontSize:11,fontWeight:700,fontFamily:Fb,opacity:on?1:0.3,
                }}>{l}</button>
              );
            })}
          </div>
          <div style={{marginTop:"auto",display:"flex",flexDirection:"column",gap:6}}>
            <a href={`https://wa.me/${TEACHER.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{
              padding:"9px 12px",borderRadius:8,fontSize:12,textAlign:"center",
              color:"#16a34a",background:"#16a34a12",border:"1px solid #16a34a25",textDecoration:"none",fontWeight:600,
            }}>💬 WhatsApp</a>
            <button onClick={doLogout} style={{padding:"7px 12px",borderRadius:8,fontSize:11,cursor:"pointer",color:T.t3,background:"transparent",border:`1px solid ${T.line}`,fontFamily:Fb,fontWeight:600}}>Sair</button>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{flex:1,padding:"28px 36px",maxWidth:860,margin:"0 auto"}}>

          {/* WELCOME BANNER with heart pattern */}
          <div style={{
            padding:"24px 28px",borderRadius:16,marginBottom:24,position:"relative",overflow:"hidden",
            background:`linear-gradient(135deg, ${SG}, #7A1D2E 60%, ${CF})`,
            color:"#fff",display:"flex",alignItems:"center",justifyContent:"space-between",
            boxShadow:`0 8px 30px ${SG}25`,
          }}>
            {/* subtle heart pattern overlay */}
            <div style={{position:"absolute",inset:0,backgroundImage:heartBg,backgroundSize:"60px 60px",opacity:0.08}} />
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:22,fontWeight:700,fontFamily:Fd,marginBottom:4}}>Oi, {s.name.split(" ")[0]}! Que bom te ver por aqui ♡</div>
              <div style={{fontSize:13,opacity:0.9,fontWeight:500}}>Vamos continuar sua jornada no inglês hoje?</div>
            </div>
            <div style={{position:"relative",zIndex:1,fontSize:40}}>🇬🇧</div>
          </div>

          {/* MENSAGEM DA TEACHER */}
          <div style={{
            padding:"14px 18px",borderRadius:14,marginBottom:14,
            background:isL?`linear-gradient(135deg,${CF}20,${CF}08)`:"rgba(149,187,234,0.08)",
            border:`1.5px solid ${isL?CF+"60":CF+"30"}`,
            display:"flex",gap:12,alignItems:"flex-start",
          }}>
            <span style={{fontSize:22,flexShrink:0}}>💌</span>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:isL?"#1E3A8A":CF,marginBottom:3,textTransform:"uppercase",letterSpacing:0.8}}>Mensagem da Teacher Angel</div>
              <div style={{fontSize:13,color:T.t1,lineHeight:1.6,fontStyle:"italic"}}>{dailyMsg}</div>
            </div>
          </div>

          {/* BOTÃO DE AGENDAMENTO */}
          <a href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" style={{
            display:"flex",alignItems:"center",justifyContent:"center",gap:10,
            padding:"14px",borderRadius:14,marginBottom:20,textDecoration:"none",
            background:`linear-gradient(135deg,${SG},#B91C1C)`,
            boxShadow:`0 4px 18px ${SG}40`,cursor:"pointer",
          }}>
            <span style={{fontSize:20}}>📅</span>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:700,color:"#fff",letterSpacing:0.3}}>Agendar minha próxima aula</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.8)",marginTop:1}}>Clique para ver os horários disponíveis</div>
            </div>
            <span style={{fontSize:16,color:"rgba(255,255,255,0.8)"}}>→</span>
          </a>

          {/* STATS */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:28}}>
            {[
              {label:"Aulas",value:`${totalDone}/${totalLessons}`,bg:`linear-gradient(135deg,${CF}30,${CF}10)`,bc:CF,col:isL?"#1E3A8A":CF,icon:"📚"},
              {label:"Nível",value:s.currentLevel,bg:`linear-gradient(135deg,${SG}12,${SG}05)`,bc:SG+"40",col:SG,icon:"🏆"},
              {label:"Dias",value:daysSince(s.startDate),bg:`linear-gradient(135deg,${CF}20,${CL})`,bc:CF+"50",col:isL?"#1E3A8A":CF,icon:"📅"},
              {label:"Palavras",value:Object.values(s.wordBank).flat().length,bg:`linear-gradient(135deg,${SG}10,${CF}15)`,bc:SG+"25",col:isL?"#7A1D2E":T.sgText,icon:"💬"},
            ].map((st,i)=>(
              <div key={i} style={{
                padding:"16px 14px",borderRadius:14,textAlign:"center",
                background:isL?st.bg:T.card,border:`1.5px solid ${isL?st.bc:T.line}`,boxShadow:T.sh,
              }}>
                <div style={{fontSize:18,marginBottom:4}}>{st.icon}</div>
                <div style={{fontSize:9,color:T.t3,textTransform:"uppercase",letterSpacing:1.5,marginBottom:4,fontWeight:700}}>{st.label}</div>
                <div style={{fontSize:26,fontWeight:700,fontFamily:Fd,color:st.col}}>{st.value}</div>
              </div>
            ))}
          </div>

          {/* LEVEL BAR */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
            <span style={{fontSize:12,fontWeight:700,color:"#fff",background:SG,padding:"4px 14px",borderRadius:8}}>{level}</span>
            <span style={{fontSize:13,fontWeight:600,color:T.t2}}>{LLABEL[level]}</span>
            <Heart size={12} color={SG} opacity={0.3}/>
            <div style={{flex:1,height:1.5,background:isL?CF+"40":T.line,borderRadius:1}} />
          </div>

          {!unlocked?(
            <div style={{textAlign:"center",padding:"60px 20px",background:T.card,borderRadius:16,border:`1.5px solid ${isL?CF+"40":T.line}`}}>
              <div style={{fontSize:36,marginBottom:12,opacity:0.5}}>🔒</div>
              <p style={{fontFamily:Fd,fontSize:18,color:T.t1,margin:"0 0 4px",fontWeight:700}}>Nível {level} em breve</p>
              <p style={{color:T.t3,fontSize:13,fontWeight:500}}>Continue progredindo para desbloquear!</p>
            </div>
          ):(<>

            {/* AULAS */}
            {tab==="lessons"&&(
              <div>
                {video&&(
                  <div style={{marginBottom:20,borderRadius:14,overflow:"hidden",aspectRatio:"16/9",background:"#000",border:`2px solid ${isL?CF:T.line}`}}>
                    <iframe src={`https://www.youtube.com/embed/${ytId(video)}?autoplay=1&rel=0`}
                      style={{width:"100%",height:"100%",border:"none"}}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                )}
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10}}>
                  {[...sbLessons.filter(l=>l.level===level).map(l=>({title:l.title,url:l.youtubeLink,date:l.date,about:l.description||"",skills:[],dur:l.duration?`${l.duration} min`:"",cover:l.cover})), ...(s.lessons[level]||[])].map((l,i)=>{
                    const id=`${level}-${i}`;const soon=!l.url;
                    return(
                      <div key={i} className="hov lesson-card-hover" onClick={()=>!soon&&setVideo(l.url)} style={{
                        borderRadius:12,overflow:"hidden",cursor:soon?"default":"pointer",
                        background:T.card,border:`1.5px solid ${isL?CF+"40":T.line}`,
                        opacity:soon?0.4:1,boxShadow:T.sh,
                      }}>
                        <div className="lesson-cover-hover" style={{height:70,position:"relative",background:l.cover?`url(${l.cover}) center/cover`:GRADS[i%GRADS.length],display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <span style={{position:"absolute",top:6,left:6,background:SG,color:"#fff",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:5,zIndex:2}}>{level}</span>
                          {l.dur&&<span style={{position:"absolute",bottom:6,right:6,background:"rgba(0,0,0,0.5)",color:"#fff",fontSize:9,padding:"2px 6px",borderRadius:5,zIndex:2}}>{l.dur}</span>}
                          {!soon&&(
                            <div className="lesson-play-overlay" style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(61,15,28,0.28)",opacity:0,transition:"opacity 0.2s"}}>
                              <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.92)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,0,0,0.12)"}}>
                                <span style={{fontSize:12,color:SG,marginLeft:2}}>▶</span>
                              </div>
                            </div>
                          )}
                          {done[id]&&<span style={{position:"absolute",top:6,right:6,background:"#16a34a",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:5,zIndex:2}}>✓</span>}
                        </div>
                        <div style={{padding:"8px 10px 10px"}}>
                          <div style={{fontSize:12,fontWeight:700,color:T.t1,marginBottom:2,lineHeight:1.3}}>{l.title}</div>
                          <div style={{fontSize:10.5,color:T.t3,marginBottom:6,fontWeight:500}}>{l.about}</div>
                          <div style={{display:"flex",alignItems:"center",gap:4,flexWrap:"wrap"}}>
                            {(l.skills||[]).map((sk,j)=>(
                              <span key={j} style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:5,background:(SCOL[sk]||"#666")+"15",color:SCOL[sk]||"#666"}}>{sk}</span>
                            ))}
                            {l.date&&<span style={{fontSize:9,color:T.t3,marginLeft:"auto",fontWeight:600}}>{l.date}</span>}
                          </div>
                          {!soon&&(
                            <button onClick={e=>{e.stopPropagation();setDone(p=>({...p,[id]:!p[id]}));}} style={{
                              marginTop:6,width:"100%",padding:"6px",borderRadius:7,
                              border:`1.5px solid ${done[id]?"#16a34a40":isL?CF:T.line}`,
                              background:done[id]?"#16a34a12":"transparent",
                              color:done[id]?"#16a34a":T.t3,
                              fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:Fb,
                            }}>{done[id]?"✓ Concluída":"Marcar como assistida"}</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAREFAS */}
            {tab==="tasks"&&(
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {/* Deveres do Supabase (central de operações) */}
                {sbHomework.length>0&&(
                  <div style={{marginBottom:8}}>
                    <p style={{fontSize:11,fontWeight:700,color:SG,textTransform:"uppercase",letterSpacing:1.2,margin:"0 0 8px",padding:"0 4px"}}>✏️ Deveres da Teacher</p>
                    {sbHomework.map((t,i)=>{
                      const id=`sb-${i}`;const isDone=taskDone[id]??t.done??t.status==="concluido";
                      const material = t.materialUrl || t.material_url || t.fileUrl || t.file_url || null;
                      return(
                        <div key={id} className="hov" style={{
                          padding:"16px 18px",borderRadius:14,background:T.card,
                          border:`1.5px solid ${isL?CF+"40":T.line}`,opacity:isDone?0.6:1,boxShadow:T.sh,marginBottom:8,
                        }}>
                          <div style={{display:"flex",gap:12}}>
                            <button onClick={()=>setTaskDone(p=>({...p,[id]:!isDone}))} style={{
                              width:26,height:26,borderRadius:8,flexShrink:0,cursor:"pointer",marginTop:1,
                              border:`2px solid ${isDone?"#16a34a":isL?CF:T.lh}`,
                              background:isDone?"#16a34a18":"transparent",
                              color:isDone?"#16a34a":"transparent",fontSize:13,
                              display:"flex",alignItems:"center",justifyContent:"center",
                            }}>✓</button>
                            <div style={{flex:1}}>
                              <div style={{fontSize:14,fontWeight:600,color:T.t1,marginBottom:4,textDecoration:isDone?"line-through":"none"}}>{t.description||t.title||t.descricao}</div>
                              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                                <span style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:6,background:isDone?"#16a34a15":SG+"12",color:isDone?"#16a34a":SG}}>{isDone?"Concluída ✓":`Prazo: ${t.dueDate||t.due||"—"}`}</span>
                                {t.link&&<a href={t.link} target="_blank" rel="noopener noreferrer" style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:6,background:"#3b82f615",color:"#3b82f6",textDecoration:"none"}}>📎 {t.linkType||"Material"}</a>}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Deveres estáticos do código */}
                {(s.tasks[level]||[]).length===0&&sbHomework.length===0
                  ?<p style={{textAlign:"center",padding:40,color:T.t3,fontWeight:500}}>Nenhuma tarefa neste nível ♡</p>
                  :(s.tasks[level]||[]).map((t,i)=>{
                    const id=`t-${level}-${i}`;const isDone=taskDone[id]??t.done;
                    return(
                      <div key={i} className="hov" style={{
                        padding:"16px 18px",borderRadius:14,background:T.card,
                        border:`1.5px solid ${isL?CF+"30":T.line}`,opacity:isDone?0.5:1,boxShadow:T.sh,
                      }}>
                        <div style={{display:"flex",gap:12}}>
                          <button onClick={()=>setTaskDone(p=>({...p,[id]:!isDone}))} style={{
                            width:26,height:26,borderRadius:8,flexShrink:0,cursor:"pointer",marginTop:1,
                            border:`2px solid ${isDone?"#16a34a":isL?CF:T.lh}`,
                            background:isDone?"#16a34a18":"transparent",
                            color:isDone?"#16a34a":"transparent",fontSize:13,
                            display:"flex",alignItems:"center",justifyContent:"center",
                          }}>✓</button>
                          <div>
                            <div style={{fontSize:14,fontWeight:600,color:T.t1,marginBottom:4,textDecoration:isDone?"line-through":"none"}}>{t.title}</div>
                            <div style={{fontSize:12,color:T.t2,lineHeight:1.5,marginBottom:6,fontWeight:500}}>{t.details}</div>
                            <span style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:6,background:isDone?"#16a34a15":SG+"12",color:isDone?"#16a34a":SG}}>{isDone?"Concluída ✓":`Prazo: ${t.due}`}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            )}

            {/* MÚSICA */}
            {tab==="music"&&(
              <MusicSection songs={s.music[level]||[]} T={T} isL={isL} />
            )}

            {/* MATERIAIS */}
            {tab==="pdfs"&&(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
                {(s.pdfs[level]||[]).length===0
                  ?<p style={{gridColumn:"1/-1",textAlign:"center",padding:40,color:T.t3,fontWeight:500}}>Nenhum material.</p>
                  :(s.pdfs[level]||[]).map((p,i)=>(
                    <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="hov" style={{
                      padding:"20px 16px",borderRadius:14,textDecoration:"none",
                      background:T.card,border:`1.5px solid ${isL?CF+"30":T.line}`,
                      boxShadow:T.sh,display:"block",
                    }}>
                      <div style={{width:38,height:38,borderRadius:10,background:`linear-gradient(135deg,${SG}15,${CF}15)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:10}}>📄</div>
                      <div style={{fontSize:12,fontWeight:600,color:T.t1,marginBottom:4}}>{p.title}</div>
                      <div style={{fontSize:10,color:T.t3,fontWeight:500}}>Abrir ↗</div>
                    </a>
                  ))
                }
              </div>
            )}

            {/* VOCABULÁRIO */}
            {tab==="words"&&(
              <div>
                <input className="av-input" type="text" placeholder="🔍 Buscar palavra..." value={vocabSearch} onChange={e=>setVocabSearch(e.target.value)}
                  style={{width:"100%",padding:"11px 16px",borderRadius:10,border:`2px solid ${isL?CF+"50":T.line}`,background:T.inp,color:T.t1,fontSize:13,fontFamily:Fb,fontWeight:500,marginBottom:14}} />
                <div style={{fontSize:11,color:T.t3,marginBottom:12,fontWeight:600,textAlign:"center"}}>
                  {(VOCAB[level]||[]).length} palavras essenciais do nível {level} · Clique para ver a tradução · 🔊 para ouvir
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10}}>
                  {(VOCAB[level]||[]).filter(w=>!vocabSearch||w.en.toLowerCase().includes(vocabSearch.toLowerCase())||w.pt.toLowerCase().includes(vocabSearch.toLowerCase())).map((w,i)=>{
                    const fid=`${level}-${i}`;const flipped=vocabFlip[fid];
                    return(
                      <div key={i} onClick={()=>setVocabFlip(p=>({...p,[fid]:!p[fid]}))} style={{
                        padding:"16px 12px",borderRadius:12,cursor:"pointer",textAlign:"center",
                        background:flipped?(isL?`linear-gradient(135deg,${SG}12,${CF}08)`:T.alt):T.card,
                        border:`1.5px solid ${flipped?(isL?SG+"50":T.sg):isL?CF+"40":T.line}`,
                        boxShadow:T.sh,transition:"all 0.2s",minHeight:80,
                        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,
                      }}>
                        {flipped?(
                          <>
                            <div style={{fontSize:13,fontWeight:700,color:SG}}>{w.pt}</div>
                            <div style={{fontSize:10,color:T.t3,fontWeight:500}}>{w.en}</div>
                            <a href={`https://dictionary.cambridge.org/dictionary/english/${w.audio}`} target="_blank" rel="noopener noreferrer"
                              onClick={e=>e.stopPropagation()}
                              style={{fontSize:10,color:CF,fontWeight:700,textDecoration:"none",marginTop:2}}>🔊 ouvir</a>
                          </>
                        ):(
                          <>
                            <div style={{fontSize:15,fontWeight:700,color:T.t1,fontFamily:Fd}}>{w.en}</div>
                            <div style={{fontSize:9,color:T.t3,fontWeight:500}}>toque para traduzir</div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* RECURSOS */}
            {tab==="resources"&&(
              <div>
                {["tools","practice","music","listen"].map(cat=>(
                  <div key={cat} style={{marginBottom:28}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                      <Heart size={12} color={SG} opacity={0.5}/>
                      <span style={{fontSize:13,fontWeight:700,color:T.t1}}>{catN[cat]}</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
                      {RESOURCES.filter(r=>r.cat===cat).map((r,i)=>(
                        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="res-hov" style={{
                          padding:16,borderRadius:12,textDecoration:"none",
                          background:T.card,border:`1.5px solid ${isL?CF+"30":T.line}`,
                          borderLeft:`3px solid ${isL?SG:T.sg}`,
                          boxShadow:T.sh,display:"block",transition:"all 0.2s",
                        }}>
                          <div style={{fontSize:13,fontWeight:700,color:T.t1,marginBottom:4}}>{r.name} <span style={{color:T.t3,fontSize:10}}>↗</span></div>
                          <div style={{fontSize:11,color:T.t3,lineHeight:1.5,fontWeight:500}}>{r.desc}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PROGRESSO */}
            {tab==="progress"&&(
              <div>
                <div style={{padding:18,borderRadius:14,background:T.card,border:`1.5px solid ${isL?CF+"30":T.line}`,boxShadow:T.sh,marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <Heart size={14} color={SG} opacity={0.6}/>
                    <span style={{fontSize:14,fontWeight:700,color:T.t1,fontFamily:Fd}}>Notas da Teacher Angel</span>
                  </div>
                  <p style={{margin:0,fontSize:13,color:T.t2,lineHeight:1.7,fontWeight:500}}>{s.notes[level]||"Nenhuma nota para este nível."}</p>
                </div>
                <div style={{padding:18,borderRadius:14,background:T.card,border:`1.5px solid ${isL?CF+"30":T.line}`,boxShadow:T.sh,marginBottom:14}}>
                  <div style={{fontSize:14,fontWeight:700,color:T.t1,fontFamily:Fd,marginBottom:14}}>Aulas por Nível</div>
                  {LEVELS.filter(l=>s.unlockedLevels.includes(l)).map(l=>{
                    const ls=(s.lessons[l]||[]).filter(x=>x.url);
                    const d=ls.filter((_,i)=>done[`${l}-${i}`]).length;
                    const pct=ls.length?(d/ls.length)*100:0;
                    return(
                      <div key={l} style={{marginBottom:12}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <span style={{fontSize:10,fontWeight:700,color:"#fff",background:SG,padding:"2px 8px",borderRadius:5}}>{l}</span>
                            <span style={{fontSize:11,color:T.t2,fontWeight:600}}>{LLABEL[l]}</span>
                          </div>
                          <span style={{fontSize:10,color:T.t3,fontWeight:600}}>{d}/{ls.length}</span>
                        </div>
                        <div style={{height:7,borderRadius:4,background:isL?CF+"25":T.line}}>
                          <div style={{height:"100%",borderRadius:4,width:`${pct}%`,background:`linear-gradient(90deg,${SG},${CF})`,transition:"width 0.4s"}} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{padding:28,borderRadius:16,textAlign:"center",background:`linear-gradient(135deg,${CF}15,${SG}08)`,border:`1.5px solid ${isL?CF+"30":T.line}`,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",inset:0,backgroundImage:heartBg,backgroundSize:"60px 60px",opacity:0.04}} />
                  <div style={{position:"relative",zIndex:1}}>
                    <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:14}}>
                      <Heart size={14} color={CF} opacity={0.5}/>
                      <Heart size={18} color={SG} opacity={0.7}/>
                      <Heart size={14} color={CF} opacity={0.5}/>
                    </div>
                    <p style={{fontFamily:Fd,fontSize:19,color:T.t1,fontWeight:700,margin:"0 0 4px"}}>Keep going, {s.name.split(" ")[0]}!</p>
                    <p style={{color:T.t3,fontSize:13,margin:0,fontWeight:500}}>Consistência é o caminho da fluência ♡</p>
                  </div>
                </div>
              </div>
            )}
          </>)}
        </main>
      </div>
    </div>
  );
}
