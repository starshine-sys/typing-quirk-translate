const spaces = / +/gi
const enderReplacements = [
  ['⏃', 'a'],
  ['⏚', 'b'],
  ['☊', 'c'],
  ['⎅', 'd'],
  ['⟒', 'e'],
  ['⎎', 'f'],
  ['☌', 'g'],
  ['⊑', 'h'],
  ['⟟', 'i'],
  ['⟊', 'j'],
  ['☍', 'k'],
  ['⌰', 'l'],
  ['⋔', 'm'],
  ['⋏', 'n'],
  ['⍜', 'o'],
  ['⌿', 'p'],
  ['⍾', 'q'],
  ['⍀', 'r'],
  ['⌇', 's'],
  ['⏁', 't'],
  ['⎍', 'u'],
  ['⎐', 'v'],
  ['⍙', 'w'],
  ['⌖', 'x'],
  ['⊬', 'y'],
  ['⋉', 'z'],
]

export function translateEnder(content: string): string {
  let s = content.toLowerCase()
  enderReplacements.forEach((entry) => {
    s = s.replaceAll(entry[0], entry[1])
  })
  return s.replaceAll(spaces, ' ')
}
