/**
 * Calculates the relaxation level of a tea based on its characteristics.
 * @param {Object} teaParams - The parameters of the tea.
 * @param {string} teaParams.type - The type of tea (e.g., 'green', 'black', 'oolong', 'white', 'puerh', 'yellow', 'herbal').
 * @param {number} teaParams.caffeineLevel - The caffeine level (1-10).
 * @param {number} teaParams.lTheanineLevel - The L-theanine level (1-10).
 * @param {string} teaParams.aromaPrimary - The primary aroma of the tea.
 * @param {string} teaParams.processingMethod - The processing method of the tea.
 * @returns {number} The calculated relaxation level of the tea (1-10).
 */
function calculateTeaRelaxation(teaParams) {
  const { type, caffeineLevel, lTheanineLevel, aromaPrimary, processingMethod } = teaParams;
  
  let relaxationScore = 0;
  
  // Type influence
  switch (type.toLowerCase()) {
    case 'white':
      relaxationScore += 4;
      break;
    case 'green':
    case 'oolong':
      relaxationScore += 3;
      break;
    case 'puerh':
    case 'yellow':
      relaxationScore += 2;
      break;
    case 'black':
      relaxationScore += 1;
      break;
    case 'herbal':
      relaxationScore += 5;
      break;
  }
  
  // Caffeine influence (inverse relationship)
  relaxationScore += (11 - caffeineLevel);
  
  // L-theanine influence
  relaxationScore += lTheanineLevel;
  
  // Aroma influence
  const relaxingAromas = ['lavender', 'chamomile', 'vanilla', 'jasmine', 'rose'];
  const neutralAromas = ['grassy', 'nutty', 'woody', 'honey', 'fruity'];
  const stimulatingAromas = ['citrus', 'mint', 'cinnamon', 'ginger', 'bergamot'];

  if (relaxingAromas.includes(aromaPrimary.toLowerCase())) {
    relaxationScore += 3;
  } else if (neutralAromas.includes(aromaPrimary.toLowerCase())) {
    relaxationScore += 1.5;
  } else if (stimulatingAromas.includes(aromaPrimary.toLowerCase())) {
    relaxationScore += 0.5;
  } else {
    // For unlisted aromas, we add a neutral score
    relaxationScore += 1;
  }
  
  // Processing method influence
  switch (processingMethod.toLowerCase()) {
    case 'steamed':
    case 'shade-grown':
      relaxationScore += 2;
      break;
    case 'sun-dried':
    case 'withered':
      relaxationScore += 1.5;
      break;
    case 'oxidised':
    case 'roasted':
    case 'pan-fired':
      relaxationScore += 1;
      break;
    case 'fermented':
    case 'aged':
      relaxationScore += 0.5;
      break;
    case 'smoked':
    case 'bruised':
      // These methods don't typically contribute to relaxation
      break;
    case 'rolled':
    case 'cured':
    case 'blended':
      relaxationScore += 0.5;
      break;
    default:
      // For unlisted methods, we don't add any points
      break;
  }
  
  // Normalise the score to a 1-10 scale
  let finalScore = Math.round(relaxationScore);
  
  // Ensure the score is within the 1-10 range
  finalScore = Math.max(1, Math.min(10, finalScore));
  
  return finalScore;
}

// Usage examples:
const gyokuroRelaxation = calculateTeaRelaxation({
  type: 'green',
  caffeineLevel: 6,
  lTheanineLevel: 8,
  aromaPrimary: 'grassy',
  processingMethod: 'shade-grown'
});
console.log('Gyokuro relaxation level:', gyokuroRelaxation);

const earlGreyRelaxation = calculateTeaRelaxation({
  type: 'black',
  caffeineLevel: 7,
  lTheanineLevel: 3,
  aromaPrimary: 'bergamot',
  processingMethod: 'oxidised'
});
console.log('Earl Grey relaxation level:', earlGreyRelaxation);

const chamomileRelaxation = calculateTeaRelaxation({
  type: 'herbal',
  caffeineLevel: 1,
  lTheanineLevel: 1,
  aromaPrimary: 'chamomile',
  processingMethod: 'dried'
});
console.log('Chamomile relaxation level:', chamomileRelaxation);
