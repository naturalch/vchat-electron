export const copyImageToUserDir = async (imagePath: string) => {
  if (!imagePath) {
    return;
  }
  try {
    const copiedImagePath = await window.electronAPI.copyImageToUserDir(imagePath);
    console.log('Image copied to user directory:', copiedImagePath);
    return copiedImagePath;
  } catch (error) {
    console.error('Error copying image:', error);
  }
};
