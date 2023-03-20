import { combineReducers } from 'redux';
import user from './user_reducer';
import product from './product_reducer';
import shop from './shop_reducer';

const rootReducer = combineReducers({
    product: product,
    shop: shop,
    user: user,
});

export default rootReducer;


