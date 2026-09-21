// The player of an exported spec page: replays the frames of a drawing that was
// rendered ahead of time. Every element that appears during playback carries
// `data-from`, the first frame it is visible in; the playhead is positioned from
// the page's data block. Nothing here knows how the drawing was computed.
(() => {
  const root = document.querySelector('.rx-spec');
  const dataBlock = document.getElementById('spec-data');
  if (root === null || dataBlock === null) return;
  const data = JSON.parse(dataBlock.textContent);
  const { frames, firstFrame, xStart, right, scale, lanes, readouts } = data;

  // `?frameMs=800` slows the playback, `?clean` hides the navigation and the picker, for recordings;
  // the links on the page carry both along.
  const params = new URLSearchParams(location.search);
  const wanted = Number(params.get('frameMs'));
  const frameMs = Number.isFinite(wanted) && wanted > 0 ? wanted : data.frameMs;
  if (params.has('clean')) document.documentElement.classList.add('is-clean');
  document.querySelectorAll('.rx-nav a, .rx-picker a').forEach((link) => {
    link.search = location.search;
  });
  root.style.setProperty('--rx-step', `${frameMs}ms`);

  const stamped = Array.from(root.querySelectorAll('[data-from]')).map((element) => [element, Number(element.dataset.from)]);
  const future = document.getElementById('rx-spec-future');
  const head = document.getElementById('rx-spec-playhead');
  const label = document.getElementById('rx-spec-playhead-label');
  const start = document.getElementById('spec-start');
  const play = document.getElementById('spec-play');
  const scrub = document.getElementById('spec-scrub');
  const counter = document.getElementById('spec-frame');
  const readout = document.getElementById('spec-readout');
  const app = document.getElementById('app');

  let playhead = -1;
  let playing = false;

  const render = () => {
    for (const [element, from] of stamped) element.hidden = from > playhead;
    // The playhead sits at the right edge of the frame it has reached.
    const x = xStart + (playhead + 1) * scale;
    future.style.left = `${x}px`;
    future.style.width = `${Math.max(0, right - x)}px`;
    head.style.left = `${x - 1}px`;
    label.style.left = `${x}px`;
    label.textContent = playhead < 0 ? 'Scheduler · start' : `Scheduler · frame ${playhead}`;
    scrub.value = String(playhead);
    counter.textContent = playhead < 0 ? `start · ${frames} frames` : `frame ${playhead} of ${frames - 1}`;
    start.textContent = playhead < 0 && !playing ? 'Start' : 'Reset';
    play.textContent = playing ? 'Pause' : 'Play';
  };

  const seek = (frame) => {
    playhead = Math.max(-1, Math.min(frames - 1, frame));
    render();
  };
  const setPlaying = (next) => {
    playing = next;
    render();
  };

  // Playback: one frame per tick while playing; the last frame pauses.
  setInterval(() => {
    if (!playing) return;
    if (playhead < frames - 1) seek(playhead + 1);
    if (playhead >= frames - 1) setPlaying(false);
  }, frameMs);

  // Start runs from the beginning; once moved or playing, the same button reads Reset.
  start.addEventListener('click', () => {
    if (playing || playhead >= 0) {
      setPlaying(false);
      seek(-1);
      return;
    }
    setPlaying(true);
  });
  play.addEventListener('click', () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (playhead >= frames - 1) seek(-1);
    setPlaying(true);
  });

  // Scrubbing pauses, and the playhead follows the thumb without its transition.
  scrub.addEventListener('pointerdown', () => root.style.setProperty('--rx-step', '0ms'));
  const restore = () => root.style.setProperty('--rx-step', `${frameMs}ms`);
  scrub.addEventListener('pointerup', restore);
  scrub.addEventListener('pointercancel', restore);
  scrub.addEventListener('input', () => {
    setPlaying(false);
    seek(Number(scrub.value));
  });

  // Lane titles and details get a backdrop only while the timeline is scrolled.
  root.addEventListener('scroll', () => root.classList.toggle('is-scrolled', root.scrollLeft > 0));

  // The hover readout: the lane and frame under the pointer, with that lane's events there;
  // over the label column, the lane's whole detail.
  app.addEventListener('mousemove', (event) => {
    const rect = root.getBoundingClientRect();
    const x = event.clientX - rect.left + root.scrollLeft;
    const y = event.clientY - rect.top + root.scrollTop;
    const frame = Math.floor((x - xStart) / scale);
    const k = lanes.findIndex((lane) => y >= lane.top && y < lane.bottom);
    const lane = k < 0 ? null : lanes[k];
    let text = '';
    if (frame < firstFrame) text = lane === null ? '' : [lane.label, lane.detail].filter((s) => s !== '').join(' · ');
    else if (frame >= frames) text = '';
    else if (lane === null) text = `frame ${frame}`;
    else text = readouts[`${k}:${frame}`] ?? `${lane.label} · frame ${frame}`;
    readout.textContent = text;
  });
  app.addEventListener('mouseleave', () => {
    readout.textContent = '';
  });

  render();
})();
