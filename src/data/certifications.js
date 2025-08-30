import { Award, Building } from 'lucide-react'


const certifications = [
  {
    id: 'bac',
    name: 'Baccalauréat série C',
    institution: 'Lycée de Mimboman',
    year: '2020',
    location: 'Yaoundé, Cameroun',
    type: 'Diplôme national',
    description: 'Baccalauréat scientifique avec spécialisation en mathématiques et sciences physiques',
    icon: Award,
    color: 'from-blue-500 to-indigo-600',
    verified: true
  },
  {
    id: 'bepc',
    name: 'BEPC (Brevet d\'Études du Premier Cycle)',
    institution: 'Lycée d\'Elig Essono',
    year: '2017',
    location: 'Yaoundé, Cameroun',
    type: 'Diplôme national',
    description: 'Diplôme sanctionnant la fin du premier cycle de l\'enseignement secondaire',
    icon: Award,
    color: 'from-green-500 to-emerald-600',
    verified: true
  },
  {
    id: 'probatoire',
    name: 'Probatoire série C',
    institution: 'Collège Saint André',
    year: '2019',
    location: 'Yaoundé, Cameroun',
    type: 'Diplôme national',
    description: 'Diplôme d\'accès en classe de terminale, série scientifique',
    icon: Award,
    color: 'from-purple-500 to-violet-600',
    verified: true
  },
  {
    id: 'licence',
    name: 'Licence en Mathématiques fondamentales',
    institution: 'Université de Yaoundé I',
    year: '2023',
    location: 'Yaoundé, Cameroun',
    type: 'Diplôme universitaire',
    description: 'Formation approfondie en analyse mathématique, algèbre et géométrie',
    icon: Building,
    color: 'from-cyan-500 to-blue-600',
    verified: true
  },
  {
    id: 'msp',
    name: 'Validation MSP 1 & MSP 2',
    institution: 'École Nationale Supérieure Polytechnique',
    year: '2024',
    location: 'Yaoundé, Cameroun',
    type: 'Formation d\'ingénieur',
    description: 'Formation en génie civil - Mathématiques Spéciales Préparatoires',
    icon: Building,
    color: 'from-orange-500 to-red-600',
    verified: true
  },
  {
    id: 'cep',
    name: 'CEP (Certificat d\'Études Primaires)',
    institution: 'École publique d\'Essos',
    year: '2013',
    location: 'Yaoundé, Cameroun',
    type: 'Diplôme primaire',
    description: 'Certificat de fin d\'études primaires',
    icon: Award,
    color: 'from-teal-500 to-cyan-600',
    verified: true
  }
]

export default certifications;