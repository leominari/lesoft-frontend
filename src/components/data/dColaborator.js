import { ColaboratorStore } from '../../redux/store';
import { getToken } from '../../utils/auth';
import Axios from 'axios';
import { colaboratorAction } from '../../redux/actions';


class dColaborator {

    getAllColaborators() {
        async function get() {
            const getUrl = '/api/colaborator/getall' + getToken()
            const response = await Axios.get(getUrl)
            ColaboratorStore.dispatch({
                type: colaboratorAction.SET,
                colaborators: response.data
            })
        }
        get()
    }

    tableData(data) {
        const temp = []
        data.forEach(element => {
            temp.push({
                key: element.id,
                name: element.name,
                type: element.type
            })
        });
        return temp
    }

}


export default dColaborator