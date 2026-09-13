import { type ReactNode, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

type Algorithm = "bubble" | "insertion" | "quick" | "counting";
type Op = "ready" | "compare" | "swap" | "shift" | "place" | "complete";
type Step = {
  values: number[];
  ids: string[];
  active: number[];
  op: Op;
  line: number;
  note: string;
};
type Lang = "en" | "zh";

const algorithmSlugs: Record<Algorithm, string> = {
  bubble: "bubble-sort",
  insertion: "insertion-sort",
  quick: "quick-sort",
  counting: "counting-sort",
};
const appBase = import.meta.env.BASE_URL;
const homePath = () => appBase;
const isHomePath = (pathname: string) =>
  pathname === "/" || pathname === appBase || pathname === appBase.slice(0, -1);

function algorithmFromPath(pathname: string): Algorithm {
  const match = Object.entries(algorithmSlugs).find(([, slug]) =>
    pathname.endsWith(`/${slug}`),
  );
  return (match?.[0] as Algorithm | undefined) ?? "counting";
}

const algorithms: Record<
  Algorithm,
  { en: string; zh: string; complexity: string; code: string[] }
> = {
  bubble: {
    en: "Bubble Sort",
    zh: "冒泡排序",
    complexity: "O(n²)",
    code: [
      "def bubble_sort(a):",
      "    for end in range(len(a) - 1, 0, -1):",
      "        for i in range(end):",
      "            if a[i] > a[i + 1]:",
      "                a[i], a[i + 1] = a[i + 1], a[i]",
      "    return a",
    ],
  },
  insertion: {
    en: "Insertion Sort",
    zh: "插入排序",
    complexity: "O(n²)",
    code: [
      "def insertion_sort(a):",
      "    for i in range(1, len(a)):",
      "        key = a[i]",
      "        j = i - 1",
      "        while j >= 0 and a[j] > key:",
      "            a[j + 1] = a[j]",
      "            j -= 1",
      "        a[j + 1] = key",
      "    return a",
    ],
  },
  quick: {
    en: "Quick Sort",
    zh: "快速排序",
    complexity: "O(n log n)",
    code: [
      "def quick_sort(a, low, high):",
      "    if low >= high:",
      "        return",
      "    pivot = a[high]",
      "    for j in range(low, high):",
      "        if a[j] < pivot:",
      "            swap(a, j, low)",
      "    quick_sort(a, low, high - 1)",
    ],
  },
  counting: {
    en: "Counting Sort",
    zh: "计数排序",
    complexity: "O(n + k)",
    code: [
      "def counting_sort(a):",
      "    count = [0] * (max(a) + 1)",
      "    for value in a:",
      "        count[value] += 1",
      "    for value, amount in enumerate(count):",
      "        a.extend([value] * amount)",
      "    return a",
    ],
  },
};

function highlightPython(line: string): ReactNode[] {
  const pattern =
    /(#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|\b(?:def|for|in|if|else|elif|return|while|and|or|not|True|False|None)\b|\b(?:range|len|enumerate|max|min|print|swap)\b|\b[a-zA-Z_]\w*(?=\s*\())/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(line))) {
    if (match.index > cursor) nodes.push(line.slice(cursor, match.index));
    const token = match[0];
    const className = token.startsWith("#")
      ? "comment"
      : token.startsWith('"') || token.startsWith("'")
        ? "string"
        : /^\d/.test(token)
          ? "number"
          : /^(def|for|in|if|else|elif|return|while|and|or|not|True|False|None)$/.test(
                token,
              )
            ? "keyword"
            : /^(range|len|enumerate|max|min|print|swap)$/.test(token)
              ? "builtin"
              : "function";
    nodes.push(
      <span className={className} key={`${match.index}-${token}`}>
        {token}
      </span>,
    );
    cursor = match.index + token.length;
  }
  if (cursor < line.length) nodes.push(line.slice(cursor));
  return nodes;
}

function AlgorithmIcon({ id }: { id: Algorithm }) {
  if (id === "bubble") return <span className="algorithm-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><circle cx="9" cy="18" r="5" /><circle cx="20" cy="12" r="7" /><path d="M5 26h22" /></svg></span>;
  if (id === "insertion") return <span className="algorithm-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M6 24V12M13 24V8M20 24V15M27 24V5" /><path d="M5 28h23M22 11l5-6 1 8" /></svg></span>;
  if (id === "quick") return <span className="algorithm-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M5 8h22M5 16h12M5 24h22" /><path d="m21 12 6 4-6 4" /></svg></span>;
  return <span className="algorithm-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M5 27V5M5 27h23" /><path d="M10 23v-7M15 23V11M20 23V7M25 23V14" /></svg></span>;
}

const copy = {
  en: {
    home: "Home",
    learn: "Start learning",
    visualizations: "Visualizations",
    sorting: "Sorting",
    updated: "Last updated July 1, 2026",
    looking: "Looking at",
    comparisons: "Comparisons",
    swaps: "Swaps",
    array: "Array",
    bars: "Bars",
    comparing: "Comparing",
    swapping: "Swapping",
    sorted: "Sorted",
    play: "Play",
    pause: "Pause",
    back: "Step back",
    next: "Step forward",
    shuffle: "Shuffle",
    reset: "Reset",
    speed: "Speed",
    size: "Size",
    items: "items",
    own: "Your own numbers",
    visualize: "Visualize",
    hint: "Up to 20 numbers · values 1–99",
    code: "Code",
    hero: "Make algorithms visible.",
    sub: "A focused workspace for learning data structures and algorithm design.",
  },
  zh: {
    home: "主页",
    learn: "开始学习",
    visualizations: "可视化",
    sorting: "排序",
    updated: "最后更新于 2026 年 7 月 1 日",
    looking: "当前观察",
    comparisons: "比较",
    swaps: "交换",
    array: "数组",
    bars: "柱状图",
    comparing: "比较中",
    swapping: "交换中",
    sorted: "已排序",
    play: "播放",
    pause: "暂停",
    back: "上一步",
    next: "下一步",
    shuffle: "随机生成",
    reset: "重置",
    speed: "速度",
    size: "数量",
    items: "个元素",
    own: "自定义数字",
    visualize: "可视化",
    hint: "最多 20 个数字 · 范围 1–99",
    code: "代码",
    hero: "让算法变得可见。",
    sub: "一个专注于数据结构与算法设计学习的交互式工作区。",
  },
};

const snap = (
  values: number[],
  ids: string[],
  active: number[],
  op: Op,
  line: number,
  note: string,
): Step => ({ values: [...values], ids: [...ids], active, op, line, note });
function trace(input: number[], algorithm: Algorithm): Step[] {
  const a = [...input],
    ids = input.map((_, i) => String(i)),
    s: Step[] = [
      snap(a, ids, [], "ready", 0, "Input loaded. Choose the next step."),
    ];
  if (algorithm === "bubble")
    for (let end = a.length - 1; end > 0; end--)
      for (let i = 0; i < end; i++) {
        s.push(
          snap(
            a,
            ids,
            [i, i + 1],
            "compare",
            3,
            `Compare ${a[i]} and ${a[i + 1]}.`,
          ),
        );
        if (a[i] > a[i + 1]) {
          [a[i], a[i + 1]] = [a[i + 1], a[i]];
          [ids[i], ids[i + 1]] = [ids[i + 1], ids[i]];
          s.push(
            snap(
              a,
              ids,
              [i, i + 1],
              "swap",
              4,
              "Swap the pair so the larger value moves right.",
            ),
          );
        }
      }
  if (algorithm === "insertion")
    for (let i = 1; i < a.length; i++) {
      const key = a[i],
        keyId = ids[i];
      let j = i - 1;
      s.push(snap(a, ids, [i], "compare", 2, `Take ${key} as the next key.`));
      while (j >= 0 && a[j] > key) {
        s.push(
          snap(
            a,
            ids,
            [j, j + 1],
            "compare",
            4,
            `${a[j]} is larger than ${key}.`,
          ),
        );
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        [ids[j], ids[j + 1]] = [ids[j + 1], ids[j]];
        s.push(
          snap(a, ids, [j, j + 1], "shift", 5, "Shift the larger value right."),
        );
        j--;
      }
      a[j + 1] = key;
      ids[j + 1] = keyId;
      s.push(
        snap(a, ids, [j + 1], "place", 7, `Place ${key} in the open position.`),
      );
    }
  if (algorithm === "quick") {
    const sort = (lo: number, hi: number) => {
      if (lo >= hi) return;
      const pivot = a[hi];
      let p = lo;
      s.push(snap(a, ids, [hi], "place", 3, `Choose ${pivot} as the pivot.`));
      for (let j = lo; j < hi; j++) {
        s.push(
          snap(
            a,
            ids,
            [j, hi],
            "compare",
            5,
            `Compare ${a[j]} with pivot ${pivot}.`,
          ),
        );
        if (a[j] < pivot) {
          [a[p], a[j]] = [a[j], a[p]];
          [ids[p], ids[j]] = [ids[j], ids[p]];
          s.push(
            snap(a, ids, [p, j], "swap", 6, "Move the smaller value left."),
          );
          p++;
        }
      }
      [a[p], a[hi]] = [a[hi], a[p]];
      [ids[p], ids[hi]] = [ids[hi], ids[p]];
      s.push(snap(a, ids, [p], "place", 7, "Place the pivot."));
      sort(lo, p - 1);
      sort(p + 1, hi);
    };
    sort(0, a.length - 1);
  }
  if (algorithm === "counting") {
    const max = Math.max(...a, 0),
      count = Array(max + 1).fill(0);
    a.forEach((v, i) => {
      count[v]++;
      s.push(
        snap(
          a,
          ids,
          [i],
          "compare",
          2,
          `Count ${v}; its bucket now has ${count[v]}.`,
        ),
      );
    });
    let out = 0;
    count.forEach((n, v) => {
      for (let i = 0; i < n; i++) {
        a[out] = v;
        s.push(
          snap(a, ids, [out], "place", 4, `Write ${v} from its count bucket.`),
        );
        out++;
      }
    });
  }
  s.push(snap(a, ids, [], "complete", 0, "The array is sorted."));
  return s;
}

export default function App() {
  const [view, setView] = useState<"home" | "lab">(() =>
      isHomePath(window.location.pathname) ? "home" : "lab",
    ),
    [lang, setLang] = useState<Lang>("en"),
    [algorithm, setAlgorithm] = useState<Algorithm>(() =>
      algorithmFromPath(window.location.pathname),
    ),
    [input, setInput] = useState(
      "17, 61, 74, 10, 50, 11, 88, 51, 52, 75, 86, 58, 64, 22",
    ),
    [draftInput, setDraftInput] = useState(""),
    [stepIndex, setStepIndex] = useState(0),
    [playing, setPlaying] = useState(false),
    [speed, setSpeed] = useState(700),
    [viewMode, setViewMode] = useState<"bars" | "array">("bars"),
    [leaving, setLeaving] = useState(false),
    [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = (next: "home" | "lab", selectedAlgorithm = algorithm) => {
    const path = next === "home"
      ? homePath()
      : `${appBase}visualize/sorting/${algorithmSlugs[selectedAlgorithm]}`;
    window.history.pushState({ view: next, algorithm: selectedAlgorithm }, "", path);
    if (next === "lab") setAlgorithm(selectedAlgorithm);
    setLeaving(true);
    window.setTimeout(() => {
      setView(next);
      setLeaving(false);
    }, 180);
  };
  useEffect(() => {
    const onPopState = () => {
      const nextView = isHomePath(window.location.pathname) ? "home" : "lab";
      setAlgorithm(algorithmFromPath(window.location.pathname));
      setView(nextView);
      setDrawerOpen(false);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  const t = copy[lang],
    values = useMemo(
      () => input.split(/[ ,]+/).filter(Boolean).map(Number),
      [input],
    ),
    valid =
      values.length > 0 &&
      values.length <= 20 &&
      values.every(Number.isInteger) &&
      (algorithm !== "counting" || values.every((v) => v >= 0)),
    steps = useMemo(
      () => (valid ? trace(values, algorithm) : []),
      [input, algorithm, valid],
    ),
    step = steps[Math.min(stepIndex, Math.max(steps.length - 1, 0))],
    output = step?.values ?? values,
    title = (id: Algorithm) => algorithms[id][lang];
  useEffect(() => {
    setStepIndex(0);
    setPlaying(false);
  }, [input, algorithm]);
  useEffect(() => {
    if (!playing || stepIndex >= steps.length - 1) {
      if (stepIndex >= steps.length - 1) setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setStepIndex((n) => n + 1), speed);
    return () => window.clearTimeout(timer);
  }, [playing, stepIndex, steps.length, speed]);
  const shuffle = () =>
      setInput(
        Array.from(
          { length: 14 },
          () => Math.floor(Math.random() * 90) + 1,
        ).join(", "),
      ),
    compareCount = steps
      .slice(0, stepIndex + 1)
      .filter((s) => s.op === "compare").length,
    swapCount = steps
      .slice(0, stepIndex + 1)
      .filter((s) => s.op === "swap").length,
    max = Math.max(...output.map(Math.abs), 1);
  const header = (
    <header className="site-header">
      <button className="logo" onClick={() => navigate("home")}>
        <span>▥</span>
        <b>
          Algorithm Visualizer <i>Lab</i>
        </b>
      </button>
      <nav>
        <button>{lang === "en" ? "Catalog" : "算法目录"}</button>
        <button>{lang === "en" ? "Resources" : "资源"}</button>
        <button>{lang === "en" ? "About" : "关于"}</button>
      </nav>
      <div className="header-actions">
        <button
          className="language"
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
        >
          {lang === "en" ? "中文" : "EN"}
        </button>
      </div>
    </header>
  );
  const algorithmMenu = (
    <>
      <p>{t.sorting.toUpperCase()}</p>
      {(Object.keys(algorithms) as Algorithm[]).map((id, i) => (
        <button
          key={id}
          className={algorithm === id ? "selected" : ""}
          onClick={() => {
            setAlgorithm(id);
            window.history.pushState(
              { view: "lab", algorithm: id },
              "",
              `${appBase}visualize/sorting/${algorithmSlugs[id]}`,
            );
            setDrawerOpen(false);
          }}
        >
          <small>0{i + 1}</small>
          <AlgorithmIcon id={id} />
          <span>
            {title(id)}
            <em>{algorithms[id].complexity}</em>
          </span>
        </button>
      ))}
    </>
  );
  if (view === "home")
    return (
      <main className={`home-page ${leaving ? "page-leaving" : "page-enter"}`}>
        {header}
        <section className="home-hero">
          <div>
            <p className="eyebrow">DATA STRUCTURES × ALGORITHM DESIGN</p>
            <h1>{t.hero}</h1>
            <p>{t.sub}</p>
            <button className="primary" onClick={() => navigate("lab")}>
              {t.learn} <span>→</span>
            </button>
          </div>
        </section>
        <section className="home-library">
          <p className="eyebrow">
            {lang === "en" ? "ALGORITHM LIBRARY" : "算法库"}
          </p>
          <h2>{lang === "en" ? "Sorting" : "排序"}</h2>
          <div className="library-grid">
            {(Object.keys(algorithms) as Algorithm[]).map((id, i) => (
              <button
                key={id}
                className="library-card"
                onClick={() => {
                  navigate("lab", id);
                }}
              >
                <AlgorithmIcon id={id} />
                <div className="card-title">
                  <small>0{i + 1}</small>
                  <strong>{title(id)}</strong>
                </div>
                <em>{algorithms[id].complexity}</em>
                <span className="card-arrow">↗</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  return (
    <main className={`lab-page ${leaving ? "page-leaving" : "page-enter"}`}>
      {header}
      <div className="lab-layout">
        <aside className="algorithm-rail">{algorithmMenu}</aside>
        <div className="lab-content-column">
          <section className="lab-heading">
            <div className="lab-heading-top">
              <button className="back" onClick={() => navigate("home")}>
                ← {t.home}
              </button>
              <div className="lab-breadcrumb" aria-label="Breadcrumb">
                <a href={homePath()}>{t.visualizations}</a>
                <b>/</b>
                <a href={`${appBase}visualize/sorting`}>{t.sorting}</a>
                <b>/</b>
                <strong>{title(algorithm)}</strong>
              </div>
            </div>
            <h1>{title(algorithm)}</h1>
          </section>
          <section className="workspace">
          <div className="workspace-top">
            <strong>
              {t.looking} {output[step?.active[0] ?? 0] ?? output[0] ?? "—"}
            </strong>
            <div>
              <span>
                {t.comparisons}: {compareCount}
              </span>
              <span>
                {t.swaps}: {swapCount}
              </span>
              <div className="view-toggle" role="group" aria-label="Visualization view">
                <button
                  className={viewMode === "array" ? "view-active" : ""}
                  onClick={() => setViewMode("array")}
                >
                  {t.array}
                </button>
                <button
                  className={viewMode === "bars" ? "view-active" : ""}
                  onClick={() => setViewMode("bars")}
                >
                  {t.bars}
                </button>
              </div>
            </div>
          </div>
          {viewMode === "bars" ? (
            <div className="chart" aria-label="Bar visualization">
              {output.map((value, i) => (
                <motion.div
                  layout
                  key={step?.ids[i] ?? String(i)}
                  className={`bar-slot ${step?.active.includes(i) ? step.op : ""} ${step?.op === "complete" ? "done" : ""}`}
                >
                  <span>{value}</span>
                  <motion.div
                    className="bar"
                    animate={{ height: `${Math.max(24, (value / max) * 245)}px` }}
                    transition={{ duration: 0.25 }}
                  />
                  <small>
                    {step?.active.includes(i) && step.op !== "complete"
                      ? "▲"
                      : ""}
                  </small>
                  <i>{i}</i>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="array-view" aria-label="Array visualization">
              {output.map((value, i) => (
                <motion.div
                  layout
                  key={step?.ids[i] ?? String(i)}
                  className={`array-cell ${step?.active.includes(i) ? step.op : ""} ${step?.op === "complete" ? "done" : ""}`}
                >
                  <strong>{value}</strong>
                  <small>{i}</small>
                </motion.div>
              ))}
            </div>
          )}
          <div className="legend">
            <span>
              <i className="amber" />
              {t.comparing}
            </span>
            <span>
              <i className="coral" />
              {t.swapping}
            </span>
            <span>
              <i className="green" />
              {t.sorted}
            </span>
          </div>
          <div className="progress">
            <input
              type="range"
              min="0"
              max={Math.max(steps.length - 1, 0)}
              value={valid ? stepIndex : 0}
              onChange={(e) => {
                setPlaying(false);
                setStepIndex(Number(e.target.value));
              }}
            />
            <span>
              {valid
                ? Math.round((stepIndex / Math.max(steps.length - 1, 1)) * 100)
                : 0}
              %
            </span>
          </div>
          <div className="controls">
            <button
              className="play"
              onClick={() => setPlaying((p) => !p)}
              disabled={!valid || stepIndex >= steps.length - 1}
            >
              {playing ? `Ⅱ ${t.pause}` : `▶ ${t.play}`}
            </button>
            <button
              onClick={() => setStepIndex((n) => Math.max(0, n - 1))}
              disabled={stepIndex === 0}
              aria-label={t.back}
            >
              ‹
            </button>
            <button
              onClick={() =>
                setStepIndex((n) => Math.min(steps.length - 1, n + 1))
              }
              disabled={!valid || stepIndex >= steps.length - 1}
              aria-label={t.next}
            >
              ›
            </button>
            <button onClick={shuffle}>{t.shuffle}</button>
            <button
              onClick={() => {
                setStepIndex(0);
                setPlaying(false);
              }}
            >
              {t.reset}
            </button>
            <span className="step-label">
              {t.code === "Code" ? "Step" : "步骤"} {stepIndex} /{" "}
              {Math.max(steps.length - 1, 0)}
            </span>
            <label>
              {t.speed}
              <input
                type="range"
                min="180"
                max="1200"
                step="60"
                value={1380 - speed}
                onChange={(e) => setSpeed(1380 - Number(e.target.value))}
              />
            </label>
            <label>
              {t.size}
              <input
                type="range"
                min="3"
                max="20"
                value={Math.min(20, Math.max(3, values.length))}
                onChange={(e) =>
                  setInput(
                    Array.from(
                      { length: Number(e.target.value) },
                      (_, i) => values[i] ?? Math.floor(Math.random() * 90) + 1,
                    ).join(", "),
                  )
                }
              />
            </label>
          </div>
          <div className="custom-input">
            <label htmlFor="numbers">{t.own}</label>
            <input
              id="numbers"
              value={draftInput}
              onChange={(e) => setDraftInput(e.target.value)}
              placeholder="e.g. 8, 5, 3, 2"
            />
            <button
              onClick={() => {
                const draftValues = draftInput
                  .split(/[ ,]+/)
                  .filter(Boolean)
                  .map(Number);
                const draftValid =
                  draftValues.length > 0 &&
                  draftValues.length <= 20 &&
                  draftValues.every(Number.isInteger) &&
                  (algorithm !== "counting" || draftValues.every((v) => v >= 0));
                if (draftValid) {
                  setInput(draftInput);
                  setDraftInput("");
                  setStepIndex(0);
                }
              }}
            >
              {t.visualize}
            </button>
            <span>{t.hint}</span>
          </div>
          {!valid && (
            <p className="error">
              Please enter valid integers. Counting Sort accepts non-negative
              values.
            </p>
          )}
          <div className="code-panel">
            <div>{t.code.toUpperCase()}</div>
            <pre>
              {algorithms[algorithm].code.map((line, i) => (
                <code
                  className={step?.line === i ? "active-line" : ""}
                  key={`${i}-${line}`}
                >
                  <span className="line-number">{i + 1}</span>
                  {highlightPython(line)}
                </code>
              ))}
            </pre>
          </div>
          <div className="step-note">
            <b>{step?.op.toUpperCase()}</b>
            <span>{step?.note}</span>
          </div>
          </section>
        </div>
      </div>
      <button
        className="menu-fab"
        aria-label={lang === "en" ? "Open sorting menu" : "打开排序菜单"}
        onClick={() => setDrawerOpen(true)}
      >
        ☰
      </button>
      {drawerOpen && (
        <>
          <button
            className="drawer-backdrop"
            aria-label={lang === "en" ? "Close menu" : "关闭菜单"}
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="mobile-drawer algorithm-rail">{algorithmMenu}</aside>
        </>
      )}
    </main>
  );
}
