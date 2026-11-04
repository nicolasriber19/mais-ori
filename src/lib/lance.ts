// Sorteio de uma jogada: usado na amostra e na consulta completa.

function sortear(max: number): number {
  const v = new Uint32Array(1);
  crypto.getRandomValues(v);
  return v[0] % max;
}

/** Sorteia o Odù (1 a 16, todos com a mesma chance) e quais búzios caem abertos. */
export function lancar(): { odu: number; abertos: number[] } {
  const odu = sortear(16) + 1;
  const ordem = Array.from({ length: 16 }, (_, i) => i);
  for (let i = ordem.length - 1; i > 0; i--) {
    const j = sortear(i + 1);
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
  return { odu, abertos: ordem.slice(0, odu) };
}
