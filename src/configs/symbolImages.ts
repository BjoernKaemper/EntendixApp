import rlt_anlage from '@/assets/images/rlt_anlage.svg';
import zuluftanlage from '@/assets/images/zuluftanlage.svg';
import sichernAnlage from '@/assets/images/sichernAnlage.svg';
import medienBereitstellen from '@/assets/images/medienBereitstellen.svg';
import medienVerteilen from '@/assets/images/medienVerteilen.svg';
import medienEntsorgen from '@/assets/images/medienEntsorgen.svg';
import fernwärme from '@/assets/images/fernwärme.svg';
import wärmeerzeuger from '@/assets/images/wärmeerzeuger.svg';
import heizkreis from '@/assets/images/heizkreis.svg';
import kälteErzeuger from '@/assets/images/kälteErzeuger.svg';
import kälteVerteiler from '@/assets/images/kälteVerteiler.svg';
import abluftanlage from '@/assets/images/abluftanlagen.svg';
import no_image from '@/assets/no_image.svg';

interface SymbolImagesConfigEntry {
  subsectionType: string;
  plantType: string | undefined;
  image: string;
}

/**
 * All trades with their ids, title and icons in desired order
 */
export const symbolImagesConfig: SymbolImagesConfigEntry[] = [
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: undefined,
    image: no_image, // TODO: This is a Placeholder
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Lüftungsanlage',
    image: rlt_anlage,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Abluftanlage',
    image: abluftanlage,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Zuluftanlage',
    image: zuluftanlage,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Türluftschleieranlage',
    image: zuluftanlage,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Rauch- und Wärmeabzugsanlage',
    image: sichernAnlage,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Entrauchungsanlage',
    image: sichernAnlage,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: undefined,
    image: no_image, // TODO: This is a Placeholder
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Erzeugungsanlage',
    image: medienBereitstellen,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Aufbereitungsanlage',
    image: medienBereitstellen,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Verteilanlage',
    image: medienVerteilen,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Verbrauchsanlage',
    image: medienVerteilen,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Reinigungsanlage',
    image: medienBereitstellen,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Entsorgungsanlage',
    image: medienEntsorgen,
  },
  {
    subsectionType: 'Wärmeversorgungsanlagen',
    plantType: undefined,
    image: no_image, // TODO: This is a Placeholder
  },
  {
    subsectionType: 'Wärmeversorgungsanlagen',
    plantType: 'Netzanschluss',
    image: fernwärme,
  },
  {
    subsectionType: 'Wärmeversorgungsanlagen',
    plantType: 'Erzeugungsanlage',
    image: wärmeerzeuger,
  },
  {
    subsectionType: 'Wärmeversorgungsanlagen',
    plantType: 'Verteilanlage',
    image: heizkreis,
  },
  {
    subsectionType: 'Wärmeversorgungsanlagen',
    plantType: 'Verbrauchsanlage',
    image: heizkreis,
  },
  {
    subsectionType: 'Kälteanlagen',
    plantType: undefined,
    image: no_image, // TODO: This is a Placeholder
  },
  {
    subsectionType: 'Kälteanlagen',
    plantType: 'Netzanschluss',
    image: fernwärme,
  },
  {
    subsectionType: 'Kälteanlagen',
    plantType: 'Erzeugungsanlage',
    image: kälteErzeuger,
  },
  {
    subsectionType: 'Kälteanlagen',
    plantType: 'Verteilanlage',
    image: kälteVerteiler,
  },
  {
    subsectionType: 'Kälteanlagen',
    plantType: 'Verbrauchsanlage',
    image: kälteVerteiler,
  },
  {
    subsectionType: 'default',
    plantType: 'default',
    image: no_image,
  },
];
