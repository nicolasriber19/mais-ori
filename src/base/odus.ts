// Base dos 16 Odùs do +Ori.
//
// - `cabala`: o que cada Odù diz em cada posição da cabala (Norte, Sul, Leste, Oeste, Centro).
//   Resumo com palavras próprias a partir do material "Cabala dos Odùs".
// - `queda`: temas do Odù quando ele cai na consulta, organizados nas cinco áreas do jogo.
//   Resumo com palavras próprias a partir do material "Os 16 Odus Meji Ilustrados".
// - `autoral`: a interpretação da mãe, com as palavras dela. Por enquanto só Okanran Meji.
// - `pendencias`: lacunas encontradas no material, para ela completar.
//
// Procedimentos de ebó/oferenda ficam de fora desta etapa: o material diz que só devem ser
// conduzidos por sacerdote, e "faça você mesmo sua oferenda" é um bloco futuro.

import type { Posicao } from "./cabala";

export type Area = "amor" | "dinheiro" | "trabalho" | "saude" | "espiritualidade";

export interface Odu {
  numero: number;
  nome: string;
  grafias: string[];
  sentencas: string[];
  cabala: Record<Posicao, { resumo: string; palavras: string[] }>;
  queda: { geral: string; alertas: string[] } & Record<Area, string[]>;
  observacao?: string;
  autoral?: { fala: string; elementos: string[] };
  pendencias?: string[];
}

