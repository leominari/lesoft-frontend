import { getToken } from '../../utils/auth';
import { AccountStore } from '../../redux/store';
import { accountAction } from '../../redux/actions';
import api from '../../services/api';


class dAccount {

    getAllAccounts() {
        async function get() {
            const getUrl = '/account?token=' + getToken()
            const response = await api.get(getUrl)
            AccountStore.dispatch({
                type: accountAction.SET,
                accounts: response.data
            })
        }
        get()
    }

}


export default dAccount