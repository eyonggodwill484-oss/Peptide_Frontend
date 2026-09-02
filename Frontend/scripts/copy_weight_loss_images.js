const fs = require('fs');
const path = require('path');

const srcBase = 'f:/Bobbin/Peptide_Frontend/New Products';
const targetBase = 'f:/Bobbin/Peptide_Frontend/Frontend/public/images/products';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
  return fs.statSync(dest).size;
}

const productsToCopy = [
  {
    slug: 'ozempic',
    folder: 'Ozempic',
    images: [
      { src: '68cad39d92f3c5db8d0ad5b2_ozempic-blog-image-4x3.jpg', dest: 'ozempic-1.jpg' },
      { src: 'ozempic-list-price-explained-hero-mobile.jpeg', dest: 'ozempic-2.jpeg' },
      { src: 'images.jfif', dest: 'ozempic-3.jfif' },
      { src: 'images (1).jfif', dest: 'ozempic-4.jfif' }
    ]
  },
  {
    slug: 'trulicity',
    folder: 'TRULICITY',
    images: [
      { src: 'Trulicity-e1731341103586.jpg', dest: 'trulicity-1.jpg' },
      { src: 'New_image_6240244383_0.jpg', dest: 'trulicity-2.jpg' },
      { src: 'IMG_4664.webp', dest: 'trulicity-3.webp' },
      { src: 'images.jfif', dest: 'trulicity-4.jfif' },
      { src: 'images (1).jfif', dest: 'trulicity-5.jfif' }
    ]
  },
  {
    slug: 'rybelsus',
    folder: 'RYBELSUS',
    images: [
      { src: 'goodrx-taking-rybelsus.webp', dest: 'rybelsus-1.webp' },
      { src: 'rybelsus-14-mg-tablet.avif', dest: 'rybelsus-2.avif' },
      { src: 'images.jfif', dest: 'rybelsus-3.jfif' }
    ]
  },
  {
    slug: 'saxenda',
    folder: 'SAXENDA',
    images: [
      { src: 'saxenda-18-mg-3-ml-6-mg-ml-pre-filled-pen-medicine-115687.webp', dest: 'saxenda-1.webp' },
      { src: 'Saxenda-Weight-Loss.webp', dest: 'saxenda-2.webp' },
      { src: 'Verschillende-doseringen-Saxenda.webp', dest: 'saxenda-3.webp' }
    ]
  },
  {
    slug: 'retatrutide',
    folder: 'RETATRUTIDE (Polaris peptides)',
    images: [
      { src: 'retatrutide-10mg-vial.webp', dest: 'retatrutide-1.webp' }
    ]
  },
  {
    slug: 'zepbound',
    folder: 'ZEPBOUND',
    images: [
      { src: 'zepbound-combo-product-page.webp', dest: 'zepbound-1.webp' },
      { src: 'images.jfif', dest: 'zepbound-2.jfif' }
    ]
  },
  {
    slug: 'mounjaro',
    folder: 'MOUNJARO',
    images: [
      { src: 'mounjaro-1296x728-header-1296x729.avif', dest: 'mounjaro-1.avif' },
      { src: 'images (1).jfif', dest: 'mounjaro-2.jfif' }
    ]
  },
  {
    slug: 'duromine',
    folder: 'DUROMINE',
    images: [
      { src: 'Duromine-30mg-Capsules-30-Phentermine.jpg', dest: 'duromine-1.jpg' }
    ]
  },
  {
    slug: 'victoza',
    folder: 'VICTOZA',
    images: [
      { src: 'Victoza-1.png', dest: 'victoza-1.png' },
      { src: 'victoza-injection-pen-with-box.png', dest: 'victoza-2.png' }
    ]
  },
  {
    slug: 'wegovy-pill',
    folder: 'Wegovy pill',
    images: [
      { src: 'Wegovy-Pills-Ireland.webp', dest: 'wegovy-pill-1.webp' },
      { src: '260204-Wegovy-pill-gk-e3ce67.jpg', dest: 'wegovy-pill-2.jpg' },
      { src: 'VWH-WegovyPill-d9a4977443014c7cbc6d2bad906b9098.jpeg', dest: 'wegovy-pill-3.jpeg' }
    ]
  }
];

console.log('Copying images for 10 new Diabetes & Weight Loss products...');
for (const p of productsToCopy) {
  const destDir = path.join(targetBase, p.slug);
  ensureDir(destDir);

  for (const img of p.images) {
    const srcPath = path.join(srcBase, p.folder, img.src);
    const destPath = path.join(destDir, img.dest);
    if (!fs.existsSync(srcPath)) {
      console.error(`Source not found: ${srcPath}`);
      continue;
    }
    const size = copyFile(srcPath, destPath);
    console.log(`Copied ${img.dest} (${size} bytes) -> ${p.slug}`);
  }
}

console.log('Finished copying all 10 new weight loss products images!');
