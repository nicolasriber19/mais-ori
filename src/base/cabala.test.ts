import { test } from "node:test";
import assert from "node:assert/strict";
import { calcularCabala, parseData, reduzir } from "./cabala.ts";

test("exemplo do PDF: 18/07/1997", () => {
  const r = calcularCabala(18, 7, 1997);
  assert.deepEqual(r.pares, ["18", "07", "19", "97"]);
  assert.equal(r.somaEsquerda, 11);
  assert.equal(r.somaDireita, 31);
  // Norte 11, Sul 4, lado esquerdo 15, lado direito 3, Centro 6
  assert.deepEqual(r.cabala, { norte: 11, sul: 4, oeste: 15, leste: 3, centro: 6 });
});

test("caso de teste combinado: Norte 3, Sul 4, Leste 14, Oeste 7", () => {
  const r = calcularCabala(11, 1, 2002);
  assert.equal(r.cabala.norte, 3);
  assert.equal(r.cabala.sul, 4);
  assert.equal(r.cabala.oeste, 7);
  assert.equal(r.cabala.leste, 14);
  assert.equal(r.cabala.centro, 10); // 3+4+7+14 = 28 → 2+8
});

test("redução: passou de 16 soma os algarismos", () => {
  assert.equal(reduzir(16), 16);
  assert.equal(reduzir(17), 8);
  assert.equal(reduzir(31), 4);
  assert.equal(reduzir(29), 11);
  assert.equal(reduzir(0), 16);
});

test("toda data cai entre 1 e 16 em todas as posições", () => {
  for (let ano = 1920; ano <= 2025; ano += 7) {
    for (let mes = 1; mes <= 12; mes++) {
      for (let dia = 1; dia <= 28; dia += 3) {
        for (const v of Object.values(calcularCabala(dia, mes, ano).cabala)) {
          assert.ok(v >= 1 && v <= 16, `${dia}/${mes}/${ano} → ${v}`);
        }
      }
    }
  }
});

test("datas", () => {
  assert.deepEqual(parseData("18/07/1997"), { dia: 18, mes: 7, ano: 1997 });
  assert.deepEqual(parseData("1997-07-18"), { dia: 18, mes: 7, ano: 1997 });
  assert.equal(parseData("31/02/1990"), null);
  assert.equal(parseData("abc"), null);
});
