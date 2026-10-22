/* Portfolio: a stack of folders. Each folder opens a chapter page (hash routed). */
(() => {
'use strict';
const $ = (s) => document.querySelector(s);

/* ─── Content ───────────────────────────────────────────────────────────── */
const SKILLS = [
    ['LANGUAGES', [['python-plain colored', 'Python'], ['java-plain colored', 'Java'], ['javascript-plain colored', 'JS'], ['typescript-plain colored', 'TS'], ['cplusplus-plain colored', 'C/C++']]],
    ['FRONTEND', [['react-original colored', 'React'], ['angular-plain colored', 'Angular'], ['nextjs-original', 'Next.js'], ['tailwindcss-plain colored', 'Tailwind'], ['html5-plain colored', 'HTML'], ['css3-plain colored', 'CSS']]],
    ['BACKEND', [['nodejs-plain colored', 'Node.js'], ['express-original', 'Express'], ['spring-original colored', 'Spring'], ['django-plain colored', 'Django'], ['mysql-plain colored', 'MySQL'], ['postgresql-plain colored', 'PostgreSQL'], ['oracle-plain colored', 'Oracle']]],
    ['AI & DATA', [['tensorflow-original colored', 'TF'], ['pytorch-original colored', 'PyTorch'], ['pandas-plain colored', 'Pandas'], ['numpy-plain colored', 'NumPy'], ['jupyter-plain colored', 'Jupyter'], ['matplotlib-plain colored', 'MPL']]],
    ['CLOUD & TOOLS', [['amazonwebservices-plain-wordmark colored', 'AWS'], ['docker-plain colored', 'Docker'], ['github-original', 'GitHub'], ['vitejs-plain colored', 'Vite'], ['bootstrap-plain colored', 'Bootstrap']]],
];

const JOBS = [
    { date: 'MAY 2026 — AUG 2026', org: 'Fulcrum Defense', role: 'Technical Intern — Solution Architecture & Platform Engineering', stack: ['python-plain colored', 'amazonwebservices-plain colored', 'docker-plain colored', 'github-original'],
      body: ["Shipped 51 merged PRs over ~11 weeks on fulcrum-gateway, the Python CLI powering multi-agent communication across Fulcrum's platform — letting agents, connectors, and human operators talk to the same backend safely and reliably.",
             "Hardened security by closing a SQL-injection-shaped gap in the report generator's AST safety layer and adding Retry-After-aware rate-limit handling to the internal API client; improved reliability by fixing cross-process race conditions with file locking, bounding runaway respawn loops, and making agent sessions survive daemon restarts.",
             "Debugged the HTTP MCP adapter and SSE event parsing so connectors could actually reach real MCP servers, built recurring task scheduling per an internal ADR, and fixed a CI version-gate regex that was silently skipping every release publish."] },
    { date: 'FEB 2025 — JUL 2025', org: 'PwC', role: 'Cyber Risk and Regulatory Intern', stack: ['angular-plain colored', 'typescript-original colored', 'amazonwebservices-plain colored', 'github-original'],
      body: ["During my time at PwC, I was part of the development team building a dedicated financial risk application for Capital One. I spent my days in the codebase, building out internal Angular dashboards and automating reporting systems to streamline how the team handled regulatory data.",
             "To keep the project moving fast, I managed our cloud infrastructure using AWS and set up GitHub Actions for CI/CD, ensuring our deployments were stable and secure. It was a great experience balancing quantitative framework analysis with real-world software engineering for a high-profile client."] },
    { date: 'JUL 2024', org: 'vTitan Corporation Pvt Ltd (Zoho)', role: 'Full Stack Development Intern', stack: ['react-plain colored', 'nodejs-plain colored', 'mysql-plain colored', 'java-plain colored', 'spring-original colored'],
      body: ["During my full-stack internship at vTitan, I focused on building and maintaining a robust application using the Spring Boot and React ecosystem. I spent a lot of my time in the backend, designing RESTful APIs that could handle complex data queries without slowing down.",
             "Besides just writing code, I was responsible for the full lifecycle, from architecting the MySQL database models to running integration tests and managing the deployment."] },
    { date: 'JUL — AUG 2024', org: 'Bluestock Fintech', role: 'Software Developer Intern', stack: ['html5-plain colored', 'bootstrap-plain colored', 'django-plain colored'],
      body: ["I worked on building a responsive financial dashboard that needed to handle data dynamically. I used Django to manage the backend, leveraging its ORM to implement CRUD features that felt seamless for the user.",
             "A big part of the project was figuring out how to visualize complex financial data in a way that made sense, so I used Bootstrap and HTML to keep the layout clean and accessible."] },
    { date: 'FEB — JUL 2024', org: 'PwC — Trainee', role: 'Cyber Risk and Regulatory Launchpad Program', stack: ['python-plain colored', 'java-plain colored', 'oracle-plain colored', 'github-plain'],
      body: ["I spent six months in the Launchpad program diving deep into the intersection of software development and cybersecurity. My focus was split between mastering OOP principles in Python and Java and learning how to manage complex data structures within Oracle SQL.",
             "Beyond the coding, I gained a practical understanding of threat analysis and secure coding practices."] },
    { date: 'JUL — AUG 2023', org: 'Cognifyz Technologies', role: 'Python Development Intern', stack: ['python-plain colored'],
      body: ["I focused on the core development of Python-based applications, using various libraries to build out essential features and logic. I spent a lot of time debugging and testing my code to make sure everything was reliable, focusing on making the scripts more efficient and ensuring the final product performed exactly as intended."] },
    { date: 'JUL — AUG 2023', org: 'LetsGrowMore', role: 'Java Development Intern', stack: ['java-plain colored', 'github-plain'],
      body: ["At LetsGrowMore, I worked on enhancing Java-based modules by applying core OOP principles to write cleaner, more efficient code. I used Git for version control to manage my updates and collaborated with the team to integrate new features into the existing system."] },
];

const CATS = { ai: ['AI', '#ff2bd6'], fullstack: ['FULL STACK', '#00f0ff'], database: ['DATABASE', '#fcee0a'], analytics: ['ANALYTICS', '#8a5cff'] };
const PROJECTS = [
    { n: 'LexiQuest', c: 'ai', stack: ['nextjs-original', 'typescript-plain colored', 'tailwindcss-plain colored', 'vitest-plain colored', 'github-original'], tags: ['Claude API', 'EdTech', 'Hackathon'], links: [['VIEW', 'https://github.com/suchitra0806/lexiquest']],
      d: "Built for the Nerdy AI Hackathon — a vocabulary and phonics quest game for ESL learners. Claude generates endless themed rounds as structured JSON, which turn into four mini-games: word match, syllable builder, fill-the-blank, and listen-and-choose via the Web Speech API. Difficulty adapts to how each round goes, with XP, streaks, and a review deck saved locally." },
    { n: 'Vector Search Engine', c: 'fullstack', stack: ['python-plain colored', 'fastapi-plain colored', 'react-original colored', 'vitejs-plain colored', 'github-original'], tags: ['Semantic Search', 'Embeddings'], links: [['VIEW', 'https://github.com/suchitra0806/vector-search-engine']],
      d: "Upload documents and search them by meaning instead of keywords. Instead of reaching for an off-the-shelf vector DB, I wrote my own in-memory vector index with cosine similarity behind a FastAPI backend, paired with a clean React UI." },
    { n: 'Flow — Kanban Board', c: 'fullstack', stack: ['react-original colored', 'typescript-plain colored', 'supabase-plain colored', 'postgresql-plain colored', 'tailwindcss-plain colored', 'github-original'], tags: ['Drag & Drop', 'Row Level Security'], links: [['VIEW', 'https://github.com/suchitra0806/np-task-board']],
      d: "A drag-and-drop Kanban board with optimistic updates, labels, priorities, due-date urgency badges, and live board stats. Supabase anonymous auth gives every guest their own isolated board, and Postgres Row Level Security enforces that isolation on the server side." },
    { n: 'Crowd vs Cloud', c: 'ai', stack: ['react-original colored', 'typescript-plain colored', 'redis-plain colored', 'tailwindcss-plain colored', 'github-original'], tags: ['Reddit Devvit', 'Claude API', 'Hackathon'], links: [['VIEW', 'https://github.com/suchitra0806/crowd-vs-cloud']],
      d: "My submission to Reddit's Games with a Hook Hackathon. Humans try to out-write AI and then spot each other. Players answer a prompt, Claude quietly slips in its own answers, and everyone votes on what's human and what's AI. You score for catching the bots and for fooling the crowd. Built on Devvit with a Hono server and Redis for game state." },
    { n: 'DischargeIQ', c: 'ai', stack: ['python-plain colored', 'fastapi-plain colored', 'postgresql-plain colored', 'redis-plain colored', 'github-original'], tags: ['Multi-Agent AI', 'Healthcare AI', 'Claude API'], links: [['VIEW', 'https://github.com/DeepeshkumarApparSenthilkumar/DischargeIQ']],
      d: "Built agents 3 & 4 of a 5-agent pipeline that transforms hospital discharge PDFs into plain-language patient education — covering diagnoses, medications, follow-up care, and warning signs. Also owned the testing suite and contributed to the Streamlit frontend. Includes an LLM-as-Judge layer scoring outputs for clinical accuracy and Flesch-Kincaid readability." },
    { n: 'RuralReach', c: 'ai', stack: ['python-plain colored', 'tensorflow-original colored', 'numpy-plain colored', 'pandas-plain colored', 'github-original'], tags: ['DNN', 'Contextual AI'], links: [],
      d: "Built a deep learning system that doesn't just look at raw data, but also considers the \"why\" and \"where\" — environmental and situational cues — to predict behaviors more accurately. Handled the entire pipeline from feature engineering to neural network training." },
    { n: 'NBA Match Tracker', c: 'analytics', stack: ['react-original colored', 'typescript-plain colored', 'tailwindcss-plain colored', 'vitejs-plain colored', 'github-original'], tags: ['Data Viz', 'API Integration'], links: [['VIEW', 'https://github.com/suchitra0806/nba-tracker']],
      d: "Tired of clunky sports sites, I built this dashboard to be a snappy, minimal way to check NBA scores. Hits the balldontlie API for live game data and uses Recharts to turn raw box scores into visual trends." },
    { n: 'Semantic Talent Indexer', c: 'ai', stack: ['python-plain colored', 'github-original'], tags: ['NLP', 'Ollama', 'RAG'], links: [['VIEW', 'https://github.com/suchitra0806/semantic-talent-indexer']],
      d: "Built a RAG system that uses semantic search to find the best talent, moving beyond keyword matching. Set up a local inference pipeline using Ollama so all sensitive candidate data stays private and on-premises." },
    { n: 'HealthPredict', c: 'ai', stack: ['python-plain colored', 'jupyter-plain colored', 'pandas-plain colored', 'matplotlib-plain colored', 'github-original'], tags: ['Healthcare AI', 'Predictive Analytics'], links: [['VIEW', 'https://github.com/suchitra0806/med-no-show-prediction']],
      d: "Uses machine learning to predict if a patient is likely to miss their medical appointment. Built a random forest model prioritizing recall — missing a patient who needs help is a bigger deal than a false alarm." },
    { n: 'Weather Analysis', c: 'analytics', stack: ['python-plain colored', 'jupyter-plain colored', 'pandas-plain colored', 'matplotlib-plain colored', 'github-original'], tags: ['EDA'], links: [['VIEW', 'https://github.com/suchitra0806/EDA-On-Weather-Dataset']],
      d: "Started with a massive pile of atmospheric data and built a Python pipeline to clean everything up for time-series analysis. Visualized using Matplotlib and Seaborn to spot seasonal trends and atmospheric anomalies." },
    { n: 'Explain', c: 'ai', stack: ['nextjs-original', 'typescript-plain colored', 'tailwindcss-plain colored', 'openai-plain colored', 'github-original'], tags: ['AI', 'EdTech'], links: [['VIEW', 'https://github.com/suchitra0806/equations']],
      d: "Math shouldn't be intimidating. Built a universal translator for complex science — takes scary formulas like Navier-Stokes or Schrödinger and breaks them into plain English with AI-driven explanations and animated visualizations." },
    { n: 'Amigo', c: 'ai', stack: ['nextjs-original', 'typescript-plain colored', 'tailwindcss-plain colored', 'github-original'], tags: ['AI Assistant', 'F-1 Compliance', 'Gemini'], links: [['VIEW', 'https://github.com/suchitra0806/amigo']],
      d: "Built this for international students drowning in F-1 compliance rules. Tracks work authorization hours, OPT unemployment days, and tax deadlines — all in the browser with no account needed. The AI assistant is trained on F-1-specific topics so it actually gives useful answers instead of generic ones." },
    { n: 'Student Application', c: 'fullstack', stack: ['java-plain colored', 'spring-plain colored', 'react-plain colored', 'mysql-plain colored', 'github-original'], tags: ['REST API', 'Full Stack'], links: [['FRONTEND', 'https://github.com/suchitra0806/Student-application-frontend'], ['BACKEND', 'https://github.com/suchitra0806/Student-application-backend']],
      d: "Full-stack student management system showing how a Spring Boot API and React UI can work together perfectly on a single port. Built from scratch — RESTful architecture, component-based UI, smooth state management." },
    { n: 'B+-Tree Index Manager', c: 'database', stack: ['c-plain', 'github-original'], tags: ['File I/O', 'Memory Mgmt'], links: [],
      d: "Built a fully functional B+-tree index manager in C, mapping tree nodes to disk pages and implementing all core logic — splits, merges, and range scans. Integrated with a custom buffer manager for speed and persistence." },
    { n: 'Record Manager', c: 'database', stack: ['c-plain', 'github-original'], tags: ['File I/O', 'Data Structures'], links: [],
      d: "Built a record manager in C from the ground up to handle data tables with fixed schemas. Implemented insert, delete, and scan logic with custom data structures, page layouts, and a buffer manager for fast data access." },
];

const CLUBS_L = [
    ['TechNews @ Illinois Tech', [['Assistant Editor-In-Chief', 'Aug 2026 – Present'], ['Senior Writer & Copy Editor', 'Jan 2026 – Aug 2026'], ['General Writer', 'Aug 2025 – Dec 2025']]],
    ['IEEE @ IIT Student Chapter', [['President', 'Aug 2026 – Present'], ['Event Manager', 'Oct 2025 – Aug 2026']]],
];
const CLUBS_R = [
    ['ACM-W', [['Events Chair', 'Feb 2026 – Present']]],
    ['Product Management Club', [['Event Manager', 'Feb 2026 – Present']]],
    ['Crescent Literary Society', [['President', 'Jun 2024 – May 2025']]],
    ['Crescent Line (Newsletter)', [['Editor-In-Charge', 'Aug 2023 – Feb 2024']]],
];

/* ─── Chapter pages ─────────────────────────────────────────────────────── */
const esc = (s) => s.replace(/&/g, '&amp;');
const icons = (list) => `<div class="stack">${list.map((c) => `<i class="devicon-${c}"></i>`).join('')}</div>`;
const tagsHtml = (list) => `<div class="tags">${list.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>`;
const recNo = (i, label) => `<p class="rec-no">${i === 0 ? 'TITLE PAGE' : `REC ${String(i).padStart(3, '0')} / 006`}${label ? ' · ' + label : ''}</p>`;

const PAGES = [
    { id: 'prologue', tab: 'Prologue', title: 'Prologue', render: () => `
        ${recNo(0)}<h1>Suchitra<br>Rajkumar</h1>
        <p class="lede">Software engineer, AI + full stack. Reader of novels, explorer of cities.</p>
        <hr class="rule">
        <div class="prose"><p>Computer science master's student at Illinois Tech, Chicago. Seven folders follow: who I am, what I use, where I've worked, what I've built, what I do outside the editor, and how to reach me.</p></div>
        <span class="status">Fulcrum Defense internship complete — open to new quests</span>
        <p style="margin-top:22px"><a class="btn solid" href="#/profile">BEGIN WITH PROFILE &rarr;</a><a class="btn" href="mailto:suchiraj0806@gmail.com">SAY HELLO</a></p>` },
    { id: 'profile', tab: 'Profile', title: 'Player Profile', render: () => `
        ${recNo(1, 'ABOUT')}<h2 style="font-size:clamp(28px,5vw,40px);margin-bottom:28px">Hey, it's Suchitra...</h2>
        <div class="grid2"><div class="prose">
            <p>I'm a computer science master's student at Illinois Tech who loves building things from my imagination. If I think about something, I'll probably try coding it. My background is in software engineering, but I've fallen down the AI rabbit hole, and it's pretty fun here.</p>
            <p>I'm all about Python, cloud tech, and figuring out how to make machines a little more helpful. When I'm not at my desk, I'm probably drowned in a novel, exploring the city or looking for the best coffee in Chicago. Let's build the future (or just chat about it).</p>
            <span class="status">Fulcrum Defense internship complete — open to new quests</span></div>
            <figure class="portrait"><img src="about-me-image.jpg" alt="Suchitra Rajkumar"><figcaption>PLATE I. THE AUTHOR.</figcaption></figure></div>` },
    { id: 'inventory', tab: 'Inventory', title: 'Inventory', render: () => `
        ${recNo(2, 'SKILLS')}<h2 style="font-size:clamp(28px,5vw,40px);margin-bottom:30px">What's in the bag</h2>
        ${SKILLS.map(([n, items]) => `<section class="skillcat"><h3>${esc(n)}</h3><div class="skillgrid">${items.map(([c, l]) => `<div class="sk"><i class="devicon-${c}"></i>${l}</div>`).join('')}</div></section>`).join('')}` },
    { id: 'mission-log', tab: 'Mission log', title: 'Mission Log', render: () => `
        ${recNo(3, 'EXPERIENCE')}<h2 style="font-size:clamp(28px,5vw,40px);margin-bottom:30px">Where I've worked</h2>
        ${JOBS.map((j) => `<section class="job"><div class="when">${j.date}</div><div><h3>${esc(j.org)}</h3><p class="role">${esc(j.role)}</p>${icons(j.stack)}${j.body.map((p) => `<p class="body">${esc(p)}</p>`).join('')}</div></section>`).join('')}` },
    { id: 'quests', tab: 'Quests', title: 'Completed Quests', render: () => `
        ${recNo(4, 'PROJECTS')}<h2 style="font-size:clamp(28px,5vw,40px);margin-bottom:26px">Completed quests</h2>
        <div class="chips" role="group" aria-label="Filter projects">${[['all', 'ALL'], ...Object.entries(CATS).map(([k, v]) => [k, v[0]])].map(([k, l]) => `<button class="chip${k === 'all' ? ' on' : ''}" data-filter="${k}">${l}</button>`).join('')}</div>
        <div class="books">${PROJECTS.map((p, i) => `<article class="book" data-cat="${p.c}"><p class="vol">VOL. ${String(i + 1).padStart(2, '0')} · ${CATS[p.c][0]}</p><h3>${esc(p.n)}</h3>${icons(p.stack)}${tagsHtml(p.tags)}<p class="body">${esc(p.d)}</p>${p.links.length ? `<div class="links">${p.links.map(([l, u]) => `<a class="btn" href="${u}" target="_blank" rel="noopener">${l} &rarr;</a>`).join('')}</div>` : ''}</article>`).join('')}</div>` },
    { id: 'guild-hall', tab: 'Guild hall', title: 'Guild Hall', render: () => `
        ${recNo(5, 'EXTRACURRICULARS')}<h2 style="font-size:clamp(28px,5vw,40px);margin-bottom:30px">Outside the editor</h2>
        <div class="award"><p class="rec-no">★ ACHIEVEMENT UNLOCKED</p><h3>Chicago Startup Weekend 2026</h3><p class="role">1st Place Winner · 2026</p><p class="body">Won the Chicago Startup Weekend competition — pitched and built a startup concept from zero to final pitch in 54 hours alongside a team.</p></div>
        <div class="clubs">${[...CLUBS_L, ...CLUBS_R].map(([n, roles]) => `<section class="club"><h4>${esc(n)}</h4>${roles.map(([r, d]) => `<p><span>${d}</span>${esc(r)}</p>`).join('')}</section>`).join('')}</div>` },
    { id: 'contact', tab: 'Contact', title: 'Comms Terminal', render: () => `
        ${recNo(6, 'CONTACT')}<h1>The last page</h1>
        <p class="lede">Every good book ends with an invitation.</p><hr class="rule">
        <div class="prose"><p>Send me an email to know more about me or discuss opportunities.</p></div>
        <p><a class="btn solid" href="mailto:suchiraj0806@gmail.com">SEND MESSAGE &rarr;</a></p>
        <p style="margin-top:18px"><a class="btn" href="https://github.com/suchitra0806" target="_blank" rel="noopener">GITHUB</a><a class="btn" href="https://www.linkedin.com/in/suchitra-rajkumar8/" target="_blank" rel="noopener">LINKEDIN</a></p>` },
];

/* ─── Progress ──────────────────────────────────────────────────────────── */
const read = new Set();
try { JSON.parse(localStorage.getItem('folders-read') || '[]').forEach((i) => read.add(i)); } catch (_) { /* storage unavailable */ }
const markRead = (i) => { read.add(i); try { localStorage.setItem('folders-read', JSON.stringify([...read])); } catch (_) { /* ignore */ } };

/* ─── Landing ───────────────────────────────────────────────────────────── */
const REC = [
    ['“If I think about something, I’ll probably try coding it.”', 'SUCHITRA RAJKUMAR', 'Software engineer, AI + full stack. Illinois Tech, Chicago.'],
    ['“I’m a computer science master’s student who loves building things from my imagination.”', 'PROFILE', 'About me'],
    ['“I’m all about Python, cloud tech, and figuring out how to make machines a little more helpful.”', 'INVENTORY', 'Skills and tools'],
    ['“Shipped 51 merged PRs over ~11 weeks on fulcrum-gateway.”', 'MISSION LOG', 'Experience'],
    ['“Fifteen projects, filed as books. Open the folder to read them.”', 'QUESTS', 'Projects'],
    ['“Won Chicago Startup Weekend 2026: zero to final pitch in 54 hours.”', 'GUILD HALL', 'Clubs, leadership and awards'],
    ['“Send me an email to know more about me or discuss opportunities.”', 'CONTACT', 'Get in touch'],
];
const TAB_X = ['62%', '8%', '34%', '66%', '10%', '44%', '70%'];
const rec = { box: $('#record'), no: $('#recNo'), q: $('#recQuote'), n: $('#recName'), s: $('#recSub') };
let recT = 0;
function showRec(i) {
    rec.box.classList.add('swap');
    clearTimeout(recT);
    recT = setTimeout(() => {
        rec.no.textContent = i === 0 ? 'TITLE PAGE' : `REC ${String(i).padStart(3, '0')} / 006`;
        rec.q.textContent = REC[i][0]; rec.n.textContent = REC[i][1]; rec.s.textContent = REC[i][2];
        rec.box.classList.remove('swap');
    }, 120);
}
const folders = $('#folders');
folders.innerHTML = PAGES.map((p, i) => `<a class="folder" href="#/${p.id}" data-i="${i}" style="--w:${70 + i * 4}%;--tx:${TAB_X[i]}" aria-label="Open folder: ${p.title}"><span class="tab"><svg viewBox="0 0 132 23" preserveAspectRatio="none" aria-hidden="true"><path d="M0 23 12 1H120L132 23"/></svg><b>${p.tab}</b></span></a>`).join('')
    + '<a class="folder front" href="#/prologue" data-i="0" style="--w:100%;--tx:0" aria-label="Open the first folder"><span>FOLDERS / 07 FILES<b>START READING &rarr;</b></span></a>';
const fl = [...folders.children];
fl.forEach((f) => {
    const i = f.classList.contains('front') ? 0 : +f.dataset.i;
    f.addEventListener('mouseenter', () => showRec(i));
    f.addEventListener('focus', () => showRec(i));
});
folders.addEventListener('mouseleave', () => showRec(0));
showRec(0);
const paintFolders = () => fl.forEach((f) => f.classList.toggle('read', !f.classList.contains('front') && read.has(+f.dataset.i)));

/* ─── Router ────────────────────────────────────────────────────────────── */
const landing = $('#landing'), chapter = $('#chapter');
function route() {
    const id = location.hash.replace(/^#\/?/, '');
    const i = PAGES.findIndex((p) => p.id === id);
    if (i < 0) {
        chapter.hidden = true; landing.hidden = false;
        document.title = 'Suchitra Rajkumar — Portfolio';
        paintFolders(); scrollTo(0, 0);
        return;
    }
    const p = PAGES[i];
    markRead(i);
    $('#sheetTab').textContent = p.tab;
    $('#crumb').textContent = `${String(i + 1).padStart(2, '0')} / 07`;
    $('#sheetBody').innerHTML = p.render();
    const prev = PAGES[i - 1], next = PAGES[i + 1];
    $('#pager').innerHTML =
        (prev ? `<a class="prev" href="#/${prev.id}"><small>&larr; PREVIOUS</small><b>${prev.title}</b></a>` : '<span></span>') +
        (next ? `<a class="next" href="#/${next.id}"><small>NEXT &rarr;</small><b>${next.title}</b></a>` : `<a class="next" href="#"><small>THE END &rarr;</small><b>Back to the folders</b></a>`);
    document.title = `${p.title} — Suchitra Rajkumar`;
    landing.hidden = true;
    chapter.hidden = false;
    chapter.style.animation = 'none'; void chapter.offsetWidth; chapter.style.animation = '';
    scrollTo(0, 0);
}
addEventListener('hashchange', route);

/* project filter */
$('#sheetBody').addEventListener('click', (e) => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    const f = b.dataset.filter;
    $('#sheetBody').querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c === b));
    $('#sheetBody').querySelectorAll('.book').forEach((k) => k.classList.toggle('hide', f !== 'all' && k.dataset.cat !== f));
});

addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !chapter.hidden) location.hash = '';
});

route();
})();
