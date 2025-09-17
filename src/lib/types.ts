export type Mood = 'Ecstatic' | 'Happy' | 'Neutral' | 'Sad' | 'Anxious' | null;

export type Hormone = 'cortisol' | 'melatonin' | 'dopamine' | 'serotonin';

export type HormoneLevels = {
  [key in Hormone]: number;
};
