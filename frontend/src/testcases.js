import { Overview, Freezer, Equipment, MakerSpace, Member, ShelfTable1 } from './components'
import { Speed, Kitchen, PeopleAltOutlined, Speaker, Build } from '@material-ui/icons'

export const functionList = [
  {key: 1, title: "Overview", icon: <Speed />, path: "/overview", template: "Overview"}, 
  {key: 2, title: "冰箱", icon: <Kitchen />, path: "/freezer", template: "ShelfTable"}, 
  {key: 3, title: "器材", icon: <Speaker />, path: "/equipment", template: "ShelfTable"}, 
  {key: 4, title: "MakerSpace", icon: <Build />, path: "/mks", template: "ShelfTable"},
  {key: 5, title: "Member", icon: <PeopleAltOutlined />, path: "/member", template: "ShelfTable"},
  {key: 6, title: "Home", icon: <PeopleAltOutlined />, path: "/home", template: "Container"}
];

export const tmp_list = [
  {id: 1, item_name: "牛奶", store_time: "2021-01-01", owner: "吳沛林", location: "冰箱"},
  {id: 2, item_name: "蛋糕", store_time: "2021-01-12", owner: "羅才淵", location: "冰箱"},
  {id: 3, item_name: "冰淇淋", store_time: "2021-01-13", owner: "吳沛林", location: "冰箱"},
  {id: 4, item_name: "抹茶鮮奶", store_time: "2021-01-15", owner: "劉玉米", location: "冰箱"},
  {id: 5, item_name: "茶裏王", store_time: "2021-01-15", owner: "劉玉米", location: "冰箱"},
  {id: 6, item_name: "醬油", store_time: "2021-01-17", owner: "羅才淵", location: "冰箱"}
  ]
