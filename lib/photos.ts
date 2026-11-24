export type PhotoCredit = {
  author: string;
  license: string;
  href: string;
};

export function carImage(slug: string) {
  return `/car-photos/${slug}.jpg`;
}

/** Openly licensed photographs. A dusk grade is applied in the saved file. */
export const photoCredits: Record<string, PhotoCredit> = {
  'mahindra-xuv700': {
    author: 'DriveSpark',
    license: 'CC BY 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:2021_Mahindra_XUV700_2.2_AX7_(India)_front_view.png',
  },
  'mahindra-scorpio-n': {
    author: 'LuvsMG481',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:2024_Mahindra_Scorpio_Z8L_front.jpg',
  },
  'mahindra-thar': {
    author: 'DjDavid1998',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Mahindra_Thar_Photoshoot_at_Perupalem_Beach_(West_Godavari_District,_AP,_India)_Djdavid.jpg',
  },
  'tata-nexon': {
    author: 'Dairokkan9',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:2023_Tata_Nexon_XZA%2B_front_view.jpg',
  },
  'tata-harrier': {
    author: 'Autopareri',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Tata_Buzzard_sport_Frontale.jpg',
  },
  'tata-safari': {
    author: 'Alexander Migl',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Tata_Buzzard_Genf_2019_1Y7A5791.jpg',
  },
  'hyundai-creta': {
    author: 'CARS WORLD Kannada',
    license: 'CC BY 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:2024_Hyundai_Creta_1.5_MPi_SX(O)_(India)_front_view.png',
  },
  'kia-seltos': {
    author: 'Alexander Migl',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Kia_Seltos_(SP3)_IMG_7812.jpg',
  },
  'kia-sonet': {
    author: 'DriveSpark',
    license: 'CC BY 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:Kia_Sonet_front_view_(India)_01.png',
  },
  'maruti-brezza': {
    author: 'DriveSpark',
    license: 'CC BY 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:2022_Maruti_Suzuki_Brezza_ZXi%2B_(India)_front_view_03.png',
  },
  'maruti-dzire': {
    author: 'Ethan Llamas',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Suzuki_Dzire_1.2_GL%2B_2024.jpg',
  },
  'honda-city': {
    author: 'Dairokkan9',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:2022_Honda_City_ZX_i-VTEC_(India)_front_view.jpg',
  },
  'hyundai-verna': {
    author: 'Siddharth Antre',
    license: 'CC BY-SA 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:Hyundai_Verna_SX_Turbo_03.jpg',
  },
  'volkswagen-virtus': {
    author: 'Dairokkan9',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:2023_Volkswagen_Virtus_Topline_front_20230520.jpg',
  },
  'skoda-slavia': {
    author: 'Athira Murali',
    license: 'CC BY 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:2021_%C5%A0koda_Slavia_1.5_TSI_Style_(India)_front_view.png',
  },
  'maruti-swift': {
    author: 'Calreyn88',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:2024_Suzuki_Swift.jpg',
  },
  'maruti-baleno': {
    author: 'Milind Kwatra',
    license: 'CC BY 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:2022_Maruti_Suzuki_Baleno_Alpha_(India)_front_view.jpg',
  },
  'tata-tiago': {
    author: 'Dairokkan9',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:2022_Tata_Tiago_XZA%2B_front_20230512.jpg',
  },
  'hyundai-i20': {
    author: 'The Drivers Hub',
    license: 'CC BY 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:2020_Hyundai_i20_1.5_Asta_(O)_Diesel_(India)_front_view.png',
  },
  'toyota-glanza': {
    author: 'Agratsa',
    license: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Toyota_Glanza_(front).jpg',
  },
};
