import { Overview, Freezer, Equipment, MakerSpace, Member, ShelfTable1 } from './components'
import { Speed, Kitchen, PeopleAltOutlined, Speaker, Build } from '@material-ui/icons'

export const functionList = {
  title: "EZ Tidy",
  locationlist: [
    { title: "Overview", icon: <Speed />, path: "/overview", template: "Overview"}, 
    { title: "冰箱", icon: <Kitchen />, path: "/freezer", template: "ShelfTable"}, 
    { title: "器材", icon: <Speaker />, path: "/equipment", template: "ShelfTable"}, 
    { title: "MakerSpace", icon: <Build />, path: "/mks", template: "ShelfTable"},
    { title: "Member", icon: <PeopleAltOutlined />, path: "/member", template: "ShelfTable"},
    { title: "Home", icon: <PeopleAltOutlined />, path: "/home", template: "Location"}
  ],
  path: "/",
  template: "Overview"
};

export const tmp_list = [
  {id: 1, item_name: "牛奶", store_time: "2021-01-01", owner: "吳沛林", location: "冰箱"},
  {id: 2, item_name: "蛋糕", store_time: "2021-01-12", owner: "羅才淵", location: "冰箱"},
  {id: 3, item_name: "冰淇淋", store_time: "2021-01-13", owner: "吳沛林", location: "冰箱"},
  {id: 4, item_name: "抹茶鮮奶", store_time: "2021-01-15", owner: "劉玉米", location: "冰箱"},
  {id: 5, item_name: "茶裏王", store_time: "2021-01-15", owner: "劉玉米", location: "冰箱"},
  {id: 6, item_name: "醬油", store_time: "2021-01-17", owner: "羅才淵", location: "冰箱"}
  ]

export const tmp_location = {
  title: "MakerSpace",
  locationlist: [
    { title: "Place 1", path: "/place1", template: "ShelfTable"},
    { title: "Place 2", path: "/place2", template: "ShelfTable"},
    { title: "Place 3", path: "/place3", template: "ShelfTable"}
  ],
  path: "/mks",
  template: "Location",

}