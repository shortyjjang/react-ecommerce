import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layouts from './components/Layouts';
import createStoreWithMiddleware from './utils/store';
import { CookiesProvider } from 'react-cookie';

import Login from './views/member/Login';
import Brand from './views/shopinfo/Brand';
import Wesave from './views/shopinfo/Wesave';
import SaveEarth from './views/shopinfo/SaveEarth';
import RecipeView from './views/recipe/RecipeView';
import RecipeList from './views/recipe/RecipeList';
import ProductList from './views/shop/ProductList';
import ProductView from './views/shop/ProductView';
import MyHome from './views/mypage/MyHome';
import Notice from './views/board/Notice';
import NoticeView from './views/board/NoticeView';
import Review from './views/board/Review';
import ReviewView from './views/board/ReviewView';
import Faq from './views/board/Faq';
import Guide from './views/etc/Guide';
import Agreement from './views/etc/Agreement';
import Privacy from './views/etc/Privacy';
import Contact from './views/etc/Contact';
import QnA from './views/board/QnA';
import QnAWrite from './views/board/QnAWrite';
import QnAView from './views/board/QnAView';
import FindID from './views/member/FindID';
import FindPw from './views/member/FindPw';
import Join from './views/member/Join';
import OrderForm from './views/order/OrderForm';
import OrderLogin from './views/order/OrderLogin';
import Cart from './views/order/Cart';
import OrderDetail from './views/order/OrderDetail';
import OrderList from './views/order/OrderList';
import ReviewWrite from './views/board/ReviewWrite';
import Subscribed from './views/mypage/Subscribed';
import SubscribedDetail from './views/mypage/SubscribedDetail';
import Coupon from './views/mypage/Coupon';
import AddressList from './views/mypage/AddressList';
import Mileage from './views/mypage/Mileage';
import Wishlist from './views/mypage/Wishlist';
import MyRecipe from './views/mypage/MyRecipe';
import NotFound from './views/etc/NotFound';
import Logout from './views/member/Logout';
import OrderResult from './views/order/OrderResult';
import AdUsbox from './views/event/AdUsbox';
import PopBanner from './components/PopBanner';
import GuGuBox from './views/event/GuGuBox';
import HomeMobile from './views/HomeMobile';
import Usbox from './views/shop/Usbox';
import Subscription from './views/shop/Subscription';
import UsBoxGuide from './views/etc/UsBoxGuide';
import Esg from './views/etc/Esg';

const YesUsApp = () => {
  return (
    <Provider store={createStoreWithMiddleware}>
      <CookiesProvider>
        <BrowserRouter>
          <Layouts>
            <Routes>
              <Route path="/" element={<HomeMobile auth={null} />} />
              <Route path="/login" element={<Login auth={false} />} />
              <Route path="/logout" element={<Logout auth={true} />} />
              <Route path="/shopinfo/brand" element={<Brand auth={null} />} />
              <Route path="/wesave" element={<Wesave auth={null} />} />
              <Route path="/recipe/all" element={<RecipeList auth={null} />} />
              <Route path="/recipe/:id" element={<RecipeView auth={null} />} />
              <Route path="/products/:id" element={<ProductList auth={null} />} />
              <Route path="/usbox" element={<Usbox auth={null} />} />
              <Route path="/usbox/subscribe" element={<Subscription auth={null} />} />
              <Route path="/usbox/guide" element={<UsBoxGuide auth={null} />} />
              <Route path="/partner" element={<Esg auth={null} />} />
              <Route
                path="/product/:id"
                element={<ProductView auth={null} />}
              />
              <Route path="/product/usbox" element={<AdUsbox auth={null} />} />
              <Route path="/product/99box" element={<GuGuBox auth={null} />} />
              <Route path="/save_earth" element={<SaveEarth auth={null} />} />
              <Route path="/notice" element={<Notice auth={null} />} />
              <Route path="/notice/:id" element={<NoticeView auth={null} />} />
              <Route path="/review" element={<Review auth={null} />} />
              <Route path="/review/:id" element={<ReviewView auth={null} />} />
              <Route
                path="/review/write"
                element={<ReviewWrite auth={null} />}
              />
              <Route path="/faq" element={<Faq auth={null} />} />
              <Route path="/guide" element={<Guide auth={null} />} />
              <Route path="/agreement" element={<Agreement auth={null} />} />
              <Route path="/privacy" element={<Privacy auth={null} />} />
              <Route path="/contact" element={<Contact auth={null} />} />
              <Route path="/qna" element={<QnA auth={null} />} />
              <Route path="/qna/write" element={<QnAWrite auth={true} />} />
              <Route path="/qna/:id" element={<QnAView auth={true} />} />
              <Route path="/member/find_id" element={<FindID auth={false} />} />
              <Route
                path="/member/find_passwd_info"
                element={<FindPw auth={false} />}
              />
              <Route path="/member/join" element={<Join auth={false} />} />
              <Route path="/member/modify" element={<Join auth={true} />} />
              <Route path="/myshop" element={<MyHome auth={true} />} />
              <Route
                path="/myshop/subscribe"
                element={<Subscribed auth={true} />}
              />
              <Route
                path="/myshop/subscribe/:id"
                element={<SubscribedDetail auth={true} />}
              />
              <Route path="/myshop/coupon" element={<Coupon auth={true} />} />
              <Route
                path="/myshop/address"
                element={<AddressList auth={true} />}
              />
              <Route
                path="/myshop/wishlist"
                element={<Wishlist auth={true} />}
              />
              <Route path="/myshop/mileage" element={<Mileage auth={true} />} />
              <Route path="/myshop/recipe" element={<MyRecipe auth={true} />} />
              <Route
                path="/order/orderform"
                element={<OrderForm auth={null} />}
              />
              <Route
                path="/order/order_login"
                element={<OrderLogin auth={false} />}
              />
              <Route
                path="/order/order_result/:id"
                element={<OrderResult auth={null} />}
              />
              <Route path="/order/basket" element={<Cart auth={null} />} />
              <Route path="/order/cancel/:id" element={<Cart auth={null} />} />
              <Route
                path="/order/detail/:id"
                element={<OrderDetail auth={null} />}
              />
              <Route path="/order/list" element={<OrderList auth={null} />} />
              <Route path="*" element={<NotFound auth={null} />} />
              <Route
                path="/banner"
                element={<PopBanner auth={null} copy={null} />}
              />
            </Routes>
          </Layouts>
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
};

export default YesUsApp;
