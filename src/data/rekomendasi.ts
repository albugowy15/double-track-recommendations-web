interface Rekomendasi {
  method: string;
  description: string;
  data: {
    ranking: number;
    skill: string;
    score: number;
    details: string;
  }[];
}

export const recommendations: Rekomendasi[] = [
  {
    method: 'AHP',
    description:
      'Berikut hasil rekomendasi keterampilan yang sesuai untuk Anda dengan metode AHP',
    data: [
      {
        ranking: 1,
        skill: 'Tata Busana',
        score: 0.5,
        details: 'Busana, fashion, dan tata rias',
      },
      {
        ranking: 2,
        skill: 'Multimedia',
        score: 0.3,
        details: 'Desaing grafis, animasi, dan video editing',
      },
    ],
  },
  {
    method: 'TOPSIS',
    description:
      'Berikut hasil rekomendasi keterampilan yang sesuai untuk Anda dengan metode TOPSIS',
    data: [
      {
        ranking: 1,
        skill: 'Tata Busana',
        score: 0.5,
        details: 'Busana, fashion, dan tata rias',
      },
      {
        ranking: 2,
        skill: 'Multimedia',
        score: 0.3,
        details: 'Desaing grafis, animasi, dan video editing',
      },
    ],
  },
];
