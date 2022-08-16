import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist()

export const UserName = atom({
    key:"username",
    default:'',

})
export const UserImg = atom({
    key:"userImg",
    default:'',

})
export const UserId = atom({
    key:"userId",
    default:'',
    effects_UNSTABLE : [persistAtom]
})

