/**
 * E-PORTOFOLIO INTERAKTIF SEMINAR PPG CALON GURU 2026
 * Siti Wafiq Aliyatun Nurur Rohmana, S.Pd. - Universitas Muhammadiyah Purwokerto
 * Minimalist Tech / Framer-Portfolio Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initAccordions();
  init4CTabs();
  initDocumentModal();
  initLightbox();
  initCommandPalette();
  initContactForm();
  initStopTechnique();
  initBagjaCycle();
  initMobileNav();
});

// 1. Top Reading Progress Bar & Back-to-Top
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const progressText = document.getElementById('progress-percent');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (progressText) {
      progressText.textContent = `${Math.round(progress)}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// 2. Interactive Accordions (About Me / Filosofi)
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Optional: close other accordions in the same group
      const parent = item.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
      }

      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
}

// 3. 4C Model Tabs Switching (Connection, Challenge, Concept, Change)
function init4CTabs() {
  const c4Sections = document.querySelectorAll('[data-c4-section]');

  c4Sections.forEach(section => {
    const tabs = section.querySelectorAll('.c4-tab-btn');
    const contentPanels = section.querySelectorAll('.c4-content-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetC = tab.getAttribute('data-target-c');

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        contentPanels.forEach(panel => {
          if (panel.getAttribute('data-panel-c') === targetC || targetC === 'all') {
            panel.classList.remove('hidden');
            panel.classList.add('animate-fadeIn');
          } else {
            panel.classList.add('hidden');
            panel.classList.remove('animate-fadeIn');
          }
        });
      });
    });
  });
}

// 4. Document Modal (Google Drive Artifact Reader)
const ARTIFACT_METADATA = {
  pse: {
    title: 'Mata Kuliah 01 — Pembelajaran Sosial dan Emosional (PSE)',
    badge: 'Lembar Kerja & Refleksi 4C Model',
    link: 'https://drive.google.com/file/d/12ETxlt5gn6fTQDsVW7gVD0xkbA1yUst4/view?usp=drive_link',
    embedId: '12ETxlt5gn6fTQDsVW7gVD0xkbA1yUst4',
    summary: 'Mendokumentasikan penerapan 5 Kompetensi Sosial Emosional (CASEL) dalam pembelajaran PPKn: kesadaran diri, pengelolaan diri, kesadaran sosial, keterampilan berelasi, dan pengambilan keputusan yang bertanggung jawab, dilengkapi teknik STOP dan asesmen well-being peserta didik.',
    courseName: 'Pembelajaran Sosial dan Emosional (PSE)'
  },
  pmal: {
    title: 'Mata Kuliah 02 — Pembelajaran Mendalam & Asesmen Lanjutan (PMAL)',
    badge: 'Lembar Kerja & Asesmen HOTS',
    link: 'https://drive.google.com/file/d/17l92VXoDAfs4ZrsM7gkzTQ60Hi5L55aI/view?usp=drive_link',
    embedId: '17l92VXoDAfs4ZrsM7gkzTQ60Hi5L55aI',
    summary: 'Rancangan instrumen penilaian autentik mata pelajaran PPKn, rubrik analitik berbasis studi kasus kewarganegaraan, portofolio digital, dan strategi diagnostik serta umpan balik deskriptif berkelanjutan untuk menstimulasi Higher-Order Thinking Skills (HOTS).',
    courseName: 'Pembelajaran Mendalam dan Asesmen Lanjutan (PMAL)'
  },
  ppl: {
    title: 'Mata Kuliah 03 — PPL Mandiri (Praktik Pengalaman Lapangan)',
    badge: 'Laporan Praktik Lapangan Mandiri',
    link: 'https://drive.google.com/file/d/1l5dh41SAlUE4t7IiBl-Nhh-jXzJLquRQ/view?usp=drive_link',
    embedId: '1l5dh41SAlUE4t7IiBl-Nhh-jXzJLquRQ',
    summary: 'Dokumentasi komprehensif mengajar mandiri di sekolah mitra SMP Negeri 8 Purwokerto. Memuat Modul Ajar berdiferensiasi, rekaman evaluasi Lesson Study harian, manajemen kelas inklusif, dan refleksi keteladanan pedagogik nyata di kelas.',
    courseName: 'PPL Mandiri — SMP Negeri 8 Purwokerto'
  },
  projek: {
    title: 'Mata Kuliah 04 — Projek Kepemimpinan',
    badge: 'Inisiatif Dampak Komunitas & Service Learning',
    link: 'https://drive.google.com/file/d/1Mo84IJZDY4Fk3MYI9W70FR2CLdRN5oiT/view?usp=drive_link',
    embedId: '1Mo84IJZDY4Fk3MYI9W70FR2CLdRN5oiT',
    summary: 'Laporan pelaksanaan projek kepemimpinan berbasis komunitas dengan kerangka BAGJA (Inkuiri Apresiatif) dan ABCD (Asset-Based Community Development), menggerakkan pemuda dan murid untuk kepedulian lingkungan dan kebhinekaan sosial.',
    courseName: 'Projek Kepemimpinan Komunitas'
  },
  islam: {
    title: 'Mata Kuliah 05 — Islam dan Ilmu Pengetahuan',
    badge: 'Refleksi Nilai Spiritual & Integrasi Ilmu',
    link: 'https://drive.google.com/file/d/1EPB0AfbUaSGiBw9IKcHaU2haLZ9ciDpC/view?usp=drive_link',
    embedId: '1EPB0AfbUaSGiBw9IKcHaU2haLZ9ciDpC',
    summary: 'Kajian sintesis nilai-nilai transendental Islam, etika profetik keguruan (Murabbi, Muallim, Mudarris), serta integrasi harmonis antara keimanan, sains modern, dan komitmen kebangsaan berlandaskan Pancasila.',
    courseName: 'Islam dan Ilmu Pengetahuan'
  }
};

function initDocumentModal() {
  const modal = document.getElementById('artifact-modal');
  const modalTitle = document.getElementById('modal-doc-title');
  const modalBadge = document.getElementById('modal-doc-badge');
  const modalSummary = document.getElementById('modal-doc-summary');
  const modalIframe = document.getElementById('modal-doc-iframe');
  const modalDirectLink = document.getElementById('modal-direct-link');
  const modalCopyLink = document.getElementById('modal-copy-link');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  let currentLink = '';

  document.querySelectorAll('[data-open-artifact]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-open-artifact');
      const data = ARTIFACT_METADATA[key];
      if (!data) return;

      currentLink = data.link;

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalBadge) modalBadge.textContent = data.badge;
      if (modalSummary) modalSummary.textContent = data.summary;
      if (modalDirectLink) modalDirectLink.href = data.link;

      if (modalIframe) {
        modalIframe.src = `https://drive.google.com/file/d/${data.embedId}/preview`;
      }

      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (modalIframe) modalIframe.src = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (modalCopyLink) {
    modalCopyLink.addEventListener('click', () => {
      if (currentLink) {
        navigator.clipboard.writeText(currentLink).then(() => {
          showToast('✓ Tautan Google Drive berhasil disalin!');
        }).catch(() => {
          showToast('Tautan: ' + currentLink);
        });
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// 5. Lightbox for Photo Gallery
function initLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('[data-lightbox-src]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox-src');
      const caption = item.getAttribute('data-lightbox-caption') || 'Dokumentasi Aksi Nyata PPG Calon Guru';
      const tag = item.getAttribute('data-lightbox-tag') || 'PPL Mandiri';

      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      if (lightboxTag) lightboxTag.textContent = tag;

      if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// 6. Interactive STOP Technique Simulator (PSE)
function initStopTechnique() {
  const steps = [
    {
      step: 'S',
      title: 'Stop (Berhenti Sejenak)',
      desc: 'Hentikan sejenak semua aktivitas fisik, ketegangan nalar, dan beban kognitif di awal kelas PPKn.',
      guide: 'Pendidik mengajak siswa meletakkan pena, bersandar santai di kursi, dan merilekskan bahu.'
    },
    {
      step: 'T',
      title: 'Take a Breath (Tarik Napas Dalam)',
      desc: 'Bernapas perlahan melalui hidung 4 detik, tahan 4 detik, dan hembuskan perlahan 6 detik.',
      guide: 'Merasakan udara sejuk yang masuk dan melepas beban emosi, menenangkan sistem saraf simpatik.'
    },
    {
      step: 'O',
      title: 'Observe (Amati Sensasi Diri)',
      desc: 'Amati sensasi pada tubuh, pikiran yang berkeliaran, serta emosi yang sedang dirasakan tanpa menghakimi.',
      guide: 'Siswa diajak mengenali rasa lelah, cemas, atau semangat yang hadir dan menerima keadaan diri saat ini.'
    },
    {
      step: 'P',
      title: 'Proceed (Lanjutkan dengan Berkesadaran)',
      desc: 'Kembali siap belajar dengan kejernihan pikiran, keterbukaan hati, dan fokus penuh pada materi.',
      guide: 'Siswa masuk ke materi PPKn dengan kesadaran penuh (Mindfulness) dan kesiapan berkolaborasi aktif.'
    }
  ];

  const container = document.getElementById('stop-simulator');
  if (!container) return;

  const btnStepS = document.getElementById('stop-step-s');
  const btnStepT = document.getElementById('stop-step-t');
  const btnStepO = document.getElementById('stop-step-o');
  const btnStepP = document.getElementById('stop-step-p');
  const displayTitle = document.getElementById('stop-display-title');
  const displayDesc = document.getElementById('stop-display-desc');
  const displayGuide = document.getElementById('stop-display-guide');

  const btns = [btnStepS, btnStepT, btnStepO, btnStepP];

  const setStep = (index) => {
    btns.forEach((b, i) => {
      if (!b) return;
      if (i === index) {
        b.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-200');
        b.classList.add('bg-gray-900', 'text-white', 'border-gray-900', 'shadow-md');
      } else {
        b.classList.remove('bg-gray-900', 'text-white', 'border-gray-900', 'shadow-md');
        b.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-200');
      }
    });

    const curr = steps[index];
    if (displayTitle) displayTitle.textContent = curr.title;
    if (displayDesc) displayDesc.textContent = curr.desc;
    if (displayGuide) displayGuide.textContent = curr.guide;
  };

  btns.forEach((btn, idx) => {
    if (btn) {
      btn.addEventListener('click', () => setStep(idx));
    }
  });
}

// 7. Interactive BAGJA Cycle (Projek Kepemimpinan)
function initBagjaCycle() {
  const bagjaData = {
    B: {
      title: 'Buat Pertanyaan Utama (Define)',
      desc: 'Merumuskan pertanyaan pemantik untuk mengidentifikasi potensi kepemimpinan dan kebutuhan riil di lingkungan belajar & komunitas.',
      focus: 'Bagaimana menumbuhkan kesadaran ekologis dan gotong royong murid melalui inisiatif kepemimpinan mandiri?'
    },
    A: {
      title: 'Ambil Pelajaran (Discover)',
      desc: 'Mencari contoh nyata, praktik baik, dan aset positif yang telah berhasil dijalankan sebelumnya oleh komunitas lokal.',
      focus: 'Menggali kearifan lokal Banyumas dan daya dukung warga sekolah sebagai modal awal perubahan.'
    },
    G: {
      title: 'Gali Mimpi (Dream)',
      desc: 'Menyusun visi bersama mengenai ekosistem ideal saat inisiatif telah terealisasi secara berkelanjutan.',
      focus: 'Terciptanya generasi muda yang proaktif, berkarakter Pancasila, dan tanggap krisis sosial di sekitarnya.'
    },
    J: {
      title: 'Jabarkan Rencana (Design)',
      desc: 'Menentukan langkah konkret, pembagian peran tim, target capaian waktu, serta mitigasi risiko pelaksanaan lapangan.',
      focus: 'Penyusunan timeline terperinci, alokasi peran fasilitator, dan penyiapan sarana kemitraan komunitas.'
    },
    A2: {
      title: 'Atur Eksekusi (Deliver)',
      desc: 'Mentransformasikan rencana aksi ke dalam aksi nyata terukur, monitoring berkala, dan evaluasi dampak nyata.',
      focus: 'Pelaksanaan aksi kepemimpinan lapangan dengan monitoring reflektif harian dan laporan akuntabel.'
    }
  };

  const navs = document.querySelectorAll('[data-bagja-step]');
  const titleEl = document.getElementById('bagja-title');
  const descEl = document.getElementById('bagja-desc');
  const focusEl = document.getElementById('bagja-focus');

  navs.forEach(nav => {
    nav.addEventListener('click', () => {
      const stepKey = nav.getAttribute('data-bagja-step');
      const item = bagjaData[stepKey];
      if (!item) return;

      navs.forEach(n => {
        n.classList.remove('bg-gray-900', 'text-white');
        n.classList.add('bg-white', 'text-gray-700');
      });

      nav.classList.remove('bg-white', 'text-gray-700');
      nav.classList.add('bg-gray-900', 'text-white');

      if (titleEl) titleEl.textContent = item.title;
      if (descEl) descEl.textContent = item.desc;
      if (focusEl) focusEl.textContent = item.focus;
    });
  });
}

// 8. Command Palette (Ctrl+K or Search Pill)
function initCommandPalette() {
  const palette = document.getElementById('command-palette');
  const openBtns = document.querySelectorAll('[data-open-palette]');
  const input = document.getElementById('palette-input');
  const itemsContainer = document.getElementById('palette-items');

  if (!palette) return;

  const openPalette = () => {
    palette.classList.add('active');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 50);
    }
  };

  const closePalette = () => {
    palette.classList.remove('active');
  };

  openBtns.forEach(btn => btn.addEventListener('click', openPalette));

  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (palette.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    }
    if (e.key === 'Escape' && palette.classList.contains('active')) {
      closePalette();
    }
  });

  // Filter items in command palette
  if (input && itemsContainer) {
    const listItems = itemsContainer.querySelectorAll('.palette-item');
    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      listItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

// 9. Contact Form Simulation & Feedback
function initContactForm() {
  const form = document.getElementById('collab-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-msg');

    const name = nameInput ? nameInput.value.trim() : 'Rekan Pendidik';

    showToast(`✓ Terima kasih, ${name}! Pesan kolaborasi Anda berhasil tersimpan.`);
    form.reset();
  });
}

// 10. Mobile Navigation Drawer
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const menu = document.getElementById('mobile-menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Helper: Toast Notification
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
