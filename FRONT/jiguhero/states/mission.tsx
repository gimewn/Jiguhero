import { atom } from "recoil";



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