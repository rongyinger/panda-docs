/* 熊猫知识中心 · 液态玻璃版 — 交互 & 视差 & 流动光感 */
(function () {
  const nb = document.getElementById('navbar');

  /* ⌘K / Ctrl K 聚焦搜索 */
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const s = document.getElementById('searchInput');
      if (s) s.focus();
    }
  });

  /* 缓存图层节点（只查询一次） */
  const layers = [
    { node: document.querySelector('.blob.bg-mint'),  depth: 22, scroll: 0    },
    { node: document.querySelector('.blob.bg-sky'),   depth: -18, scroll: 0   },
    { node: document.querySelector('.blob.bg-lilac'), depth: 14, scroll: 0    },
    { node: document.querySelector('.bamboo'),        depth: 18, scroll: 0.10 },
    { node: document.querySelector('.bamboo-cluster'),depth: -26, scroll: 0   },
  ].filter((L) => L.node);

  layers.forEach((L) => { L.node.style.willChange = 'transform'; });

  /* 目标值 & 当前值 */
  let tx = 0, ty = 0;          // 鼠标目标 (-0.5 ~ 0.5)
  let cx = 0, cy = 0;          // 鼠标当前（插值）
  let targetScroll = window.scrollY;
  let curScroll = window.scrollY;
  let running = false;

  function loop() {
    const on = document.body.dataset.motion === 'on';

    // 平滑插值
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    curScroll += (targetScroll - curScroll) * 0.14;

    layers.forEach((L) => {
      const sy = on ? curScroll * L.scroll : 0;
      const px = on ? cx * L.depth : 0;
      const py = on ? cy * L.depth : 0;
      L.node.style.transform = `translate3d(${px.toFixed(2)}px, ${(sy + py).toFixed(2)}px, 0)`;
    });

    // 收敛后停止，省电；有变化再启动
    const settled =
      Math.abs(tx - cx) < 0.0004 &&
      Math.abs(ty - cy) < 0.0004 &&
      Math.abs(targetScroll - curScroll) < 0.3;

    if (settled || !on) { running = false; return; }
    requestAnimationFrame(loop);
  }

  function kick() {
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  /* 滚动：只更新目标值 + 导航态，渲染交给 rAF 循环 */
  window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
    nb.classList.toggle('scrolled', window.scrollY > 12);
    if (document.body.dataset.motion === 'on') kick();
  }, { passive: true });

  /* 鼠标：只更新目标值 */
  window.addEventListener('pointermove', (e) => {
    if (document.body.dataset.motion !== 'on') return;
    tx = (e.clientX / window.innerWidth - 0.5);
    ty = (e.clientY / window.innerHeight - 0.5);
    kick();
  }, { passive: true });

  /* 动效开关变化时复位 */
  window.addEventListener('om-motion-change', () => {
    if (document.body.dataset.motion !== 'on') {
      tx = ty = cx = cy = 0;
      layers.forEach((L) => { L.node.style.transform = 'translate3d(0,0,0)'; });
    } else {
      curScroll = targetScroll = window.scrollY;
      kick();
    }
  });

  /* 初始化 */
  nb.classList.toggle('scrolled', window.scrollY > 12);
  kick();

  /* 入场动画兜底：后台 iframe 会暂停 CSS 动画 */
  const markDone = () => document.body.classList.add('anim-done');
  setTimeout(markDone, 1200);
  window.addEventListener('load', () => setTimeout(markDone, 1000));
})();
