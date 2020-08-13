import { ColaboratorStore } from '../../redux/store';
import { getToken } from '../../utils/auth';
import { colaboratorAction } from '../../redux/actions';
import api from '../../services/api';


class dColaborator {

    getAllColaborators() {
        async function get() {
            const getUrl = '/colaborator?token=' + getToken()
            const response = await api.get(getUrl)
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
            if (element.typeName !== "admin")
                temp.push({
                    key: element.id,
                    name: element.name,
                    type: element.typeName
                })
        });
        return temp
    }

}


export default dColaborator