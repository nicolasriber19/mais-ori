import type { Area } from "./odus";

export const AREAS: { id: Area; titulo: string; curto: string; foco: string }[] = [
  {
    id: "amor",
    titulo: "Amor e relacionamentos",
    curto: "Amor",
    foco: "vida afetiva, relacionamentos, família e as questões que pedem atenção nesse campo",
  },
  {
    id: "dinheiro",
    titulo: "Dinheiro e vida financeira",
    curto: "Dinheiro",
    foco: "relação com o dinheiro, possibilidades, cuidados e caminhos financeiros do momento",
  },
  {
    id: "trabalho",
    titulo: "Trabalho e vida profissional",
    curto: "Trabalho",
    foco: "carreira, atividades profissionais, oportunidades, desafios e direcionamentos",
  },
  {
    id: "saude",
    titulo: "Saúde e bem-estar",
    curto: "Saúde",
    foco: "equilíbrio, autocuidado e pontos de atenção, como reflexão espiritual (nunca diagnóstico)",
  },
  {
    id: "espiritualidade",
    titulo: "Espiritualidade",
    curto: "Espiritualidade",
    foco: "campo espiritual, proteção, Ori, ancestralidade e o caminho do consulente",
  },
];
