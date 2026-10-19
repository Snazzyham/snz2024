// Rendering for /bench/, shared by the build (static HTML) and the page script (re-render on
// filter, sort and rate changes) so both always produce the same markup.
// Data comes from src/data/bench.json, written by public_data() in OtterBench's bench.py.

export type Detail = {
  task: string;
  date?: string;
  run?: string;
  partial?: string | null;
  path?: string | null;
  score: number | null;
  cost: number;
  time: number;
  tokens: number;
};

export type Row = {
  model: string;
  thinking: string;
  run: string;
  date: string;
  score: number | null;
  complete: boolean;
  cost: number;
  time: number;
  tokens: number;
  fail: boolean;
  path: string | null;
  cand?: boolean;
  details: Detail[];
};

export type Track = { id: string; name: string; multi: boolean; pick: boolean; rows: Row[] };

export type SortKey = 'model' | 'score' | 'cost' | 'eff' | 'time' | 'tokens' | 'run';
export type Sort = { key: SortKey; dir: 1 | -1 };
export const DEFAULT_SORT: Sort = { key: 'score', dir: -1 };

export const COLUMNS: { key: SortKey; label: string; num: boolean }[] = [
  { key: 'model', label: 'Model', num: false },
  { key: 'score', label: 'Score', num: true },
  { key: 'cost', label: 'Cost', num: true },
  { key: 'eff', label: 'Effective', num: true },
  { key: 'time', label: 'Time', num: true },
  { key: 'tokens', label: 'Tokens', num: true },
  { key: 'run', label: 'Run', num: false }
];

/** Cost with the time charged at `rate` dollars per minute. */
export const eff = (r: { cost: number; time: number }, rate: number) => r.cost + (rate * r.time) / 60;

/** The value candidate with the lowest effective cost, if the track has any. */
export function bestOf(rows: Row[], rate: number): Row | null {
  let best: Row | null = null;
  for (const r of rows) if (r.cand && (!best || eff(r, rate) < eff(best, rate))) best = r;
  return best;
}

export const topOf = (rows: Row[]): Row | null =>
  rows.reduce<Row | null>((a, r) => (r.score != null && (!a || r.score > a.score!) ? r : a), null);

export const esc = (s: unknown) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Colour band for a score; `none` when there is no score. */
export const band = (v: number | null) =>
  v == null ? 'none' : v >= 95 ? 'b95' : v >= 85 ? 'b85' : v >= 75 ? 'b75' : v >= 60 ? 'b60' : 'b0';

export const short = (m: string) => m.split('/').pop()!;
export const money = (v: number) => '$' + v.toFixed(2);
export const ktok = (v: number) => (v / 1000).toFixed(0) + 'k';
export function dur(v: number) {
  const s = Math.round(v || 0);
  return s < 60 ? s + 's' : Math.floor(s / 60) + 'm ' + (s % 60) + 's';
}

/** Sorted copy; rows without a value always go last. */
export function sortRows(rows: Row[], sort: Sort, rate: number): Row[] {
  return rows.slice().sort((a, b) => {
    const x = sort.key === 'eff' ? eff(a, rate) : a[sort.key];
    const y = sort.key === 'eff' ? eff(b, rate) : b[sort.key];
    if (x == null || y == null) return x == null ? (y == null ? 0 : 1) : -1;
    const c = typeof x === 'number' ? x - (y as number) : String(x).localeCompare(String(y));
    return c * sort.dir;
  });
}

function scoreCell(score: number | null, label: string) {
  const w = score == null ? 0 : Math.max(0, Math.min(100, score));
  return `<span class="bar ${band(score)}"><span class="fill" style="width:${w}%"></span><span class="val">${esc(label)}</span></span>`;
}

export function theadHtml(sort: Sort) {
  return (
    '<tr>' +
    COLUMNS.map((c) => {
      const aria = c.key === sort.key ? (sort.dir === -1 ? 'descending' : 'ascending') : 'none';
      return `<th scope="col" class="${c.num ? 'num' : c.key === 'run' ? 'date' : ''}" aria-sort="${aria}"><button type="button" data-key="${c.key}">${c.label}</button></th>`;
    }).join('') +
    '</tr>'
  );
}

