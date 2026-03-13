import { sampleContactAvatars } from '../assets/avatars'

function avatarIndexFromName(name: string) {
  const normalized = name.trim().toLowerCase() || 'contact'

  return (
    [...normalized].reduce((hash, char, index) => {
      return hash + char.charCodeAt(0) * (index + 1)
    }, 0) % sampleContactAvatars.length
  )
}

export function createProfileAvatarUrl(name: string) {
  if (sampleContactAvatars.length === 0) {
    return ''
  }

  return sampleContactAvatars[avatarIndexFromName(name)]
}
