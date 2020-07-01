import { getToken } from '../../utils/auth';
import { ProductStore } from '../../redux/store';
import { productAction } from '../../redux/actions';
import api from '../../services/api';


class dProduct {

    getAllProducts() {
        async function get() {
            const getUrl = '/product?token=' + getToken()
            const response = await api.get(getUrl)
            ProductStore.dispatch({
                type: productAction.SET,
                products: response.data
            })
        }
        get()
    }

}


export default dProduct