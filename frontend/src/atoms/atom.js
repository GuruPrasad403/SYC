import { atom, selector } from 'recoil'


export const ChatAtoms = atom({
    key: 'ChatAtom',
    default: []

})

export const textAtom = atom({
    key: "textAtom",
    default: ''
});

export const textSeloctor = selector({
    key: "textSeloctor",
    get: ({get }) => {
        const value = get(textAtom)
        return value;
    }
})






export const ProfileUpdateAtmon = atom({
    key:"ProfileUpdateAtmon",
    default:[]
})