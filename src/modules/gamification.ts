const BASE_EXPERIENCE = 20

const EXPERIENCE_FACTOR = 1.3

export function calculateExperienceForNextLevel(level: number) {
  let total = 0

  for (let i = 1; i <= level; i++) {
    total += Math.floor(BASE_EXPERIENCE * EXPERIENCE_FACTOR ** i - 1)
  }

  return total
}

export function calculateLevelFromExperience(experience: number) {
  let level = 1

  for (let n = 1; n <= 100; n++) {
    const threshold = calculateExperienceForNextLevel(n)

    if (experience >= threshold) {
      level = n + 1
    } else break
  }

  return level
}
