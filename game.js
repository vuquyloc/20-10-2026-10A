
import * as THREE from 'https://esm.sh/three@0.180.0';
import { GLTFLoader } from 'https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://esm.sh/three@0.180.0/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'https://esm.sh/three@0.180.0/examples/jsm/controls/OrbitControls.js';

/* =========================================
   BÓ HOA TULIP 3D
========================================= */

const container = document.getElementById('bouquet3d');

if (container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#fff0f6');

  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / Math.max(container.clientHeight, 1),
    0.1,
    100
  );

  camera.position.set(0, 1.2, 5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  container.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xe8a9c5, 2));

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(3, 5, 5);
  scene.add(light);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.autoRotate = false;
  controls.enablePan = false;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
  );

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    './assets/bo-hoa-tulip-moi.glb',
    (gltf) => {
      const bouquet = gltf.scene;
      scene.add(bouquet);

      const box = new THREE.Box3().setFromObject(bouquet);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      bouquet.position.sub(center);

      const maxSize = Math.max(size.x, size.y, size.z);

      if (maxSize > 0) {
        bouquet.scale.setScalar(2.5 / maxSize);
      }

      bouquet.position.y = 0;

      camera.position.set(0, 0, 4.5);
      controls.target.set(0, 0, 0);
      controls.update();

      const status = document.getElementById('modelStatus');
      if (status) status.textContent = '';
    },
    undefined,
    (error) => {
      console.error('Không tải được mô hình hoa:', error);
      const status = document.getElementById('modelStatus');

      if (status) {
        status.textContent =
          'Chưa tải được bó hoa 3D. Hãy kiểm tra file trong thư mục assets.';
      }
    }
  );

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/* =========================================
   CÁC MÀN HÌNH
========================================= */

