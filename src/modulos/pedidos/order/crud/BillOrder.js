import React from 'react';
import { DatePicker, Row } from 'antd';
import SelectAccount from '../../../../components/selects/SelectAccount';
import '../styles/pedido.css';

class BillOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        const dateFormat = 'DD/MM/YYYY';

        const handleDataPicked = (value) => {
            const date = value.year() + "-" + ("00" + (value.month() + 1)).slice(-2) + "-" + value.date();
            this.props.order.date = date;
            console.log(date);
        };
    
        return <>
            <Row>
                <DatePicker
                    style={{width: 120}}
                    size="small"
                    placeholder="Data"
                    format={dateFormat}
                    onSelect={handleDataPicked}
                    className="distancia-direita10"
                />
                <SelectAccount data={this.props.order} />
            </Row>
        </>
    
    }
}
export default BillOrder;