// src/config/images.ts
interface ImageConfig {
  [key: string]: string;
}

export const imageConfig: ImageConfig = {
  '/images/profile.jpg': '/images/profile.jpg',
  '/images/civil-engineering.jpg': '/images/civil-engineering.jpg',
  '/images/projects/pont.jpg': '/images/default.jpg',
  '/images/projects/equations.jpg': '/images/default.jpg',
  '/images/projects/drainage.jpg': '/images/default.jpg',
  '/images/projects/optimization.jpg': '/images/default.jpg',
  '/images/projects/electrical.jpg': '/images/default.jpg',
  '/images/projects/forage.jpg': '/images/default.jpg',
  '/images/og-image.jpg': '/images/default.jpg',
};

export const getImagePath = (path: string): string => {
  return imageConfig[path] || '/images/default.jpg'; // Placeholder par défaut
};