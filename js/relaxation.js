/**
 * Calcule le niveau de relaxation d'un thé basé sur ses caractéristiques.
 * @param {Object} teaParams - Les paramètres du thé.
 * @param {string} teaParams.type - Le type de thé (ex: 'green', 'black', 'oolong', 'white', 'puerh').
 * @param {number} teaParams.caffeineLevel - Le niveau de caféine (1-10).
 * @param {number} teaParams.lTheanineLevel - Le niveau de L-théanine (1-10).
 * @param {string} teaParams.aromaPrimary - L'arôme principal du thé.
 * @param {number} teaParams.brewingTemp - La température d'infusion en Celsius.
 * @returns {number} Le niveau de relaxation calculé du thé (1-10).
 */
function calculateTeaRelaxation(teaParams) {
  const { type, caffeineLevel, lTheanineLevel, aromaPrimary, brewingTemp } = teaParams;
  
  let relaxationScore = 0;
  
  // Influence du type
  switch (type.toLowerCase()) {
    case 'white':
      relaxationScore += 4;
      break;
    case 'green':
    case 'oolong':
      relaxationScore += 2;
      break;
    case 'puerh':
      relaxationScore += 1;
      break;
    // Le thé noir n'ajoute pas au score de relaxation
  }
  
  // Influence de la caféine (relation inverse)
  relaxationScore += (11 - caffeineLevel);
  
  // Influence de la L-théanine
  relaxationScore += lTheanineLevel;
  
  // Influence de l'arôme (version étendue)
  const relaxingAromas = ['lavender', 'chamomile', 'vanilla', 'jasmine', 'rose'];
  const neutralAromas = ['fruity', 'grassy', 'nutty', 'woody', 'honey'];
  const stimulatingAromas = ['citrus', 'mint', 'spicy', 'smoky', 'roasted'];

  if (relaxingAromas.includes(aromaPrimary.toLowerCase())) {
    relaxationScore += 2.5;
  } else if (neutralAromas.includes(aromaPrimary.toLowerCase())) {
    relaxationScore += 1.5;
  } else if (stimulatingAromas.includes(aromaPrimary.toLowerCase())) {
    relaxationScore += 0.5;
  } else {
    // Pour les arômes non listés, on ajoute un score neutre
    relaxationScore += 1;
  }
  
  // Influence de la température d'infusion
  if (brewingTemp < 70) {
    relaxationScore += 2;
  } else if (brewingTemp < 80) {
    relaxationScore += 1.5;
  } else if (brewingTemp < 90) {
    relaxationScore += 1;
  }
  
  // Normaliser le score sur une échelle de 1-10
  let finalScore = Math.round(relaxationScore / 3 * 2);
  
  // S'assurer que le score est dans la plage 1-10
  finalScore = Math.max(1, Math.min(10, finalScore));
  
  return finalScore;
}

// Exemples d'utilisation :
const gyokuroRelaxation = calculateTeaRelaxation({
  type: 'green',
  caffeineLevel: 6,
  lTheanineLevel: 8,
  aromaPrimary: 'grassy',
  brewingTemp: 60
});
console.log('Niveau de relaxation du Gyokuro:', gyokuroRelaxation);

const jasminePearlRelaxation = calculateTeaRelaxation({
  type: 'green',
  caffeineLevel: 5,
  lTheanineLevel: 7,
  aromaPrimary: 'jasmine',
  brewingTemp: 80
});
console.log('Niveau de relaxation du Thé au Jasmin:', jasminePearlRelaxation);

const lapsangSouchongRelaxation = calculateTeaRelaxation({
  type: 'black',
  caffeineLevel: 8,
  lTheanineLevel: 4,
  aromaPrimary: 'smoky',
  brewingTemp: 95
});
console.log('Niveau de relaxation du Lapsang Souchong:', lapsangSouchongRelaxation);
