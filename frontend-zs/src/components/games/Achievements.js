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
    title: 'Beach cleaner',
    description: 'Remove all plastic bottles in the ocean.',
    icon: <GiSodaCan />
  },
  ocean_cleaner_completed_5: {
    title: 'Scuba diver',
    description: 'Remove all plastic bottles in the ocean 5 times.',
    icon: <GiSwimfins />
  },
  ocean_cleaner_completed_10: {
    title: 'Sea cleaner',
    description: 'Remove all plastic bottles in the ocean 10 times.',
    icon: <GiWoodCanoe />
  },
  ocean_cleaner_completed_20: {
    title: 'Professional ocean cleaner',
    description: 'Remove all plastic bottles in the ocean 20 times.',
    icon: <GiCruiser />
  },

  // Completing memory with 5 stars
  memory_completed_1: {
    title: 'Goldfish',
    description: 'Get 5 stars in memory.',
    icon: <GiAquarium />
  },
  memory_completed_5: {
    title: 'Star',
    description: 'Get 5 stars in memory 5 times.',
    icon: <GiRoundStar />
  },
  memory_completed_10: {
    title: 'Photographic memory',
    description: 'Get 5 stars in memory 10 times.',
    icon: <GiFilmSpool />
  },
  memory_completed_20: {
    title: 'The Brain',
    description: 'Get 5 stars in memory 20 times.',
    icon: <GiBrain />
  },
}
export default Achievements;