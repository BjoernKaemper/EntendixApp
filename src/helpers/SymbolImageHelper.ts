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
    // try to get the image for the given subsection and plant
    const image = symbolImagesConfig.find(
      (entry) => entry.subsectionType === subsectionName && entry.plantType === plantName,
    );
    if (image) {
      return image.image;
    }
    // If we are here, we did not find an image for the given subsection and plant. So if we have a plant, we try to get the default image for the subsection.
    if (plantName) {
      const plantImage = symbolImagesConfig.find(
        (entry) => entry.subsectionType === subsectionName && entry.plantType === undefined,
      );
      if (plantImage) {
        return plantImage.image;
      }
    }
    // If we are here, we did not find an image for the given subsection and plant. So we try to get the default image.
    return symbolImagesConfig.find(
      (entry) => entry.subsectionType === 'default' && entry.plantType === 'default',
    )!.image;
  },
};
