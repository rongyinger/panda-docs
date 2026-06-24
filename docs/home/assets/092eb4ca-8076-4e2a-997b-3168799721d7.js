/* Tweaks 控制台 — 切换封面方案 / 动效 / 玻璃 / 绿色 / 竹林 */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cover": "a",
  "motion": true,
  "blur": 18,
  "green": "适中",
  "bamboo": 75,
  "radius": 20
}/*EDITMODE-END*/;

const GREEN = {
  "克制": { a: "#2f7d63", d: "#205c48", line: "rgba(47,125,99,0.30)", soft: "rgba(47,125,99,0.12)" },
  "适中": { a: "#128a64", d: "#0c6e50", line: "rgba(18,138,100,0.30)", soft: "rgba(18,138,100,0.12)" },
  "鲜明": { a: "#08b27c", d: "#069468", line: "rgba(8,178,124,0.34)",  soft: "rgba(8,178,124,0.13)" },
};

function applyTweaks(t) {
  const b = document.body, r = document.documentElement;
  b.dataset.cover = t.cover;
  const prevMotion = b.dataset.motion;
  b.dataset.motion = t.motion ? "on" : "off";

  const hero = document.querySelector('.hero');
  if (hero) {
    if (t.cover === 'b' || t.cover === 'c') hero.setAttribute('data-show-sweep', '');
    else hero.removeAttribute('data-show-sweep');
  }

  r.style.setProperty('--blur', t.blur + 'px');
  r.style.setProperty('--radius', t.radius + 'px');
  r.style.setProperty('--bamboo-op', (t.bamboo / 75).toFixed(3));

  const g = GREEN[t.green] || GREEN["适中"];
  r.style.setProperty('--accent', g.a);
  r.style.setProperty('--accent-deep', g.d);
  r.style.setProperty('--accent-line', g.line);
  r.style.setProperty('--accent-soft', g.soft);

  if (prevMotion !== b.dataset.motion) {
    window.dispatchEvent(new Event('om-motion-change'));
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="封面方案" />
      <TweakRadio label="布局" value={t.cover}
        options={[
          { value: "a", label: "晨雾" },
          { value: "b", label: "悬浮" },
          { value: "c", label: "竹影" },
        ]}
        onChange={(v) => setTweak('cover', v)} />
      <p style={{ margin: "2px 2px 0", fontSize: 11.5, lineHeight: 1.5, color: "rgba(120,135,155,0.95)" }}>
        晨雾·留白 / 悬浮玻璃卡 / 竹影流光
      </p>

      <TweakSection label="质感" />
      <TweakRadio label="绿色浓度" value={t.green}
        options={["克制", "适中", "鲜明"]}
        onChange={(v) => setTweak('green', v)} />
      <TweakSlider label="玻璃通透" value={t.blur} min={8} max={28} step={1} unit="px"
        onChange={(v) => setTweak('blur', v)} />
      <TweakSlider label="圆角" value={t.radius} min={12} max={30} step={1} unit="px"
        onChange={(v) => setTweak('radius', v)} />
      <TweakSlider label="竹林强度" value={t.bamboo} min={0} max={140} step={5} unit="%"
        onChange={(v) => setTweak('bamboo', v)} />

      <TweakSection label="动效" />
      <TweakToggle label="流动光感 / 视差" value={t.motion}
        onChange={(v) => setTweak('motion', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
