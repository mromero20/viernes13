export type Phase = 'closed' | 'opening' | 'rising' | 'revealing' | 'revealed' | 'closing' | 'completed'

export type ExperienceState = Readonly<{ index: number; phase: Phase }>
export type ExperienceAction = Readonly<{
  type: 'OPEN' | 'FLAP_OPENED' | 'LETTER_LIFTED' | 'TEXT_REVEALED' | 'CONTINUE' | 'EXITED'
  index: number
  instant?: boolean
}>

export const initialExperience: ExperienceState = { index: 0, phase: 'closed' }

/** Los eventos tardíos y los clics repetidos nunca pertenecen al siguiente sobre. */
export function transitionExperience(
  state: ExperienceState,
  action: ExperienceAction,
  total: number,
): ExperienceState {
  if (action.index !== state.index || state.phase === 'completed') return state

  const advance = (): ExperienceState => state.index + 1 === total
    ? { ...state, phase: 'completed' }
    : { index: state.index + 1, phase: 'closed' }

  switch (action.type) {
    case 'OPEN':
      return state.phase === 'closed' ? { ...state, phase: action.instant ? 'revealed' : 'opening' } : state
    case 'FLAP_OPENED':
      return state.phase === 'opening' ? { ...state, phase: 'rising' } : state
    case 'LETTER_LIFTED':
      return state.phase === 'rising' ? { ...state, phase: 'revealing' } : state
    case 'TEXT_REVEALED':
      return state.phase === 'revealing' ? { ...state, phase: 'revealed' } : state
    case 'CONTINUE':
      return state.phase === 'revealed' ? (action.instant ? advance() : { ...state, phase: 'closing' }) : state
    case 'EXITED':
      return state.phase === 'closing' ? advance() : state
  }
}
