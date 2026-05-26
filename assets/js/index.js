const inquiryItems = Array.from(document.querySelectorAll('.inquiry-item'));
    const previewImage = document.getElementById('previewImage');
    const previewFrame = document.getElementById('previewFrame');
    let previewTimer = null;
    let previewToken = 0;

    function setActiveInquiry(item) {
      inquiryItems.forEach((node) => node.classList.toggle('active', node === item));
      const nextImage = item?.dataset?.image;
      if (!nextImage || !previewImage) return;

      const current = (previewImage.getAttribute('src') || '').split('?')[0].split('#')[0];
      const target = nextImage.split('?')[0].split('#')[0];
      if (current.endsWith(target)) return;

      if (previewTimer) window.clearTimeout(previewTimer);
      const token = ++previewToken;
      previewFrame.classList.add('switching');
      previewTimer = window.setTimeout(() => {
        if (token !== previewToken) return;
        previewImage.src = nextImage;
        previewImage.alt = `${item.textContent.trim()} field image`;
        previewFrame.classList.remove('switching');
      }, 110);
    }

    inquiryItems.forEach((item) => {
      item.addEventListener('mouseenter', () => setActiveInquiry(item));
      item.addEventListener('focusin', () => setActiveInquiry(item));
      item.addEventListener('touchstart', () => setActiveInquiry(item), { passive: true });
      item.addEventListener('click', () => setActiveInquiry(item));
    });

    let lock = false;
    let rafState = null;

    function snapTo(y) {
      const start = window.scrollY;
      const end = Math.max(0, Math.round(y));
      const dist = end - start;
      if (Math.abs(dist) < 2) return;
      if (rafState?.id) cancelAnimationFrame(rafState.id);

      lock = true;
      const duration = Math.min(760, Math.max(460, Math.abs(dist) * 0.42));
      const st = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const state = { id: 0 };
      rafState = state;

      const tick = (now) => {
        const p = Math.min(1, (now - st) / duration);
        window.scrollTo(0, start + dist * ease(p));
        if (p < 1) {
          state.id = requestAnimationFrame(tick);
          return;
        }
        window.scrollTo(0, end);
        lock = false;
        rafState = null;
      };
      state.id = requestAnimationFrame(tick);
    }

    function chapterPoints() {
      return [0, document.getElementById('inquiry').offsetTop, document.getElementById('connect').offsetTop];
    }

    window.addEventListener('wheel', (event) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const [home, inquiry, connect] = chapterPoints();
      const y = window.scrollY;
      const delta = event.deltaY;
      const band = Math.max(72, window.innerHeight * 0.1);
      if (lock) { event.preventDefault(); return; }

      const nearHome = Math.abs(y - home) <= band;
      const nearInquiry = Math.abs(y - inquiry) <= band;
      const nearConnect = Math.abs(y - connect) <= band;

      if (delta > 18) {
        if (nearHome) { event.preventDefault(); snapTo(inquiry); }
        else if (nearInquiry) { event.preventDefault(); snapTo(connect); }
      } else if (delta < -18) {
        if (nearConnect) { event.preventDefault(); snapTo(inquiry); }
        else if (nearInquiry) { event.preventDefault(); snapTo(home); }
      }
    }, { passive: false });
