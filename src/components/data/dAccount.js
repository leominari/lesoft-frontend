import Axios from 'axios';
import { getToken } from '../../utils/auth';
import { AccountStore } from '../../redux/store';
import { accountAction } from '../../redux/actions';


class dAccount {

    getAllAccounts() {
        async function get() {
            const getUrl = '/api/account/getall' + getToken()
            const response = await Axios.get(getUrl)
            AccountStore.dispatch({
                type: accountAction.SET,
                accounts: response.data
            })
        }
        get()
    }

}


export default dAccount