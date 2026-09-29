const MODEL = 'gemini-3.5-flash-lite';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM_PROMPT = `Tu es Assistant DAF, le coach pédagogique intégré à DAF Academy.
Ton objectif est de faire progresser un apprenant débutant vers un niveau DAF/CFO.

Règles pédagogiques :
- Réponds en français sauf demande explicite contraire.
- Sois clair, concret et assez concis. Commence simple, puis approfondis si nécessaire.
- Utilise en priorité le contexte du module fourni. Si une information manque, dis-le au lieu de l'inventer.
- Donne volontiers de petits exemples chiffrés, des analogies et des réflexes de DAF.
- Quand le contexte indique mode=quiz et finished=false, ne révèle jamais la bonne option, sa lettre, ni ne confirme directement qu'une option sélectionnée est correcte ou incorrecte. Donne un indice, rappelle la logique ou pose une question intermédiaire.
- Une fois le quiz terminé, tu peux expliquer librement les corrections.
- Si l'utilisateur demande une réponse hors sujet, réponds brièvement puis ramène si possible au thème finance/DAF.
- Ne prétends jamais avoir accès à des données qui ne figurent pas dans le contexte.
- Évite les longs pavés : 2 à 6 courts paragraphes ou quelques puces quand cela aide.`;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function cleanText(value, max = 6000) {
  return String(value ?? '').slice(0, max);
}

function cleanContext(raw = {}) {
  const quiz = raw.quiz && typeof raw.quiz === 'object' ? {
    questionNumber: Number(raw.quiz.questionNumber || 0),
    totalQuestions: Number(raw.quiz.totalQuestions || 0),
    question: cleanText(raw.quiz.question, 1600),
    options: Array.isArray(raw.quiz.options) ? raw.quiz.options.slice(0, 8).map(x => cleanText(x, 500)) : [],
    selectedOption: raw.quiz.selectedOption == null ? null : cleanText(raw.quiz.selectedOption, 500),
    finished: Boolean(raw.quiz.finished)
  } : null;

  return {
    mode: raw.mode === 'quiz' ? 'quiz' : 'course',
    moduleSlug: cleanText(raw.moduleSlug, 120),
    moduleOrder: Number(raw.moduleOrder || 0),
    moduleTitle: cleanText(raw.moduleTitle, 300),
    moduleDescription: cleanText(raw.moduleDescription, 1200),
    objectives: Array.isArray(raw.objectives) ? raw.objectives.slice(0, 12).map(x => cleanText(x, 500)) : [],
    lesson: cleanText(raw.lesson, 12000),
    quiz
  };
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') return json({ error: 'Méthode non autorisée.' }, 405);

    const origin = request.headers.get('origin');
    if (origin) {
      try {
        if (new URL(origin).host !== new URL(request.url).host) {
          return json({ error: 'Origine non autorisée.' }, 403);
        }
      } catch (_) {
        return json({ error: 'Origine invalide.' }, 403);
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return json({ error: 'La clé Gemini n’est pas configurée dans Vercel.' }, 503);

    try {
      const body = await request.json();
      const message = cleanText(body?.message, 1200).trim();
      if (!message) return json({ error: 'Question vide.' }, 400);

      const context = cleanContext(body?.context || {});
      const history = Array.isArray(body?.history) ? body.history.slice(-8) : [];
      const contents = [];

      for (const item of history) {
        const text = cleanText(item?.text, 2000).trim();
        if (!text) continue;
        contents.push({
          role: item?.role === 'assistant' ? 'model' : 'user',
          parts: [{ text }]
        });
      }

      const contextualPrompt = `CONTEXTE DAF ACADEMY\n${JSON.stringify(context)}\n\nQUESTION DE L'APPRENANT\n${message}`;
      contents.push({ role: 'user', parts: [{ text: contextualPrompt }] });

      const geminiRes = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 900 }
        })
      });

      const data = await geminiRes.json().catch(() => ({}));
      if (!geminiRes.ok) {
        const message = data?.error?.message || `Gemini API : erreur ${geminiRes.status}`;
        return json({ error: message }, geminiRes.status === 429 ? 429 : 502);
      }

      const reply = (data?.candidates?.[0]?.content?.parts || [])
        .map(part => part?.text || '')
        .join('\n')
        .trim();

      if (!reply) return json({ error: 'Gemini n’a pas renvoyé de réponse.' }, 502);
      return json({ reply, model: MODEL });
    } catch (error) {
      console.error('assistant error', error);
      return json({ error: 'Erreur interne de l’assistant.' }, 500);
    }
  }
};
