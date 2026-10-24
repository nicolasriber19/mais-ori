import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { AREAS } from "@/base/areas";
import { POSICOES, SENTIDO_POSICAO, type Cabala } from "@/base/cabala";
import { getOdu } from "@/base/odus";
import { partirSecoes } from "@/components/Leitura";
import type { Sessao } from "./sessao";

let fontesProntas = false;
export function registrarFontes(origem: string) {
  if (fontesProntas) return;
  Font.register({
    family: "Cormorant",
    fonts: [
      { src: `${origem}/fonts/cormorant-garamond-latin-500-normal.woff`, fontWeight: 500 },
      { src: `${origem}/fonts/cormorant-garamond-latin-600-normal.woff`, fontWeight: 600 },
      { src: `${origem}/fonts/cormorant-garamond-latin-700-normal.woff`, fontWeight: 700 },
      { src: `${origem}/fonts/cormorant-garamond-latin-500-italic.woff`, fontWeight: 500, fontStyle: "italic" },
    ],
  });
  Font.register({
    family: "Manrope",
    fonts: [
      { src: `${origem}/fonts/manrope-latin-400-normal.woff`, fontWeight: 400 },
      { src: `${origem}/fonts/manrope-latin-600-normal.woff`, fontWeight: 600 },
      { src: `${origem}/fonts/manrope-latin-700-normal.woff`, fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((palavra) => [palavra]);
  fontesProntas = true;
}

const COR: Record<string, string> = {
  norte: "#2f8a5b",
  sul: "#b5443c",
  leste: "#3b70c4",
  oeste: "#7b51b2",
  centro: "#8c5b33",
};

const s = StyleSheet.create({
  pagina: { backgroundColor: "#fbf6ec", color: "#2a1f15", fontFamily: "Manrope", fontSize: 10.5, lineHeight: 1.55, paddingTop: 48, paddingBottom: 60, paddingHorizontal: 52 },
  topo: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1pt solid #d4af6e", paddingBottom: 14, marginBottom: 22 },
  // A Cormorant desenha abaixo da caixa de linha padrão do react-pdf: os títulos levam lineHeight próprio.
  marca: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 30, lineHeight: 1.35, color: "#2a1f15" },
  marcaMais: { color: "#b08a45" },
  sub: { fontSize: 9, color: "#7a6a52", letterSpacing: 1.2, textTransform: "uppercase" },
  titulo: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 26, lineHeight: 1.4, marginBottom: 6 },
  dados: { fontSize: 10, color: "#6b5c47", marginBottom: 18 },
  h2: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 19, lineHeight: 1.4, color: "#2a1f15", marginTop: 10, marginBottom: 8 },
  ponto: { flexDirection: "row", marginBottom: 10 },
  bolinha: { width: 22, height: 22, borderRadius: 11, color: "#fff", fontWeight: 700, fontSize: 10, textAlign: "center", paddingTop: 5, marginRight: 10 },
  pontoTitulo: { fontSize: 8.5, color: "#7a6a52", letterSpacing: 1, textTransform: "uppercase" },
  pontoNome: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 14, lineHeight: 1.4 },
  queda: { marginTop: 6, marginBottom: 6 },
  quedaArea: { fontSize: 8.5, color: "#b08a45", letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 600 },
  quedaOdu: { fontFamily: "Cormorant", fontWeight: 700, fontSize: 21, lineHeight: 1.4, marginBottom: 2 },
  sentenca: { fontFamily: "Cormorant", fontStyle: "italic", fontWeight: 500, fontSize: 13, lineHeight: 1.4, color: "#6b5c47", marginBottom: 8 },
  secaoTitulo: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 14, lineHeight: 1.4, color: "#8a6a2e", marginTop: 6, marginBottom: 2 },
  paragrafo: { marginBottom: 5, textAlign: "justify" },
  divisor: { borderBottom: "0.6pt solid #e2cfa6", marginVertical: 14 },
  rodape: { position: "absolute", bottom: 26, left: 52, right: 52, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: "#9a8a72" },
  aviso: { marginTop: 16, fontSize: 8.5, color: "#7a6a52" },
});

export function ConsultaPdf({ sessao, cabala }: { sessao: Sessao; cabala: Cabala }) {
  const quedas = sessao.quedas ?? [];
  const hoje = new Date().toLocaleDateString("pt-BR");
  const rodape = (
    <View style={s.rodape} fixed>
      <Text>+Ori · Consulta de {sessao.nome}</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} de ${totalPages}`} />
    </View>
  );

  return (
    <Document title={`+Ori · Consulta de ${sessao.nome}`} author="+Ori" language="pt-BR">
      <Page size="A4" style={s.pagina}>
        <View style={s.topo}>
          <Text style={s.marca}>
            <Text style={s.marcaMais}>+</Text>Ori
          </Text>
          <Text style={s.sub}>Consulta de búzios · Cabala dos Odùs</Text>
        </View>
        <Text style={s.titulo}>Consulta de {sessao.nome}</Text>
        <Text style={s.dados}>
          Nascimento em {sessao.nascimento} · Consulta de {hoje}
        </Text>

        <Text style={s.h2}>A sua Cabala dos Odùs</Text>
        {POSICOES.map((p) => {
          const o = getOdu(cabala[p]);
          return (
            <View key={p} style={s.ponto} wrap={false}>
              <Text style={[s.bolinha, { backgroundColor: COR[p] }]}>{cabala[p]}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.pontoTitulo}>
                  {SENTIDO_POSICAO[p].titulo} · {SENTIDO_POSICAO[p].tema}
                </Text>
                <Text style={s.pontoNome}>{o.nome}</Text>
                <Text>{o.cabala[p].resumo}</Text>
              </View>
            </View>
          );
        })}
        {rodape}
      </Page>

      <Page size="A4" style={s.pagina}>
        <Text style={s.h2}>As cinco quedas</Text>
        {quedas.map((q, i) => {
          const o = getOdu(q.odu);
          const area = AREAS.find((a) => a.id === q.area)!;
          return (
            <View key={q.area} style={s.queda}>
              <View wrap={false}>
                <Text style={s.quedaArea}>
                  {i + 1}ª queda · {area.titulo}
                </Text>
                <Text style={s.quedaOdu}>
                  Odù <Text style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: 17 }}>{o.numero}</Text> · {o.nome}
                </Text>
                <Text style={s.sentenca}>“{o.sentencas[0]}”</Text>
              </View>
              {partirSecoes(q.texto).map((sec, j) => (
                <View key={j}>
                  {sec.titulo ? (
                    <Text style={s.secaoTitulo} minPresenceAhead={40}>
                      {sec.titulo}
                    </Text>
                  ) : null}
                  {sec.corpo.split(/\n{2,}/).map((par, k) => (
                    <Text key={k} style={s.paragrafo}>
                      {par.replace(/\n/g, " ")}
                    </Text>
                  ))}
                </View>
              ))}
              {i < quedas.length - 1 && <View style={s.divisor} />}
            </View>
          );
        })}
        <Text style={s.aviso}>
          O +Ori é uma ferramenta de acolhimento e orientação espiritual. Não substitui acompanhamento médico,
          psicológico, jurídico ou financeiro. Ebós, obrigações e oferendas devem ser conduzidos por quem tem fundamento.
        </Text>
        {rodape}
      </Page>
    </Document>
  );
}
