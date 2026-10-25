// Ícones de traço fino da interface do Prumo. Uso: <i data-i="sono"></i>
const ICONES = {
  hoje: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
  registrar: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  historico: '<path d="M4 4v16h16"/><path d="m8 15 3-4 3 2 4-6"/>',
  coach: '<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/>',
  perfil: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  sono: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  atividade: '<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  agua: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  alimentacao: '<path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14z"/><path d="m5 19 7-7"/>',
  humor: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.2 2.1 1.8 3.5 1.8s2.5-.6 3.5-1.8M9 9.5h.01M15 9.5h.01"/>',
  tela: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  sino: '<path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  enviar: '<path d="m4 12 16-8-6 16-2-7z"/>',
  ia: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16v4M17 18h4"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  voltar: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
};

document.querySelectorAll('i[data-i]').forEach((el) => {
  el.outerHTML = `<svg class="icone ${el.className}" viewBox="0 0 24 24" aria-hidden="true">${ICONES[el.dataset.i]}</svg>`;
});

// Medidor circular de energia. Uso: <div class="medidor" data-valor="6.8" data-tamanho="180"></div>
let medidorId = 0;
document.querySelectorAll('.medidor').forEach((el) => {
  const valor = parseFloat(el.dataset.valor);
  const t = parseInt(el.dataset.tamanho, 10);
  const espessura = t * 0.055;
  const r = t / 2 - espessura;
  const c = 2 * Math.PI * r;
  const id = `gm${medidorId++}`;
  el.innerHTML = `
    <svg width="${t}" height="${t}" viewBox="0 0 ${t} ${t}">
      <defs><linearGradient id="${id}" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="#4FB38A"/><stop offset=".5" stop-color="#7FCFA8"/><stop offset="1" stop-color="#BFEBD4"/>
      </linearGradient></defs>
      <circle cx="${t / 2}" cy="${t / 2}" r="${r}" fill="none" stroke="rgba(246,241,231,.14)" stroke-width="${espessura}"/>
      <circle cx="${t / 2}" cy="${t / 2}" r="${r}" fill="none" stroke="url(#${id})" stroke-width="${espessura}"
        stroke-linecap="round" stroke-dasharray="${(c * valor) / 10} ${c}" transform="rotate(-90 ${t / 2} ${t / 2})"/>
    </svg>
    <div class="medidor-centro">
      <div class="titulo medidor-valor">${String(valor).replace('.', ',')}<span>/10</span></div>
      <div class="rotulo">Energia</div>
    </div>`;
});

// Gráfico dos últimos 7 dias: barras de sono (h) e linha de energia (0 a 10), na mesma escala de 0 a 10.
document.querySelectorAll('.grafico-semana').forEach((el) => {
  const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const sono = [6.5, 7.2, 6.0, 7.5, 6.8, 6.1, 5.7];
  const energia = [5.2, 6.0, 5.5, 7.1, 6.4, 5.8, 6.8];
  const W = parseInt(el.dataset.largura, 10), H = parseInt(el.dataset.altura, 10);
  const m = { e: 28, d: 8, t: 10, b: 26 };
  const iw = W - m.e - m.d, ih = H - m.t - m.b;
  const y = (v) => m.t + ih - (v / 10) * ih;
  const passo = iw / dias.length;
  const x = (i) => m.e + passo * i + passo / 2;
  let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Inter" font-size="11">`;
  s += `<rect x="${m.e}" y="${y(9)}" width="${iw}" height="${y(7) - y(9)}" fill="rgba(29,114,89,.08)"/>`;
  s += `<text x="${W - m.d - 4}" y="${y(9) + 13}" text-anchor="end" fill="#1D7259" font-size="10" font-weight="600">faixa ideal de sono · 7 a 9 h</text>`;
  [0, 5, 10].forEach((v) => {
    s += `<line x1="${m.e}" x2="${W - m.d}" y1="${y(v)}" y2="${y(v)}" stroke="#E3EAE6"/>`;
    s += `<text x="${m.e - 10}" y="${y(v) + 4}" text-anchor="end" fill="#6E8078">${v}</text>`;
  });
  const bw = passo * 0.34;
  sono.forEach((v, i) => {
    const hoje = i === sono.length - 1;
    s += `<rect x="${x(i) - bw / 2}" y="${y(v)}" width="${bw}" height="${y(0) - y(v)}" rx="${bw / 4}" fill="${hoje ? '#145C48' : '#4E9E83'}"/>`;
    s += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle" fill="${hoje ? '#145C48' : '#6E8078'}" font-weight="${hoje ? 600 : 400}">${dias[i]}</text>`;
  });
  const pts = energia.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  s += `<polyline points="${pts}" fill="none" stroke="#46545A" stroke-width="2.4" stroke-linejoin="round"/>`;
  energia.forEach((v, i) => {
    const hoje = i === energia.length - 1;
    s += `<circle cx="${x(i)}" cy="${y(v)}" r="${hoje ? 5 : 3}" fill="${hoje ? '#46545A' : '#FFFFFF'}" stroke="#46545A" stroke-width="2"/>`;
  });
  el.innerHTML = s + '</svg>';
});
