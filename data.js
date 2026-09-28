
const q = (id, question, options, correctIndex, explanation) => ({ id, question, options, correctIndex, explanation })

const ready = [
  {
    slug:'role-finance', level:1, order:1, title:'À quoi sert la finance ?', duration:12, difficulty:'Débutant', available:true,
    description:'Comprendre le rôle de la finance et la différence entre comptabilité, contrôle de gestion et trésorerie.',
    objectives:['Comprendre les grandes missions de la finance','Distinguer comptabilité, FP&A et trésorerie','Relier performance, rentabilité et cash'],
    sections:[
      {title:'La finance traduit l’activité en décisions', body:'La finance ne consiste pas seulement à enregistrer des chiffres. Elle mesure ce qui s’est passé, aide à comprendre pourquoi, puis éclaire les décisions futures.', bullets:['Comptabilité : fiabiliser les faits passés','Contrôle de gestion / FP&A : analyser et prévoir','Trésorerie : sécuriser le cash','DAF : arbitrer et piloter']},
      {title:'Trois questions fondamentales', body:'Toute analyse financière revient souvent à trois questions : est-ce rentable, est-ce financé, et est-ce durable ?', bullets:['Rentabilité : création de marge et de résultat','Liquidité : capacité à payer les échéances','Solidité : niveau de dette et structure du bilan']},
      {title:'Le réflexe DAF', body:'Un bon financier relie toujours résultat, bilan et cash. Une entreprise peut être rentable sur le papier et manquer de trésorerie.', example:'Une société vend plus, mais ses clients paient à 90 jours : le résultat progresse alors que la trésorerie peut se dégrader.'}
    ],
    quiz:[
      q('r1','Quel est le rôle principal de la comptabilité ?',['Prévoir les ventes','Fiabiliser les opérations passées','Négocier les banques','Définir la stratégie'],1,'La comptabilité enregistre et fiabilise les transactions déjà réalisées.'),
      q('r2','Le FP&A sert surtout à…',['Analyser, budgéter et prévoir','Tenir la paie','Auditer les comptes','Payer les fournisseurs'],0,'Le FP&A transforme les données en analyses, budgets et forecasts.'),
      q('r3','Une entreprise rentable peut-elle manquer de cash ?',['Non','Oui','Uniquement si elle est cotée','Uniquement en perte'],1,'Le résultat et le cash ne suivent pas le même timing.'),
      q('r4','Quel réflexe est le plus pertinent ?',['Regarder uniquement le CA','Relier P&L, bilan et cash','Regarder uniquement l’EBITDA','Ignorer le BFR'],1,'Le pilotage financier nécessite une vision cohérente des trois états.'),
    ]
  },
  {
    slug:'pnl-basics', level:1, order:2, title:'Comprendre le P&L', duration:18, difficulty:'Débutant', available:true,
    description:'Lire un compte de résultat du chiffre d’affaires au résultat net.',
    objectives:['Lire les principales lignes du P&L','Comprendre marge, EBITDA et EBIT','Identifier les principaux drivers de résultat'],
    sections:[
      {title:'Du chiffre d’affaires au résultat', body:'Le P&L mesure la performance sur une période. On part des ventes puis on retranche différentes catégories de coûts.', bullets:['Net Sales : ventes nettes','Gross Margin : ventes moins coûts directement liés','EBITDA : performance opérationnelle avant D&A','EBIT : après amortissements','Net Income : après intérêts et impôts']},
      {title:'Marge en masse et en pourcentage', body:'Il faut analyser à la fois les euros de marge et le taux de marge.', formula:'Gross margin % = Gross margin / Net Sales', example:'100 M€ de ventes et 35 M€ de marge brute donnent 35% de marge.'},
      {title:'Le piège du volume', body:'Une hausse du CA n’est pas forcément positive si elle provient de produits moins rentables ou de prix insuffisants.', example:'Les ventes passent de 100 à 110, mais la marge brute de 35 à 34 : la croissance détruit de la valeur.'}
    ],
    quiz:[
      q('p1','Que mesure principalement le P&L ?',['La performance sur une période','Le patrimoine à une date','Uniquement le cash','Uniquement la dette'],0,'Le compte de résultat couvre une période, contrairement au bilan qui est une photographie à une date.'),
      q('p2','L’EBITDA se situe…',['Avant les charges opérationnelles','Avant D&A, intérêts et impôts','Après le résultat net','Après les dividendes'],1,'L’EBITDA exclut notamment depreciation & amortization, intérêts et impôts.'),
      q('p3','CA = 80, marge brute = 24. Quel taux de marge ?',['24%','30%','56%','3,3%'],1,'24 / 80 = 30%.'),
      q('p4','Le CA progresse mais la marge brute baisse. Quelle conclusion ?',['Toujours positif','La croissance peut être dilutive','Impossible','Le cash augmente forcément'],1,'La croissance peut être tirée par un mix ou des prix moins favorables.'),
    ]
  },
  {
    slug:'balance-sheet', level:1, order:3, title:'Comprendre le bilan', duration:20, difficulty:'Débutant', available:true,
    description:'Comprendre actifs, passifs, capitaux propres et logique emplois-ressources.',
    objectives:['Lire un bilan simple','Comprendre actif = passif','Identifier dette, créances, stocks et capitaux propres'],
    sections:[
      {title:'Une photographie à une date', body:'Le bilan décrit ce que l’entreprise possède et comment cela est financé.', formula:'Actif = Passif + Capitaux propres', bullets:['Actifs : cash, créances, stocks, immobilisations','Passifs : fournisseurs, dette, provisions','Equity : capital et résultats accumulés']},
      {title:'Court terme vs long terme', body:'La distinction de maturité est essentielle pour juger la liquidité.', bullets:['Current assets : convertibles en cash à court terme','Current liabilities : obligations à court terme','Non-current : horizon plus long']},
      {title:'Lire les signaux', body:'Un bilan permet d’identifier des tensions avant même qu’elles n’apparaissent dans le P&L.', example:'Des créances clients qui augmentent beaucoup plus vite que les ventes peuvent signaler un problème de recouvrement.'}
    ],
    quiz:[
      q('b1','Le bilan est…',['Un flux mensuel','Une photographie à une date','Un budget','Un forecast'],1,'Le bilan représente une situation financière à une date donnée.'),
      q('b2','Une créance client est…',['Un actif','Un passif','Une charge','Un dividende'],0,'C’est un montant dû à l’entreprise.'),
      q('b3','La dette bancaire figure généralement…',['Dans les actifs','Dans les passifs','Dans le chiffre d’affaires','Dans les stocks'],1,'La dette représente une obligation envers un financeur.'),
      q('b4','Si l’actif vaut 150 et les passifs 90, les capitaux propres valent…',['60','240','90','150'],0,'150 = 90 + 60.'),
    ]
  },
  {
    slug:'cash-flow', level:1, order:4, title:'Comprendre le cash-flow', duration:20, difficulty:'Débutant', available:true,
    description:'Passer du résultat comptable aux mouvements réels de trésorerie.',
    objectives:['Distinguer résultat et cash','Comprendre CFO, CFI et CFF','Reconnaître les éléments non cash'],
    sections:[
      {title:'Trois familles de flux', body:'Le cash-flow statement explique pourquoi la trésorerie a varié.', bullets:['Operating cash flow : activité courante','Investing cash flow : acquisitions et capex','Financing cash flow : dette, equity, dividendes']},
      {title:'Du résultat au cash opérationnel', body:'On part souvent du résultat puis on neutralise les éléments non cash et les variations de BFR.', formula:'CFO ≈ Net income + non-cash items - increase in working capital', example:'Une hausse des créances clients consomme du cash même si la vente est reconnue en chiffre d’affaires.'},
      {title:'Free cash flow', body:'Le FCF mesure le cash restant après les investissements nécessaires.', formula:'FCF ≈ Operating Cash Flow - Capex'}
    ],
    quiz:[
      q('c1','Une hausse des créances clients a généralement quel effet sur le cash ?',['Positif','Négatif','Aucun','Toujours nul'],1,'Le cash n’a pas encore été encaissé.'),
      q('c2','Un capex apparaît principalement dans…',['Cash-flow d’investissement','Cash-flow opérationnel','CA','Gross margin'],0,'Les investissements sont classés en investing cash flow.'),
      q('c3','Les amortissements sont…',['Toujours une sortie de cash','Une charge non cash','Un financement','Une créance'],1,'Ils réduisent le résultat sans provoquer une sortie de cash à la période comptabilisée.'),
      q('c4','Le free cash flow correspond approximativement à…',['CFO - Capex','CA - salaires','EBITDA + dette','Cash + stocks'],0,'C’est une définition pratique fréquemment utilisée.'),
    ]
  },
  {
    slug:'accounting-basics', level:1, order:5, title:'Débit, crédit et comptabilité', duration:22, difficulty:'Débutant', available:true,
    description:'Comprendre la mécanique comptable sans devenir comptable.',
    objectives:['Comprendre le principe de partie double','Savoir ce qu’est une écriture','Relier journal, grand livre et états financiers'],
    sections:[
      {title:'La partie double', body:'Chaque transaction affecte au moins deux comptes. Le total des débits doit toujours égaler le total des crédits.', formula:'Total débits = Total crédits'},
      {title:'Exemple de vente', body:'Une vente à crédit augmente une créance client et reconnaît un produit.', example:'Débit Accounts Receivable 1 000 / Crédit Sales 1 000.'},
      {title:'Pourquoi le DAF doit comprendre la mécanique', body:'Les analyses de marge, provisions, cut-off ou BFR reposent sur la bonne compréhension des écritures sous-jacentes.', bullets:['Détecter une erreur de cut-off','Comprendre une provision','Analyser un compte GL','Challenger une clôture']}
    ],
    quiz:[
      q('a1','Dans une écriture équilibrée…',['Débits = crédits','Débits > crédits','Crédits > débits','Il n’y a qu’un compte'],0,'La partie double impose l’égalité.'),
      q('a2','Une vente à crédit augmente généralement…',['La dette bancaire','Les créances clients','Les stocks','Les dividendes'],1,'Le client doit encore payer.'),
      q('a3','Un GL account est…',['Un compte du grand livre','Un budget','Un contrat bancaire','Un KPI commercial'],0,'GL signifie General Ledger.'),
      q('a4','Pourquoi comprendre les écritures est utile au DAF ?',['Pour coder un ERP','Pour relier les mouvements aux états financiers','Uniquement pour l’audit','Ce n’est pas utile'],1,'La qualité de l’analyse dépend de la compréhension des flux comptables.'),
    ]
  },
  {
    slug:'accruals-provisions', level:1, order:6, title:'Cut-off, accruals et provisions', duration:22, difficulty:'Débutant', available:true,
    description:'Comprendre pourquoi une charge ou un revenu peut être reconnu avant ou après le paiement.',
    objectives:['Comprendre le principe de rattachement','Distinguer accrual et provision','Comprendre les enjeux de clôture'],
    sections:[
      {title:'Le principe de rattachement', body:'Le résultat doit refléter l’activité de la période, pas seulement les factures reçues ou payées.', example:'Une prestation consommée en décembre mais facturée en janvier doit généralement être rattachée à décembre.'},
      {title:'Accrual vs provision', body:'Un accrual concerne souvent une charge certaine dont le montant ou la facture n’est pas encore finalisé. Une provision couvre une obligation ou un risque comportant davantage d’incertitude.', bullets:['Accrued expense : service reçu, facture manquante','Provision : risque probable et estimable']},
      {title:'Le cut-off', body:'Le cut-off vise à placer ventes et charges dans la bonne période. C’est critique autour des fins de mois et d’année.'}
    ],
    quiz:[
      q('ap1','Une charge de décembre facturée en janvier doit généralement être…',['Ignorée','Rattachée à décembre','Rattachée à février','Mise en equity'],1,'Le principe d’accrual accounting rattache la charge à la période de consommation.'),
      q('ap2','Le cut-off concerne surtout…',['La bonne période de comptabilisation','Le taux d’impôt','La valeur de marché','La dette nette'],0,'Il sécurise le rattachement temporel.'),
      q('ap3','Une provision couvre typiquement…',['Un risque probable estimable','Une vente certaine','Un dividende versé','Un compte bancaire'],0,'La provision traduit une obligation ou un risque probable.'),
      q('ap4','Pourquoi une clôture peut évoluer après réception de factures ?',['À cause du cut-off et des accruals','Parce que le CA change toujours','Parce que le cash est faux','Parce que le bilan n’existe pas'],0,'Les estimations sont ajustées avec l’information disponible.'),
    ]
  },
  {
    slug:'working-capital', level:1, order:7, title:'BFR / Working Capital', duration:25, difficulty:'Débutant', available:true,
    description:'Comprendre comment clients, stocks et fournisseurs consomment ou libèrent du cash.',
    objectives:['Calculer un BFR simplifié','Comprendre DSO, DIO et DPO','Relier croissance et besoin de financement'],
    sections:[
      {title:'Le cycle d’exploitation', body:'L’entreprise achète, stocke, vend puis encaisse. Les décalages créent un besoin de financement.', formula:'BFR ≈ Receivables + Inventory - Payables'},
      {title:'Les trois indicateurs clés', body:'On exprime souvent les composantes du BFR en jours.', bullets:['DSO : jours de créances clients','DIO : jours de stocks','DPO : jours fournisseurs'], formula:'Cash Conversion Cycle ≈ DSO + DIO - DPO'},
      {title:'Croissance et cash', body:'Une forte croissance peut consommer beaucoup de trésorerie si le BFR augmente.', example:'Les ventes progressent de 20%, mais les stocks et créances progressent de 40% : le besoin de cash augmente fortement.'}
    ],
    quiz:[
      q('wc1','Le BFR simplifié est…',['Clients + stocks - fournisseurs','Cash + dette','CA - EBITDA','EBITDA - impôt'],0,'C’est la formule opérationnelle classique.'),
      q('wc2','Un DSO qui augmente signifie généralement…',['Encaissement plus lent','Paiement fournisseurs plus lent','Stock plus faible','Marge plus forte'],0,'Les clients mettent davantage de temps à payer.'),
      q('wc3','Une hausse du DPO a généralement quel effet immédiat sur le cash ?',['Positif','Négatif','Aucun','Impossible à dire'],0,'Payer les fournisseurs plus tard conserve du cash plus longtemps.'),
      q('wc4','Pourquoi la croissance peut-elle consommer du cash ?',['Parce qu’elle peut financer davantage de stocks et créances','Parce que l’EBITDA disparaît','Parce que le bilan baisse','Elle ne peut pas'],0,'Le financement du cycle d’exploitation augmente souvent avec l’activité.'),
    ]
  },
  {
    slug:'margin-ebitda', level:1, order:8, title:'Marge brute, EBITDA et rentabilité', duration:22, difficulty:'Débutant', available:true,
    description:'Analyser la rentabilité en masse, en taux et par driver.',
    objectives:['Calculer plusieurs niveaux de marge','Comprendre operating leverage','Éviter de confondre croissance et création de valeur'],
    sections:[
      {title:'Marge brute', body:'La marge brute mesure ce qui reste après les coûts directement liés aux produits ou services.', formula:'Gross Margin = Net Sales - Cost of Goods Sold'},
      {title:'EBITDA', body:'L’EBITDA reflète la performance opérationnelle avant D&A, intérêts et impôts. Il est utile, mais ne représente pas le cash.', formula:'EBITDA margin = EBITDA / Net Sales'},
      {title:'Operating leverage', body:'Quand une partie importante des coûts est fixe, une hausse de volume peut faire progresser l’EBITDA plus vite que le CA — et l’inverse en cas de baisse.', example:'Avec 20 M€ de coûts fixes, +5 M€ de marge contributive peut quasiment tomber intégralement en EBITDA.'}
    ],
    quiz:[
      q('me1','La marge brute correspond à…',['Ventes - COGS','Ventes - dette','Cash - capex','EBITDA - impôt'],0,'C’est la définition standard.'),
      q('me2','L’EBITDA est-il du cash ?',['Toujours','Non','Seulement en IFRS','Seulement si positif'],1,'Il ignore notamment BFR, capex, intérêts et impôts.'),
      q('me3','EBITDA = 12 et CA = 100. Marge EBITDA ?',['8%','12%','88%','120%'],1,'12 / 100 = 12%.'),
      q('me4','Une activité à coûts fixes élevés présente souvent…',['Un operating leverage élevé','Aucun risque de volume','Un BFR nul','Aucune marge'],0,'Le résultat est plus sensible aux variations de volume.'),
    ]
  },
  {
    slug:'fixed-variable-costs', level:1, order:9, title:'Coûts fixes, variables et seuil de rentabilité', duration:24, difficulty:'Débutant', available:true,
    description:'Comprendre la structure de coûts et calculer un break-even.',
    objectives:['Distinguer coûts fixes et variables','Calculer une contribution margin','Calculer un seuil de rentabilité'],
    sections:[
      {title:'Coûts variables', body:'Ils évoluent avec l’activité : matières, emballages ou commissions peuvent en faire partie.', formula:'Contribution = Sales - Variable Costs'},
      {title:'Coûts fixes', body:'Ils restent relativement stables à court terme : loyers, certaines fonctions support, une partie des salaires.', bullets:['Fixes ne veut pas dire immuables','L’horizon d’analyse compte','Certains coûts sont semi-variables']},
      {title:'Break-even', body:'Le seuil de rentabilité est le niveau de ventes nécessaire pour couvrir les coûts fixes.', formula:'Break-even sales = Fixed Costs / Contribution Margin %', example:'Coûts fixes 2 M€, taux de contribution 40% → break-even = 5 M€ de ventes.'}
    ],
    quiz:[
      q('fv1','Un coût variable…',['Évolue avec le volume','Ne change jamais','Est toujours un salaire','Est toujours un capex'],0,'Il est lié au niveau d’activité.'),
      q('fv2','Contribution margin =…',['Sales - variable costs','Sales - cash','EBITDA - capex','Assets - liabilities'],0,'Elle sert notamment à absorber les coûts fixes.'),
      q('fv3','Coûts fixes 3 M€, contribution 30%. Break-even sales ?',['1 M€','9 M€','10 M€','30 M€'],2,'3 / 30% = 10 M€.'),
      q('fv4','Pourquoi le seuil de rentabilité est utile ?',['Pour mesurer le volume nécessaire avant profit','Pour calculer la TVA','Pour valoriser les stocks uniquement','Pour calculer les intérêts'],0,'Il relie structure de coûts et activité minimale.'),
    ]
  },
  {
    slug:'financial-statements-link', level:1, order:10, title:'Relier P&L, bilan et cash', duration:28, difficulty:'Débutant', available:true,
    description:'Comprendre les ponts entre les trois états financiers.',
    objectives:['Suivre une transaction dans les trois états','Comprendre résultat retenu et cash','Construire un raisonnement intégré'],
    sections:[
      {title:'Les états sont connectés', body:'Le résultat net alimente les capitaux propres, tandis que les variations du bilan expliquent une grande partie du cash-flow.'},
      {title:'Exemple : vente à crédit', body:'Une vente à crédit augmente le CA et le résultat, mais aussi la créance client. Le cash n’augmente qu’au paiement.', example:'Jour 1 : Sales +100, AR +100. Jour 45 : AR -100, Cash +100.'},
      {title:'Exemple : capex', body:'L’achat d’une machine réduit le cash et augmente les immobilisations. La charge arrive progressivement via les amortissements.', bullets:['Date d’achat : bilan + cash-flow','Périodes suivantes : depreciation au P&L','La dette peut aussi financer le capex']}
    ],
    quiz:[
      q('fs1','Une vente à crédit augmente immédiatement…',['Le cash uniquement','Le CA et les créances','La dette uniquement','Le capex'],1,'Le cash viendra plus tard.'),
      q('fs2','Un capex est généralement…',['Une charge intégrale immédiate au P&L','Un actif puis amorti','Toujours un dividende','Une créance client'],1,'L’investissement est capitalisé puis amorti selon sa durée d’utilité.'),
      q('fs3','Le résultat net contribue généralement à…',['Equity / retained earnings','Stocks uniquement','Dette uniquement','DSO'],0,'Les résultats non distribués renforcent les capitaux propres.'),
      q('fs4','Quelle approche est la plus solide ?',['Analyser chaque état séparément','Relier les trois états','Ignorer le bilan','Regarder uniquement le cash'],1,'Les interactions entre états expliquent la performance complète.'),
    ]
  },
  {
    slug:'budget-forecast', level:2, order:11, title:'Budget vs Forecast', duration:25, difficulty:'Intermédiaire', available:true,
    description:'Comprendre ambition, meilleure estimation et rolling forecast.',
    objectives:['Distinguer budget et forecast','Comprendre les usages du forecast','Construire une culture de reforecast'],
    sections:[
      {title:'Deux objets différents', body:'Le budget fixe souvent une ambition et un cadre de ressources. Le forecast représente la meilleure estimation actuelle de ce qui va réellement se produire.', bullets:['Budget : target / ambition','Forecast : best estimate','Actual : réalisé']},
      {title:'Pourquoi reforecaster', body:'Le forecast sert à détecter les écarts assez tôt pour agir.', bullets:['Piloter le cash','Ajuster les ressources','Identifier les risques et opportunités','Informer le management']},
      {title:'Rolling forecast', body:'Un rolling forecast maintient un horizon constant, par exemple 12 ou 18 mois, au lieu de s’arrêter au 31 décembre.'}
    ],
    quiz:[
      q('bf1','Le forecast devrait représenter…',['Une ambition politique','La meilleure estimation actuelle','Toujours le budget','Un chiffre volontairement prudent'],1,'Le forecast doit être le plus réaliste possible.'),
      q('bf2','Le budget sert souvent à…',['Fixer une ambition et des ressources','Remplacer la comptabilité','Calculer les factures','Supprimer les risques'],0,'Il sert de référentiel annuel et de target.'),
      q('bf3','Un rolling forecast…',['Maintient un horizon de prévision constant','Ne change jamais','Est uniquement hebdomadaire','Ignore le cash'],0,'L’horizon avance avec le temps.'),
      q('bf4','Pourquoi éviter de “protéger” son forecast ?',['Parce qu’il doit être réaliste','Parce qu’il doit toujours être optimiste','Parce qu’il est public','Parce qu’il remplace le budget'],0,'Un forecast biaisé perd sa valeur de pilotage.'),
    ]
  },
  {
    slug:'variance-analysis', level:2, order:12, title:'Variance Analysis', duration:26, difficulty:'Intermédiaire', available:true,
    description:'Expliquer un écart vs budget, forecast ou année précédente.',
    objectives:['Structurer une analyse d’écarts','Séparer faits, causes et actions','Prioriser les écarts matériels'],
    sections:[
      {title:'Un écart n’est pas une explication', body:'Dire “EBITDA -2 M€” décrit le symptôme. L’analyse doit identifier les drivers opérationnels.', bullets:['Volume','Price','Mix','Inflation','Productivité','Coûts fixes','FX']},
      {title:'De l’écart à l’action', body:'Une bonne variance analysis suit une logique : What happened? Why? So what? Now what?', example:'Marge -1,2 M€ : -0,7 volume, -0,3 mix, -0,2 inflation non compensée → action pricing et mix.'},
      {title:'Matérialité', body:'Le financier doit concentrer le management sur les écarts qui changent réellement la décision.'}
    ],
    quiz:[
      q('v1','“EBITDA -2 M€” est…',['Une cause racine','Un écart à expliquer','Une action','Un forecast'],1,'Il faut ensuite identifier les drivers.'),
      q('v2','Quelle séquence est la plus utile ?',['What / Why / So what / Now what','Budget / Budget / Budget','Cash / Cash / Cash','Volume uniquement'],0,'Elle transforme un chiffre en décision.'),
      q('v3','La matérialité sert à…',['Prioriser les écarts importants','Ignorer tous les petits clients','Fixer les prix automatiquement','Calculer la TVA'],0,'Elle évite de noyer la décision dans le détail.'),
      q('v4','Le mix peut expliquer…',['Une variation de marge malgré prix et volume favorables','Uniquement la dette','Uniquement le cash','Jamais le CA'],0,'La composition du portefeuille peut diluer ou améliorer la performance.'),
    ]
  },
  {
    slug:'price-volume-mix', level:2, order:13, title:'Price / Volume / Mix', duration:32, difficulty:'Intermédiaire', available:true,
    description:'Décomposer la variation de ventes ou de marge en prix, volume et mix.',
    objectives:['Comprendre les trois effets','Éviter les doubles comptes','Interpréter les résultats business'],
    sections:[
      {title:'Volume', body:'L’effet volume mesure l’impact du changement de quantité à structure de référence constante.'},
      {title:'Price', body:'L’effet prix isole l’impact de la variation de prix unitaire.', formula:'Price effect ≈ (Price N - Price N-1) × Volume de référence'},
      {title:'Mix', body:'Le mix capture le changement de composition entre produits, clients, canaux ou régions.', example:'Vendre davantage d’un produit low-margin peut faire baisser le taux de marge même si chaque produit garde sa marge unitaire.'}
    ],
    quiz:[
      q('pvm1','L’effet prix cherche à isoler…',['La variation de prix unitaire','La dette','Le nombre de fournisseurs','Les capex'],0,'C’est sa logique économique.'),
      q('pvm2','Le mix correspond à…',['Un changement de composition du portefeuille','Un changement de taux d’intérêt uniquement','Un changement de fiscalité','Une écriture comptable'],0,'Le portefeuille vendu peut changer en qualité ou en poids relatif.'),
      q('pvm3','Plus de volume peut-il réduire la marge % ?',['Oui','Non','Jamais','Seulement en IFRS'],0,'Si la croissance est concentrée sur des produits moins marginés.'),
      q('pvm4','Pourquoi définir une méthodologie PVM stable ?',['Pour éviter les doubles comptes et comparer les périodes','Pour faire plus de slides','Pour remplacer le forecast','Pour supprimer le mix'],0,'La cohérence méthodologique est essentielle.'),
    ]
  },
  {
    slug:'standard-costing', level:2, order:14, title:'Standard Costing', duration:30, difficulty:'Intermédiaire', available:true,
    description:'Comprendre standards, écarts matières, main-d’œuvre et absorption.',
    objectives:['Comprendre le rôle d’un coût standard','Identifier les principaux écarts','Relier production et marge'],
    sections:[
      {title:'Pourquoi un coût standard', body:'Le standard sert de référence stable pour valoriser la production et analyser les écarts entre attentes et réalité.'},
      {title:'Les écarts principaux', body:'On distingue souvent price, usage, labor rate, labor efficiency et overhead absorption.', bullets:['Purchase price variance','Material usage variance','Labor efficiency','Fixed cost absorption']},
      {title:'Absorption', body:'Une baisse de volume peut pénaliser le résultat car les coûts fixes industriels sont répartis sur moins d’unités.', example:'Une usine prévue pour 100k unités n’en produit que 70k : le coût fixe par unité augmente.'}
    ],
    quiz:[
      q('sc1','Un standard cost est…',['Une référence de coût','Toujours le coût réel','Un prix de vente','Une dette'],0,'Il sert de base de valorisation et d’analyse.'),
      q('sc2','Une sous-absorption des coûts fixes peut venir de…',['Volume inférieur au plan','Prix client plus élevé','DSO plus faible','Dette plus faible'],0,'Les coûts fixes sont répartis sur un volume plus bas.'),
      q('sc3','Purchase price variance concerne…',['Le prix d’achat réel vs standard','Le prix de vente','Le taux d’impôt','La dette nette'],0,'Il mesure l’écart de prix d’achat.'),
      q('sc4','Pourquoi séparer prix et usage matière ?',['Pour distinguer achat et performance industrielle','Pour calculer le DSO','Pour valoriser la dette','Pour calculer les dividendes'],0,'Les responsabilités et actions sont différentes.'),
    ]
  },
  {
    slug:'kpi-tree', level:2, order:15, title:'KPI Tree et drivers business', duration:28, difficulty:'Intermédiaire', available:true,
    description:'Construire un arbre de KPI qui relie activité opérationnelle et résultat financier.',
    objectives:['Identifier leading et lagging indicators','Construire un arbre de drivers','Éviter les dashboards décoratifs'],
    sections:[
      {title:'Du KPI au driver', body:'Un KPI utile explique ou anticipe une performance. Le CA peut être décomposé en volume × prix, puis par client, produit ou canal.'},
      {title:'Leading vs lagging', body:'Les lagging indicators constatent un résultat. Les leading indicators donnent un signal en amont.', example:'Pipeline commercial → commandes → ventes → marge → cash.'},
      {title:'Limiter le nombre', body:'Un tableau de bord doit privilégier quelques KPI actionnables plutôt qu’une accumulation de chiffres.'}
    ],
    quiz:[
      q('k1','Un leading indicator…',['Donne un signal avant le résultat final','Mesure uniquement le passé','Est toujours comptable','Est toujours qualitatif'],0,'Il aide à anticiper.'),
      q('k2','CA peut être décomposé simplement en…',['Volume × prix','Cash × dette','Stocks × DSO','Capex × impôt'],0,'C’est un arbre de drivers de base.'),
      q('k3','Un bon KPI doit idéalement être…',['Actionnable','Décoratif','Toujours mensuel','Toujours financier'],0,'Il doit aider à décider et agir.'),
      q('k4','Pourquoi limiter le nombre de KPI ?',['Pour concentrer l’attention','Pour cacher les écarts','Pour supprimer les données','Pour éviter le forecast'],0,'Trop d’indicateurs diluent le signal.'),
    ]
  },
  {
    slug:'business-case', level:2, order:16, title:'Construire un Business Case', duration:35, difficulty:'Intermédiaire', available:true,
    description:'Structurer une décision d’investissement avec hypothèses, cash-flow et sensibilité.',
    objectives:['Construire les hypothèses','Distinguer P&L et cash','Faire des scénarios et sensibilités'],
    sections:[
      {title:'Une décision, pas un tableur', body:'Le business case doit répondre à une question précise et montrer les hypothèses qui créent ou détruisent de la valeur.'},
      {title:'Flux pertinents', body:'On privilégie les cash-flows incrémentaux liés à la décision, pas les coûts irrécupérables.', bullets:['Revenus incrémentaux','Coûts variables et fixes additionnels','Capex','BFR','Impôts']},
      {title:'Scénarios', body:'Un cas sérieux teste les hypothèses critiques plutôt qu’un chiffre unique.', example:'Base / downside / upside sur volume, prix, capex et délai de ramp-up.'}
    ],
    quiz:[
      q('bc1','Un business case doit surtout…',['Éclairer une décision','Faire un maximum d’onglets','Reproduire le budget','Ignorer les risques'],0,'La décision est l’objectif final.'),
      q('bc2','Un sunk cost est…',['Un coût déjà engagé à ne pas laisser biaiser la décision future','Un capex futur','Une dette','Une créance'],0,'Il est irrécupérable et ne doit pas dicter une décision future.'),
      q('bc3','Pourquoi faire un downside ?',['Tester la robustesse du projet','Pour toujours refuser le projet','Pour augmenter le budget','Pour calculer le DSO'],0,'La sensibilité montre l’exposition aux hypothèses.'),
      q('bc4','Le BFR doit-il être inclus dans un business case ?',['Souvent oui','Jamais','Uniquement pour une banque','Uniquement si EBITDA négatif'],0,'La croissance peut immobiliser du cash.'),
    ]
  }
]

