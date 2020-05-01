import React from 'react'
import { GiClover, GiRunningNinja, GiRock, GiPuzzle, GiClockwork, GiBrain, GiBackwardTime, GiCrystalBall, GiHandBag, GiCruiser, GiSwimfins, GiSodaCan, GiWoodCanoe, GiAquarium, GiFilmSpool, GiRoundStar } from 'react-icons/gi';

const Achievements = {
  // Correctly Completing Quizzes
  quiz_completed_1: {
    title: 'Ungeschliffener Diamant',
    description: 'Beantworte ein Quiz richtig',
    icon: <GiRock />
  },
  quiz_completed_5: {
    title: 'Fleißiger Schüler',
    description: 'Beantworte 5 Quizzes richtig',
    icon: <GiHandBag />
  },
  quiz_completed_10: {
    title: 'Wahrsager',
    description: 'Beantworte 10 Quizzes richtig',
    icon: <GiCrystalBall />
  },
  quiz_completed_20: {
    title: 'Professor',
    description: 'Beantworte 20 Quizzes richtig',
    icon: <GiClover />
  },

  // Completing puzzles
  puzzle_completed_1: {
    title: 'Anfängerglück',
    description: 'Löse ein Puzzle',
    icon: <GiClover />
  },
  puzzle_completed_5: {
    title: 'Puzzle-Spieler',
    description: 'Löse fünf Puzzles',
    icon: <GiPuzzle />
  },
  puzzle_completed_10: {
    title: 'Puzzle-Profi',
    description: 'Löse zehn Puzzles',
    icon: <GiPuzzle />
  },
  puzzle_completed_20: {
    title: 'Puzzle-Meister',
    description: 'Löse 20 Puzzles',
    icon: <GiPuzzle />
  },

  // Solving Quizzes fast
  puzzle_solved_fast_60: {
    title: 'Auf die Uhr geschaut',
    description: 'Löse ein Puzzle in unter 60 Sekunden',
    icon: <GiClockwork />
  },
  puzzle_solved_fast_30: {
    title: 'Schnelldenker',
    description: 'Löse ein Puzzle in unter 30 Sekunden',
    icon: <GiBrain />
  },
  puzzle_solved_fast_10: {
    title: 'Puzzle-Ninja',
    description: 'Löse ein Puzzle in unter 10 Sekunden',
    icon: <GiRunningNinja />
  },
  puzzle_solved_fast_5: {
    title: 'Zeitreisender',
    description: 'Löse ein Puzzle in unter 5 Sekunden',
    icon: <GiBackwardTime />
  },

  // Correctly Completing Ocean Cleaner Game
  ocean_cleaner_completed_1: {
    title: 'Strand-Liebhaber',
    description: 'Entferne alle Plastikflaschen im Ozean',
    icon: <GiSodaCan />
  },
  ocean_cleaner_completed_5: {
    title: 'Taucher',
    description: 'Entferne fünf mal alle Plastikflaschen im Ozean',
    icon: <GiSwimfins />
  },
  ocean_cleaner_completed_10: {
    title: 'Ozean-Reiniger',
    description: 'Entferne zehn mal alle Plastikflaschen im Ozean',
    icon: <GiWoodCanoe />
  },
  ocean_cleaner_completed_20: {
    title: 'Professioneller Ozean-Reiniger',
    description: 'Entferne 20 mal alle Plastikflaschen im Ozean',
    icon: <GiCruiser />
  },

  // Completing memory with 5 stars
  memory_completed_1: {
    title: 'Goldfisch',
    description: 'Erhalte 5 Sterne im Memory-Spiel',
    icon: <GiAquarium />
  },
  memory_completed_5: {
    title: 'Star',
    description: 'Erhalte fünf mal 5 Sterne im Memory-Spiel',
    icon: <GiRoundStar />
  },
  memory_completed_10: {
    title: 'Fotografisches Gedächtnis',
    description: 'Erhalte zehn mal 5 Sterne im Memory-Spiel',
    icon: <GiFilmSpool />
  },
  memory_completed_20: {
    title: 'Genie',
    description: 'Erhalte 20 mal 5 Sterne im Memory-Spiel',
    icon: <GiBrain />
  },
}
export default Achievements;