const startButton = document.getElementById('startBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const albumScreen = document.getElementById('albumScreen');
const teacherSurprise = document.getElementById('teacherSurprise');

const showLetterBtn = document.getElementById('showLetterBtn');
const backToAlbumBtn = document.getElementById('backToAlbumBtn');
const backHomeBtn = document.getElementById('backHomeBtn');

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function showScreen(screen) {
  [welcomeScreen, albumScreen, teacherSurprise].forEach((item) => {
    if (item) item.hidden = item !== screen;
  });

  if (welcomeScreen) welcomeScreen.classList.remove('screen-leaving');

  scrollTop();
}

if (startButton && welcomeScreen && albumScreen) {
  albumScreen.hidden = true;

  startButton.addEventListener('click', () => {
    if (startButton.disabled) return;

    startButton.disabled = true;
    welcomeScreen.classList.add('screen-leaving');

    window.setTimeout(() => {
      showScreen(albumScreen);
      startButton.disabled = false;
    }, 450);
  });
}

/* =========================================
   15 BÔNG HOA — TÊN VÀ LỜI CHÚC
========================================= */

const memories = [
  {
    title: 'Nguyễn Thị Vân Anh',
    message: 'Chúc Vân Anh luôn vui vẻ, tự tin và giữ mãi nụ cười tươi tắn của mình. Mong mọi điều dịu dàng nhất sẽ đến với bạn trong tuổi trẻ rực rỡ này!'
  },
  {
    title: 'Phan Ngọc Anh',
    message: 'Chúc Ngọc Anh có một ngày 20/10 thật nhiều niềm vui, luôn được yêu thương và luôn đủ dũng cảm để theo đuổi những điều mình mơ ước.'
  },
  {
    title: 'Nguyễn Thị Ngọc Ánh',
    message: 'Mong Ngọc Ánh luôn tỏa sáng theo cách riêng, gặp nhiều may mắn và lưu giữ thật nhiều kỉ niệm đẹp cùng 10Aspire.'
  },
  {
    title: 'Đỗ Ngọc Diệp',
    message: 'Chúc Ngọc Diệp luôn rạng rỡ, bình an và có thật nhiều điều đáng mong đợi trong những ngày sắp tới. Hãy luôn là phiên bản tuyệt vời của chính mình nhé!'
  },
  {
    title: 'Nguyễn Thu Giang',
    message: 'Chúc Thu Giang có một ngày lễ thật ngọt ngào, học tập thuận lợi, gặp nhiều niềm vui và luôn có những người bạn tốt đồng hành.'
  },
  {
    title: 'Trương Thị Xuân Huệ',
    message: 'Chúc Xuân Huệ luôn hạnh phúc, mạnh mẽ và tự tin. Mong mỗi ngày đến lớp đều mang đến cho bạn một câu chuyện vui để nhớ về.'
  },
  {
    title: 'Nguyễn Ngọc Lan',
    message: 'Mong Ngọc Lan luôn bình an, tươi tắn như một bông hoa nhỏ và luôn nhận được sự quan tâm, trân trọng xứng đáng với mình.'
  },
  {
    title: 'Nguyễn Ngọc Bảo Linh',
    message: 'Chúc Bảo Linh có thật nhiều tiếng cười, những trải nghiệm tuyệt vời và một tuổi thanh xuân đầy màu sắc bên những người bạn thân thương.'
  },
  {
    title: 'Nguyễn Thị Kim Ngân',
    message: 'Chúc Kim Ngân luôn vui vẻ, gặp nhiều điều tốt đẹp và kiên định với những mục tiêu của mình. Mong mọi nỗ lực của bạn đều nở thành hoa!'
  },
  {
    title: 'Nguyễn Ngọc Bảo Nhi',
    message: 'Chúc Bảo Nhi luôn đáng yêu, tự tin và hạnh phúc. Hy vọng hôm nay sẽ là một kỉ niệm đẹp trong cuốn nhật kí thanh xuân của bạn.'
  },
  {
    title: 'Vũ Hoài Thu',
    message: 'Chúc Hoài Thu có một ngày 20/10 ấm áp, luôn gặp những điều tử tế và có đủ niềm vui để mỗi ngày đều trở nên thật đáng nhớ.'
  },
  {
    title: 'Đặng Thị Huyền Trang',
    message: 'Mong Huyền Trang luôn giữ được sự tự tin, theo đuổi điều mình yêu thích và có thật nhiều khoảnh khắc đáng nhớ bên 10Aspire.'
  },
  {
    title: 'Nguyễn Thị Bảo Trang',
    message: 'Chúc Bảo Trang luôn tươi cười, mạnh khỏe và gặp nhiều may mắn. Mong những ước mơ đẹp của bạn sẽ từng bước trở thành hiện thực.'
  },
  {
    title: 'Trịnh Ngân Vy',
    message: 'Chúc Ngân Vy luôn rực rỡ, được sống với những điều mình yêu và có một thanh xuân đầy ắp tiếng cười, tình bạn cùng những kỉ niệm đẹp.'
  },
  {
    title: 'Nguyễn Thị Bảo Yến',
    message: 'Chúc Bảo Yến luôn hạnh phúc, bình an và tỏa sáng theo cách của riêng mình. Cảm ơn bạn đã góp thêm một bông hoa đáng quý vào khu vườn 10Aspire!'
  }
];

function formatNumber(number) {
  return String(number).padStart(2, '0');
}

/* Đồng bộ tên và ảnh với các thẻ album */

document.querySelectorAll('.memory-card').forEach((card, index) => {
  const memory = memories[index];
  if (!memory) return;

  const caption = card.querySelector('.memory-caption');
  const image = card.querySelector('img');
  const placeholder = card.querySelector('.photo-placeholder');

  if (caption) caption.textContent = memory.title;
  if (image) image.alt = `Ảnh ${memory.title}`;

  function updateImageState() {
    if (!image || !placeholder) return;
    placeholder.hidden = image.complete && image.naturalWidth > 0;
  }

  if (image) {
    image.addEventListener('load', updateImageState);
    image.addEventListener('error', updateImageState);
    updateImageState();
  }

  card.addEventListener('click', () => {
    lastFocusedCard = card;
    showPhoto(index);
  });
});

/* =========================================
   HỘP XEM ẢNH
========================================= */

const photoModal = document.getElementById('photoModal');
const modalPhoto = document.getElementById('modalPhoto');
const modalNumber = document.getElementById('modalNumber');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalCounter = document.getElementById('modalCounter');

const closeModalBtn = document.getElementById('closeModalBtn');
const prevPhotoBtn = document.getElementById('prevPhotoBtn');
const nextPhotoBtn = document.getElementById('nextPhotoBtn');

let currentPhotoIndex = 0;
let lastFocusedCard = null;

function showPhoto(index) {
  if (!photoModal || !modalPhoto || !memories.length) return;

  currentPhotoIndex = (index + memories.length) % memories.length;

  const memory = memories[currentPhotoIndex];
  const card = document.querySelector(
    `.memory-card[data-photo="${currentPhotoIndex}"]`
  );
  const image = card?.querySelector('img');

  if (modalNumber) {
    modalNumber.textContent = `MEMORY NO. ${formatNumber(currentPhotoIndex + 1)}`;
  }

  if (modalTitle) modalTitle.textContent = memory.title;
  if (modalMessage) modalMessage.textContent = memory.message;

  if (modalCounter) {
    modalCounter.textContent =
      `${formatNumber(currentPhotoIndex + 1)} / ${formatNumber(memories.length)}`;
  }

  if (image) {
    modalPhoto.src = image.getAttribute('src') || '';
    modalPhoto.alt = image.alt || memory.title;
  }

  photoModal.hidden = false;
  document.body.style.overflow = 'hidden';
  closeModalBtn?.focus();
}

function closePhotoModal() {
  if (!photoModal) return;

  photoModal.hidden = true;
  document.body.style.overflow = '';

  if (lastFocusedCard && document.contains(lastFocusedCard)) {
    lastFocusedCard.focus();
  }
}

closeModalBtn?.addEventListener('click', closePhotoModal);
prevPhotoBtn?.addEventListener('click', () => showPhoto(currentPhotoIndex - 1));
nextPhotoBtn?.addEventListener('click', () => showPhoto(currentPhotoIndex + 1));

photoModal?.addEventListener('click', (event) => {
  if (event.target === photoModal) closePhotoModal();
});

document.addEventListener('keydown', (event) => {
  if (!photoModal || photoModal.hidden) return;

  if (event.key === 'Escape') closePhotoModal();
  if (event.key === 'ArrowLeft') showPhoto(currentPhotoIndex - 1);
  if (event.key === 'ArrowRight') showPhoto(currentPhotoIndex + 1);
});

/* =========================================
   PHONG THƯ BÍ MẬT DÀNH TẶNG CÔ YẾN
========================================= */

const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
const teacherLetter = document.getElementById('teacherLetter');
const envelopeScene = document.getElementById('envelopeScene');
const envelopeHint = document.getElementById('envelopeHint');

showLetterBtn?.addEventListener('click', () => {
  showScreen(teacherSurprise);
});

openEnvelopeBtn?.addEventListener('click', () => {
  if (!teacherLetter || !envelopeScene) return;

  if (openEnvelopeBtn.classList.contains('opened')) return;

  openEnvelopeBtn.classList.add('opened');
  envelopeScene.classList.add('envelope-opening');

  if (envelopeHint) {
    envelopeHint.textContent = 'Một lời nhắn nhỏ, chứa thật nhiều yêu thương...';
  }

  window.setTimeout(() => {
    teacherLetter.hidden = false;
    teacherLetter.classList.add('letter-revealed');

    if (envelopeHint) {
      envelopeHint.textContent = 'Từ 10Aspire, với tất cả sự yêu quý dành cho cô ♡';
    }

    teacherLetter.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 750);
});

backToAlbumBtn?.addEventListener('click', () => {
  showScreen(albumScreen);
});

backHomeBtn?.addEventListener('click', () => {
  showScreen(welcomeScreen);
});

/* =========================================
   NHẠC NỀN MP3 — FADE IN / FADE OUT
   File: assets/music/piano.mp3
========================================= */

const musicButton = document.getElementById('musicButton');
const backgroundMusic = new Audio('./assets/music/piano.mp3');

backgroundMusic.loop = true;
backgroundMusic.preload = 'auto';
backgroundMusic.volume = 0;

let musicIsPlaying = false;
let fadeTimer = null;
let fadeToken = 0;

function updateMusicButton(playing) {
  if (!musicButton) return;

  musicButton.setAttribute('aria-pressed', String(playing));
  musicButton.setAttribute(
    'aria-label',
    playing ? 'Tắt nhạc nền' : 'Bật nhạc nền'
  );
  musicButton.title = playing ? 'Tắt nhạc piano' : 'Bật nhạc piano';
}

function fadeMusic(targetVolume, duration, onComplete) {
  if (fadeTimer) {
    clearInterval(fadeTimer);
    fadeTimer = null;
  }

  const token = ++fadeToken;
  const startVolume = backgroundMusic.volume;
  const startTime = performance.now();

  if (duration <= 0) {
    backgroundMusic.volume = targetVolume;
    onComplete?.();
    return;
  }

  fadeTimer = window.setInterval(() => {
    if (token !== fadeToken) {
      clearInterval(fadeTimer);
      return;
    }

    const progress = Math.min((performance.now() - startTime) / duration, 1);
    const eased = progress * progress * (3 - 2 * progress);

    backgroundMusic.volume = Math.max(
      0,
      Math.min(1, startVolume + (targetVolume - startVolume) * eased)
    );

    if (progress >= 1) {
      clearInterval(fadeTimer);
      fadeTimer = null;
      onComplete?.();
    }
  }, 30);
}

async function startMusic() {
  try {
    await backgroundMusic.play();
    musicIsPlaying = true;
    updateMusicButton(true);
    fadeMusic(0.32, 1400);
  } catch (error) {
    console.error('Không thể phát file nhạc piano:', error);
    musicIsPlaying = false;
    updateMusicButton(false);
    alert('Chưa phát được nhạc. Hãy kiểm tra file assets/music/piano.mp3.');
  }
}

function stopMusic() {
  musicIsPlaying = false;
  updateMusicButton(false);

  fadeMusic(0, 650, () => {
    if (!musicIsPlaying) backgroundMusic.pause();
  });
}

musicButton?.addEventListener('click', () => {
  if (musicIsPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
});

backgroundMusic.addEventListener('ended', () => {
  musicIsPlaying = false;
  updateMusicButton(false);
});

updateMusicButton(false);
