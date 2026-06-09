import {atom} from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const nameAtom = atomWithStorage('user-name', null)
