(() => {
  'use strict';

  const { modules, levels } = window.DAF_DATA;
  const config = window.DAF_CONFIG || { url: '', key: '' };
  const cloudConfigured = Boolean(config.url && config.key && !config.url.includes('YOUR_') && !config.key.includes('YOUR_'));

  const KEYS = {
    progress: 'daf-academy-v3-progress',
    activity: 'daf-academy-v3-activity',
    session: 'daf-academy-v3-session',
    aiHistory: 'daf-academy-v3-ai-history'
  };

  let state = {
    progress: loadJson(KEYS.progress, {}),
    activity: loadJson(KEYS.activity, { xp: 0, streak: 0, lastActive: null }),
    session: loadJson(KEYS.session, null),
    user: null,
    syncing: false,
    message: null
  };

  let assistantState = {
    open: false,
    loading: false,
    error: '',
    history: loadJson(KEYS.aiHistory, {})
  };

  let installPrompt = null;

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function yesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  }

  function moduleBySlug(slug) {
    return modules.find((m) => m.slug === slug);
  }

  function assistantMessages(slug) {
    return Array.isArray(assistantState.history[slug]) ? assistantState.history[slug] : [];
  }

  function saveAssistantHistory(slug, messages) {
    assistantState.history = {
      ...assistantState.history,
      [slug]: messages.slice(-20)
    };
    saveJson(KEYS.aiHistory, assistantState.history);
  }

  function assistantContext(r) {
    if (!r || !['module', 'quiz'].includes(r.view) || !r.slug) return null;
    const mod = moduleBySlug(r.slug);
    if (!mod || !mod.available) return null;

    const lessonText = (mod.sections || []).map((section, i) => {
      const bits = [
        `${i + 1}. ${section.title}`,
        section.body || '',
        section.formula ? `Formule : ${section.formula}` : '',
        section.bullets?.length ? `Points clés : ${section.bullets.join(' | ')}` : '',
        section.example ? `Exemple : ${section.example}` : ''
      ].filter(Boolean);
      return bits.join('\n');
    }).join('\n\n');

    const context = {
      mode: r.view === 'quiz' ? 'quiz' : 'course',
      moduleSlug: mod.slug,
      moduleOrder: mod.order,
      moduleTitle: mod.title,
      moduleDescription: mod.description,
      objectives: mod.objectives || [],
      lesson: lessonText
    };

    if (r.view === 'quiz') {
      const qs = getQuizState(r.slug);
      const q = mod.quiz?.[qs.index];
      if (q) {
        context.quiz = {
          questionNumber: qs.index + 1,
          totalQuestions: mod.quiz.length,
          question: q.question,
          options: q.options,
          selectedOption: qs.selected === null ? null : q.options[qs.selected],
          finished: Boolean(qs.finished)
        };
      }
    }
    return context;
  }

  function assistantTextHtml(text) {
    const safe = escapeHtml(text || '');
    return safe
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function assistantHtml(r) {
    const context = assistantContext(r);
    if (!context) return '';
    const messages = assistantMessages(context.moduleSlug);
    const isQuiz = context.mode === 'quiz';

    return `
      <button class="ai-fab" id="aiFab" aria-label="Ouvrir Assistant DAF">✦ <span>Assistant DAF</span></button>
      <aside class="ai-panel ${assistantState.open ? 'open' : ''}" id="aiPanel" aria-hidden="${assistantState.open ? 'false' : 'true'}">
        <div class="ai-panel-head">
          <div><span class="eyebrow">COACH IA</span><strong>Assistant DAF</strong><small>${escapeHtml(context.moduleTitle)}</small></div>
          <button class="ai-close" id="aiClose" aria-label="Fermer">×</button>
        </div>
        <div class="ai-notice">${isQuiz ? 'Mode quiz : je donne des indices sans révéler la bonne réponse avant la fin.' : 'Je connais le cours affiché et peux l’expliquer autrement.'}</div>
        <div class="ai-quick-actions">
          <button data-ai-prompt="Explique-moi le point le plus important de cette page très simplement.">Expliquer simplement</button>
          <button data-ai-prompt="Donne-moi un exemple chiffré concret adapté à un débutant.">Exemple chiffré</button>
          ${isQuiz ? '<button data-ai-prompt="Donne-moi un indice pour la question actuelle sans me révéler la réponse.">Un indice</button>' : '<button data-ai-prompt="Pose-moi une petite question pour vérifier que j’ai compris ce cours.">Teste-moi</button>'}
        </div>
        <div class="ai-messages" id="aiMessages">
          ${messages.length ? messages.map(m => `<div class="ai-msg ${m.role}"><div>${assistantTextHtml(m.text)}</div></div>`).join('') : `<div class="ai-empty"><strong>Pose ta question.</strong><span>Ex. « Pourquoi une hausse du DSO consomme du cash ? »</span></div>`}
          ${assistantState.loading ? '<div class="ai-msg assistant"><div class="ai-typing"><i></i><i></i><i></i></div></div>' : ''}
        </div>
        ${assistantState.error ? `<div class="ai-error">${escapeHtml(assistantState.error)}</div>` : ''}
        <form class="ai-form" id="aiForm">
          <textarea id="aiInput" rows="2" maxlength="1200" placeholder="Pose une question sur ce cours…" ${assistantState.loading ? 'disabled' : ''}></textarea>
          <button type="submit" class="button primary" ${assistantState.loading ? 'disabled' : ''}>Envoyer</button>
        </form>
        <div class="ai-footnote">Réponses générées par IA · évite d’y partager des données professionnelles confidentielles.</div>
      </aside>`;
  }

  async function sendAssistantMessage(text) {
    const r = route();
    const context = assistantContext(r);
    const message = String(text || '').trim();
    if (!context || !message || assistantState.loading) return;

    const oldMessages = assistantMessages(context.moduleSlug);
    const nextMessages = [...oldMessages, { role: 'user', text: message }].slice(-20);
    saveAssistantHistory(context.moduleSlug, nextMessages);
    assistantState.loading = true;
    assistantState.error = '';
    assistantState.open = true;
    render();

    try {
      const historyForApi = nextMessages.slice(-8, -1).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        text: String(m.text || '').slice(0, 2000)
      }));
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context, history: historyForApi })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Assistant momentanément indisponible.');
      const finalMessages = [...nextMessages, { role: 'assistant', text: data.reply || 'Je n’ai pas réussi à formuler une réponse.' }];
      saveAssistantHistory(context.moduleSlug, finalMessages);
    } catch (err) {
      assistantState.error = err?.message || 'Assistant momentanément indisponible.';
    } finally {
      assistantState.loading = false;
      render();
      requestAnimationFrame(() => {
        const box = document.getElementById('aiMessages');
        if (box) box.scrollTop = box.scrollHeight;
      });
    }
  }

  function progressFor(slug) {
    return state.progress[slug] || {
      moduleSlug: slug,
      lessonRead: false,
      bestScore: 0,
      attempts: 0,
      completed: false,
      updatedAt: new Date(0).toISOString()
    };
  }

  function saveProgressRecord(record) {
    state.progress = { ...state.progress, [record.moduleSlug]: record };
    saveJson(KEYS.progress, state.progress);
    if (state.user && cloudConfigured) {
      cloudUpsertProgress(record).catch(reportCloudError);
    }
  }

  function bumpActivity(xpGain) {
    const t = today();
    let streak = state.activity.streak || 0;
    if (state.activity.lastActive !== t) {
      streak = state.activity.lastActive === yesterday() ? Math.max(1, streak + 1) : 1;
    }
    state.activity = {
      xp: (state.activity.xp || 0) + xpGain,
      streak,
      lastActive: t
    };
    saveJson(KEYS.activity, state.activity);
    if (state.user && cloudConfigured) {
      cloudUpsertStats().catch(reportCloudError);
    }
  }

  async function markLessonRead(slug) {
    const old = progressFor(slug);
    const first = !old.lessonRead;
    const bestScore = old.bestScore || 0;
    const record = {
      moduleSlug: slug,
      lessonRead: true,
      bestScore,
      attempts: old.attempts || 0,
      completed: bestScore >= 70,
      updatedAt: new Date().toISOString()
    };
    saveProgressRecord(record);
    if (first) bumpActivity(20);
    render();
  }

  async function saveQuizScore(slug, score) {
    const old = progressFor(slug);
    const bestScore = Math.max(old.bestScore || 0, score);
    const completed = Boolean(old.lessonRead) && bestScore >= 70;
    const firstCompletion = completed && !old.completed;
    const record = {
      moduleSlug: slug,
      lessonRead: Boolean(old.lessonRead),
      bestScore,
      attempts: (old.attempts || 0) + 1,
      completed,
      updatedAt: new Date().toISOString()
    };
    saveProgressRecord(record);
    bumpActivity(10 + (firstCompletion ? 50 : 0));
    if (state.user && cloudConfigured) {
      cloudInsertAttempt(slug, score).catch(reportCloudError);
    }
  }

  function authHeaders(token) {
    return {
      apikey: config.key,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  function sessionExpired(session) {
    if (!session || !session.access_token) return true;
    if (!session.expires_at) return false;
    return Date.now() >= (session.expires_at - 60) * 1000;
  }

  async function ensureSession() {
    if (!cloudConfigured || !state.session) return null;
    if (!sessionExpired(state.session)) return state.session;
    if (!state.session.refresh_token) return null;

    const res = await fetch(`${config.url}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { apikey: config.key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: state.session.refresh_token })
    });
    if (!res.ok) {
      clearSession();
      return null;
    }
    const data = await res.json();
    setSession(data);
    return state.session;
  }

  function setSession(data) {
    if (!data || !data.access_token) return;
    const expiresAt = data.expires_at || Math.floor(Date.now() / 1000) + (data.expires_in || 3600);
    state.session = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: expiresAt,
      user: data.user || state.session?.user || null
    };
    state.user = state.session.user;
    saveJson(KEYS.session, state.session);
  }

  function clearSession() {
    state.session = null;
    state.user = null;
    localStorage.removeItem(KEYS.session);
  }

  async function signUp(email, password) {
    if (!cloudConfigured) throw new Error('La synchronisation cloud n’est pas configurée.');
    const res = await fetch(`${config.url}/auth/v1/signup`, {
      method: 'POST',
      headers: { apikey: config.key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.msg || data.message || 'Impossible de créer le compte.');
    if (data.access_token) {
      setSession(data);
      await hydrateFromCloud();
      return { signedIn: true };
    }
    return { signedIn: false, confirmationRequired: true };
  }

  async function signIn(email, password) {
    if (!cloudConfigured) throw new Error('La synchronisation cloud n’est pas configurée.');
    const res = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { apikey: config.key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error_description || data.msg || data.message || 'Email ou mot de passe incorrect.');
    setSession(data);
    await hydrateFromCloud();
  }

  async function signOut() {
    try {
      const session = await ensureSession();
      if (session) {
        await fetch(`${config.url}/auth/v1/logout`, {
          method: 'POST',
          headers: authHeaders(session.access_token)
        });
      }
    } catch (_) {
      // Local sign-out still happens if the network is unavailable.
    }
    clearSession();
    location.hash = '#/';
    render();
  }

  async function restFetch(path, options = {}) {
    const session = await ensureSession();
    if (!session) throw new Error('Session expirée. Reconnecte-toi.');
    const headers = { ...authHeaders(session.access_token), ...(options.headers || {}) };
    return fetch(`${config.url}/rest/v1/${path}`, { ...options, headers });
  }

  async function cloudUpsertProgress(record) {
    const userId = state.user?.id || state.session?.user?.id;
    if (!userId) return;
    const payload = {
      user_id: userId,
      module_slug: record.moduleSlug,
      lesson_read: Boolean(record.lessonRead),
      best_score: record.bestScore || 0,
      attempts: record.attempts || 0,
      completed: Boolean(record.completed),
      updated_at: record.updatedAt
    };
    const res = await restFetch('user_progress?on_conflict=user_id,module_slug', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await readableError(res));
  }

  async function cloudInsertAttempt(slug, score) {
    const userId = state.user?.id || state.session?.user?.id;
    if (!userId) return;
    const res = await restFetch('quiz_attempts', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ user_id: userId, module_slug: slug, score })
    });
    if (!res.ok) throw new Error(await readableError(res));
  }

  async function cloudUpsertStats() {
    const userId = state.user?.id || state.session?.user?.id;
    if (!userId) return;
    const res = await restFetch('user_stats?on_conflict=user_id', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({
        user_id: userId,
        xp: state.activity.xp || 0,
        streak: state.activity.streak || 0,
        last_active_date: state.activity.lastActive
      })
    });
    if (!res.ok) throw new Error(await readableError(res));
  }

  async function hydrateFromCloud() {
    if (!cloudConfigured || !state.session) return;
    state.syncing = true;
    renderHeaderOnly();
    try {
      const session = await ensureSession();
      if (!session) return;
      state.user = session.user || state.user;

      if (!state.user) {
        const userRes = await fetch(`${config.url}/auth/v1/user`, {
          headers: authHeaders(session.access_token)
        });
        if (userRes.ok) {
          state.user = await userRes.json();
          state.session.user = state.user;
          saveJson(KEYS.session, state.session);
        }
      }

      const [progressRes, statsRes] = await Promise.all([
        restFetch('user_progress?select=*'),
        restFetch('user_stats?select=*')
      ]);
      if (!progressRes.ok) throw new Error(await readableError(progressRes));
      if (!statsRes.ok) throw new Error(await readableError(statsRes));

      const rows = await progressRes.json();
      const statsRows = await statsRes.json();
      const cloud = {};
      for (const r of rows || []) {
        cloud[r.module_slug] = {
          moduleSlug: r.module_slug,
          lessonRead: Boolean(r.lesson_read),
          bestScore: r.best_score || 0,
          attempts: r.attempts || 0,
          completed: Boolean(r.completed),
          updatedAt: r.updated_at || new Date(0).toISOString()
        };
      }

      const merged = { ...cloud };
      for (const [slug, local] of Object.entries(state.progress)) {
        const remote = cloud[slug];
        if (!remote) {
          merged[slug] = local;
        } else {
          merged[slug] = {
            moduleSlug: slug,
            lessonRead: Boolean(local.lessonRead || remote.lessonRead),
            bestScore: Math.max(local.bestScore || 0, remote.bestScore || 0),
            attempts: Math.max(local.attempts || 0, remote.attempts || 0),
            completed: Boolean(local.completed || remote.completed || ((local.lessonRead || remote.lessonRead) && Math.max(local.bestScore || 0, remote.bestScore || 0) >= 70)),
            updatedAt: new Date(local.updatedAt).getTime() >= new Date(remote.updatedAt).getTime() ? local.updatedAt : remote.updatedAt
          };
        }
      }
      state.progress = merged;
      saveJson(KEYS.progress, merged);

      for (const record of Object.values(merged)) {
        const remote = cloud[record.moduleSlug];
        if (!remote || JSON.stringify(remote) !== JSON.stringify(record)) {
          await cloudUpsertProgress(record);
        }
      }

      const cloudStats = statsRows?.[0];
      if (cloudStats) {
        const localDate = state.activity.lastActive || '';
        const cloudDate = cloudStats.last_active_date || '';
        state.activity = {
          xp: Math.max(state.activity.xp || 0, cloudStats.xp || 0),
          streak: localDate >= cloudDate ? state.activity.streak || 0 : cloudStats.streak || 0,
          lastActive: localDate >= cloudDate ? state.activity.lastActive : cloudStats.last_active_date
        };
        saveJson(KEYS.activity, state.activity);
      }
      await cloudUpsertStats();
      state.message = { type: 'success', text: 'Progression synchronisée.' };
    } finally {
      state.syncing = false;
      render();
    }
  }

  async function readableError(res) {
    const data = await res.json().catch(() => null);
    return data?.message || data?.msg || data?.hint || `${res.status} ${res.statusText}`;
  }

  function reportCloudError(err) {
    console.error(err);
    state.message = { type: 'error', text: `Synchronisation cloud : ${err.message}` };
    render();
  }

  function dashboardStats() {
    const available = modules.filter((m) => m.available);
    const completed = available.filter((m) => progressFor(m.slug).completed).length;
    const started = available.filter((m) => {
      const p = progressFor(m.slug);
      return p.lessonRead || p.attempts > 0;
    }).length;
    return {
      available: available.length,
      completed,
      started,
      percent: available.length ? Math.round((completed / available.length) * 100) : 0
    };
  }

  function statusFor(mod) {
    if (!mod.available) return { cls: 'locked', label: 'À venir' };
    const p = progressFor(mod.slug);
    if (p.completed) return { cls: 'done', label: 'Validé' };
    if (p.lessonRead || p.attempts) return { cls: 'started', label: 'En cours' };
    return { cls: 'new', label: 'À commencer' };
  }

  function headerHtml() {
    const userLabel = state.user?.email || state.session?.user?.email || '';
    return `
      <header class="topbar">
        <a class="brand" href="#/" aria-label="DAF Academy accueil">
          <span class="brand-mark">DAF</span>
          <span><strong>Academy</strong><small>Finance → CFO</small></span>
        </a>
        <div class="header-stats">
          <div><b>${state.activity.xp || 0}</b><span>XP</span></div>
          <div><b>${state.activity.streak || 0}</b><span>jours</span></div>
        </div>
        <div class="header-actions">
          ${state.syncing ? '<span class="syncing">Synchronisation…</span>' : ''}
          ${installPrompt ? '<button class="text-btn" id="installBtn">Installer</button>' : ''}
          ${userLabel
            ? `<span class="user-email" title="${escapeHtml(userLabel)}">${escapeHtml(userLabel)}</span><button class="text-btn" id="signOutBtn">Se déconnecter</button>`
            : `<a class="text-btn" href="#/auth">${cloudConfigured ? 'Se connecter' : 'Mode invité'}</a>`}
        </div>
      </header>`;
  }

  function messageHtml() {
    if (!state.message) return '';
    const msg = state.message;
    state.message = null;
    return `<div class="toast ${msg.type || ''}">${escapeHtml(msg.text)}</div>`;
  }

  function renderHome() {
    const stats = dashboardStats();
    const next = modules.find((m) => m.available && !progressFor(m.slug).completed) || modules.find((m) => m.available);
    return `
      <main class="page-shell">
        ${messageHtml()}
        ${!cloudConfigured ? `
          <div class="cloud-banner">
            <strong>Mode invité actif.</strong>
            <span>Les cours fonctionnent, mais la synchro entre appareils sera activée dès que <code>config.js</code> contient tes 2 valeurs Supabase.</span>
          </div>` : ''}
        <section class="hero">
          <div>
            <span class="eyebrow">PARCOURS DAF · DU DÉBUTANT AU CFO</span>
            <h1>Apprends la finance<br>en construisant tes réflexes.</h1>
            <p>Cours courts, exemples concrets, quiz et progression mesurable. Tu avances des fondamentaux jusqu’aux sujets de DAF.</p>
            ${next ? `<a class="button primary" href="#/module/${next.slug}">${stats.started ? 'Continuer le parcours' : 'Commencer'} →</a>` : ''}
          </div>
          <div class="hero-card">
            <div class="progress-ring" style="--p:${stats.percent}"><span>${stats.percent}%</span></div>
            <div>
              <b>${stats.completed}/${stats.available}</b>
              <span>modules disponibles validés</span>
            </div>
          </div>
        </section>

        <section class="summary-grid">
          <div class="metric-card"><span>Progression</span><strong>${stats.percent}%</strong><small>${stats.completed} modules validés</small></div>
          <div class="metric-card"><span>Expérience</span><strong>${state.activity.xp || 0} XP</strong><small>+20 cours · +10 quiz · +50 validation</small></div>
          <div class="metric-card"><span>Série</span><strong>${state.activity.streak || 0} jour${(state.activity.streak || 0) > 1 ? 's' : ''}</strong><small>Une activité par jour suffit</small></div>
        </section>

        <section class="curriculum">
          <div class="section-heading">
            <div><span class="eyebrow">CURRICULUM</span><h2>50 modules en 6 niveaux</h2></div>
            <p>Les 16 premiers sont entièrement jouables aujourd’hui. Les suivants forment la roadmap du parcours.</p>
          </div>
          ${levels.map(level => {
            const levelMods = modules.filter(m => m.level === level.id);
            return `
              <div class="level-block">
                <div class="level-header">
                  <div class="level-number">${level.id}</div>
                  <div><h3>${escapeHtml(level.title)}</h3><p>${escapeHtml(level.subtitle)}</p></div>
                </div>
                <div class="module-grid">
                  ${levelMods.map(mod => moduleCard(mod)).join('')}
                </div>
              </div>`;
          }).join('')}
        </section>
      </main>`;
  }

  function moduleCard(mod) {
    const p = progressFor(mod.slug);
    const status = statusFor(mod);
    const pct = p.completed ? 100 : p.lessonRead ? Math.max(50, p.bestScore) : p.bestScore || 0;
    const tag = `<span class="status ${status.cls}">${status.label}</span>`;
    if (!mod.available) {
      return `<article class="module-card locked-card">
        <div class="module-top"><span class="module-index">${String(mod.order).padStart(2, '0')}</span>${tag}</div>
        <h4>${escapeHtml(mod.title)}</h4><p>${escapeHtml(mod.description)}</p>
        <div class="module-meta"><span>${mod.duration} min</span><span>${escapeHtml(mod.difficulty)}</span></div>
      </article>`;
    }
    return `<a class="module-card" href="#/module/${mod.slug}">
      <div class="module-top"><span class="module-index">${String(mod.order).padStart(2, '0')}</span>${tag}</div>
      <h4>${escapeHtml(mod.title)}</h4><p>${escapeHtml(mod.description)}</p>
      <div class="mini-progress"><span style="width:${Math.min(100, pct)}%"></span></div>
      <div class="module-meta"><span>${mod.duration} min</span><span>${escapeHtml(mod.difficulty)}</span>${p.bestScore ? `<span>Quiz ${p.bestScore}%</span>` : ''}</div>
    </a>`;
  }

  function renderModule(slug) {
    const mod = moduleBySlug(slug);
    if (!mod || !mod.available) return renderNotFound();
    const p = progressFor(slug);
    return `
      <main class="lesson-shell">
        ${messageHtml()}
        <a class="back-link" href="#/">← Retour au parcours</a>
        <section class="lesson-hero">
          <div>
            <span class="eyebrow">MODULE ${mod.order} · NIVEAU ${mod.level}</span>
            <h1>${escapeHtml(mod.title)}</h1>
            <p>${escapeHtml(mod.description)}</p>
            <div class="module-meta big"><span>${mod.duration} min</span><span>${escapeHtml(mod.difficulty)}</span>${p.bestScore ? `<span>Meilleur quiz : ${p.bestScore}%</span>` : ''}</div>
          </div>
          <div class="lesson-state ${p.completed ? 'complete' : ''}">
            <strong>${p.completed ? '✓ Validé' : p.lessonRead ? 'Cours lu' : 'À commencer'}</strong>
            <span>Validation : cours lu + quiz ≥ 70%</span>
          </div>
        </section>

        <section class="objectives">
          <span class="eyebrow">OBJECTIFS</span>
          <div>${(mod.objectives || []).map(o => `<span>✓ ${escapeHtml(o)}</span>`).join('')}</div>
        </section>

        <section class="lesson-content">
          ${(mod.sections || []).map((section, i) => `
            <article class="lesson-section">
              <span class="section-n">${String(i + 1).padStart(2, '0')}</span>
              <h2>${escapeHtml(section.title)}</h2>
              <p>${escapeHtml(section.body)}</p>
              ${section.formula ? `<div class="formula">${escapeHtml(section.formula)}</div>` : ''}
              ${section.bullets ? `<ul>${section.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
              ${section.example ? `<div class="example"><strong>Exemple</strong><p>${escapeHtml(section.example)}</p></div>` : ''}
            </article>`).join('')}
        </section>

        <section class="lesson-footer-card">
          <div><span class="eyebrow">ÉTAPE SUIVANTE</span><h2>Valide ce que tu viens d’apprendre.</h2><p>Le module est validé une fois le cours lu et le quiz réussi à 70% minimum.</p></div>
          <div class="lesson-actions">
            <button class="button ${p.lessonRead ? 'success' : 'secondary'}" id="markReadBtn">${p.lessonRead ? '✓ Cours marqué comme lu' : 'Marquer le cours comme lu'}</button>
            <a class="button primary" href="#/quiz/${mod.slug}">Faire le quiz →</a>
          </div>
        </section>
      </main>`;
  }

  function renderQuiz(slug) {
    const mod = moduleBySlug(slug);
    if (!mod || !mod.available || !Array.isArray(mod.quiz) || !mod.quiz.length) return renderNotFound();
    const quizState = getQuizState(slug, mod.quiz.length);

    if (quizState.finished) return renderQuizResult(mod, quizState);

    const q = mod.quiz[quizState.index];
    return `
      <main class="quiz-shell">
        <div class="quiz-header"><a href="#/module/${slug}">← Cours</a><span>${quizState.index + 1} / ${mod.quiz.length}</span></div>
        <div class="quiz-progress"><span style="width:${((quizState.index + 1) / mod.quiz.length) * 100}%"></span></div>
        <span class="eyebrow">QUIZ · ${escapeHtml(mod.title)}</span>
        <h1>${escapeHtml(q.question)}</h1>
        <div class="options" id="quizOptions">
          ${q.options.map((opt, i) => `<button class="option-btn ${quizState.selected === i ? 'selected' : ''}" data-index="${i}"><span>${String.fromCharCode(65 + i)}</span>${escapeHtml(opt)}</button>`).join('')}
        </div>
        <button class="button primary quiz-next" id="quizNextBtn" ${quizState.selected === null ? 'disabled' : ''}>${quizState.index === mod.quiz.length - 1 ? 'Voir mon résultat' : 'Question suivante →'}</button>
      </main>`;
  }

  const quizMemory = {};
  function getQuizState(slug) {
    if (!quizMemory[slug]) quizMemory[slug] = { index: 0, selected: null, answers: [], finished: false, score: 0 };
    return quizMemory[slug];
  }

  async function quizNext(slug) {
    const mod = moduleBySlug(slug);
    const qs = getQuizState(slug);
    if (!mod || qs.selected === null) return;
    qs.answers.push(qs.selected);
    if (qs.index === mod.quiz.length - 1) {
      const right = mod.quiz.reduce((acc, q, i) => acc + (qs.answers[i] === q.correctIndex ? 1 : 0), 0);
      qs.score = Math.round((right / mod.quiz.length) * 100);
      qs.finished = true;
      await saveQuizScore(slug, qs.score);
    } else {
      qs.index += 1;
      qs.selected = null;
    }
    render();
  }

  function renderQuizResult(mod, qs) {
    const passed = qs.score >= 70;
    const p = progressFor(mod.slug);
    const next = modules.find(m => m.available && m.order > mod.order);
    return `
      <main class="quiz-shell result-shell">
        <span class="eyebrow">RÉSULTAT · MODULE ${mod.order}</span>
        <div class="score-badge ${passed ? 'pass' : 'fail'}"><strong>${qs.score}%</strong><span>${passed ? 'Quiz réussi' : 'À retravailler'}</span></div>
        <h1>${passed ? 'Bien joué.' : 'Tu y es presque.'}</h1>
        <p class="result-lead">Meilleur score : <strong>${p.bestScore}%</strong>. Pour valider le module, pense aussi à marquer le cours comme lu.</p>
        <div class="review-list">
          ${mod.quiz.map((q, i) => {
            const ok = qs.answers[i] === q.correctIndex;
            return `<article class="review ${ok ? 'ok' : 'bad'}"><div class="review-icon">${ok ? '✓' : '×'}</div><div><strong>${escapeHtml(q.question)}</strong><p>${escapeHtml(q.explanation)}</p><small>Bonne réponse : ${escapeHtml(q.options[q.correctIndex])}</small></div></article>`;
          }).join('')}
        </div>
        <div class="result-actions">
          <button class="button secondary" id="retryQuizBtn">Refaire le quiz</button>
          <a class="button secondary" href="#/module/${mod.slug}">Revoir le cours</a>
          ${passed && next ? `<a class="button primary" href="#/module/${next.slug}">Module suivant →</a>` : `<a class="button primary" href="#/">Retour au parcours</a>`}
        </div>
      </main>`;
  }

  function renderAuth() {
    if (!cloudConfigured) {
      return `<main class="auth-shell"><a class="back-link" href="#/">← Retour</a><section class="auth-card"><span class="eyebrow">SYNCHRONISATION CLOUD</span><h1>Il reste une seule configuration.</h1><p>Renseigne ton Project URL et ta Publishable key Supabase dans <code>config.js</code>. L’app continuera de fonctionner en mode invité tant que ce n’est pas fait.</p></section></main>`;
    }
    if (state.user || state.session?.user) {
      const email = state.user?.email || state.session.user.email;
      return `<main class="auth-shell"><a class="back-link" href="#/">← Retour</a><section class="auth-card"><span class="eyebrow">COMPTE</span><h1>Tu es connecté.</h1><p>${escapeHtml(email)}</p><button class="button primary" id="syncNowBtn">Synchroniser maintenant</button><button class="button secondary" id="signOutPageBtn">Se déconnecter</button></section></main>`;
    }
    return `<main class="auth-shell">
      ${messageHtml()}
      <a class="back-link" href="#/">← Retour</a>
      <section class="auth-card">
        <span class="eyebrow">COMPTE GRATUIT</span>
        <h1>Retrouve ta progression partout.</h1>
        <p>Connecte-toi pour synchroniser tes cours, scores, XP et streak entre tes appareils.</p>
        <div class="auth-tabs"><button class="active" data-auth-tab="signin">Connexion</button><button data-auth-tab="signup">Créer un compte</button></div>
        <form id="authForm" data-mode="signin">
          <label>Email<input type="email" name="email" required autocomplete="email"></label>
          <label>Mot de passe<input type="password" name="password" required minlength="6" autocomplete="current-password"></label>
          <button class="button primary" type="submit">Se connecter</button>
          <p class="form-error" id="authError"></p>
        </form>
      </section>
    </main>`;
  }

  function renderNotFound() {
    return `<main class="auth-shell"><section class="auth-card"><h1>Page introuvable</h1><p>Ce contenu n’est pas encore disponible.</p><a class="button primary" href="#/">Retour au parcours</a></section></main>`;
  }

  function route() {
    const raw = location.hash.replace(/^#/, '') || '/';
    const parts = raw.split('/').filter(Boolean);
    if (!parts.length) return { view: 'home' };
    if (parts[0] === 'module' && parts[1]) return { view: 'module', slug: decodeURIComponent(parts[1]) };
    if (parts[0] === 'quiz' && parts[1]) return { view: 'quiz', slug: decodeURIComponent(parts[1]) };
    if (parts[0] === 'auth') return { view: 'auth' };
    return { view: '404' };
  }

  function render() {
    const app = document.getElementById('app');
    const r = route();
    let body = '';
    if (r.view === 'home') body = renderHome();
    else if (r.view === 'module') body = renderModule(r.slug);
    else if (r.view === 'quiz') body = renderQuiz(r.slug);
    else if (r.view === 'auth') body = renderAuth();
    else body = renderNotFound();
    app.innerHTML = `${headerHtml()}${body}${assistantHtml(r)}<footer class="footer">DAF Academy · V3.1 · progression Supabase + Assistant DAF</footer>`;
    bindEvents(r);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderHeaderOnly() {
    // Keep UI responsive during cloud operations; a full render follows immediately after.
    const top = document.querySelector('.topbar');
    if (top) top.outerHTML = headerHtml();
  }

  function bindEvents(r) {
    document.getElementById('aiFab')?.addEventListener('click', () => {
      assistantState.open = true;
      render();
      requestAnimationFrame(() => document.getElementById('aiInput')?.focus());
    });
    document.getElementById('aiClose')?.addEventListener('click', () => {
      assistantState.open = false;
      render();
    });
    document.querySelectorAll('[data-ai-prompt]').forEach(btn => {
      btn.addEventListener('click', () => sendAssistantMessage(btn.dataset.aiPrompt || ''));
    });
    document.getElementById('aiForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('aiInput');
      const value = input?.value || '';
      if (input) input.value = '';
      sendAssistantMessage(value);
    });

    document.getElementById('signOutBtn')?.addEventListener('click', signOut);
    document.getElementById('signOutPageBtn')?.addEventListener('click', signOut);
    document.getElementById('syncNowBtn')?.addEventListener('click', hydrateFromCloud);
    document.getElementById('installBtn')?.addEventListener('click', async () => {
      if (!installPrompt) return;
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      render();
    });

    if (r.view === 'module') {
      document.getElementById('markReadBtn')?.addEventListener('click', () => markLessonRead(r.slug));
    }

    if (r.view === 'quiz') {
      const qs = getQuizState(r.slug);
      document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          qs.selected = Number(btn.dataset.index);
          render();
        });
      });
      document.getElementById('quizNextBtn')?.addEventListener('click', () => quizNext(r.slug));
      document.getElementById('retryQuizBtn')?.addEventListener('click', () => {
        quizMemory[r.slug] = { index: 0, selected: null, answers: [], finished: false, score: 0 };
        render();
      });
    }

    if (r.view === 'auth') {
      document.querySelectorAll('[data-auth-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('[data-auth-tab]').forEach(b => b.classList.toggle('active', b === btn));
          const form = document.getElementById('authForm');
          if (!form) return;
          const mode = btn.dataset.authTab;
          form.dataset.mode = mode;
          form.querySelector('button[type="submit"]').textContent = mode === 'signup' ? 'Créer mon compte' : 'Se connecter';
          form.querySelector('input[name="password"]').autocomplete = mode === 'signup' ? 'new-password' : 'current-password';
          document.getElementById('authError').textContent = '';
        });
      });
      document.getElementById('authForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const error = document.getElementById('authError');
        const submit = form.querySelector('button[type="submit"]');
        error.textContent = '';
        submit.disabled = true;
        submit.textContent = 'Patiente…';
        const fd = new FormData(form);
        const email = String(fd.get('email') || '').trim();
        const password = String(fd.get('password') || '');
        try {
          if (form.dataset.mode === 'signup') {
            const result = await signUp(email, password);
            if (!result.signedIn) {
              state.message = { type: 'success', text: 'Compte créé. Vérifie ton email pour confirmer ton adresse, puis connecte-toi.' };
              render();
              return;
            }
          } else {
            await signIn(email, password);
          }
          location.hash = '#/';
          render();
        } catch (err) {
          error.textContent = err.message;
          submit.disabled = false;
          submit.textContent = form.dataset.mode === 'signup' ? 'Créer mon compte' : 'Se connecter';
        }
      });
    }
  }

  async function bootstrap() {
    if (cloudConfigured && state.session) {
      try {
        const session = await ensureSession();
        if (session) {
          state.user = session.user || null;
          await hydrateFromCloud();
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }
    render();
  }

  window.addEventListener('hashchange', () => {
    const r = route();
    if (!['module', 'quiz'].includes(r.view)) assistantState.open = false;
    render();
  });
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    render();
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(console.error));
  }

  bootstrap();
})();
