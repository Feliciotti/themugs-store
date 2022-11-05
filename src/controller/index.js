export {
    logup,
    logupForm,
    tokenConfirm
} from './logs/logup.controller.js';

export {
    login,
    logout,
    loginPost,
    loginError,
} from './logs/login.controller.js';

export {
    getUser,
    getProfile
} from './web/user.controller.js';

export {
    getCart,
    postCart,
    deleteCart,
    getCartProducts,
    delCartProducts,
    postCartProducts
} from './web/cart.controller.js';

export {
    getProduct,
    postProduct,
    putProduct,
    delProduct,
    getById
} from './web/products.controller.js';

export {
    getOrder,
    postOrder
} from './web/orders.controller.js';

export {
    renderChat
} from './web/chat.controller.js';