export function rowsHtml(rows: Row[], best: Row | null, rate: number, multi: boolean, open: Set<string>) {
  if (!rows.length) return '<tr class="empty"><td colspan="7">No rows match.</td></tr>';
  return rows
    .map((r) => {
      const id = r.model + '|' + r.thinking;
      const isOpen = open.has(id);
      const isBest = r === best;
      const subs = multi
        ? `<span class="subs">${r.details.map((d) => esc(d.task) + ' ' + (d.score == null ? '—' : d.score.toFixed(1))).join(' · ')}</span>`
        : '';
      const details = r.details
        .map(
          (d) =>
            `<li><span class="mono task">${esc(d.task)}</span><span class="meta">${[
              d.date && esc(d.date),
              d.run && esc(d.run),
              d.partial && 'partial',
              d.path && esc(d.path)
            ]
              .filter(Boolean)
              .join(' · ')}</span>${scoreCell(d.score, d.score == null ? 'not run' : d.score.toFixed(1))}<span class="mono">${money(d.cost)}</span><span class="mono">${dur(d.time)}</span><span class="mono">${ktok(d.tokens)}</span></li>`
        )
        .join('');
      return (
        `<tr class="row${isBest ? ' best' : ''}${isOpen ? ' open' : ''}" data-id="${esc(id)}" tabindex="0" aria-expanded="${isOpen}">` +
        `<td data-label="Model"><span class="model">${esc(r.model)}</span><span class="think">${esc(r.thinking)}</span>` +
        (isBest ? '<span class="value">Best value</span>' : '') +
        (r.fail ? '<span class="fail">hard fail</span>' : '') +
        (r.path ? `<span class="path">${esc(r.path)}</span>` : '') +
        `</td><td class="num" data-label="Score">${scoreCell(r.score, r.score == null ? (r.complete ? 'n/a' : 'incomplete') : r.score.toFixed(1))}${subs}</td>` +
        `<td class="num" data-label="Cost">${money(r.cost)}</td>` +
        `<td class="num" data-label="Effective">${money(eff(r, rate))}</td>` +
        `<td class="num" data-label="Time">${dur(r.time)}</td>` +
        `<td class="num" data-label="Tokens">${ktok(r.tokens)}</td>` +
        `<td class="date" data-label="Run">${esc(r.date)}</td></tr>` +
        `<tr class="detail"${isOpen ? '' : ' hidden'}><td colspan="7"><ul class="tasklist">${details}</ul></td></tr>`
      );
    })
    .join('');
}

/** Score against effective cost (log scale) for rows with a score; Best value highlighted. */
export function chartSvg(rows: Row[], best: Row | null, rate: number) {
  const pts = rows.filter((r) => r.score != null);
  const W = 360, H = 190, L = 34, R = 12, T = 12, B = 30;
  const xs = pts.map((r) => Math.max(eff(r, rate), 0.001));
  let lo = Math.log10(Math.min(...xs, 1)), hi = Math.log10(Math.max(...xs, 0.01));
  lo = Math.floor(lo); hi = Math.ceil(hi);
  if (hi === lo) hi = lo + 1;
  const x = (v: number) => L + ((Math.log10(Math.max(v, 0.001)) - lo) / (hi - lo)) * (W - L - R);
  const y = (s: number) => T + (1 - s / 100) * (H - T - B);
  let g = '';
  for (const s of [0, 25, 50, 75, 100])
    g += `<line class="grid" x1="${L}" x2="${W - R}" y1="${y(s)}" y2="${y(s)}"/><text class="tick" x="${L - 6}" y="${y(s) + 3}" text-anchor="end">${s}</text>`;
  for (let e = lo; e <= hi; e++) {
    const v = 10 ** e;
    g += `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - B}"/><text class="tick" x="${x(v)}" y="${H - B + 14}" text-anchor="middle">$${v >= 1 ? v.toFixed(0) : v.toFixed(Math.abs(e))}</text>`;
  }
  const dots = pts
    .filter((r) => r !== best)
    .map((r) => `<circle class="dot ${band(r.score)}" cx="${x(eff(r, rate)).toFixed(1)}" cy="${y(r.score!).toFixed(1)}" r="3.5"><title>${esc(short(r.model) + ' · ' + r.thinking + ': ' + r.score!.toFixed(1) + ', ' + money(eff(r, rate)))}</title></circle>`)
    .join('');
  const pick = best && best.score != null
    ? `<circle class="pick" cx="${x(eff(best, rate)).toFixed(1)}" cy="${y(best.score).toFixed(1)}" r="6.5"><title>${esc('Best value: ' + short(best.model) + ' · ' + best.thinking + ': ' + best.score.toFixed(1) + ', ' + money(eff(best, rate)))}</title></circle>`
    : '';
  return (
    `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Score against effective cost">` +
    g + dots + pick +
    `<text class="axis" x="${(L + W - R) / 2}" y="${H - 4}" text-anchor="middle">Effective cost (log)</text></svg>`
  );
}

export function pickHtml(best: Row | null, rate: number) {
  return best
    ? `<span class="model">${esc(short(best.model))}</span> <span class="think">${esc(best.thinking)}</span> <span class="mono">${money(eff(best, rate))}</span>`
    : '<span class="muted">No pick</span>';
}

/** Keep only the fields the page script reads. */
export function clientTracks(tracks: { id: string; name: string; tasks: unknown[]; has_value_pick: boolean; rows: Row[] }[]): Track[] {
  return tracks.map((t) => ({
    id: t.id,
    name: t.name,
    multi: t.tasks.length > 1,
    pick: t.has_value_pick,
    rows: t.rows.map((r) => ({
      model: r.model,
      thinking: r.thinking,
      run: r.run,
      date: r.date,
      score: r.score,
      complete: r.complete,
      cost: r.cost,
      time: r.time,
      tokens: r.tokens,
      fail: r.fail,
      path: r.path,
      ...(r.cand ? { cand: true } : {}),
      details: r.details.map((d) => ({
        task: d.task,
        ...(d.date ? { date: d.date, run: d.run } : {}),
        ...(d.partial ? { partial: d.partial } : {}),
        ...(d.path ? { path: d.path } : {}),
        score: d.score,
        cost: d.cost,
        time: d.time,
        tokens: d.tokens
      }))
    }))
  }));
}
