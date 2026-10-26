import type { Area } from "./odus";

// `foco` orienta a IA; `convite` é o texto da área na página inicial.
export const AREAS: { id: Area; titulo: string; curto: string; foco: string; convite: string }[] = [
  {
    id: "amor",
    titulo: "Amor e relacionamentos",
    curto: "Amor",
    foco: "vida afetiva, relacionamentos, família e as questões que pedem atenção nesse campo",
    convite:
      "O que merece atenção na sua vida afetiva, nos relacionamentos e nos laços familiares? Uma leitura para compreender melhor suas relações e refletir sobre os caminhos que se apresentam.",
  },
  {
    id: "dinheiro",
    titulo: "Dinheiro e vida financeira",
    curto: "Dinheiro",
    foco: "relação com o dinheiro, possibilidades, cuidados e caminhos financeiros do momento",
    convite:
      "Como estão seus caminhos financeiros? Uma orientação para refletir sobre oportunidades, escolhas, cuidados e possibilidades de prosperidade.",
  },
  {
    id: "trabalho",
    titulo: "Trabalho e vida profissional",
    curto: "Trabalho",
    foco: "carreira, atividades profissionais, oportunidades, desafios e direcionamentos",
    convite:
      "Quais caminhos merecem sua atenção na vida profissional? Explore oportunidades, desafios, mudanças e possibilidades para seguir em frente.",
  },
  {
    id: "saude",
    titulo: "Saúde e bem-estar",
    curto: "Saúde",
    foco: "equilíbrio, autocuidado e pontos de atenção, como reflexão espiritual (nunca diagnóstico)",
    convite:
      "Um convite para olhar com mais atenção para seu equilíbrio, autocuidado e bem-estar, reconhecendo aspectos da rotina que podem merecer cuidado. Esta leitura é espiritual e não substitui avaliação médica.",
  },
  {
    id: "espiritualidade",
    titulo: "Espiritualidade e ancestralidade",
    curto: "Espiritualidade",
    foco: "campo espiritual, proteção, Ori, ancestralidade e o caminho do consulente",
    convite:
      "Uma reflexão sobre sua conexão espiritual, seu Ori, suas raízes ancestrais e os caminhos que podem ajudar você a caminhar com mais consciência e propósito.",
  },
];
