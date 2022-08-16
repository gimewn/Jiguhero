import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist()

export const groundDetail = atom({
    key:"groundDetail",
    default: {},
    effects : [persistAtom]
  })

export const groundPlaceList = atom({
    key:"groundPlaceList",
    default: [],
    effects : [persistAtom]
  })

  
export const myGroundList = atom({
  key:"myGroundList",
  default: [],
  effects : [persistAtom]
})

export const isLikeGround  = atom({
  key:"isLikeGround",
  default: [],
  effects : [persistAtom]
})