const roadmap = [
  {slug:'monthly-close',level:2,order:17,title:'Clôture mensuelle efficace',duration:30,difficulty:'Intermédiaire',description:'Organiser fast close, contrôles, cut-off et analyse.'},
  {slug:'management-reporting',level:2,order:18,title:'Management Reporting',duration:30,difficulty:'Intermédiaire',description:'Construire un reporting utile au management.'},
  {slug:'rolling-forecast',level:2,order:19,title:'Rolling Forecast avancé',duration:30,difficulty:'Intermédiaire',description:'Drivers, cadence, scénarios et responsabilisation.'},
  {slug:'commercial-finance',level:2,order:20,title:'Commercial Finance',duration:30,difficulty:'Intermédiaire',description:'Pricing, portefeuille, clients et contribution.'},

  {slug:'cash-forecast',level:3,order:21,title:'Cash Forecast',duration:32,difficulty:'Intermédiaire',description:'Construire un forecast de trésorerie court et moyen terme.'},
  {slug:'collections-credit',level:3,order:22,title:'Credit Management & Collections',duration:28,difficulty:'Intermédiaire',description:'Piloter crédit client, limites et recouvrement.'},
  {slug:'inventory-finance',level:3,order:23,title:'Finance des stocks',duration:28,difficulty:'Intermédiaire',description:'Rotation, obsolescence, valorisation et cash.'},
  {slug:'pricing',level:3,order:24,title:'Pricing & Price Realization',duration:35,difficulty:'Intermédiaire',description:'Construire et mesurer une stratégie de prix.'},
  {slug:'capex',level:3,order:25,title:'Capex Management',duration:32,difficulty:'Intermédiaire',description:'Prioriser, approuver et suivre les investissements.'},
  {slug:'profitability',level:3,order:26,title:'Rentabilité client / produit',duration:35,difficulty:'Intermédiaire',description:'Allocation de coûts et profitabilité multi-dimensionnelle.'},
  {slug:'cost-reduction',level:3,order:27,title:'Cost Reduction & Productivity',duration:30,difficulty:'Intermédiaire',description:'Identifier, valider et suivre les économies.'},
  {slug:'performance-cadence',level:3,order:28,title:'Performance Management',duration:30,difficulty:'Intermédiaire',description:'Rituels, plans d’action et accountability.'},

  {slug:'time-value-money',level:4,order:29,title:'Time Value of Money',duration:30,difficulty:'Intermédiaire',description:'Actualisation, valeur présente et future.'},
  {slug:'npv-irr',level:4,order:30,title:'NPV & IRR',duration:35,difficulty:'Intermédiaire',description:'Évaluer financièrement un investissement.'},
  {slug:'wacc',level:4,order:31,title:'WACC & Cost of Capital',duration:40,difficulty:'Avancé',description:'Comprendre coût de la dette, equity et WACC.'},
  {slug:'valuation',level:4,order:32,title:'Valuation Fundamentals',duration:45,difficulty:'Avancé',description:'DCF, multiples et principales méthodes de valorisation.'},
  {slug:'debt',level:4,order:33,title:'Dette & Financement',duration:38,difficulty:'Avancé',description:'Dette senior, maturité, intérêts et structure.'},
  {slug:'covenants',level:4,order:34,title:'Covenants & Leverage',duration:32,difficulty:'Avancé',description:'Leverage, headroom et risque de covenant.'},
  {slug:'equity',level:4,order:35,title:'Equity & Shareholder Returns',duration:32,difficulty:'Avancé',description:'Capital, dilution, dividendes et rendement actionnaire.'},
  {slug:'capital-allocation',level:4,order:36,title:'Capital Allocation',duration:38,difficulty:'Avancé',description:'Arbitrer capex, M&A, dette et retour actionnaire.'},

  {slug:'consolidation',level:5,order:37,title:'Consolidation',duration:40,difficulty:'Avancé',description:'Périmètre, éliminations et intérêts minoritaires.'},
  {slug:'ifrs',level:5,order:38,title:'IFRS Essentials',duration:45,difficulty:'Avancé',description:'Principes IFRS importants pour un DAF.'},
  {slug:'leases',level:5,order:39,title:'IFRS 16 & Leases',duration:35,difficulty:'Avancé',description:'Right-of-use, lease liability et impact EBITDA.'},
  {slug:'tax',level:5,order:40,title:'Corporate Tax Basics',duration:35,difficulty:'Avancé',description:'Impôt courant, différé et taux effectif.'},
  {slug:'treasury',level:5,order:41,title:'Treasury & Cash Pooling',duration:38,difficulty:'Avancé',description:'Liquidité groupe, cash pooling et risques financiers.'},
  {slug:'internal-control',level:5,order:42,title:'Internal Control & Risk',duration:35,difficulty:'Avancé',description:'Contrôles, séparation des tâches et cartographie des risques.'},
  {slug:'audit',level:5,order:43,title:'Audit & Statutory Accounts',duration:32,difficulty:'Avancé',description:'Préparer audit, preuves et points de jugement.'},
  {slug:'ma',level:5,order:44,title:'M&A Fundamentals',duration:45,difficulty:'Avancé',description:'Process, due diligence, SPA et intégration.'},

  {slug:'board-comex',level:6,order:45,title:'Board & COMEX Communication',duration:35,difficulty:'Avancé',description:'Transformer l’analyse en message de direction.'},
  {slug:'finance-strategy',level:6,order:46,title:'Finance Strategy',duration:40,difficulty:'Avancé',description:'Construire une feuille de route finance cohérente avec la stratégie.'},
  {slug:'finance-transformation',level:6,order:47,title:'Finance Transformation',duration:40,difficulty:'Avancé',description:'Process, data, ERP, BI et operating model.'},
  {slug:'leadership',level:6,order:48,title:'Leadership du DAF',duration:35,difficulty:'Avancé',description:'Manager, challenger et développer une équipe finance.'},
  {slug:'crisis',level:6,order:49,title:'Crisis & Turnaround Finance',duration:45,difficulty:'Avancé',description:'Cash, priorités, scénarios et décisions en situation tendue.'},
  {slug:'cfo-case',level:6,order:50,title:'Grand cas DAF',duration:60,difficulty:'Avancé',description:'Cas intégré : P&L, cash, financement, board et plan d’action.'},
]

const modules = [
  ...ready,
  ...roadmap.map((m) => ({...m, available:false}))
].sort((a,b)=>a.order-b.order)

const levels = [
  {id:1,title:'Finance Foundations',subtitle:'Comprendre les chiffres avant de les piloter'},
  {id:2,title:'FP&A & Controlling',subtitle:'Prévoir, expliquer et challenger la performance'},
  {id:3,title:'Cash & Performance',subtitle:'Transformer la performance en cash et en actions'},
  {id:4,title:'Corporate Finance',subtitle:'Investir, financer et créer de la valeur'},
  {id:5,title:'Advanced Finance',subtitle:'Maîtriser les sujets techniques du DAF'},
  {id:6,title:'CFO / DAF',subtitle:'Décider, communiquer et diriger la fonction finance'},
]


window.DAF_DATA = { modules, levels };
