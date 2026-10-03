/**
 * Utilities to parse and resolve direct displayable image URLs
 * from Google Drive and Google Photos share links.
 */

export function resolveGoogleImageUrl(urlOrId: string): string {
  if (!urlOrId) return '/images/photo1.jpg';

  const trimmed = urlOrId.trim();

  // If already a direct local asset or standard web image
  if (trimmed.startsWith('/') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  // Google Drive file link parser:
  // e.g. https://drive.google.com/file/d/1A2B3C4D5E/view?usp=sharing
  // or https://drive.google.com/open?id=1A2B3C4D5E
  // or https://drive.google.com/uc?id=1A2B3C4D5E
  const driveFileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (driveFileMatch && driveFileMatch[1]) {
    const fileId = driveFileMatch[1];
    // Google's high-speed CDN endpoint for public Drive files:
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // Direct googleusercontent URLs (Google Photos & Drive CDN)
  if (trimmed.includes('googleusercontent.com')) {
    return trimmed;
  }

  return trimmed;
}

export function extractDriveFolderId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
