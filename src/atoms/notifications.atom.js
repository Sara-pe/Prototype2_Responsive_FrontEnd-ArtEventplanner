import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const NotificationAtom = atomWithStorage('notifications', 0)