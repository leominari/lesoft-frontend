import { getToken } from '../../utils/auth';
import Axios from 'axios';
import { ProductStore } from '../../redux/store';
import { productAction } from '../../redux/actions';


class dProduct {

    getAllProducts() {
        async function get() {
            const getUrl = '/api/product/getall' + getToken()
            const response = await Axios.get(getUrl)
            ProductStore.dispatch({
                type: productAction.SET,
                products: response.data
            })
        }
        get()
    }

}


export default dProduct