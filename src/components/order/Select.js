import React, { useState } from 'react'
import { Select } from 'antd'
import { ColaboratorStore, ProductStore } from '../../redux/store';



    /*
     * COLABORADOR TYPE ID
     * 0 = SALESMAN
     * 1 = CLIENT
     */
export function ColaboratorSelect(params) {
    const { Option } = Select;
    const [colaboratorOptions, setColaboratorOptions] = useState([])
    let optionRows = []
    const typeCode = params.type
    const typeName = selectType()

    function selectType(){
        switch (typeCode) {
            //salesman
            case 0:
                return "Vendedor"
            //client
            case 1:
                return "Cliente"

            default:
                return "erro"
        }
    }

    function onChange(value) {
        switch (typeCode) {
            case 0:
                params.form.idSalesman = value
                break;
            case 1:
                params.form.idClient = value
                break;
            default:
                break;
        }
    }

    async function rowS() {
        const colaborators = ColaboratorStore.getState()
        for (let i = 0; i < colaborators.length; i++) {
            optionRows.push(<Option key={colaborators[i].id}>{colaborators[i].name}</Option>)
        }
        setColaboratorOptions(optionRows)
    }

    React.useEffect(() => {
        rowS()

    }, [])


    return (

        <Select
            showSearch
            style={{ width: 200 }}
            placeholder={"Selecione um " + typeName}
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {colaboratorOptions}
        </Select>
    )
}


export function ProductSelect(params) {
    const { Option } = Select;
    const [productsOptions, setProductsOptions] = useState([])
    const data = ProductStore.getState()
    let optionRows = []

    function onChange(value) {
        params.form.productId = data[value].id;
        params.form.productName = data[value].name
        params.form.productUnity = data[value].unity
        params.form.productDefaultPrice = data[value].price
    }

    function rowS() {
        let key = 0
        data.forEach(element => {
            optionRows.push(<Option key={key}>{element.name}</Option>)
            key++
        });
        setProductsOptions(optionRows)
    }

    React.useEffect(() => {
        rowS()
    }, [])

    return (

        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Selecione um produto"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {productsOptions}
        </Select>
    )
}