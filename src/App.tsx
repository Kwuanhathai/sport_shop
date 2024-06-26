import UserLayout from "./components/layouts/user-layout/user-layout"
import SearchProduct from "./pages/user/search-product/search-product"
import ProductDetails from "./pages/user/product-details/product-details"
import AdminLayout from "./components/layouts/admin-layout/admin-layout"
import ProductList from "./pages/admin/product-list/product-list"
import AddProduct from "./pages/admin/add-product/add-product"
import EditProduct from "./pages/admin/edit-product/edit-product"
import SubAdminLayout from "./components/layouts/sub-admin-layout/sub-admin-layout"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/admin/login/login"
import ErrorPage from "./pages/error-page/error-page"
import { useGetData } from "./helper/use-axios"
import { LoadingOutlined } from "@ant-design/icons"
import { Typography } from "antd"


const { Text } = Typography
const url = "https://sport-shop-8.onrender.com/api/product-details"

function App() {
  const { data, loading, error } = useGetData(url)

  if (loading) {
    return <div 
      style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh'
      }}>
      <div>
        <LoadingOutlined style={{ fontSize: "10rem", fontWeight: "bold", color: "white", marginRight: "5%"}}/>
      </div>
      <div>
        <Text style={{fontSize: "3.2rem", fontWeight: "bold", color: "white"}}>Loading...</Text>
      </div>
    </div> 
  }

  if (error) {
    return <h1 style={{ color: "red" }}>{error}</h1>;
  }




return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout contentComponent={<SearchProduct data={data} />} />} />
        <Route path="product-details/:productID" element={<UserLayout contentComponent={<ProductDetails />} />} />
        <Route path="admin" element={<Login />} />
        <Route path="admin/product-list" element={<AdminLayout contentComponent={<ProductList data={data} />} />} />
        <Route path="admin/product-list/add" element={<SubAdminLayout contentComponent={<AddProduct />} />} />
        <Route path="admin/product-list/edit-product/:productID" element={<SubAdminLayout contentComponent={<EditProduct />} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </>
)
}

export default App
