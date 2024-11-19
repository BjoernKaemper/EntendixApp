import no_image from '@/assets/no_image.svg';
import gewerk_stakstromanlagen from '@/assets/images/gewerk_stakstromanlagen.png';
import gewerk_gebäudeautomation from '@/assets/images/gewerk_gebäudeautomation.png';
import gewerk_abwasser_wasser from '@/assets/images/gewerk_abwasser_wasser.png';
import gewerk_kälteanlagen from '@/assets/images/gewerk_kälteanlagen.png';
import gewerk_wärmeversorgungsanlagen from '@/assets/images/gewerk_wärmeversorgungsanlagen.png';
import wasser_abwasser_anlage_erzeugung from '@/assets/images/wasser_abwasser_anlage_erzeugung.png';
import wasser_abwasser_anlage_aufbereitung from '@/assets/images/wasser_abwasser_anlage_aufbereitung.png';
import wasser_abwasser_anlage_verteilung from '@/assets/images/wasser_abwasser_anlage_verteilung.png';
import wasser_abwasser_anlage_trinkwassersystem from '@/assets/images/wasser_abwasser_anlage_trinkwassersystem.png';
import wasser_abwasser_anlage_reinigungsanlage from '@/assets/images/wasser_abwasser_anlage_reinigungsanlage.png';
import wasser_abwasser_anlage_entsorgungsanlage from '@/assets/images/wasser_abwasser_anlage_entsorgungsanlage.png';
import kälteanlageb_netzanschluss from '@/assets/images/kälteanlageb_netzanschluss.png';
import kälteanlageb_erzeugung from '@/assets/images/kälteanlageb_erzeugung.png';
import kälteanlageb_verteilanlagen from '@/assets/images/kälteanlageb_verteilanlagen.png';
import kälteanlageb_verbrauchsanlage from '@/assets/images/kälteanlageb_verbrauchsanlage.png';
import raumlufttechnsiche_anlagen_türluftschleieranlage from '@/assets/images/raumlufttechnsiche_anlagen_türluftschleieranlage.png';
import raumlufttechnsiche_anlagen_rauch_wärmeabzug from '@/assets/images/raumlufttechnsiche_anlagen_rauch_wärmeabzug.png';
import raumlufttechnsiche_anlagen_entrauchung from '@/assets/images/raumlufttechnsiche_anlagen_entrauchung.png';
import gewerk_raumlufttechnische_anlagen from '@/assets/images/gewerk_raumlufttechnische_anlagen.png';
import raumlufttechnische_anlagen_lüftungsanlage from '@/assets/images/raumlufttechnsiche_anlagen_lüftungsanlagen.png';
import raumlufttechnische_anlagen_abluftanlage from '@/assets/images/raumlufttechnsiche_anlagen_abluftanlage.png';
import raumlufttechnische_anlagen_zuluftanlage from '@/assets/images/raumlufttechnsiche_anlagen_zuluftanlage.png';
import wärmeversorung_netzanschluss from '@/assets/images/wärmeversorgung_netzanschluss.png';
import wärmeversorung_erzeugung from '@/assets/images/wärmeversorgung_erzeugung.png';
import wärmeversorung_verteilanlagen from '@/assets/images/wärmeversorgung_verteilanlagen.png';
import wärmeversorung_verbrauchsanlagen from '@/assets/images/wärmeversorgung_verbrauchsanlagen.png';

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
    image: gewerk_raumlufttechnische_anlagen,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Lüftungsanlage',
    image: raumlufttechnische_anlagen_lüftungsanlage,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Abluftanlage',
    image: raumlufttechnische_anlagen_abluftanlage,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Zuluftanlage',
    image: raumlufttechnische_anlagen_zuluftanlage,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Türluftschleieranlage',
    image: raumlufttechnsiche_anlagen_türluftschleieranlage,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Rauch- und Wärmeabzugsanlage',
    image: raumlufttechnsiche_anlagen_rauch_wärmeabzug,
  },
  {
    subsectionType: 'Lufttechnische Anlagen',
    plantType: 'Entrauchungsanlage',
    image: raumlufttechnsiche_anlagen_entrauchung,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: undefined,
    image: gewerk_abwasser_wasser,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Erzeugungsanlage',
    image: wasser_abwasser_anlage_erzeugung,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Aufbereitungsanlage',
    image: wasser_abwasser_anlage_aufbereitung,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Verteilanlage',
    image: wasser_abwasser_anlage_verteilung,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Verbrauchsanlage',
    image: wasser_abwasser_anlage_trinkwassersystem,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Reinigungsanlage',
    image: wasser_abwasser_anlage_reinigungsanlage,
  },
  {
    subsectionType: 'Abwasser-, Wasser-, Gasanlagen',
    plantType: 'Entsorgungsanlage',
    image: wasser_abwasser_anlage_entsorgungsanlage,
  },
  {
    subsectionType: 'Wärmeversorgungsanlagen',
    plantType: undefined,
    image: gewerk_wärmeversorgungsanlagen,
  },
  {
    subsectionType: 'Wärmeversorgungsanlagen',
    plantType: 'Netzanschluss',
    image: wärmeversorung_netzanschluss,
  },
  {
    subsectionType: 'Wärmeversorgungsanlagen',
    plantType: 'Erzeugungsanlage',
    image: wärmeversorung_erzeugung,
  },
  {
    subsectionType: 'Wärmeversorgungsanlagen',
    plantType: 'Verteilanlage',
    image: wärmeversorung_verteilanlagen,
  },
  {
    subsectionType: 'Wärmeversorgungsanlagen',
    plantType: 'Verbrauchsanlage',
    image: wärmeversorung_verbrauchsanlagen,
  },
  {
    subsectionType: 'Kälteanlagen',
    plantType: undefined,
    image: gewerk_kälteanlagen,
  },
  {
    subsectionType: 'Kälteanlagen',
    plantType: 'Netzanschluss',
    image: kälteanlageb_netzanschluss,
  },
  {
    subsectionType: 'Kälteanlagen',
    plantType: 'Erzeugungsanlage',
    image: kälteanlageb_erzeugung,
  },
  {
    subsectionType: 'Kälteanlagen',
    plantType: 'Verteilanlage',
    image: kälteanlageb_verteilanlagen,
  },
  {
    subsectionType: 'Kälteanlagen',
    plantType: 'Verbrauchsanlage',
    image: kälteanlageb_verbrauchsanlage,
  },
  {
    subsectionType: 'Starkstromanlagen',
    plantType: undefined,
    image: gewerk_stakstromanlagen,
  },
  {
    subsectionType: 'Gebäudeautomationssystem',
    plantType: undefined,
    image: gewerk_gebäudeautomation,
  },
  {
    subsectionType: 'default',
    plantType: 'default',
    image: no_image,
  },
];