export const ODUS: Odu[] = [
  {
    numero: 1,
    nome: "Okanran Meji",
    grafias: ["Okanran", "Okaran", "Okanran Meji"],
    sentencas: ["Para que o mundo exista, tem que haver o bem e o mal."],
    cabala: {
      norte: {
        resumo: "Pessoa intensa, realista e determinada, com dom de liderar e organizar e forte senso de responsabilidade. Vê saída onde os outros veem problema, preza a verdade e a justiça e não gosta de se sentir limitada. O ponto fraco é a impulsividade: às vezes age antes de pensar.",
        palavras: ["determinação", "liderança", "realismo", "organização"],
      },
      leste: {
        resumo: "Capacidade de construir, superar e realizar. Mente clara e força para encarar desafios, transformando situações difíceis em aprendizado. Traz proteção, coragem e disciplina; bem direcionada, essa energia gera estabilidade e grandes conquistas.",
        palavras: ["superação", "realização", "clareza", "proteção"],
      },
      oeste: {
        resumo: "Alerta para impulsividade, teimosia e dificuldade em aceitar conselhos. Pode trazer brigas, orgulho e atitudes precipitadas que causam prejuízo, além da vontade de controlar tudo e não ouvir os outros, entrando em situações que a paciência evitaria.",
        palavras: ["impulsividade", "conflitos", "teimosia", "descontrole"],
      },
      sul: {
        resumo: "Um caminho marcado por iniciativa, coragem e experiências intensas que deixaram aprendizados. Pede que a pessoa firme os pés, reconheça o que já viveu e siga com mais consciência: os passos têm força, mas precisam de direção e base.",
        palavras: ["caminho", "base", "passos", "firmeza"],
      },
      centro: {
        resumo: "Momento de controlar impulsos, evitar conflitos e buscar harmonia interior. Paciência, perdão e fortalecimento espiritual transformam dificuldade em crescimento. Cuidar da cabeça (Ori) e equilibrar razão e emoção.",
        palavras: ["paciência", "harmonia", "perdão", "equilíbrio"],
      },
    },
    queda: {
      geral: "Movimento e mudança: acontecimentos rápidos, viradas de caminho e superação de crises, pedindo prudência em cada decisão.",
      alertas: ["risco de acidentes", "fofocas e conflitos que causam danos", "perdas materiais e emocionais", "atenção aos sinais, inclusive de animais"],
      amor: ["valorizar a família e as amizades verdadeiras", "manter a palavra e agir com lealdade", "a irritação e a impaciência podem gerar discussões"],
      dinheiro: ["risco de perdas materiais", "prudência em todas as decisões", "cuidado com excessos"],
      trabalho: ["mudanças rápidas de caminho", "não entrar em discussões nem provocações", "impaciência com tarefas e pessoas"],
      saude: ["atenção a acidentes, sustos e sobressaltos", "cuidado com vícios e excessos", "o cansaço espiritual pode virar desânimo"],
      espiritualidade: ["cansaço espiritual", "pode haver necessidade de uma oferenda de proteção, feita por quem tem fundamento", "resistência a ouvir a verdade e os conselhos"],
    },
    autoral: {
      fala: "Então, eu falaria para o meu consulente que esse Odu, Okaran, ele traz acontecimentos rápidos. São mudanças rápidas, eminentes, que vão acontecer. Ele mostra mudanças de caminho muito rápidas. Então, outra coisa também que acontece muito é que traz energias de mudança repentina, superação de crises, vitórias materiais. Também pode trazer alguma necessidade de fazer alguma oferenda espiritual para proteção. Como traz muita impulsividade, teimosia também, falaria para pensar, agir com cautela para não se envolver em conflitos, em acidentes, em brigas.",
      elementos: [
        "Movimento: acontecimentos iminentes, mudanças rápidas e mudanças de caminho",
        "Superação e conquistas: capacidade de superar crises e alcançar vitórias materiais",
        "Proteção espiritual: pode haver necessidade de uma oferenda espiritual, conforme a leitura",
        "Cautela: atenção à impulsividade e à teimosia, evitando conflitos, brigas e acidentes",
        "Não é só um Odù de dificuldade: também mostra oportunidade de mudança, superação e conquista",
      ],
    },
  },
  {
    numero: 2,
    nome: "Ejiokò",
    grafias: ["Ejioko", "Ejiokô"],
    sentencas: ["A guerra começa entre dois irmãos."],
    cabala: {
      norte: {
        resumo: "Personalidade forte, intensa e orgulhosa. Tem dificuldade com críticas, costuma se impor e não gosta de se sentir por baixo. Reage rápido e defende as próprias ideias com muita firmeza.",
        palavras: ["força", "orgulho", "impulsividade", "determinação"],
      },
      leste: {
        resumo: "Força para se reerguer depois dos conflitos. Coragem para enfrentar desafios, abrir caminhos e lutar pelo que acredita, com proteção e aprendizado que vem da própria experiência.",
        palavras: ["coragem", "superação", "abertura de caminhos", "proteção"],
      },
      oeste: {
        resumo: "Alerta para brigas e discussões, principalmente com família e pessoas próximas. Pode indicar pragas rogadas, inveja ao redor, problemas com a justiça e atitudes impulsivas que trazem prejuízo.",
        palavras: ["conflitos", "inveja", "justiça", "atitudes impulsivas"],
      },
      sul: {
        resumo: "Pede que a pessoa firme os passos e escolha bem os caminhos: colocar limites, não se dividir entre direções opostas e avançar com prudência. O caminho se constrói com constância, sabendo onde se pisa para não voltar atrás.",
        palavras: ["caminho", "passos", "limites", "firmeza"],
      },
      centro: {
        resumo: "Controlar os impulsos e buscar harmonia, sobretudo com irmãos, familiares e pessoas próximas. Paciência, perdão e fortalecimento espiritual; medir as palavras e manter a serenidade diante das diferenças.",
        palavras: ["paciência", "harmonia", "perdão", "equilíbrio"],
      },
    },
    queda: {
      geral: "Disputas entre pessoas próximas e a necessidade de medir palavras e atitudes, com conquistas que vêm depois da organização.",
      alertas: ["cuidado com as palavras", "nunca levantar a mão contra alguém", "observar a inveja e os inimigos", "não agir com arrogância ou desprezo"],
      amor: ["conflitos entre pessoas muito próximas", "medir as palavras", "às vezes é melhor se recolher em casa"],
      dinheiro: ["conquistas materiais depois de organizar a vida", "cuidado com documentos e assinaturas", "recuperação de algo emprestado ou perdido"],
      trabalho: ["evitar litígios e problemas na justiça", "atenção a contratos e assinaturas", "não agir com arrogância"],
      saude: ["dores de cabeça e tontura", "quedas, entorses e coluna", "cansaço e fraqueza pedem equilíbrio"],
      espiritualidade: ["constância e devoção nas obrigações", "zelo com o sagrado e com os mais velhos", "fortalecer a ligação com os ancestrais", "cuidado com promessas feitas e não cumpridas"],
    },
  },
  {
    numero: 3,
    nome: "Etaogunda",
    grafias: ["Etaogundá", "Etogundá"],
    sentencas: ["Não se pode viver sem saber o que foi feito no passado.", "A tragédia sempre é ocasionada por alguma coisa."],
    cabala: {
      norte: {
        resumo: "Pessoa prática, trabalhadora e determinada. Aprende com facilidade, valoriza a experiência e age com cautela. Busca segurança e estabilidade e respeita as tradições.",
        palavras: ["praticidade", "determinação", "disciplina", "respeito"],
      },
      leste: {
        resumo: "Conquistas que vêm do esforço, do trabalho e da persistência. Estabilidade, crescimento material e reconhecimento, com proteção dos mais velhos e caminhos que se abrem pela disciplina.",
        palavras: ["conquistas", "estabilidade", "crescimento", "proteção"],
      },
      oeste: {
        resumo: "Alerta para teimosia, resistência a mudanças, apego ao passado e a conselhos. Pode indicar atrasos, perdas por desorganização, problemas no trabalho e conflitos familiares, além do risco de se isolar e recusar ajuda.",
        palavras: ["teimosia", "atrasos", "conflitos", "isolamento"],
      },
      sul: {
        resumo: "Um caminho de experiências que trouxeram maturidade. Cada passo, mesmo com dificuldades e atrasos, fortaleceu a base e ensinou o valor do tempo e da disciplina. Há firmeza para construir um futuro mais estável com o que foi vivido.",
        palavras: ["caminho", "base", "passos", "firmeza"],
      },
      centro: {
        resumo: "Unir experiência e renovação: equilibrar tradição e mudança, aprender com o passado sem ficar preso a ele. Paciência, planejamento e escuta dos mais velhos ajudam a decidir com consciência.",
        palavras: ["paciência", "planejamento", "discernimento", "equilíbrio"],
      },
    },
    queda: {
      geral: "Conflitos que podem ficar sérios e a importância de agir com cabeça fria, revisar papéis e se proteger antes de grandes passos.",
      alertas: ["risco de violência e conflitos graves", "possibilidade de problemas judiciais", "não agir por impulso nem por vingança", "respeitar os sinais de alerta"],
      amor: ["evitar brigas e discussões no casal", "cuidado com intrigas e fofocas", "observar quem estimula conflitos", "não entrar em provocações"],
      dinheiro: ["cuidado com acordos e parcerias", "revisar documentos importantes", "fazer proteção antes de empreender"],
      trabalho: ["evitar confrontos", "revisar documentos e papéis", "consultar orientação antes de decisões grandes"],
      saude: ["estômago e excessos alimentares", "dores e males internos", "cuidado em viagens e em multidões"],
      espiritualidade: ["respeito e firmeza com os Orixás", "proteção espiritual antes de começar algo novo", "buscar orientação tradicional antes de decisões grandes"],
    },
  },
  {
    numero: 4,
    nome: "Irosun Meji",
    grafias: ["Irosun", "Irossun"],
    sentencas: ["A luz também revela o que está escondido.", "Ninguém conhece os segredos guardados pelo oceano."],
    cabala: {
      norte: {
        resumo: "Pessoa comunicativa e curiosa, que quer saber de tudo. Se expressa com facilidade, mas pode falar mais do que deveria. Gosta de movimento, não se conforma com a rotina e está sempre atrás de novidades.",
        palavras: ["comunicação", "curiosidade", "expressão", "inquietude"],
      },
      leste: {
        resumo: "Clareza, revelações e boas notícias. Caminhos se abrem e a vida pessoal e espiritual melhora, com proteção que vem da verdade. Mostra capacidade de recomeçar e deixar para trás o que não serve mais.",
        palavras: ["clareza", "revelações", "boas notícias", "recomeço"],
      },
      oeste: {
        resumo: "Alerta para fofocas, mentiras e mal-entendidos. Pode indicar inimigos ocultos, pessoas falsas e problemas causados por palavras ditas no impulso, com risco de confusões e desgastes por falta de cuidado ao se comunicar.",
        palavras: ["fofocas", "mentiras", "confusões", "desgastes"],
      },
      sul: {
        resumo: "Um caminho que ensinou cautela com o que se fala e com quem se confia. Decepções e verdades que vieram à tona fortaleceram a base. O aprendizado do passado guia escolhas mais sábias e seguras.",
        palavras: ["caminho", "base", "passos", "firmeza"],
      },
      centro: {
        resumo: "Cuidar do que se fala, pensar antes de agir e não entrar em fofocas. Equilibrar curiosidade e discrição; com paciência e autoconhecimento, separar o que é verdade do que é ilusão. Ouvir mais e observar.",
        palavras: ["paciência", "discernimento", "discrição", "equilíbrio"],
      },
    },
    queda: {
      geral: "Verdades que aparecem, segredos que pedem guarda e a força da discrição, com prosperidade que vem do trabalho e da fé.",
      alertas: ["cuidado com fogo, buracos e sustos", "falsidade e enganos", "inimigos ocultos e armadilhas", "curiosidade em excesso traz consequências"],
      amor: ["discrição é essencial", "mágoas antigas podem voltar", "tendência a revelar demais", "falar menos e observar mais"],
      dinheiro: ["questões de herança e partilha", "direitos desconhecidos podem surgir", "capacidade de prosperar com trabalho e fé"],
      trabalho: ["foco e constância abrem caminhos", "guardar segredos é proteção", "atenção a enganos e armadilhas"],
      saude: ["sensibilidade nos olhos e na visão", "instabilidade emocional", "sustos e acidentes domésticos"],
      espiritualidade: ["cuidado com as obrigações religiosas", "atenção a Iemanjá, Exu e às entidades, conforme a tradição", "limpeza espiritual periódica", "cuidar do Ori e da ancestralidade"],
    },
  },
  {
    numero: 5,
    nome: "Oxe Meji",
    grafias: ["Oxé", "Oshe", "Oxé Meji"],
    sentencas: ["É sangue o que corre em nossas veias."],
    cabala: {
      norte: {
        resumo: "Pessoa emotiva, sensível, observadora e intuitiva. Valoriza afeto, beleza e reconhecimento; tem charme e carisma e às vezes um pouco de vaidade. Sente tudo com intensidade, oscila e precisa aprender a equilibrar coração e razão.",
        palavras: ["sensibilidade", "intuição", "afeto", "presença"],
      },
      leste: {
        resumo: "Magnetismo e facilidade para atrair boas oportunidades. A sensibilidade favorece relações verdadeiras e duradouras; beleza, prosperidade e proteção espiritual acompanham a pessoa, com reconhecimento quando age com gratidão.",
        palavras: ["magnetismo", "prosperidade", "encanto", "reconhecimento"],
      },
      oeste: {
        resumo: "Risco de mágoas profundas, humilhações e inveja ao redor. Segredos podem vir à tona e expor a pessoa. Tendência a sofrer calada, alimentar ilusões e se deixar levar pela sensibilidade, fazendo escolhas de que se arrepende.",
        palavras: ["mágoa", "inveja", "ilusão", "instabilidade"],
      },
      sul: {
        resumo: "Um caminho de oportunidades e mudanças importantes de destino. Os passos trouxeram sensibilidade e amadurecimento, mesmo com chances que não foram aproveitadas. A base se fortalece quando a pessoa honra o que viveu e a proteção que recebeu.",
        palavras: ["caminho", "base", "passos", "firmeza"],
      },
      centro: {
        resumo: "Cuidar das emoções sem alimentar mágoa nem rancor. Reconhecer oportunidades perdidas, equilibrar o que se sente com o que se faz e agradecer a proteção recebida. Pede limpeza interior e valorização de si.",
        palavras: ["gratidão", "discernimento", "perdão", "equilíbrio"],
      },
    },
    queda: {
      geral: "Emoções à flor da pele e oportunidades que se apresentam, pedindo autocontrole e força interior para não desistir.",
      alertas: ["inimigos gratuitos e falsidade", "inveja e olho gordo", "segredos expostos e risco de roubos"],
      amor: ["não entregar o controle da própria vida ao outro", "vontade de chorar e desabafar", "possibilidade de a família crescer"],
      dinheiro: ["atenção às finanças, presentes e ganhos", "cuidado com roubos", "organização da casa traz harmonia"],
      trabalho: ["oportunidades se apresentam", "vontade de desistir diante dos desafios", "sensação de ser julgada ou incompreendida"],
      saude: ["dores nas pernas ou no estômago", "não tomar remédio sem orientação médica", "o emocional pede cuidado"],
      espiritualidade: ["cumprir as obrigações com o Orixá", "amparo de Iemanjá", "pendências espirituais", "mudanças de destino estão próximas", "limpeza espiritual da casa"],
    },
  },
  {
    numero: 6,
    nome: "Obara Meji",
    grafias: ["Obará", "Obara"],
    sentencas: ["Rei morto, príncipe coroado."],
    cabala: {
      norte: {
        resumo: "Pessoa expressiva, comunicativa e cheia de carisma, de humor afiado, orgulho e independência. Opiniões fortes e presença marcante; alegre e sociável, mas também teimosa e de língua solta.",
        palavras: ["carisma", "franqueza", "presença", "intensidade"],
      },
      leste: {
        resumo: "Alegria, poder de persuasão e força social. Coragem para agir, sorte nos caminhos e boas oportunidades; atrai pessoas e abre portas quando fala com verdade e confiança.",
        palavras: ["expansão", "alegria", "conquistas", "movimento"],
      },
      oeste: {
        resumo: "Risco de falar demais, mentir ou exagerar. Inveja ao redor, aperto financeiro, fala impulsiva e conflitos. Pode indicar amizades de duas caras e problemas por dizer o que não devia ou querer o que é dos outros.",
        palavras: ["excessos", "inveja", "conflitos", "descontrole"],
      },
      sul: {
        resumo: "Um caminho que ensinou, muitas vezes pela dificuldade, o valor da cautela, da palavra e da responsabilidade. Passos entre perdas, dívidas e desconfianças viraram base. Seguir honrando compromissos e escolhendo melhor em quem confiar.",
        palavras: ["caminho", "base", "passos", "firmeza"],
      },
      centro: {
        resumo: "Equilibrar fala, desejos e decisões. Honrar a palavra, evitar discussões inúteis e não se deixar levar pela cobiça ou pela desconfiança. Pede fé, responsabilidade e cautela com promessas e acordos.",
        palavras: ["paciência", "discernimento", "honestidade", "equilíbrio"],
      },
    },
    queda: {
      geral: "Alegria e fartura possíveis, mas com inimigos rondando e a necessidade de cuidar da palavra, dos contratos e dos excessos.",
      alertas: ["muitos inimigos rondam o caminho", "ciladas e armadilhas", "pessoas de duas faces", "evitar acidentes e discussões"],
      amor: ["franqueza em excesso pode magoar", "fala impulsiva, sem medir palavras", "dificuldade em confiar nas pessoas"],
      dinheiro: ["contratos e compromissos pedem cautela", "negócios mal explicados", "não esquecer favores recebidos"],
      trabalho: ["fase difícil no trabalho, que pede paciência", "documentos exigem atenção", "boas notícias chegam por um deslocamento"],
      saude: ["dores e incômodos no corpo", "atenção ao que come e aos excessos"],
      espiritualidade: ["sonhos anunciam viagem ou deslocamento", "interpretar os sonhos com cautela", "nunca negar comida a quem pede", "preservar segredos e assuntos pessoais"],
    },
  },
  {
    numero: 7,
    nome: "Odi Meji",
    grafias: ["Odi", "Odí"],
    sentencas: ["Um pequeno buraco é indício de que existe uma saída."],
    cabala: {
      norte: {
        resumo: "Pessoa intensa, observadora e desconfiada, que lê o ambiente com profundidade e dificilmente relaxa. Tem força interior e sensibilidade para perceber perigos, falsidades e intenções escondidas; com o tempo transforma a experiência em estratégia e proteção.",
        palavras: ["vigilância", "intensidade", "resistência", "percepção"],
      },
      leste: {
        resumo: "Superação, proteção e capacidade de achar saída mesmo nos momentos difíceis. Favorece recuperar o que foi perdido, fortalecer a vida material e receber oportunidades depois de fases de pressão.",
        palavras: ["superação", "proteção", "firmeza", "saída"],
      },
      oeste: {
        resumo: "Alerta para inveja, tensões familiares, pesadelos e desgaste emocional. Sensação de perseguição, problemas com documentos ou com falas impensadas e dificuldade de confiar nas pessoas certas. Ambientes pesados e relações que drenam energia.",
        palavras: ["inveja", "conflitos", "desgaste", "desconfiança"],
      },
      sul: {
        resumo: "Um caminho de experiências difíceis, ambientes pesados e quedas que viraram aprendizado. Pede atenção aos lugares por onde se anda e às relações. Mostra recuperação depois das perdas, transformando dor e desconfiança em base.",
        palavras: ["caminho", "base", "passos", "firmeza"],
      },
      centro: {
        resumo: "Prudência e discrição. Manter o equilíbrio emocional, vigiar o que se diz e controlar reações impulsivas; nem tudo precisa ser esclarecido. Não deixar o medo, as fofocas e as pressões dominarem a mente.",
        palavras: ["prudência", "discrição", "discernimento", "equilíbrio"],
      },
    },
    queda: {
      geral: "Mesmo no aperto existe saída: dificuldades passageiras, inveja por perto e mudanças que chegam de fora.",
      alertas: ["inveja dentro do ambiente familiar", "manipulação e falsas intenções", "segredos podem ser usados contra a pessoa", "evitar locais e situações de risco"],
      amor: ["relacionamentos apaixonados, porém problemáticos", "pessoas próximas querendo interferir", "questões envolvendo filhos"],
      dinheiro: ["dificuldades financeiras passageiras", "recuperação de algo perdido ou esquecido", "mudança de moradia no horizonte"],
      trabalho: ["cuidado com documentos e questões judiciais", "alguém que vem de fora traz mudanças", "notícia que vem de longe"],
      saude: ["quedas e olhos pedem atenção", "pesadelos e desgaste emocional"],
      espiritualidade: ["obrigações e débitos espirituais a resolver", "Omolu, Iemanjá e Oxum, conforme a tradição", "sonhos com ancestrais trazem mensagens"],
    },
  },
  {
    numero: 8,
    nome: "Ejionile",
    grafias: ["Ejionilé", "Ejiogbe"],
    sentencas: ["A cabeça comanda o corpo. Um só rei governa o povo."],
    observacao: "Quando este Odù aparece, pede atenção especial ao Ori.",
    cabala: {
      norte: {
        resumo: "Personalidade forte, séria e responsável. Carrega o senso de dever, aguenta muito peso e costuma lutar calada para manter a vida de pé. Mente ativa, gosto pela ordem e capacidade de liderar, mas às vezes sente que se esforça mais do que é reconhecida.",
        palavras: ["responsabilidade", "força mental", "ordem", "liderança"],
      },
      leste: {
        resumo: "Clareza, proteção espiritual e força para vencer as batalhas com dignidade. Reconhecimento, vitória sobre as dificuldades e uma boa predestinação, com maturidade para conduzir a própria vida.",
        palavras: ["clareza", "proteção", "reconhecimento", "vitória"],
      },
      oeste: {
        resumo: "Pode trazer tristeza, cansaço, sensação de abandono e peso emocional acumulado. Dificuldade em se sentir valorizada, cobrança interna e tendência a guardar o sofrimento. Alerta para palavras negativas, ambientes pesados e afastamento da própria fé.",
        palavras: ["tristeza", "peso", "desvalorização", "isolamento"],
      },
      sul: {
        resumo: "Um caminho de sacrifício, responsabilidade e renúncias pelos outros, com passos dados entre esforço e lágrimas. A base se fortalece quando a pessoa honra a própria cabeça, respeita os mais velhos e deixa de carregar sozinha o peso de todos.",
        palavras: ["caminho", "base", "passos", "firmeza"],
      },
      centro: {
        resumo: "Cuidar da cabeça, da fé e da própria dignidade. Equilibrar sacrifício e limite, servir sem se abandonar. Humildade, respeito aos mais velhos e firmeza para não carregar tristezas em silêncio.",
        palavras: ["humildade", "respeito", "discernimento", "equilíbrio"],
      },
    },
    queda: {
      geral: "A cabeça no comando: responsabilidade, ética e cuidado com o Ori, com proteção para quem age com retidão.",
      alertas: ["falsidade e dissimulação", "inveja de onde menos se espera", "desânimo e tristeza profunda", "preocupação e pensamentos negativos em excesso"],
      amor: ["pessoas que se afastam depois de receber ajuda", "insegurança dentro de casa", "não carregar sozinha o peso da família"],
      dinheiro: ["não reivindicar mérito alheio", "reconhecimento que chega com dignidade", "disciplina e constância"],
      trabalho: ["disciplina e constância no trabalho", "conduta ética e correta", "inveja no ambiente"],
      saude: ["pernas e câimbras", "cuidado com a visão e com o sol", "alimentação leve e equilibrada", "evitar adoecer por falta de cuidado"],
      espiritualidade: ["zelo com o Ori e com a ancestralidade", "atender às recomendações de Obatalá", "o branco como símbolo nas obrigações e no dia a dia", "não contar os sonhos a qualquer pessoa", "observar sinais recorrentes e intuições"],
    },
  },
  {
    numero: 9,
    nome: "Osá Meji",
    grafias: ["Osa", "Ossá"],
    sentencas: ["Nem todo sorriso revela boas intenções.", "Por vezes, a loucura não passa de conveniência."],
    cabala: {
      norte: {
        resumo: "Pessoa perceptiva, intensa e muito sensível ao ambiente. Percebe falsidade com facilidade, observa bem as pessoas e só se entrega quando confia. Tem presença forte, inteligência emocional e instinto de proteção; amadurecida, usa essa percepção para se preservar sem viver desconfiada.",
        palavras: ["percepção", "intuição", "presença", "vigilância"],
      },
      leste: {
        resumo: "Discernimento, proteção e coragem para se afastar do que faz mal. Favorece cortes necessários, clareza sobre amizades e força para defender a própria energia. Os caminhos se abrem quando a pessoa confia na intuição e escolhe melhor as companhias.",
        palavras: ["discernimento", "proteção", "cortes", "clareza"],
      },
      oeste: {
        resumo: "Alerta para pessoas falsas, amizades interesseiras, inveja e inimigos ocultos. Fofocas, traições e desgaste emocional, com a sensação de estar cercada de intenções duvidosas e o risco de insistir em relações que já mostraram falsidade.",
        palavras: ["falsidade", "inveja", "traição", "desgaste"],
      },
      sul: {
        resumo: "Um caminho de provas e quebras de confiança que ensinaram a vigiar ambientes e companhias. A base se fortalece quando a pessoa cuida do que é seu, aprende com os alertas do passado e não repete caminhos perigosos.",
        palavras: ["caminho", "base", "passos", "firmeza"],
      },
      centro: {
        resumo: "Controlar a revolta, a teimosia e o gênio forte, sem agir por impulso nem alimentar ofensas e vinganças. Equilibrar força e prudência, observar quem entra em casa e em quem se confia, esfriar a cabeça e aceitar conselhos.",
        palavras: ["discernimento", "prudência", "proteção", "equilíbrio"],
      },
    },
    queda: {
      geral: "Nem tudo é o que parece: amigos e inimigos lado a lado, pedindo proteção, discernimento e disciplina da mente.",
      alertas: ["pessoas falsas e interesseiras", "maldições e palavras lançadas", "acidentes com fogo, queimaduras e eletricidade", "locais escuros e perigosos"],
      amor: ["conflitos e desentendimentos podem surgir em casa", "interferência de terceiros", "não carregar o peso dos outros"],
      dinheiro: ["amizades interesseiras", "cortes necessários para proteger o que é seu"],
      trabalho: ["amigos e inimigos lado a lado", "memória fraca e distração pedem disciplina", "dificuldade em admitir erros"],
      saude: ["cabeça, sistema nervoso e sono", "golpes de ar e mudanças de clima", "cautela em viagens"],
      espiritualidade: ["forte ligação com a ancestralidade", "proteção contra trabalhos negativos", "sonhos com alimentos e com pessoas que já partiram", "indicação de obrigação espiritual"],
    },
  },
  {
    numero: 10,
    nome: "Ofun Meji",
    grafias: ["Ofun", "Ofum"],
    sentencas: ["O caminho se abre quando há firmeza e conclusão.", "É a agulha que carrega a linha."],
    cabala: {
      norte: {
        resumo: "Pessoa reflexiva, sensível e observadora, de imaginação forte e espiritualidade marcante, que pensa antes de agir. Gentil e acolhedora, mas se perde em expectativas, dúvidas ou espera demais; amadurecida, ganha autonomia e firmeza para concluir o que começa.",
        palavras: ["reflexão", "sensibilidade", "visão", "expectativa"],
      },
      leste: {
        resumo: "Maturidade, sabedoria e clareza para concluir processos. Favorece autonomia, crescimento espiritual e a força de tirar planos do papel; os caminhos se abrem quando a pessoa assume a responsabilidade e age com disciplina.",
        palavras: ["sabedoria", "autonomia", "clareza", "realização"],
      },
      oeste: {
        resumo: "Alerta para dependência, adiamentos, promessas não cumpridas e expectativa demais. Medo, comodismo e falta de iniciativa; tendência a se perder em fantasias e a desanimar quando as coisas não acontecem no tempo desejado.",
        palavras: ["dependência", "atrasos", "paralisação", "ilusão"],
      },
      sul: {
        resumo: "Um caminho de espera, aprendizado e reorganização. Atrasos e obstáculos ensinaram paciência, disciplina e responsabilidade. É um convite a manter o foco e concluir o que foi iniciado, usando a experiência como guia.",
        palavras: ["caminho", "aprendizado", "disciplina", "firmeza"],
      },
      centro: {
        resumo: "Equilibrar mente e ação, sem ficar preso a expectativas. Organizar os pensamentos, assumir responsabilidades e pôr em prática o que foi planejado: paciência, sim, mas com disciplina para transformar intenção em resultado.",
        palavras: ["disciplina", "responsabilidade", "ação", "equilíbrio"],
      },
    },
    queda: {
      geral: "Paz, recolhimento e conclusão: o caminho se abre quando a pessoa organiza a vida e termina o que começou.",
      alertas: ["planos que dependem de outras pessoas", "expectativas irreais", "conversas negativas e fofocas"],
      amor: ["preservar a privacidade", "observar bem amizades e alianças", "proteger a própria tranquilidade"],
      dinheiro: ["organizar a casa e os compromissos", "fazer escolhas conscientes e responsáveis", "não depender só dos outros"],
      trabalho: ["concluir o que foi iniciado", "evitar exposição excessiva", "discrição em todos os ambientes"],
      saude: ["priorizar descanso e silêncio", "evitar excesso de preocupação", "rotina e alimentação equilibradas"],
      espiritualidade: ["cuidado com o Ori e com o sagrado", "limpeza do ambiente físico e espiritual", "proteção da casa e da família", "fortalecer a paz interior"],
    },
  },
  {
    numero: 11,
    nome: "Owónrin Meji",
    grafias: ["Owonrin", "Owarin", "Owónrin"],
    sentencas: ["Pegar água num cesto é trabalhar inutilmente."],
    cabala: {
      norte: {
        resumo: "Pessoa inquieta, inteligente e criativa, de mente rápida, observadora e questionadora. Às vezes instável, começa muitas ideias ao mesmo tempo e se dispersa; amadurecida, transforma esse movimento mental em sabedoria e adaptação.",
        palavras: ["movimento", "inteligência", "inquietação", "criatividade"],
      },
      leste: {
        resumo: "Versatilidade, facilidade para recomeçar e encontrar saídas. Adaptação, comunicação e superação de fases difíceis, com proteção quando a inteligência é usada com foco em objetivos construtivos.",
        palavras: ["adaptação", "recomeço", "saídas", "superação"],
      },
      oeste: {
        resumo: "Alerta para dispersão, trabalho que não rende, ansiedade e promessas que ficam pelo caminho. Cansaço mental, insistência em caminhos inúteis e energia gasta em preocupações e tarefas sem resultado.",
        palavras: ["dispersão", "ansiedade", "desgaste", "esforço em vão"],
      },
      sul: {
        resumo: "Aprender a escolher onde colocar a energia, parar de insistir no que não rende e simplificar a rotina, trocando agitação por direção.",
        palavras: ["foco", "direção", "consciência", "equilíbrio"],
      },
      centro: {
        resumo: "Organizar os pensamentos, evitar a dispersão e direcionar a energia para o que traz resultado. Filtrar ideias, concluir o que começou e agir com disciplina; paciência e equilíbrio transformam movimento em progresso.",
        palavras: ["disciplina", "organização", "foco", "equilíbrio"],
      },
    },
    queda: {
      geral: "Muito movimento e pouca colheita quando falta direção: pede foco, paciência e cumprimento das promessas.",
      alertas: ["esforço em vão quando falta direção", "excessos e impulsos fortes", "ambientes carregados e discussões desnecessárias"],
      amor: ["amores intensos que pedem maturidade", "desafios de comunicação no casamento", "ciúmes e desconfianças", "influência de terceiros e necessidade de preservar a intimidade"],
      dinheiro: ["não gastar energia no que não dá retorno", "promessas e compromissos não concluídos"],
      trabalho: ["instabilidade profissional e mudanças inesperadas", "caminhos que parecem parados exigem paciência", "esperar o momento certo antes de avançar"],
      saude: ["desgaste emocional e mental", "ansiedade e cansaço", "preservar a energia vital"],
      espiritualidade: ["respeito às promessas feitas aos Orixás", "cumprir compromissos espirituais", "sonhos que trazem avisos", "gratidão e ligação com a ancestralidade"],
    },
    pendencias: ["No PDF da cabala, o quadro do Sul de Owónrin veio com o título e o texto de 'Momento de equilíbrio' (parecido com o Centro). Falta o texto próprio do Sul."],
  },
  {
    numero: 12,
    nome: "Ejilaxebora",
    grafias: ["Ejilaxeborá", "Ejila Sebora"],
    sentencas: ["Quando não existe guerra o soldado não morre.", "Quando não existe confronto, o caminho permanece em paz."],
    cabala: {
      norte: {
        resumo: "Pessoa forte, combativa, estratégica e protetora. Tem coragem, não suporta injustiça e assume responsabilidades. Firme nas opiniões e com espírito de defesa, valoriza disciplina e sabe quando avançar e quando recuar.",
        palavras: ["coragem", "firmeza", "estratégia", "proteção"],
      },
      leste: {
        resumo: "Capacidade de vencer lutas, liderança e proteção espiritual, com caminhos abertos pela coragem. Força para defender quem ama e transformar conflitos em conquistas; favorece reconhecimento e objetivos importantes.",
        palavras: ["liderança", "vitória", "proteção", "conquista"],
      },
      oeste: {
        resumo: "Tendência a viver em alerta e entrar em disputas desnecessárias, com impulsividade, irritação e rigidez. Desgaste por querer brigar por tudo, conflitos com pessoas próximas e dificuldade de descansar a mente.",
        palavras: ["conflitos", "impulsividade", "tensão", "rigidez"],
      },
      sul: {
        resumo: "Discernir quais batalhas merecem energia e trocar o confronto pela estratégia, protegendo a paz interior e usando a força para construir.",
        palavras: ["discernimento", "paz", "sabedoria", "equilíbrio"],
      },
      centro: {
        resumo: "Escolher bem onde colocar a energia, evitar conflitos desnecessários e agir com disciplina e estratégia. A paz também é uma vitória: a verdadeira força está em saber o que vale a pena.",
        palavras: ["disciplina", "estratégia", "discernimento", "equilíbrio"],
      },
    },
    queda: {
      geral: "Justiça e retidão: escolher as batalhas, cumprir a palavra e manter a paz para o caminho seguir aberto.",
      alertas: ["tensões e oposições ocultas", "alianças duvidosas", "a impulsividade pode agravar situações", "não entrar em disputas desnecessárias"],
      amor: ["escolhas amorosas pedem discernimento", "emoções intensas e ciúmes", "interferências externas", "resolver pendências afetivas com clareza"],
      dinheiro: ["atenção a acordos e compromissos assumidos", "cuidado com alianças duvidosas", "cuidado com o que promete"],
      trabalho: ["agir com verdade e retidão", "evitar julgamentos precipitados", "cumprir deveres e honrar o que é justo"],
      saude: ["priorizar o sono e o descanso", "alimentação leve", "atenção aos sinais do corpo", "casa organizada e limpa"],
      espiritualidade: ["preservar a energia e a paz interior", "buscar equilíbrio nas decisões"],
    },
    pendencias: ["No PDF da cabala, o quadro do Sul de Ejilaxebora veio com o título 'Momento de equilíbrio' (parecido com o Centro). Falta o texto próprio do Sul."],
  },
  {
    numero: 13,
    nome: "Ejiologbon",
    grafias: ["Ejiologbon", "Ejiologbé"],
    sentencas: ["Quando existe enfermidade o sangue adoece.", "Quando a vitalidade pede atenção, o caminho chama ao cuidado."],
    cabala: {
      norte: {
        resumo: "Pessoa inteligente, sociável e aberta a orientação. Tem boas ideias, gosta de viver em grupo e valoriza a presença de quem está por perto. Pode hesitar antes de decidir.",
        palavras: ["inteligência", "sociabilidade", "ideias", "receptividade"],
      },
      leste: {
        resumo: "Adaptação, colaboração e capacidade de recomeçar diante das mudanças. Inteligência para aprender com os outros e construir novas possibilidades.",
        palavras: ["adaptação", "colaboração", "recomeço", "aprendizado"],
      },
      oeste: {
        resumo: "Alerta para indecisão, dependência de orientação e dificuldade de agir sozinha, ficando em situações que já se esgotaram. Teimosia, confusão diante das escolhas e influência demais do grupo: o desafio é não entregar aos outros a direção da própria vida.",
        palavras: ["indecisão", "dependência", "teimosia", "influência"],
      },
      sul: {
        resumo: "Um caminho feito de mudanças, encerramentos e recomeços, em que muitas coisas chegaram ao fim e pediram novas escolhas. Os passos se firmam quando a pessoa deixa a indecisão e assume a própria direção.",
        palavras: ["caminho", "mudança", "passos", "firmeza"],
      },
      centro: {
        resumo: "Reconhecer quando algo se esgotou e não pode continuar. Aceitar mudanças, ouvir conselhos sem depender deles e transformar boas ideias em ação, unindo convivência e autonomia.",
        palavras: ["decisão", "autonomia", "consciência", "equilíbrio"],
      },
    },
    queda: {
      geral: "Fim de um ciclo e mudanças profundas, com a vitalidade pedindo cuidado e a necessidade de não caminhar sozinha.",
      alertas: ["fim de um ciclo importante", "mudanças profundas e inevitáveis", "vontade de se afastar de tudo e de todos"],
      amor: ["necessidade de acolhimento e compreensão", "não caminhar sozinha nos momentos difíceis", "fortalecer os vínculos familiares verdadeiros"],
      dinheiro: ["reorganização de caminhos e propósitos", "solucionar pendências e concluir o que ficou"],
      trabalho: ["sensação de injustiça ou desvalorização", "dificuldade de pertencer a grupos ou ambientes", "amadurecimento pelas experiências"],
      saude: ["atenção constante ao corpo e à energia", "equilíbrio entre atividade e repouso", "observar sinais físicos e emocionais", "buscar apoio adequado quando necessário"],
      espiritualidade: ["fortalecer o vínculo com a ancestralidade", "buscar orientação e apoio tradicional", "valorizar a herança espiritual recebida", "respeitar interdições e tradições"],
    },
    pendencias: ["No PDF da cabala, os textos do Norte e do Leste de Ejiologbon estão cortados no meio da frase."],
  },
  {
    numero: 14,
    nome: "Iká Meji",
    grafias: ["Ika", "Iká"],
    sentencas: ["Quando chove o sapo se abriga embaixo da pedra."],
    cabala: {
      norte: {
        resumo: "Pessoa intensa, corajosa e de presença forte. Tem energia para conquistar, age com firmeza e não foge de desafios. Pode ser impetuosa e competitiva.",
        palavras: ["coragem", "intensidade", "presença", "liderança"],
      },
      leste: {
        resumo: "Força para vencer disputas, enfrentar obstáculos e conquistar objetivos. Favorece coragem, iniciativa, liderança e recuperação depois de fases difíceis.",
        palavras: ["vitória", "iniciativa", "conquista", "superação"],
      },
      oeste: {
        resumo: "Alerta para impulsividade, conflitos e excesso de força, com decisões tomadas no calor do momento. Pode indicar abuso de autoridade, discussões desnecessárias, querer vencer a qualquer custo e decepções com pessoas próximas.",
        palavras: ["impulsividade", "conflitos", "excessos", "desgaste"],
      },
      sul: {
        resumo: "Um caminho de confrontos, riscos e decisões sob pressão, que mostrou que agir por impulso pode custar caro. A base se fortalece quando a pessoa se prepara, usa a cabeça antes da força e espera o momento certo.",
        palavras: ["caminho", "base", "passos", "firmeza"],
      },
      centro: {
        resumo: "Pensar duas vezes antes de decidir, não aceitar provocações e aguardar o momento certo. Conter o gênio e a impetuosidade, preparar os recursos e usar a energia com estratégia: a força conquista quando é guiada pela prudência.",
        palavras: ["prudência", "estratégia", "preparo", "equilíbrio"],
      },
    },
    queda: {
      geral: "Abrigar-se e esperar a hora certa: liderança com sabedoria, planejamento e encerramento de uma etapa para começar outra.",
      alertas: ["ambientes tensos e negativos", "não reagir por impulso", "falsas alianças e interesses", "não alimentar provocações nem intrigas"],
      amor: ["firmeza com respeito e dignidade", "escolher bem as companhias", "decepções com pessoas próximas"],
      dinheiro: ["planejar com calma e visão de longo prazo", "reunir recursos antes de iniciar", "esperar o momento certo para agir"],
      trabalho: ["liderança com sabedoria e justiça", "cuidado com o abuso de autoridade", "possível mudança de rumo ou de estratégia", "encerramento de uma etapa e começo de outra"],
      saude: ["cuidar da cabeça e manter o Ori claro", "evitar ambientes tensos", "conter o gênio e a impetuosidade"],
      espiritualidade: ["ouvir a orientação do Ori e dos mais velhos", "limpeza interior e pensamentos nobres", "fortalecer a proteção espiritual todos os dias", "agir com disciplina, fé e constância"],
    },
    pendencias: ["No PDF da cabala, os textos do Norte e do Leste de Iká estão cortados no meio da frase."],
  },
  {
    numero: 15,
    nome: "Obeogundá",
    grafias: ["Ogbeogundá", "Obeogunda"],
    sentencas: ["A mesma força que movimenta é a que paralisa."],
    cabala: {
      norte: {
        resumo: "Pessoa bondosa, aberta e de coração generoso. Confia com facilidade, recebe bem as pessoas e perdoa sem dificuldade. Afetuosa e conciliadora, prefere a paz ao confronto; pode ser ingênua, mas é leal e acolhedora.",
        palavras: ["generosidade", "acolhimento", "lealdade", "bondade"],
      },
      leste: {
        resumo: "Capacidade de reconstruir, acolher e proteger quem ama. Reconciliações sinceras, abertura do coração, apoio espiritual e força para manter a casa e os vínculos. Unindo bondade e discernimento, traz proteção e estabilidade.",
        palavras: ["proteção", "reconciliação", "estabilidade", "maturidade"],
      },
      oeste: {
        resumo: "Alerta para ingenuidade, confiança demais e dificuldade de perceber a maldade alheia. Pode indicar vaidade, gente que elogia pela frente e zomba por trás e a tendência de aceitar de volta quem já traiu, atrasando a vida afetiva ou doméstica.",
        palavras: ["ingenuidade", "vaidade", "traição", "confiança em excesso"],
      },
      sul: {
        resumo: "Firmar os passos, escolher bem com quem caminha e não voltar sempre ao mesmo lugar. Colocar limites e evitar caminhos que já causaram dor: a proteção está em saber para onde ir, quem levar e quando seguir sem se prender ao passado.",
        palavras: ["caminho", "passos", "limites", "firmeza"],
      },
      centro: {
        resumo: "Equilibrar bondade e discernimento: ouvir o coração sem perder a razão, acolher sem se anular. Cuidar de si, reconhecer os próprios limites e proteger o que construiu, sem repetir erros.",
        palavras: ["discernimento", "limites", "paz", "equilíbrio"],
      },
    },
    queda: {
      geral: "A força que movimenta também paralisa: bondade que precisa de limites e de olhar atento para as pessoas ao redor.",
      alertas: ["confiança exagerada nas pessoas", "tendência a esquecer alertas recebidos", "vaidade que pode trazer prejuízos"],
      amor: ["vida amorosa baseada em verdade e reciprocidade", "interferência de terceiros", "evitar ciúmes e desconfiança", "proteger a casa e a família"],
      dinheiro: ["confiança em excesso pode trazer prejuízo", "escolher bem companhias e aliados"],
      trabalho: ["observar melhor as pessoas", "perdão fácil demais", "proteger a própria energia"],
      saude: ["cuidado com o corpo e o equilíbrio geral", "moderação na alimentação", "autocontrole diante de excessos e impulsos"],
      espiritualidade: ["cumprir as obrigações", "destino religioso que exige atenção e compromisso", "amadurecimento pela experiência", "respeito aos fundamentos e tradições"],
    },
  },
  {
    numero: 16,
    nome: "Alafia",
    grafias: ["Aláfia", "Alafiá"],
    sentencas: ["Uma venda sobre os olhos esconde o próprio nariz."],
    observacao: "A interpretação deve considerar o contexto completo da consulta.",
    cabala: {
      norte: {
        resumo: "Pessoa carismática, afetuosa e comunicativa. Fala bem, convence e recebe as pessoas com alegria; tem sensibilidade artística, criatividade e vocação para liderar. Ao mesmo tempo, pode oscilar entre o sim e o não quando precisa se posicionar.",
        palavras: ["carisma", "afeto", "comunicação", "criatividade"],
      },
      leste: {
        resumo: "Dom de liderança e de expressão, sucesso pelos talentos criativos e capacidade de inspirar. Favorece sinceridade no amor, caminhos ligados às artes e proteção espiritual quando a pessoa honra a própria verdade e toma a frente da própria vida.",
        palavras: ["liderança", "expressão", "talento", "inspiração"],
      },
      oeste: {
        resumo: "Alerta para indecisão, mudança constante de opinião e dificuldade de sustentar a palavra dada. Vaidade, impulsos acima da razão e a tendência de deixar que os outros escolham, correndo o risco de parecer incoerente.",
        palavras: ["indecisão", "vaidade", "incoerência", "instabilidade"],
      },
      sul: {
        resumo: "Firmar os passos e escolher bem os caminhos, colocando limites e avançando com prudência. Cada passo precisa de base; a firmeza traz segurança e realizações duradouras.",
        palavras: ["caminho", "passos", "limites", "firmeza"],
      },
      centro: {
        resumo: "Coerência entre o que se pensa, o que se diz e o que se faz. Equilibrar gentileza e autoridade, afeto e responsabilidade, talento e disciplina, com os pés no chão e sem se deixar levar pela opinião dos outros.",
        palavras: ["coerência", "determinação", "responsabilidade", "equilíbrio"],
      },
    },
    queda: {
      geral: "Bênçãos e caminhos abertos para quem age com verdade, disciplina e gratidão.",
      alertas: ["não faltar com a verdade nem prometer em vão", "intrigas, fofocas e julgamentos", "companhias que desviam do propósito"],
      amor: ["sinceridade e boa receptividade", "cuidado com palavras duras ou precipitadas", "generosidade no trato com o outro"],
      dinheiro: ["boas oportunidades por mérito e dedicação", "a caridade abre portas e multiplica bênçãos", "proteção contra inveja"],
      trabalho: ["liderança natural e justa", "talento para as artes e a beleza", "determinação para concluir o que inicia"],
      saude: ["cuidado com exageros na alimentação", "evitar hábitos que enfraquecem o corpo e a mente", "rotina equilibrada, sem excessos"],
      espiritualidade: ["proteção espiritual e bênçãos", "facilidade para leitura de sinais e intuição", "força nas preces e conexão com o sagrado", "gratidão como guia diário"],
    },
  },
];

export function getOdu(numero: number): Odu {
  const odu = ODUS[numero - 1];
  if (!odu || odu.numero !== numero) throw new Error(`Odù inválido: ${numero}`);
  return odu;
}
