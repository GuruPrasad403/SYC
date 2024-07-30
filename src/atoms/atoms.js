import { atom, selector } from 'recoil'


export const ChatAtoms = atom({
    key: 'ChatAtom',
    default: [{
            id: 1,
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJIwASCJpICHRbFDOQXQ2S-pmikc8vs6K2GA&s",
            message: "This is an example one",
            name: "Chandu",
            time: "2:55 PM"
        },
        {
            id: 2,
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJIwASCJpICHRbFDOQXQ2S-pmikc8vs6K2GA&s",
            message: "This is an example two",
            name: "Chandu",
            time: "2:56 PM"
        }
    ]
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