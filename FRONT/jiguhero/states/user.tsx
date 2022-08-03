import { atom } from "recoil";




export const userAt = atom({
    key:"user",
    default:JSON.parse(localStorage.getItem('user'))
})
