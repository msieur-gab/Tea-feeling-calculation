/**
 * Calculates the mood associated with a tea based on its characteristics.
 * @param {Object} teaParams - The parameters of the tea.
 * @param {string} teaParams.type - The type of tea (e.g., 'green', 'black', 'oolong', 'white', 'puerh', 'yellow', 'herbal').
 * @param {number} teaParams.caffeineLevel - The caffeine level (1-10).
 * @param {number} teaParams.lTheanineLevel - The L-theanine level (1-10).
 * @param {string} teaParams.aromaPrimary - The primary aroma of the tea.
 * @param {string} teaParams.processingMethod - The processing method of the tea.
 * @returns {string} The calculated mood of the tea.
 */
function calculateTeaMood(teaParams) {
  const { type, caffeineLevel, lTheanineLevel, aromaPrimary, processingMethod } = teaParams;
  
  let energyScore = 0;
  let calmScore = 0;
  let refreshScore = 0;
  let comfortScore = 0;
  
  // Type influence
  switch (type.toLowerCase()) {
    case 'green':
      refreshScore += 4;
      break;
    case 'black':
      energyScore += 4;
      break;
    case 'oolong':
      calmScore += 2;
      refreshScore += 2;
      break;
    case 'white':
      calmScore += 4;
      break;
    case 'puerh':
      comfortScore += 4;
      break;
    case 'yellow':
      refreshScore += 3;
      calmScore += 1;
      break;
    case 'herbal':
      calmScore += 3;
      comfortScore += 1;
      break;
  }
  
  // Caffeine and L-theanine influence
  energyScore += caffeineLevel;
  calmScore += (11 - caffeineLevel);
  calmScore += lTheanineLevel;
  
  // Aroma influence
  const energisingAromas = ['citrus', 'mint', 'ginger', 'cinnamon', 'bergamot'];
  const calmingAromas = ['lavender', 'chamomile', 'vanilla', 'jasmine', 'rose'];
  const refreshingAromas = ['lemongrass', 'peppermint', 'eucalyptus', 'green apple', 'cucumber'];
  const comfortingAromas = ['caramel', 'cocoa', 'almond', 'hazelnut', 'maple'];

  if (energisingAromas.includes(aromaPrimary.toLowerCase())) {
    energyScore += 3;
  } else if (calmingAromas.includes(aromaPrimary.toLowerCase())) {
    calmScore += 3;
  } else if (refreshingAromas.includes(aromaPrimary.toLowerCase())) {
    refreshScore += 3;
  } else if (comfortingAromas.includes(aromaPrimary.toLowerCase())) {
    comfortScore += 3;
  } else {
    energyScore += 0.75;
    calmScore += 0.75;
    refreshScore += 0.75;
    comfortScore += 0.75;
  }
  
  // Processing method influence
  switch (processingMethod.toLowerCase()) {
    case 'steamed':
      refreshScore += 2;
      break;
    case 'pan-fired':
      energyScore += 2;
      break;
    case 'oxidised':
      comfortScore += 2;
      break;
    case 'roasted':
      comfortScore += 3;
      break;
    case 'withered':
      calmScore += 2;
      break;
    case 'fermented':
      comfortScore += 3;
      break;
    case 'sun-dried':
      refreshScore += 2;
      break;
    case 'shade-grown':
      calmScore += 3;
      break;
    case 'smoked':
      energyScore += 2;
      comfortScore += 1;
      break;
    case 'bruised':
      refreshScore += 1;
      energyScore += 1;
      break;
    case 'rolled':
      refreshScore += 1;
      calmScore += 1;
      break;
    case 'cured':
      comfortScore += 2;
      break;
    case 'aged':
      comfortScore += 3;
      calmScore += 1;
      break;
    case 'blended':
      // Blended teas can vary, so we add a bit to each score
      energyScore += 1;
      calmScore += 1;
      refreshScore += 1;
      comfortScore += 1;
      break;
    default:
      // For unlisted methods, we don't add any points
      break;
  }
  
  // Determine the primary mood
  const scores = [
    { mood: 'Energising & Uplifting', score: energyScore },
    { mood: 'Calm & Focused', score: calmScore },
    { mood: 'Serene & Refreshing', score: refreshScore },
    { mood: 'Cosy & Comforting', score: comfortScore }
  ];
  
  scores.sort((a, b) => b.score - a.score);
  
  if (scores[0].score > scores[1].score + 2) {
    return scores[0].mood;
  }
  
  return `${scores[0].mood} with notes of ${scores[1].mood.toLowerCase()}`;
}

// Usage examples:
const gyokuroMood = calculateTeaMood({
  type: 'green',
  caffeineLevel: 6,
  lTheanineLevel: 8,
  aromaPrimary: 'grassy',
  processingMethod: 'shade-grown'
});
console.log('Gyokuro mood:', gyokuroMood);

const lapsangSouchongMood = calculateTeaMood({
  type: 'black',
  caffeineLevel: 7,
  lTheanineLevel: 3,
  aromaPrimary: 'smoky',
  processingMethod: 'smoked'
});
console.log('Lapsang Souchong mood:', lapsangSouchongMood);

const puerhMood = calculateTeaMood({
  type: 'puerh',
  caffeineLevel: 5,
  lTheanineLevel: 4,
  aromaPrimary: 'earthy',
  processingMethod: 'fermented'
});
console.log('Pu-erh mood:', puerhMood);
