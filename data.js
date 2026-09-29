const q = (id, question, options, correctIndex, explanation) => ({ id, question, options, correctIndex, explanation })

const ready = [
  {
    slug:'role-finance', level:1, order:1, title:'À quoi sert la finance ?', duration:20, difficulty:'Débutant', available:true,
    description:'Comprendre le rôle de la finance, les grandes fonctions et le réflexe qui relie performance, bilan et cash.',
    objectives:['Comprendre les missions de la finance','Distinguer comptabilité, FP&A et trésorerie','Relier rentabilité, liquidité et solidité financière','Adopter un premier réflexe de DAF'],
    sections:[
      {title:'La finance transforme l’activité en décisions', body:'La finance ne sert pas seulement à produire des chiffres. Elle fiabilise ce qui s’est passé, explique les écarts, anticipe la suite et aide le management à arbitrer.', bullets:['Mesurer : disposer de chiffres fiables','Expliquer : comprendre les drivers','Prévoir : construire budget et forecast','Décider : arbitrer ressources, risques et investissements']},
      {title:'Les grandes fonctions finance', body:'Chaque équipe répond à une question différente, mais elles doivent travailler ensemble.', bullets:['Comptabilité : que s’est-il réellement passé ?','FP&A / contrôle de gestion : pourquoi et que va-t-il se passer ?','Trésorerie : avons-nous le cash et les financements nécessaires ?','Fiscalité / contrôle interne : quels risques devons-nous maîtriser ?']},
      {title:'Les trois états à toujours relier', body:'Un financier raisonne simultanément en résultat, patrimoine et trésorerie.', bullets:['P&L : performance sur une période','Bilan : actifs, passifs et capitaux propres à une date','Cash-flow : mouvements de trésorerie sur la période']},
      {title:'Rentabilité, liquidité, solidité', body:'Une entreprise saine doit combiner ces trois dimensions. Une bonne marge ne suffit pas si le cash est bloqué dans les stocks et créances ou si la dette devient trop lourde.', example:'Une société peut afficher +15% d’EBITDA tout en manquant de cash si son DSO et ses stocks augmentent fortement.'},
      {title:'Le cycle de décision du DAF', body:'Le rôle du DAF consiste à transformer les chiffres en action.', bullets:['Observer le réalisé','Identifier l’écart et son driver','Mettre à jour le forecast','Définir l’action et le responsable','Mesurer l’impact réel de l’action']}
    ],
    calculation:{title:'Lecture rapide',prompt:'Une société réalise 10 M€ de CA, 1,2 M€ d’EBITDA mais consomme 0,8 M€ de cash. Peut-on conclure que sa performance est mauvaise ?',hint:'Sépare rentabilité et génération de cash.',answer:'Non. L’EBITDA montre une activité opérationnelle rentable, mais le cash peut être consommé par le BFR, le capex, les intérêts ou les impôts. Il faut construire le pont EBITDA → cash.',steps:['Constater : EBITDA positif = rentabilité opérationnelle','Identifier : cash négatif = autre consommation de trésorerie','Analyser : BFR, capex, intérêts, impôts, éléments exceptionnels']},
    caseStudy:{title:'Mini-cas · croissance sans cash',scenario:'Le CA progresse de 20%, l’EBITDA de 12%, mais la trésorerie baisse de 3 M€. Les créances clients progressent de 35% et les stocks de 30%.',questions:['Quel signal doit alerter le DAF ?','Quelles analyses demander en priorité ?'],correction:['La croissance n’est pas convertie en cash : le BFR absorbe une partie de la performance.','Analyser DSO, retards clients, DIO, obsolescence, prévisions de stocks et cash forecast court terme.'],takeaway:'Le premier réflexe DAF est de ne jamais regarder le P&L isolément.'},
    quiz:[
      q('r1','Quel est le rôle principal de la comptabilité ?',['Prévoir les ventes','Fiabiliser les opérations passées','Négocier les banques','Définir la stratégie'],1,'La comptabilité enregistre et fiabilise les transactions déjà réalisées.'),
      q('r2','Le FP&A sert surtout à…',['Analyser, budgéter et prévoir','Tenir la paie','Auditer les comptes','Payer les fournisseurs'],0,'Le FP&A transforme les données en analyses, budgets et forecasts.'),
      q('r3','Une entreprise rentable peut-elle manquer de cash ?',['Non','Oui','Uniquement si elle est cotée','Uniquement en perte'],1,'Le résultat et le cash ne suivent pas le même timing.'),
      q('r4','Quel réflexe est le plus pertinent ?',['Regarder uniquement le CA','Relier P&L, bilan et cash','Regarder uniquement l’EBITDA','Ignorer le BFR'],1,'Le pilotage financier nécessite une vision cohérente des trois états.'),
      q('r5','Quel état financier est une photographie à une date ?',['P&L','Bilan','Cash-flow uniquement','Forecast'],1,'Le bilan décrit la situation financière à une date donnée.'),
      q('r6','Le DAF constate un écart défavorable. Quelle étape vient après le diagnostic ?',['Cacher l’écart','Mettre à jour les perspectives et définir une action','Modifier le réalisé','Attendre la clôture annuelle'],1,'Le pilotage transforme l’analyse en forecast puis en action.')
    ]
  },
  {
    slug:'pnl-basics', level:1, order:2, title:'Comprendre le P&L', duration:28, difficulty:'Débutant', available:true,
    description:'Lire un compte de résultat du chiffre d’affaires au résultat net et comprendre les drivers de marge.',
    objectives:['Lire les principales lignes du P&L','Comprendre marge brute, EBITDA et EBIT','Analyser masse et pourcentage','Distinguer croissance et création de valeur'],
    sections:[
      {title:'Le P&L mesure une performance sur une période', body:'Le compte de résultat rassemble les revenus et charges rattachés à une période : mois, trimestre ou année. Il ne décrit pas directement les encaissements et décaissements.', bullets:['Net Sales : ventes nettes','COGS : coûts directement liés aux ventes','Opex : coûts opérationnels','D&A : depreciation & amortization','Intérêts et impôts : éléments après l’exploitation']},
      {title:'Du CA à la marge brute', body:'La marge brute mesure ce qui reste après les coûts directement liés aux produits ou services vendus.', formula:'Gross Margin = Net Sales - COGS', example:'120 M€ de ventes et 78 M€ de COGS donnent 42 M€ de marge brute, soit 35%.'},
      {title:'De la marge brute à l’EBITDA', body:'L’EBITDA retranche les charges opérationnelles hors depreciation & amortization. Il permet de comparer la performance opérationnelle, mais ne représente pas le cash.', formula:'EBITDA margin = EBITDA / Net Sales'},
      {title:'EBIT et résultat net', body:'L’EBIT tient compte des amortissements. Le résultat net ajoute ensuite notamment le coût de la dette et les impôts.', bullets:['EBIT = EBITDA - D&A','Profit before tax = EBIT - net interest ± autres éléments','Net income = profit before tax - tax']},
      {title:'Masse, taux et qualité de croissance', body:'Une croissance du CA peut être dilutive si elle repose sur un mix moins rentable, des remises ou une inflation des coûts non compensée.', example:'CA +10%, mais marge brute en masse -2% et marge % de 35% à 31% : la croissance détruit de la contribution.'}
    ],
    calculation:{title:'Construis le P&L',prompt:'CA 120 M€ ; COGS 78 M€ ; Opex hors D&A 25 M€ ; D&A 4 M€ ; intérêts 3 M€ ; impôts 2 M€. Calcule marge brute, EBITDA, EBIT et résultat net.',hint:'Descends ligne par ligne.',answer:'Marge brute 42 M€ ; EBITDA 17 M€ ; EBIT 13 M€ ; résultat net 8 M€.',steps:['Gross Margin = 120 - 78 = 42','EBITDA = 42 - 25 = 17','EBIT = 17 - 4 = 13','Net income = 13 - 3 - 2 = 8']},
    caseStudy:{title:'Mini-cas · croissance dilutive',scenario:'Les ventes passent de 100 à 110 M€. La marge brute passe de 35 à 34 M€. Les équipes commerciales expliquent que « la croissance est très bonne ».',questions:['Que réponds-tu ?','Quels drivers veux-tu analyser ?'],correction:['Le CA croît de 10%, mais la marge brute baisse de 1 M€ et le taux chute de 35% à 30,9%. La croissance est dilutive.','Prix, volume, mix, coût matière, remises, nouveaux/lost business et profitabilité client/produit.'],takeaway:'Le CA n’est jamais une fin en soi : le DAF regarde la qualité de la croissance.'},
    quiz:[
      q('p1','Que mesure principalement le P&L ?',['La performance sur une période','Le patrimoine à une date','Uniquement le cash','Uniquement la dette'],0,'Le compte de résultat couvre une période, contrairement au bilan qui est une photographie à une date.'),
      q('p2','L’EBITDA se situe…',['Avant les charges opérationnelles','Avant D&A, intérêts et impôts','Après le résultat net','Après les dividendes'],1,'L’EBITDA exclut notamment depreciation & amortization, intérêts et impôts.'),
      q('p3','CA = 80, marge brute = 24. Quel taux de marge ?',['24%','30%','56%','3,3%'],1,'24 / 80 = 30%.'),
      q('p4','Le CA progresse mais la marge brute baisse. Quelle conclusion ?',['Toujours positif','La croissance peut être dilutive','Impossible','Le cash augmente forcément'],1,'La croissance peut être tirée par un mix ou des prix moins favorables.'),
      q('p5','EBITDA 15 M€ et D&A 4 M€. Quel EBIT ?',['11 M€','19 M€','15 M€','4 M€'],0,'EBIT = EBITDA - D&A = 11 M€.'),
      q('p6','Pourquoi regarder marge en masse ET en % ?',['Le taux seul suffit','La masse mesure la contribution absolue et le % la qualité relative','Uniquement pour les sociétés cotées','Pour calculer la dette'],1,'Les deux lectures sont complémentaires pour comprendre la performance.')
    ]
  },
  {
    slug:'balance-sheet', level:1, order:3, title:'Comprendre le bilan', duration:28, difficulty:'Débutant', available:true,
    description:'Comprendre actifs, passifs, capitaux propres et détecter les premiers signaux de liquidité.',
    objectives:['Lire un bilan simple','Comprendre actif = passifs + capitaux propres','Identifier BFR, dette et equity','Repérer des signaux de tension'],
    sections:[
      {title:'Une photographie à une date', body:'Le bilan décrit les ressources contrôlées par l’entreprise et la façon dont elles sont financées.', formula:'Actifs = Passifs + Capitaux propres'},
      {title:'Les actifs', body:'Les actifs regroupent ce qui doit générer un bénéfice économique futur.', bullets:['Cash','Créances clients','Stocks','Immobilisations corporelles et incorporelles','Autres actifs']},
      {title:'Passifs et capitaux propres', body:'Les passifs sont des obligations envers des tiers. Les capitaux propres représentent la part résiduelle des actionnaires.', bullets:['Fournisseurs et autres dettes opérationnelles','Dette bancaire et obligataire','Provisions','Capital et retained earnings']},
      {title:'Court terme et liquidité', body:'La maturité des actifs et passifs est essentielle. Un bilan peut être solvable à long terme mais manquer de liquidité à court terme.', formula:'Current Ratio = Current Assets / Current Liabilities'},
      {title:'Lire les mouvements, pas seulement le niveau', body:'Comparer le bilan aux ventes ou au mois précédent permet d’identifier des anomalies.', example:'Des créances +30% avec des ventes +5% peuvent signaler des retards d’encaissement ou un problème de cut-off.'}
    ],
    calculation:{title:'Équilibre du bilan',prompt:'Actifs totaux = 150 M€. Passifs hors capitaux propres = 92 M€. Quel montant de capitaux propres ? Si current assets = 48 M€ et current liabilities = 40 M€, quel current ratio ?',hint:'Utilise l’équation du bilan puis la formule de liquidité.',answer:'Capitaux propres = 58 M€. Current ratio = 1,20x.',steps:['Equity = 150 - 92 = 58','Current ratio = 48 / 40 = 1,20x']},
    caseStudy:{title:'Mini-cas · bilan qui se tend',scenario:'En 6 mois, CA +4%, créances +22%, stocks +18%, fournisseurs +3%, dette court terme +25%.',questions:['Quel diagnostic initial ?','Quelles questions poser aux équipes ?'],correction:['Le BFR se dégrade et semble financé par davantage de dette court terme.','Clients en retard ? Litiges ? Surstock ? Forecast de demande ? Conditions fournisseurs ? Besoin de financement à 13 semaines ?'],takeaway:'Le bilan révèle souvent les tensions de cash avant qu’elles ne deviennent critiques.'},
    quiz:[
      q('b1','Le bilan est…',['Un flux mensuel','Une photographie à une date','Un budget','Un forecast'],1,'Le bilan représente une situation financière à une date donnée.'),
      q('b2','Une créance client est…',['Un actif','Un passif','Une charge','Un dividende'],0,'C’est un montant dû à l’entreprise.'),
      q('b3','La dette bancaire figure généralement…',['Dans les actifs','Dans les passifs','Dans le chiffre d’affaires','Dans les stocks'],1,'La dette représente une obligation envers un financeur.'),
      q('b4','Si l’actif vaut 150 et les passifs 90, les capitaux propres valent…',['60','240','90','150'],0,'150 = 90 + 60.'),
      q('b5','Current assets 60, current liabilities 50. Current ratio ?',['0,83x','1,20x','10x','110x'],1,'60 / 50 = 1,20x.'),
      q('b6','Créances +25% avec CA +3% : quel réflexe ?',['Aucun','Analyser DSO, retards et cut-off','Augmenter immédiatement les prix','Réduire les amortissements'],1,'Les créances croissent anormalement vite par rapport à l’activité.')
    ]
  },
  {
    slug:'cash-flow', level:1, order:4, title:'Comprendre le cash-flow', duration:30, difficulty:'Débutant', available:true,
    description:'Passer du résultat comptable aux mouvements réels de trésorerie et comprendre le free cash flow.',
    objectives:['Distinguer résultat et cash','Comprendre CFO, CFI et CFF','Construire un pont EBITDA → cash','Calculer un free cash flow simple'],
    sections:[
      {title:'Pourquoi le cash diffère du résultat', body:'Le P&L applique des règles de rattachement. Le cash suit les encaissements et décaissements réels. Le timing peut donc être très différent.'},
      {title:'Trois familles de flux', body:'Le cash-flow statement explique la variation de trésorerie.', bullets:['Operating cash flow : activité courante et BFR','Investing cash flow : capex, cessions, acquisitions','Financing cash flow : dette, equity, dividendes']},
      {title:'Du résultat au cash opérationnel', body:'On neutralise les éléments non cash et on intègre les variations du besoin en fonds de roulement.', formula:'CFO ≈ Net income + non-cash items - increase in working capital'},
      {title:'De l’EBITDA au cash', body:'En pilotage, on suit souvent un bridge simple pour comprendre la conversion de la performance en trésorerie.', formula:'Cash conversion ≈ EBITDA - ΔBFR - Capex - Cash tax - Cash interest ± autres flux'},
      {title:'Free cash flow', body:'Le FCF mesure la capacité de l’activité à générer du cash après les investissements nécessaires.', formula:'FCF ≈ Operating Cash Flow - Capex', example:'Un EBITDA élevé avec un FCF faible peut venir d’un BFR ou d’un capex très consommateur.'}
    ],
    calculation:{title:'Pont EBITDA → cash',prompt:'EBITDA 20 M€ ; hausse du BFR 5 M€ ; capex 6 M€ ; cash tax 2 M€ ; intérêts 1 M€. Ignore les autres flux. Quel cash approximatif reste ?',hint:'Chaque consommation de cash vient en moins de l’EBITDA.',answer:'6 M€.',steps:['20 - 5 = 15','15 - 6 = 9','9 - 2 - 1 = 6']},
    caseStudy:{title:'Mini-cas · EBITDA record, cash faible',scenario:'L’entreprise annonce un EBITDA record de 30 M€, mais seulement 5 M€ de free cash flow. Le management pense que « le cash devrait être proche de l’EBITDA ».',questions:['Pourquoi cette intuition est-elle fausse ?','Quel bridge présenter ?'],correction:['L’EBITDA ignore BFR, capex, impôts, intérêts et autres décaissements.','EBITDA → variation BFR → capex → taxes → intérêts → autres flux → FCF.'],takeaway:'Le DAF doit expliquer la conversion EBITDA → cash, pas seulement l’EBITDA.'},
    quiz:[
      q('c1','Une hausse des créances clients a généralement quel effet sur le cash ?',['Positif','Négatif','Aucun','Toujours nul'],1,'Le cash n’a pas encore été encaissé.'),
      q('c2','Un capex apparaît principalement dans…',['Cash-flow d’investissement','Cash-flow opérationnel','CA','Gross margin'],0,'Les investissements sont classés en investing cash flow.'),
      q('c3','Les amortissements sont…',['Toujours une sortie de cash','Une charge non cash','Un financement','Une créance'],1,'Ils réduisent le résultat sans provoquer une sortie de cash à la période comptabilisée.'),
      q('c4','Le free cash flow correspond approximativement à…',['CFO - Capex','CA - salaires','EBITDA + dette','Cash + stocks'],0,'C’est une définition pratique fréquemment utilisée.'),
      q('c5','Une augmentation du BFR de 4 M€ signifie généralement…',['+4 M€ de cash','-4 M€ de cash','Aucun effet','+4 M€ d’EBITDA'],1,'Davantage de cash est immobilisé dans le cycle d’exploitation.'),
      q('c6','L’EBITDA peut être élevé et le FCF faible si…',['Le capex et le BFR consomment beaucoup','Les ventes sont élevées','Le bilan est équilibré','Les amortissements sont nuls'],0,'Le FCF intègre plusieurs flux que l’EBITDA ignore.')
    ]
  },
  {
    slug:'accounting-basics', level:1, order:5, title:'Débit, crédit et comptabilité', duration:30, difficulty:'Débutant', available:true,
    description:'Comprendre la partie double, les comptes et le chemin qui mène des transactions aux états financiers.',
    objectives:['Comprendre débit et crédit','Savoir lire une écriture simple','Comprendre journal, GL et balance','Relier les écritures aux états financiers'],
    sections:[
      {title:'La partie double', body:'Chaque transaction affecte au moins deux comptes et doit rester équilibrée.', formula:'Total débits = Total crédits'},
      {title:'Débit et crédit ne veulent pas dire + et -', body:'Le sens dépend de la nature du compte.', bullets:['Actif : augmentation au débit','Charge : augmentation au débit','Passif : augmentation au crédit','Capitaux propres : augmentation au crédit','Produit : augmentation au crédit']},
      {title:'Exemple de vente à crédit', body:'La vente crée un produit et une créance client.', example:'Débit Accounts Receivable 1 000 / Crédit Sales 1 000.'},
      {title:'Du journal au grand livre', body:'Les écritures sont enregistrées dans le journal puis regroupées par compte dans le General Ledger. La trial balance vérifie notamment l’équilibre global.', bullets:['Journal : transactions chronologiques','GL : mouvements par compte','Trial balance : soldes des comptes','Financial statements : agrégation finale']},
      {title:'Pourquoi un DAF doit comprendre les écritures', body:'Une grande partie des questions de clôture, marge, BFR et provisions sont en réalité des questions de mécanique comptable.', example:'Si une charge n’est pas enregistrée au bon mois, le forecast vs actual et la marge mensuelle seront trompeurs.'}
    ],
    calculation:{title:'Passe les écritures',prompt:'1) Vente à crédit 5 000 €. 2) Encaissement du client 5 000 €. Quelles écritures simplifiées ?',hint:'Identifie d’abord les comptes qui augmentent ou diminuent.',answer:'1) Débit AR 5 000 / Crédit Sales 5 000. 2) Débit Cash 5 000 / Crédit AR 5 000.',steps:['La vente crée une créance et un produit','L’encaissement transforme la créance en cash sans créer une seconde vente']},
    caseStudy:{title:'Mini-cas · chiffre d’affaires sans cash',scenario:'Le commercial indique « nous avons vendu 100 k€, donc nous avons gagné 100 k€ de cash ». La vente est à 60 jours.',questions:['Qu’est-ce qui est comptabilisé au jour de la vente ?','Que se passe-t-il au paiement ?'],correction:['Le CA est reconnu et une créance client est créée. Le cash n’a pas encore bougé.','À l’encaissement : Cash augmente et Accounts Receivable diminue. Il n’y a pas un nouveau CA.'],takeaway:'Une même transaction peut toucher P&L, bilan et cash à des moments différents.'},
    quiz:[
      q('a1','Dans une écriture équilibrée…',['Débits = crédits','Débits > crédits','Crédits > débits','Il n’y a qu’un compte'],0,'La partie double impose l’égalité.'),
      q('a2','Une vente à crédit augmente généralement…',['La dette bancaire','Les créances clients','Les stocks','Les dividendes'],1,'Le client doit encore payer.'),
      q('a3','Un GL account est…',['Un compte du grand livre','Un budget','Un contrat bancaire','Un KPI commercial'],0,'GL signifie General Ledger.'),
      q('a4','Pourquoi comprendre les écritures est utile au DAF ?',['Pour coder un ERP','Pour relier les mouvements aux états financiers','Uniquement pour l’audit','Ce n’est pas utile'],1,'La qualité de l’analyse dépend de la compréhension des flux comptables.'),
      q('a5','Une augmentation d’actif se comptabilise normalement…',['Au débit','Au crédit','Toujours hors bilan','En dividende'],0,'Les actifs augmentent normalement au débit.'),
      q('a6','Lorsqu’un client paie une créance existante…',['Le CA augmente une deuxième fois','Cash augmente et AR diminue','La dette augmente','Les stocks augmentent'],1,'L’encaissement transforme la créance en trésorerie.')
    ]
  },
  {
    slug:'accruals-provisions', level:1, order:6, title:'Cut-off, accruals et provisions', duration:30, difficulty:'Débutant', available:true,
    description:'Comprendre le rattachement des charges et revenus à la bonne période et les principales estimations de clôture.',
    objectives:['Comprendre le matching principle','Distinguer accrual, prepayment et provision','Maîtriser le cut-off','Comprendre les impacts de clôture'],
    sections:[
      {title:'Le principe de rattachement', body:'Le P&L doit refléter l’activité de la période, indépendamment du moment de facturation ou de paiement.', example:'Une prestation consommée en décembre mais facturée en janvier doit généralement être enregistrée en décembre.'},
      {title:'Accrual', body:'Un accrual reconnaît une charge ou un revenu déjà économiquement acquis alors que la facture ou le paiement intervient plus tard.', bullets:['Accrued expense : service reçu, facture manquante','Accrued revenue : revenu acquis mais pas encore facturé']},
      {title:'Prepayment', body:'Un paiement peut intervenir avant la consommation du service. La partie qui concerne les périodes futures reste au bilan.', example:'Assurance annuelle de 12 k€ payée en janvier : 1 k€ de charge par mois, le solde non consommé reste en prepaid expense.'},
      {title:'Provision', body:'Une provision couvre une obligation probable dont le montant ou le timing est incertain, sous réserve des règles comptables applicables.', bullets:['Litige probable','Garantie','Restructuration sous conditions','Obligation environnementale']},
      {title:'Le cut-off de clôture', body:'Autour de la fin de période, le DAF sécurise ventes, achats, stocks et services pour éviter les décalages artificiels de résultat.', bullets:['Goods received not invoiced','Invoices received not consumed','Revenue recognition','Stock in transit et retours']}
    ],
    calculation:{title:'Accrual de clôture',prompt:'Une prestation de 60 k€ couvre décembre à février, à parts égales. La facture sera reçue en février. Quelle charge rattacher à décembre ?',hint:'Répartis le service selon la période de consommation.',answer:'20 k€ de charge en décembre.',steps:['60 k€ / 3 mois = 20 k€ par mois','Décembre consomme un mois de prestation','Accrual de 20 k€ à la clôture de décembre']},
    caseStudy:{title:'Mini-cas · clôture trop belle',scenario:'À J+1, l’EBITDA de décembre est 500 k€ au-dessus du forecast. Tu apprends que plusieurs prestations de décembre ne sont pas encore facturées.',questions:['Quel risque ?','Que demandes-tu avant de publier ?'],correction:['L’EBITDA peut être artificiellement surévalué par des charges manquantes.','Liste des PO/services reçus non facturés, estimation des accruals, validation avec opérationnels et rapprochement vs budget/forecast.'],takeaway:'Un bon cut-off protège la crédibilité du résultat mensuel.'},
    quiz:[
      q('ap1','Une charge de décembre facturée en janvier doit généralement être…',['Ignorée','Rattachée à décembre','Rattachée à février','Mise en equity'],1,'Le principe d’accrual accounting rattache la charge à la période de consommation.'),
      q('ap2','Le cut-off concerne surtout…',['La bonne période de comptabilisation','Le taux d’impôt','La valeur de marché','La dette nette'],0,'Il sécurise le rattachement temporel.'),
      q('ap3','Une provision couvre typiquement…',['Un risque probable estimable','Une vente certaine','Un dividende versé','Un compte bancaire'],0,'La provision traduit une obligation ou un risque probable.'),
      q('ap4','Pourquoi une clôture peut évoluer après réception de factures ?',['À cause du cut-off et des accruals','Parce que le CA change toujours','Parce que le cash est faux','Parce que le bilan n’existe pas'],0,'Les estimations sont ajustées avec l’information disponible.'),
      q('ap5','Un paiement effectué aujourd’hui pour un service de l’année prochaine est souvent…',['Un prepaid asset au départ','Une dette bancaire','Un produit','Un EBITDA additionnel'],0,'La charge est reconnue au rythme de consommation du service.'),
      q('ap6','Des charges manquantes à la clôture ont tendance à…',['Sous-évaluer temporairement l’EBITDA','Surévaluer temporairement l’EBITDA','Ne jamais affecter le P&L','Augmenter automatiquement le cash'],1,'Moins de charges comptabilisées signifie un EBITDA artificiellement plus élevé.')
    ]
  },
  {
    slug:'working-capital', level:1, order:7, title:'BFR / Working Capital', duration:35, difficulty:'Débutant', available:true,
    description:'Comprendre comment créances, stocks et fournisseurs consomment ou libèrent du cash et piloter les jours de BFR.',
    objectives:['Calculer un BFR simplifié','Comprendre DSO, DIO et DPO','Mesurer l’impact cash des jours','Identifier des actions opérationnelles'],
    sections:[
      {title:'Le cycle d’exploitation', body:'L’entreprise paie ses fournisseurs, transforme ou stocke, vend puis encaisse. Les décalages entre ces étapes immobilisent du cash.', formula:'BFR ≈ Receivables + Inventory - Payables'},
      {title:'DSO · clients', body:'Le DSO mesure approximativement le nombre de jours de ventes immobilisés dans les créances.', formula:'DSO ≈ Receivables / Sales × 365', example:'10 M€ de créances pour 100 M€ de CA annuel ≈ 36,5 jours.'},
      {title:'DIO · stocks', body:'Le DIO mesure les jours de consommation immobilisés en stock.', formula:'DIO ≈ Inventory / COGS × 365'},
      {title:'DPO · fournisseurs', body:'Le DPO mesure le délai moyen de paiement fournisseurs. Un DPO plus élevé libère du cash à court terme, mais doit rester compatible avec les relations fournisseurs et les règles de paiement.', formula:'DPO ≈ Payables / Purchases or COGS × 365'},
      {title:'Cash Conversion Cycle et leviers', body:'Le cycle de conversion du cash synthétise les trois composantes.', formula:'CCC ≈ DSO + DIO - DPO', bullets:['Clients : facturation rapide, litiges, recouvrement, conditions de paiement','Stocks : S&OP, MOQ, safety stock, obsolescence','Fournisseurs : négociation des termes et discipline de paiement']}
    ],
    calculation:{title:'Impact cash d’un DSO',prompt:'CA annuel = 120 M€. Le DSO passe de 45 à 55 jours. À CA constant, quel cash approximatif est immobilisé en plus ?',hint:'10 jours de CA = CA / 365 × 10.',answer:'Environ 3,29 M€ de cash supplémentaire immobilisé.',steps:['Ventes par jour = 120 / 365 = 0,329 M€','Hausse DSO = 10 jours','Impact ≈ 0,329 × 10 = 3,29 M€']},
    caseStudy:{title:'Mini-cas · croissance qui absorbe la trésorerie',scenario:'CA +15%, DSO de 48 à 62 jours, DIO de 55 à 70 jours, DPO stable à 45 jours. EBITDA en hausse.',questions:['Pourquoi le cash se dégrade-t-il ?','Quelles 3 actions lancer immédiatement ?'],correction:['Le cash conversion cycle augmente de 29 jours : davantage de cash est immobilisé dans clients et stocks.','Plan de recouvrement et litiges clients ; revue des stocks/S&OP ; cash forecast et gouvernance BFR avec responsables opérationnels.'],takeaway:'Le BFR est un sujet opérationnel piloté avec la finance, pas seulement un KPI comptable.'},
    quiz:[
      q('wc1','Le BFR simplifié est…',['Clients + stocks - fournisseurs','Cash + dette','CA - EBITDA','EBITDA - impôt'],0,'C’est la formule opérationnelle classique.'),
      q('wc2','Un DSO qui augmente signifie généralement…',['Encaissement plus lent','Paiement fournisseurs plus lent','Stock plus faible','Marge plus forte'],0,'Les clients mettent davantage de temps à payer.'),
      q('wc3','Une hausse du DPO a généralement quel effet immédiat sur le cash ?',['Positif','Négatif','Aucun','Impossible à dire'],0,'Payer les fournisseurs plus tard conserve du cash plus longtemps.'),
      q('wc4','Pourquoi la croissance peut-elle consommer du cash ?',['Parce qu’elle peut financer davantage de stocks et créances','Parce que l’EBITDA disparaît','Parce que le bilan baisse','Elle ne peut pas'],0,'Le financement du cycle d’exploitation augmente souvent avec l’activité.'),
      q('wc5','DSO + DIO - DPO correspond approximativement à…',['Cash Conversion Cycle','EBITDA margin','Net debt','Current ratio'],0,'Le CCC mesure la durée nette d’immobilisation du cash dans le cycle d’exploitation.'),
      q('wc6','CA 73 M€ : environ combien vaut 5 jours de CA ?',['0,1 M€','1,0 M€','5 M€','10 M€'],1,'73 / 365 × 5 ≈ 1,0 M€.')
    ]
  },
  {
    slug:'margin-ebitda', level:1, order:8, title:'Marge brute, EBITDA et rentabilité', duration:32, difficulty:'Débutant', available:true,
    description:'Analyser la rentabilité en masse, en taux, par driver et comprendre l’operating leverage.',
    objectives:['Calculer plusieurs niveaux de marge','Comprendre EBITDA et contribution','Analyser masse et %','Comprendre l’operating leverage'],
    sections:[
      {title:'Marge brute', body:'La marge brute mesure la valeur restante après les coûts directement liés aux ventes.', formula:'Gross Margin = Net Sales - COGS'},
      {title:'Contribution margin', body:'Selon les entreprises, la contribution retranche les coûts variables ou directement attribuables pour mesurer ce que chaque vente apporte à la couverture des coûts fixes.', formula:'Contribution = Sales - Variable Costs'},
      {title:'EBITDA', body:'L’EBITDA mesure la performance opérationnelle avant D&A, intérêts et impôts. Il est utile pour piloter, mais ne tient pas compte du BFR ni du capex.', formula:'EBITDA margin = EBITDA / Net Sales'},
      {title:'Operating leverage', body:'Plus la part de coûts fixes est élevée, plus une variation de contribution a un effet amplifié sur l’EBITDA.', example:'Si les coûts fixes restent stables, +2 M€ de contribution peut ajouter presque +2 M€ d’EBITDA.'},
      {title:'Analyser les drivers de marge', body:'Pour comprendre un mouvement d’EBITDA, on décompose les facteurs opérationnels.', bullets:['Prix et inflation','Volume et absorption','Mix client/produit','Productivité et achats','Coûts fixes et one-offs']}
    ],
    calculation:{title:'Marge et levier opérationnel',prompt:'CA 100 M€, COGS 65 M€, Opex hors D&A 25 M€. L’année suivante la marge brute augmente de 4 M€ et les Opex de 1 M€. Calcule l’EBITDA des deux années et sa variation.',hint:'EBITDA = Gross Margin - Opex hors D&A.',answer:'Année 1 : 10 M€. Année 2 : 13 M€. Variation +3 M€.',steps:['GM1 = 100 - 65 = 35','EBITDA1 = 35 - 25 = 10','GM2 = 39 ; Opex2 = 26','EBITDA2 = 39 - 26 = 13']},
    caseStudy:{title:'Mini-cas · marge % en baisse',scenario:'CA +8%, EBITDA +2% mais marge EBITDA de 15% à 14,2%.',questions:['La performance est-elle forcément mauvaise ?','Que veux-tu comprendre ?'],correction:['L’EBITDA en masse progresse, mais moins vite que le CA. La qualité relative se dilue. Il faut comprendre si c’est volontaire ou subi.','Mix, prix/coûts, phase de ramp-up, investissements commerciaux, coûts fixes temporaires et potentiel de retour futur.'],takeaway:'Un bon commentaire financier distingue croissance absolue et rentabilité relative.'},
    quiz:[
      q('me1','La marge brute correspond à…',['Ventes - COGS','Ventes - dette','Cash - capex','EBITDA - impôt'],0,'C’est la définition standard.'),
      q('me2','L’EBITDA est-il du cash ?',['Toujours','Non','Seulement en IFRS','Seulement si positif'],1,'Il ignore notamment BFR, capex, intérêts et impôts.'),
      q('me3','EBITDA = 12 et CA = 100. Marge EBITDA ?',['8%','12%','88%','120%'],1,'12 / 100 = 12%.'),
      q('me4','Une activité à coûts fixes élevés présente souvent…',['Un operating leverage élevé','Aucun risque de volume','Un BFR nul','Aucune marge'],0,'Le résultat est plus sensible aux variations de volume.'),
      q('me5','Si la contribution augmente de 3 M€ et les coûts fixes de 1 M€, l’EBITDA varie de…',['+2 M€','+4 M€','-2 M€','0'],0,'À autres éléments constants, +3 de contribution -1 de coûts fixes = +2.'),
      q('me6','EBITDA +5% et CA +15% implique généralement que…',['La marge EBITDA % se dilue','La marge EBITDA % augmente forcément','Le cash est +15%','Le BFR baisse'],0,'L’EBITDA croît moins vite que les ventes, donc le taux se contracte.')
    ]
  },
  {
    slug:'fixed-variable-costs', level:1, order:9, title:'Coûts fixes, variables et seuil de rentabilité', duration:32, difficulty:'Débutant', available:true,
    description:'Comprendre la structure de coûts, la contribution, le break-even et la sensibilité au volume.',
    objectives:['Distinguer coûts fixes et variables','Calculer une contribution margin','Calculer un seuil de rentabilité','Mesurer une marge de sécurité'],
    sections:[
      {title:'Coûts variables', body:'Ils évoluent avec le niveau d’activité : matières, emballages, transport variable ou commissions peuvent en faire partie.', formula:'Contribution = Sales - Variable Costs'},
      {title:'Coûts fixes', body:'Ils sont relativement stables sur l’horizon considéré : loyers, fonctions support ou certains salaires.', bullets:['Fixe ne veut pas dire immuable','La classification dépend de l’horizon','Certains coûts sont semi-variables ou par paliers']},
      {title:'Taux de contribution', body:'Il indique la part de chaque euro de vente disponible pour absorber les coûts fixes puis générer du profit.', formula:'Contribution Margin % = Contribution / Sales'},
      {title:'Break-even', body:'Le seuil de rentabilité est le niveau de ventes nécessaire pour couvrir les coûts fixes.', formula:'Break-even Sales = Fixed Costs / Contribution Margin %'},
      {title:'Marge de sécurité et scénario', body:'La marge de sécurité mesure la distance entre les ventes prévues et le break-even. Plus elle est faible, plus l’activité est vulnérable à une baisse de volume.', formula:'Margin of Safety = Actual or Forecast Sales - Break-even Sales'}
    ],
    calculation:{title:'Calcule le break-even',prompt:'Coûts fixes = 3 M€. Taux de contribution = 30%. Ventes prévues = 12 M€. Calcule le break-even et la marge de sécurité.',hint:'Break-even = coûts fixes / taux de contribution.',answer:'Break-even = 10 M€. Marge de sécurité = 2 M€.',steps:['3 / 30% = 10 M€','12 - 10 = 2 M€ de marge de sécurité']},
    caseStudy:{title:'Mini-cas · baisse de volume',scenario:'Une usine a des coûts fixes élevés. Les volumes baissent de 12% alors que les prix et coûts variables unitaires sont stables.',questions:['Pourquoi l’EBITDA peut-il baisser plus de 12% ?','Quels leviers étudier ?'],correction:['La contribution baisse avec le volume alors que les coûts fixes ne baissent pas au même rythme : effet de levier opérationnel négatif.','Prix/mix, productivité, flexibilité des coûts, capacité, absorption, réduction de coûts fixes et scénario de volume.'],takeaway:'La structure de coûts détermine la sensibilité du résultat au volume.'},
    quiz:[
      q('fv1','Un coût variable…',['Évolue avec le volume','Ne change jamais','Est toujours un salaire','Est toujours un capex'],0,'Il est lié au niveau d’activité.'),
      q('fv2','Contribution margin =…',['Sales - variable costs','Sales - cash','EBITDA - capex','Assets - liabilities'],0,'Elle sert notamment à absorber les coûts fixes.'),
      q('fv3','Coûts fixes 3 M€, contribution 30%. Break-even sales ?',['1 M€','9 M€','10 M€','30 M€'],2,'3 / 30% = 10 M€.'),
      q('fv4','Pourquoi le seuil de rentabilité est utile ?',['Pour mesurer le volume nécessaire avant profit','Pour calculer la TVA','Pour valoriser les stocks uniquement','Pour calculer les intérêts'],0,'Il relie structure de coûts et activité minimale.'),
      q('fv5','Ventes 12 M€, break-even 10 M€. Marge de sécurité ?',['2 M€','22 M€','0,2 M€','10 M€'],0,'12 - 10 = 2 M€.'),
      q('fv6','À coûts fixes élevés, une baisse de volume peut…',['Amplifier la baisse d’EBITDA','Ne jamais toucher l’EBITDA','Augmenter mécaniquement la marge','Supprimer le BFR'],0,'La contribution baisse alors que les coûts fixes restent relativement stables.')
    ]
  },
  {
    slug:'financial-statements-link', level:1, order:10, title:'Relier P&L, bilan et cash', duration:38, difficulty:'Débutant', available:true,
    description:'Comprendre les ponts entre les trois états financiers et raisonner comme sur un mini-modèle intégré.',
    objectives:['Suivre une transaction dans les trois états','Comprendre résultat retenu et cash','Relier capex, dette et amortissements','Construire un raisonnement intégré'],
    sections:[
      {title:'Les trois états sont connectés', body:'Le résultat net alimente les capitaux propres, tandis que les mouvements du bilan expliquent une grande partie du cash-flow.'},
      {title:'Vente à crédit', body:'La vente augmente le CA et le résultat, mais crée une créance. Le cash n’arrive qu’au paiement.', example:'Jour 1 : Sales +100, AR +100. Jour 45 : AR -100, Cash +100.'},
      {title:'Capex et amortissement', body:'L’achat d’une machine diminue le cash et augmente les immobilisations. Le P&L est impacté progressivement via les amortissements.', bullets:['Achat : cash-flow d’investissement négatif','Bilan : PPE augmente','Périodes suivantes : D&A au P&L et baisse progressive de la valeur nette comptable']},
      {title:'Dette et intérêts', body:'Un nouvel emprunt augmente le cash et la dette sans créer de revenu. Les intérêts futurs affectent le P&L et le cash.', example:'Emprunt 5 M€ : Cash +5 / Debt +5. Puis intérêts : expense au P&L et cash outflow au paiement.'},
      {title:'Le pont intégré', body:'Une analyse solide explique comment la performance opérationnelle se transforme en actifs/passifs puis en cash.', bullets:['Net income → retained earnings','ΔBFR → cash-flow opérationnel','Capex → actifs + cash-flow investissement','Dette/dividendes → financement']}
    ],
    calculation:{title:'Transaction intégrée',prompt:'Une machine de 1,2 M€ est achetée cash au 1er janvier et amortie linéairement sur 4 ans, sans valeur résiduelle. Impact année 1 sur P&L, bilan et cash-flow ?',hint:'Sépare l’achat du capex et l’amortissement.',answer:'P&L : D&A 0,3 M€. Bilan fin d’année : PPE net +0,9 M€ vs avant achat et cash -1,2 M€ (hors autres flux). Cash-flow : CFI -1,2 M€ ; l’amortissement n’est pas une sortie de cash.',steps:['Capex initial = -1,2 M€ de cash et +1,2 M€ de PPE','D&A annuel = 1,2 / 4 = 0,3 M€','PPE net fin année = 0,9 M€','L’amortissement réduit EBIT mais est non cash']},
    caseStudy:{title:'Mini-cas · profit mais dette en hausse',scenario:'Résultat net +6 M€, mais dette nette +4 M€. Dans le même temps : BFR +5 M€, capex 7 M€, dividendes 2 M€.',questions:['Comment est-ce possible ?','Quel message donner au COMEX ?'],correction:['Le résultat ne finance pas à lui seul les besoins : BFR, capex et dividendes consomment 14 M€ avant autres ajustements, donc un financement externe peut être nécessaire.','Le profit est positif mais la conversion cash est insuffisante ; il faut piloter BFR, capex et allocation du cash.'],takeaway:'Le DAF relie systématiquement résultat, bilan, cash et financement.'},
    quiz:[
      q('fs1','Une vente à crédit augmente immédiatement…',['Le cash uniquement','Le CA et les créances','La dette uniquement','Le capex'],1,'Le cash viendra plus tard.'),
      q('fs2','Un capex est généralement…',['Une charge intégrale immédiate au P&L','Un actif puis amorti','Toujours un dividende','Une créance client'],1,'L’investissement est capitalisé puis amorti selon sa durée d’utilité.'),
      q('fs3','Le résultat net contribue généralement à…',['Equity / retained earnings','Stocks uniquement','Dette uniquement','DSO'],0,'Les résultats non distribués renforcent les capitaux propres.'),
      q('fs4','Quelle approche est la plus solide ?',['Analyser chaque état séparément','Relier les trois états','Ignorer le bilan','Regarder uniquement le cash'],1,'Les interactions entre états expliquent la performance complète.'),
      q('fs5','Un nouvel emprunt de 5 M€ augmente initialement…',['Cash et dette','CA et EBITDA','Stocks et COGS','Capex et D&A'],0,'Le financement augmente simultanément la trésorerie et le passif financier.'),
      q('fs6','L’amortissement d’une machine est…',['Un décaissement récurrent égal à la charge','Une charge P&L non cash de la période','Un nouveau capex','Une créance'],1,'Le cash est sorti lors de l’investissement ; l’amortissement répartit le coût comptable.')
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


// Phase A.1 · theory boost + workspace tools
const theoryBoost = {
  'role-finance': {
    sections: [
      {title:'La finance comme système de contrôle et d’allocation', body:'Au-delà du reporting, la fonction finance crée un langage commun pour décider où engager les ressources. Elle arbitre entre croissance, rentabilité, liquidité et risque.', bullets:['Contrôler : fiabiliser les chiffres et les processus','Allouer : décider où investir le capital et les équipes','Challenger : tester les hypothèses opérationnelles','Protéger : anticiper liquidité, fraude, fiscalité et conformité'], example:'Deux projets créent le même EBITDA, mais l’un immobilise 5 M€ de BFR et l’autre 0,5 M€ : le DAF ne les regardera pas de la même façon.'},
      {title:'Matérialité, vitesse et qualité de l’information', body:'Un bon DAF ne cherche pas une précision parfaite partout. Il distingue les sujets matériels, produit rapidement une première lecture fiable, puis approfondit les écarts qui changent réellement une décision.', bullets:['Matérialité : se concentrer sur les montants et risques significatifs','Traçabilité : savoir d’où vient un chiffre','Comparabilité : utiliser des définitions stables','Vitesse : donner une information assez tôt pour agir']}
    ],
    keyTakeaways:['La finance mesure, explique, prévoit et aide à décider.','P&L, bilan et cash doivent toujours être lus ensemble.','Rentabilité et liquidité sont deux dimensions différentes.','Le DAF arbitre aussi le risque et l’allocation du capital.','Un bon chiffre doit être fiable, comparable, traçable et disponible à temps.'],
    pitfalls:['Confondre production de reporting et création de valeur.','Sur-analyser des écarts immatériels au détriment des vrais drivers.','Croire qu’un EBITDA positif garantit une trésorerie positive.'],
    sheetTemplate:{title:'Lecture performance / cash',cells:{A1:'Indicateur',B1:'Valeur (M€)',A2:'Chiffre d’affaires',B2:'10',A3:'EBITDA',B3:'1.2',A4:'Variation de cash',B4:'-0.8',A6:'Marge EBITDA',B6:'=B3/B2*100'}}
  },
  'pnl-basics': {
    sections: [
      {title:'Operating leverage : pourquoi l’EBITDA peut bouger plus vite que le CA', body:'Quand une partie importante des coûts est fixe, une variation de volume se transmet de façon amplifiée à l’EBITDA. C’est l’operating leverage.', example:'Si la marge sur coûts variables est de 40% et que les coûts fixes ne bougent pas, 1 M€ de ventes additionnelles peut générer environ 0,4 M€ d’EBITDA supplémentaire.'},
      {title:'Comprendre les bridges plutôt que commenter les lignes', body:'Pour expliquer une variation, le DAF décompose le mouvement en drivers : volume, prix, mix, inflation, productivité, coûts fixes et change.', bullets:['Masse : combien d’euros gagnés ou perdus ?','Taux : la qualité économique s’améliore-t-elle ?','Drivers : qu’est-ce qui explique le mouvement ?','Actions : quel levier est réellement pilotable ?']}
    ],
    keyTakeaways:['Le P&L mesure la performance sur une période, pas les flux de cash.','La marge brute relie ventes et coûts directement liés aux ventes.','EBITDA et EBIT diffèrent notamment par D&A.','Masse et pourcentage sont complémentaires.','Une croissance de CA peut être dilutive.'],
    pitfalls:['Traiter l’EBITDA comme du cash.','Se satisfaire d’un CA en croissance sans analyser marge et mix.','Comparer des taux sans regarder les montants absolus.'],
    sheetTemplate:{title:'Construction du P&L',cells:{A1:'P&L',B1:'2024 (M€)',A2:'Chiffre d’affaires',B2:'120',A3:'COGS',B3:'-78',A4:'Marge brute',B4:'=B2+B3',A5:'Opex hors D&A',B5:'-25',A6:'EBITDA',B6:'=B4+B5',A7:'D&A',B7:'-4',A8:'EBIT',B8:'=B6+B7',A9:'Intérêts',B9:'-3',A10:'Impôts',B10:'-2',A11:'Résultat net',B11:'=B8+B9+B10',D2:'Marge brute %',E2:'=B4/B2*100',D3:'Marge EBITDA %',E3:'=B6/B2*100'}}
  },
  'balance-sheet': {
    sections: [
      {title:'Court terme vs long terme : lire la liquidité', body:'Classer les actifs et passifs par échéance permet de comprendre si l’entreprise peut honorer ses obligations de court terme.', bullets:['Current assets : cash, clients, stocks…','Current liabilities : fournisseurs, taxes, dette court terme…','Net debt : dette financière moins cash disponible','Working capital : ressources immobilisées dans le cycle opérationnel']},
      {title:'Le bilan révèle souvent les problèmes avant le P&L', body:'Des stocks qui gonflent, des créances qui vieillissent ou une dette court terme qui augmente peuvent signaler une tension avant qu’elle ne soit visible dans le résultat.', example:'Un EBITDA stable avec des stocks +30% peut annoncer obsolescence, baisse de demande ou mauvaise planification.'}
    ],
    keyTakeaways:['Le bilan est une photographie à une date.','Actifs = passifs + capitaux propres.','Le BFR relie directement le bilan au cash.','La maturité de la dette compte autant que son montant.','Les tendances de stocks, créances et fournisseurs sont des signaux de pilotage.'],
    pitfalls:['Lire le bilan uniquement à la clôture annuelle.','Confondre capitaux propres et cash disponible.','Ignorer l’âge des créances ou l’obsolescence des stocks.'],
    sheetTemplate:{title:'Équilibre du bilan',cells:{A1:'Actifs',B1:'M€',D1:'Passifs + Equity',E1:'M€',A2:'Immobilisations',B2:'55',A3:'Stocks',B3:'18',A4:'Clients',B4:'22',A5:'Cash',B5:'5',A6:'Total actifs',B6:'=SUM(B2:B5)',D2:'Capitaux propres',E2:'42',D3:'Dette',E3:'28',D4:'Fournisseurs',E4:'20',D5:'Autres passifs',E5:'10',D6:'Total',E6:'=SUM(E2:E5)',D8:'Écart bilan',E8:'=B6-E6'}}
  },
  'cash-flow': {
    sections: [
      {title:'Le bridge EBITDA → cash : la lecture centrale du DAF', body:'L’EBITDA est un point de départ. Pour arriver au cash, il faut intégrer BFR, capex, impôts, intérêts et éléments non récurrents.', formula:'Operating cash conversion ≈ (EBITDA - ΔBFR - cash taxes) / EBITDA', example:'EBITDA 20, hausse du BFR 6, impôts cash 3 : avant capex et intérêts, seulement 11 M€ ont été convertis en cash.'},
      {title:'Cash structurel vs cash ponctuel', body:'Le DAF distingue les effets durables des décalages temporaires. Un gros encaissement en fin de mois peut embellir le cash sans améliorer la qualité structurelle.', bullets:['Regarder les tendances glissantes, pas un seul point de clôture','Identifier les cut-offs fournisseurs/clients inhabituels','Séparer cash opérationnel, investissement et financement','Construire un forecast de liquidité en complément du réalisé']}
    ],
    keyTakeaways:['Le cash-flow explique la variation de trésorerie.','L’EBITDA n’intègre ni capex ni BFR.','Une hausse du BFR consomme du cash.','Les flux doivent être séparés entre opérationnel, investissement et financement.','La conversion de cash est un indicateur de qualité de performance.'],
    pitfalls:['Confondre cash-flow opérationnel et free cash flow.','Analyser un mois de cash sans tenir compte du phasing.','Oublier les impôts, intérêts et éléments exceptionnels.'],
    sheetTemplate:{title:'Bridge EBITDA vers cash',cells:{A1:'Bridge cash',B1:'M€',A2:'EBITDA',B2:'20',A3:'Variation BFR',B3:'-6',A4:'Impôts cash',B4:'-3',A5:'Capex',B5:'-5',A6:'Intérêts',B6:'-2',A7:'Free cash flow simplifié',B7:'=SUM(B2:B6)',D2:'Cash conversion avant capex',E2:'=(B2+B3+B4)/B2*100'}}
  },
  'accounting-basics': {
    sections: [
      {title:'Le sens débit / crédit dépend de la nature du compte', body:'Débit et crédit ne signifient pas « mauvais » ou « bon ». Ils indiquent simplement le côté de l’écriture. Les règles changent selon actifs, passifs, charges et produits.', bullets:['Actif : augmentation au débit','Passif / equity : augmentation au crédit','Charge : augmentation au débit','Produit : augmentation au crédit']},
      {title:'Du journal aux états financiers', body:'Chaque transaction alimente des comptes du grand livre. La balance agrège les soldes, puis ces comptes sont mappés vers le P&L et le bilan.', example:'Une facture fournisseur de 10 k€ de conseil : débit charge 10 k€ / crédit fournisseur 10 k€. Au paiement : débit fournisseur / crédit banque.'}
    ],
    keyTakeaways:['Toute écriture équilibrée a au moins un débit et un crédit.','Le sens dépend du type de compte.','Le GL est la base détaillée des états financiers.','Une transaction peut affecter le P&L, le bilan, ou uniquement le bilan.','Comprendre les écritures aide à challenger la qualité du reporting.'],
    pitfalls:['Associer débit à une dépense et crédit à une recette.','Oublier que le paiement d’une dette fournisseur n’affecte plus le P&L.','Chercher une logique de cash dans toutes les écritures comptables.'],
    sheetTemplate:{title:'Mini journal comptable',cells:{A1:'Transaction',B1:'Débit',C1:'Crédit',D1:'Montant',A2:'Facture conseil',B2:'Charge conseil',C2:'Fournisseur',D2:'10',A3:'Paiement fournisseur',B3:'Fournisseur',C3:'Banque',D3:'10'}}
  },
  'accruals-provisions': {
    sections: [
      {title:'Accrual, provision et prepaid : trois logiques différentes', body:'Un accrual rattache une charge certaine ou quasi certaine à la bonne période avant réception de facture. Une provision couvre une obligation incertaine. Un prepaid décale une charge déjà payée vers les périodes futures.', bullets:['Accrual : timing de facture','Provision : incertitude de montant ou d’échéance','Prepaid : cash payé avant consommation économique']},
      {title:'Pourquoi le DAF surveille les estimations', body:'Des accruals ou provisions mal calibrés peuvent déplacer artificiellement la performance d’une période à l’autre. Leur reprise doit être suivie pour éviter les « réserves » cachées.', example:'Un bonus estimé à 500 k€ en décembre puis payé 300 k€ en mars crée une reprise de 200 k€ : il faut comprendre si l’estimation initiale était raisonnable.'}
    ],
    keyTakeaways:['Le principe de cut-off rattache revenus et charges à la bonne période.','Accrual et provision ne répondent pas à la même incertitude.','Les prepaids sont des actifs tant que le service n’est pas consommé.','Les estimations doivent être documentées et réévaluées.','Les reprises inhabituelles peuvent fausser la lecture de performance.'],
    pitfalls:['Provisionner pour lisser volontairement le résultat.','Confondre facture non reçue et obligation réellement incertaine.','Ne pas suivre les reprises d’accruals/provisions.'],
    sheetTemplate:{title:'Cut-off de clôture',cells:{A1:'Élément',B1:'Montant estimé',C1:'Facturé ?',D1:'Traitement',A2:'Électricité décembre',B2:'80',C2:'Non',D2:'Accrual',A3:'Litige client',B3:'250',C3:'N/A',D3:'Provision',A4:'Assurance annuelle payée',B4:'120',C4:'Oui',D4:'Prepaid'}}
  },
  'working-capital': {
    sections: [
      {title:'DSO, DIO, DPO : traduire le BFR en jours opérationnels', body:'Les ratios en jours permettent de comparer des entités de tailles différentes et de relier le cash aux processus métier.', bullets:['DSO ≈ créances clients / CA × nombre de jours','DIO ≈ stocks / COGS × nombre de jours','DPO ≈ fournisseurs / achats ou COGS × nombre de jours'], example:'À 365 M€ de CA annuel, 1 jour de DSO représente environ 1 M€ de créances.'},
      {title:'Croissance et saisonnalité : le piège du BFR', body:'Même avec des ratios stables, une croissance rapide peut consommer du cash car le niveau absolu de stocks et créances augmente. Les comparaisons doivent aussi tenir compte de la saisonnalité.', bullets:['Comparer jours et montants absolus','Normaliser les effets de saison','Segmenter par client, produit, site ou catégorie','Distinguer amélioration structurelle et simple phasing']}
    ],
    keyTakeaways:['Le BFR opérationnel vient surtout des stocks + clients - fournisseurs.','DSO, DIO et DPO relient finance et opérations.','La croissance peut consommer du cash même si les ratios sont stables.','Une action BFR doit être attribuée à un responsable opérationnel.','Le cash libéré est souvent plus parlant que le seul nombre de jours.'],
    pitfalls:['Réduire les stocks au point de dégrader le service client.','Améliorer artificiellement le DPO en payant en retard.','Comparer deux mois saisonniers sans normalisation.'],
    sheetTemplate:{title:'BFR et jours',cells:{A1:'Hypothèses',B1:'Valeur',A2:'CA annuel',B2:'120',A3:'COGS annuel',B3:'78',A4:'DSO',B4:'55',A5:'DIO',B5:'62',A6:'DPO',B6:'45',D2:'Créances',E2:'=B2/365*B4',D3:'Stocks',E3:'=B3/365*B5',D4:'Fournisseurs',E4:'=B3/365*B6',D5:'BFR',E5:'=E2+E3-E4',D7:'Cash / jour DSO',E7:'=B2/365'}}
  },
  'margin-ebitda': {
    sections: [
      {title:'Contribution, marge brute et EBITDA : ne pas mélanger les étages', body:'Selon l’organisation, plusieurs marges coexistent. Il faut définir précisément les coûts inclus pour rendre les comparaisons cohérentes.', bullets:['Contribution margin : ventes moins coûts variables pertinents','Gross margin : ventes moins COGS selon la convention comptable','EBITDA : performance après coûts opérationnels hors D&A'], example:'Une hausse de gross margin peut coexister avec une baisse d’EBITDA si les coûts fixes commerciaux ou centraux augmentent fortement.'},
      {title:'Fixed-cost absorption et effet de volume', body:'Quand la production augmente, certains coûts fixes industriels se répartissent sur plus d’unités. À l’inverse, une sous-activité peut pénaliser les marges même sans inflation de coûts.', bullets:['Séparer prix, volume, mix et absorption','Comparer coûts unitaires et coûts totaux','Identifier les coûts réellement fixes à l’horizon analysé']}
    ],
    keyTakeaways:['Toujours définir le périmètre d’une marge.','L’EBITDA combine marge commerciale et structure de coûts.','Le mix peut améliorer le taux même avec des volumes stables.','L’absorption des coûts fixes explique une partie des écarts industriels.','La marge doit être analysée en masse et en %.'],
    pitfalls:['Comparer des EBITDA avec des conventions différentes.','Attribuer tout mouvement de marge au prix.','Ignorer l’impact du volume sur l’absorption des coûts fixes.'],
    sheetTemplate:{title:'Marge et EBITDA',cells:{A1:'P&L simplifié',B1:'2023',C1:'2024',D1:'Var.',A2:'CA',B2:'110',C2:'120',D2:'=C2-B2',A3:'Coûts variables',B3:'-66',C3:'-72',D3:'=C3-B3',A4:'Contribution',B4:'=B2+B3',C4:'=C2+C3',D4:'=C4-B4',A5:'Coûts fixes',B5:'-20',C5:'-22',D5:'=C5-B5',A6:'EBITDA',B6:'=B4+B5',C6:'=C4+C5',D6:'=C6-B6',A7:'Marge EBITDA',B7:'=B6/B2*100',C7:'=C6/C2*100',D7:'=C7-B7'}}
  },
  'fixed-variable-costs': {
    sections: [
      {title:'Marge sur coûts variables et seuil de rentabilité', body:'La contribution unitaire finance d’abord les coûts fixes ; au-delà du point mort, elle devient du résultat.', formula:'Break-even volume = Fixed costs / (Price per unit - Variable cost per unit)', example:'Prix 10 €, coût variable 6 €, coûts fixes 200 k€ : contribution 4 €/unité et break-even de 50 000 unités.'},
      {title:'Dans la vraie vie, peu de coûts sont parfaitement fixes', body:'Beaucoup de coûts sont semi-variables ou fixes par paliers. La classification dépend donc de l’horizon et de la décision analysée.', bullets:['Court terme : davantage de coûts semblent fixes','Long terme : loyers, équipes et capacités deviennent ajustables','Step costs : nouveau coût fixe au-delà d’un seuil de capacité','Coût évitable ≠ coût comptablement variable']}
    ],
    keyTakeaways:['La distinction fixe/variable dépend de l’horizon.','La contribution mesure ce qui reste pour couvrir les coûts fixes.','Le point mort est un outil de décision, pas une vérité permanente.','Les coûts par paliers créent des ruptures dans la structure de coûts.','Pour une décision, raisonner en coûts incrémentaux et évitables.'],
    pitfalls:['Qualifier un coût de variable uniquement parce qu’il change d’une année à l’autre.','Utiliser un break-even sans tester prix, mix et capacité.','Confondre coût historique et coût pertinent pour la décision.'],
    sheetTemplate:{title:'Break-even',cells:{A1:'Hypothèse',B1:'Valeur',A2:'Prix / unité',B2:'10',A3:'Coût variable / unité',B3:'6',A4:'Coûts fixes',B4:'200000',A5:'Contribution / unité',B5:'=B2-B3',A6:'Seuil de rentabilité (unités)',B6:'=B4/B5',A7:'Volume prévu',B7:'65000',A8:'Résultat au volume prévu',B8:'=B7*B5-B4'}}
  },
  'financial-statements-link': {
    sections: [
      {title:'Raisonner transaction par transaction', body:'Le moyen le plus sûr de relier les états est de suivre chaque événement : effet P&L, mouvement de bilan puis timing de cash.', example:'Vente de 100 à crédit : +100 CA et résultat selon la marge ; +100 créance client ; aucun cash jusqu’au paiement.'},
      {title:'Les grands bridges à savoir reconstruire', body:'Un DAF doit pouvoir expliquer comment le résultat devient cash et comment les décisions de financement modifient le bilan.', bullets:['EBITDA → EBIT : D&A','EBIT → résultat net : intérêts, impôts, autres','Résultat / EBITDA → cash : BFR, capex, taxes, intérêts','Dette nette : dette financière - cash','Equity : résultat retenu, dividendes, capital et autres mouvements']}
    ],
    keyTakeaways:['Une transaction peut toucher les trois états à des moments différents.','Les éléments non cash expliquent une partie de l’écart résultat / cash.','Le BFR traduit des décalages entre activité et encaissements/décaissements.','Capex affecte d’abord bilan et cash puis le P&L via D&A.','Savoir reconstruire les bridges est un réflexe fondamental de DAF.'],
    pitfalls:['Chercher un mouvement de cash pour chaque charge P&L.','Oublier que le capex n’est pas immédiatement une charge d’exploitation.','Analyser la dette sans déduire ou qualifier le cash disponible.'],
    sheetTemplate:{title:'Pont entre les états',cells:{A1:'Bridge',B1:'M€',A2:'EBITDA',B2:'18',A3:'D&A',B3:'-4',A4:'EBIT',B4:'=B2+B3',A5:'Intérêts',B5:'-2',A6:'Impôts',B6:'-3',A7:'Résultat net simplifié',B7:'=SUM(B4:B6)',D2:'Variation BFR',E2:'-5',D3:'Capex',E3:'-6',D4:'FCF simplifié',E4:'=B2+E2+E3+B5+B6'}}
  }
};

for (const mod of ready.filter(m => m.order <= 10)) {
  const boost = theoryBoost[mod.slug];
  if (!boost) continue;
  mod.sections = [...(mod.sections || []), ...(boost.sections || [])];
  mod.keyTakeaways = boost.keyTakeaways || [];
  mod.pitfalls = boost.pitfalls || [];
  mod.sheetTemplate = boost.sheetTemplate || null;
  mod.duration = (mod.duration || 20) + 6;
}

const financeFormulas = [
  {category:'P&L & rentabilité',items:[
    {name:'Marge brute',formula:'Net Sales - COGS',note:'Mesure la contribution après coûts directement liés aux ventes.'},
    {name:'Marge brute %',formula:'Gross Margin / Net Sales × 100',note:'À analyser avec la marge en masse.'},
    {name:'Marge EBITDA %',formula:'EBITDA / Net Sales × 100',note:'Mesure la rentabilité opérationnelle avant D&A.'},
    {name:'EBIT',formula:'EBITDA - D&A',note:'Résultat opérationnel après depreciation & amortization.'},
    {name:'Contribution unitaire',formula:'Prix unitaire - coût variable unitaire',note:'Contribution disponible pour couvrir les coûts fixes.'},
    {name:'Break-even volume',formula:'Coûts fixes / contribution unitaire',note:'Volume nécessaire pour couvrir les coûts fixes.'}
  ]},
  {category:'Cash & BFR',items:[
    {name:'BFR opérationnel',formula:'Stocks + Créances clients - Dettes fournisseurs',note:'Vision simplifiée du cash immobilisé dans le cycle opérationnel.'},
    {name:'DSO',formula:'Créances clients / CA × 365',note:'Nombre moyen de jours de ventes immobilisés en créances.'},
    {name:'DIO',formula:'Stocks / COGS × 365',note:'Nombre moyen de jours de coût des ventes immobilisé en stock.'},
    {name:'DPO',formula:'Fournisseurs / Achats (ou COGS) × 365',note:'Approximation du délai moyen de paiement fournisseurs.'},
    {name:'Free Cash Flow simplifié',formula:'EBITDA - ΔBFR - Capex - Cash taxes - Cash interest',note:'Bridge simplifié ; adapter au périmètre de l’analyse.'},
    {name:'Cash conversion',formula:'Operating cash flow / EBITDA × 100',note:'Mesure la conversion de la performance opérationnelle en cash.'}
  ]},
  {category:'Croissance',items:[
    {name:'Croissance %',formula:'Valeur N / Valeur N-1 - 1',note:'Variation relative entre deux périodes.'},
    {name:'CAGR',formula:'(Valeur finale / Valeur initiale)^(1/n) - 1',note:'Taux de croissance annuel composé sur n années.'},
    {name:'ASP',formula:'Net Sales / Volume',note:'Average Selling Price ; utile pour suivre prix et mix.'}
  ]},
  {category:'Investissement',items:[
    {name:'ROI',formula:'Gain net / investissement × 100',note:'Mesure simple, à compléter par la dimension temps.'},
    {name:'Payback',formula:'Investissement initial / cash-flow annuel',note:'Approximation si les flux sont stables.'},
    {name:'NPV / VAN',formula:'Σ CFt / (1+r)^t - investissement initial',note:'Valeur créée après actualisation des cash-flows.'},
    {name:'IRR / TRI',formula:'Taux r tel que NPV = 0',note:'À comparer au coût du capital et au profil de risque.'}
  ]},
  {category:'Valorisation & dette',items:[
    {name:'Enterprise Value',formula:'Equity Value + Net Debt (+ ajustements)',note:'Valeur des opérations indépendamment de la structure de financement.'},
    {name:'Net Debt',formula:'Dette financière - cash disponible',note:'Qualifier le cash réellement disponible et les éléments assimilés.'},
    {name:'Leverage',formula:'Net Debt / EBITDA',note:'Multiple de dette nette par rapport à l’EBITDA.'},
    {name:'Interest coverage',formula:'EBITDA ou EBIT / intérêts cash',note:'Vérifier la définition utilisée dans les covenants.'}
  ]},
  {category:'Ratios clés',items:[
    {name:'ROCE',formula:'EBIT après impôt / capital employé',note:'Mesure la rentabilité du capital mobilisé.'},
    {name:'Current ratio',formula:'Current Assets / Current Liabilities',note:'Indicateur simple de liquidité court terme.'},
    {name:'Asset turnover',formula:'Net Sales / capital employé ou actifs',note:'Mesure l’efficacité d’utilisation des actifs.'}
  ]}
];

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


window.DAF_DATA = { modules, levels, financeFormulas };
