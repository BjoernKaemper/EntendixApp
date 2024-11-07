import { symbolImagesConfig } from '@/configs/symbolImages';

export default {
  /**
   * Returns the image for the given subsection and plant.
   *
   * @param {string} subsectionName - The name of the subsection.
   * @param {string | undefined} plantName - The name of the plant. If undefined, we just want the subsection image.
   * @returns {string} The image URL.
   */
  getImage(subsectionName: string, plantName: string | undefined = undefined): string {
    const image = symbolImagesConfig.find(
      (entry) => entry.subsectionType === subsectionName && entry.plantType === plantName,
    );
    if (image) {
      return image.image;
    }
    return symbolImagesConfig.find(
      (entry) => entry.subsectionType === 'default' && entry.plantType === 'default',
    )!.image;
  },
};
