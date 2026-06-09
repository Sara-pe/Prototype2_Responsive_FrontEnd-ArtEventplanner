import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const saveAtom = atomWithStorage('jwt-token', null)


export const isConnectedAtom = atom((get) => {
    const token = get(saveAtom);
     return token !== null && token !== undefined; 
}

)