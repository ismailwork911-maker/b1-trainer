/**
 * Audio file mapping for the Hören module.
 * Maps examId → teil → array of audio file paths (played sequentially).
 * Files live in public/audio/ and are served at BASE_URL/audio/...
 */

function audioPath(filename: string): string {
  return `${import.meta.env.BASE_URL}audio/${filename}`;
}

/** Build Teil 1 file list: [Beispiel, Nr1..Nr5] */
function teil1Files(examId: number, startTrack: number, hasAnsage: boolean): string[] {
  const prefix = `SgnbzB1_Modelltest${examId}_HoerenTeil1`;
  const files: string[] = [];
  if (hasAnsage && examId === 1) {
    // Exam 1 has an Ansage with uppercase SG and a space before track number
    files.push(audioPath(`SGnbzB1_Modelltest1_HoerenTeil1_Ansage_ 02.mp3`));
  }
  const pad = (n: number) => String(n).padStart(2, '0');
  files.push(audioPath(`${prefix}_Beispiel_${pad(startTrack)}.mp3`));
  for (let i = 1; i <= 5; i++) {
    files.push(audioPath(`${prefix}_Nr${i}_${pad(startTrack + i)}.mp3`));
  }
  return files;
}

interface AudioFileMap {
  [teil: number]: string[];
}

function buildExam1(): AudioFileMap {
  return {
    1: teil1Files(1, 3, true),
    2: [
      audioPath('SgnbzB1_Modelltest1_HoerenTeil2_Ansage_09.mp3'),
      audioPath('SgnbzB1_Modelltest1_HoerenTeil2_RundgangUni_10.mp3'),
    ],
    3: [
      audioPath('SgnbzB1_Modelltest1_HoerenTeil3_Ansage_11.mp3'),
      audioPath('SgnbzB1_Modelltest1_HoerenTeil3_Gespraech_12.mp3'),
    ],
    4: [
      audioPath('SgnbzB1_Modelltest1_HoerenTeil4_Ansage_13.mp3'),
      audioPath('SgnbzB1_Modelltest1_HoerenTeil4_Diskussionsrunde_14.mp3'),
    ],
  };
}

// Exams 2–10: no separate Ansage files
const teil2Names: Record<number, string> = {
  2: 'Burgfuehrung',
  3: 'Fuehrung',
  4: 'Fremdenfuehrung',
  5: 'Fuehrung',
  6: 'Wohnungsfuehrung',
  7: 'Bordansage',
  8: 'Heiratsantrag',
  9: 'Fuehrung',
  10: 'Fernuni',
};

const teil3Names: Record<number, string> = {
  2: 'Reprotage',
  3: 'Aerztegespraech',
  4: 'Gespraech',
  5: 'Interview',
  6: 'Gespraech',
  7: 'Gespraech',
  8: 'Gespraech',
  9: 'Gespraech',
  10: 'Gespraech',
};

const teil4Names: Record<number, string> = {
  2: 'Diskussionrunde',
  3: 'Diskussionsrunde',
  4: 'Diskussionsrunde',
  5: 'Diskussionsrunde',
  6: 'Diskussionsrunde',
  7: 'Diskussionsrunde',
  8: 'Diskussionsrunde',
  9: 'Diskussionsrunde',
  10: 'Diskussionsrunde',
};

// Starting track numbers for Beispiel of each exam's Teil 1
const teil1StartTrack: Record<number, number> = {
  2: 15, 3: 24, 4: 33, 5: 42, 6: 51, 7: 60, 8: 69, 9: 78, 10: 87,
};
const teil2Tracks: Record<number, number> = {
  2: 21, 3: 30, 4: 39, 5: 48, 6: 57, 7: 66, 8: 75, 9: 84, 10: 93,
};
const teil3Tracks: Record<number, number> = {
  2: 22, 3: 31, 4: 40, 5: 49, 6: 58, 7: 67, 8: 76, 9: 85, 10: 94,
};
const teil4Tracks: Record<number, number> = {
  2: 23, 3: 32, 4: 41, 5: 50, 6: 59, 7: 68, 8: 77, 9: 86, 10: 95,
};

function buildExam(examId: number): AudioFileMap {
  const pad = (n: number) => String(n).padStart(2, '0');
  const prefix = `SgnbzB1_Modelltest${examId}`;
  return {
    1: teil1Files(examId, teil1StartTrack[examId], false),
    2: [audioPath(`${prefix}_HoerenTeil2_${teil2Names[examId]}_${pad(teil2Tracks[examId])}.mp3`)],
    3: [audioPath(`${prefix}_HoerenTeil3_${teil3Names[examId]}_${pad(teil3Tracks[examId])}.mp3`)],
    4: [audioPath(`${prefix}_HoerenTeil4_${teil4Names[examId]}_${pad(teil4Tracks[examId])}.mp3`)],
  };
}

export function getAudioMap(examId: number): AudioFileMap {
  if (examId === 1) return buildExam1();
  return buildExam(examId);
}
