import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist()



export const missionLists = atom({
  key: "missionLists",
  default: 1
})


export const nowjoinlist = atom({
  key: "nowjoinlist",
  default: 1
})

export const tabpage = atom({
  key: "tabpage",
  default: true
})

export const searchText = atom({
  key: "searchText",
  default: "",
})
export const missionTabpage = atom({
  key: "missionTabpage",
  default: true
})

export const missionDetail = atom({
  key:"missionDetail",
  default: {},
  effects : [persistAtom]
})

export const nowJoinList = atom({
  key:"nowJoinList",
  default: [],
  effects : [persistAtom]
})

export const missionRegion = atom({
  key:"missionRegion",
  default: "",
  effects : [persistAtom]
})