import { Overview, Freezer, Equipment, MakerSpace, Member, ShelfTable1 } from './components'
import { Speed, Kitchen, PeopleAltOutlined, Speaker, Build } from '@material-ui/icons'

export const pathList = [
  { title: "首頁", icon: <PeopleAltOutlined />, path: "/", template: "Location"},
  { title: "BL", icon: <Kitchen />, path: "/bl", template: "Location"}, 
  { title: "MakerSpace", icon: <Build />, path: "/bl/mks", template: "ShelfTable"}
]

export const locationData_Home = {
  title: "EZ Tidy",
  locationList: [
    { title: "冰箱", path: "/freezer", template: "ShelfTable"}, 
    { title: "MakerSpace", path: "/mks", template: "ShelfTable"}
  ],
  itemList: [],
  path: "/home",
  template: "Overview",
  discription: "cool"
};

export const locationData_Freezer = {
  title: "冰箱",
  locationList: [],
  itemList: [
    {id: 1, name: "牛奶", time: "2021-01-01", owner: "吳沛林", discription: "冰箱"},
    {id: 2, name: "蛋糕", time: "2021-01-12", owner: "羅才淵", discription: "冰箱"},
    {id: 3, name: "冰淇淋", time: "2021-01-13", owner: "吳沛林", discription: "冰箱"},
    {id: 4, name: "抹茶鮮奶", time: "2021-01-15", owner: "劉玉米", discription: "冰箱"},
    {id: 5, name: "茶裏王", time: "2021-01-15", owner: "劉玉米", discription: "冰箱"},
    {id: 6, name: "醬油", time: "2021-01-17", owner: "羅才淵", discription: "冰箱"}
  ],
  path: "/freezer",
  template: "ShelfTable",
  discription: "cool"
}
export const locationData_MKS = {
  title: "MakerSpace",
  locationList: [
    { title: "Place 1", path: "/mks/place1", template: "ShelfTable"},
    { title: "Place 2", path: "/mks/place2", template: "ShelfTable"},
    { title: "Place 3", path: "/mks/place3", template: "ShelfTable"}
  ],
  itemList: [],
  path: "/mks",
  template: "Location",
  discription: "cool"
}