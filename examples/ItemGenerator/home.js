import React, { PureComponent } from 'react';
import 'antd/dist/antd.css'

import GeneratorForm from './GeneratorForm'
import OldForm from './OldForm'

class Home extends PureComponent {

    render() {
        return (
            <React.Fragment>
                <GeneratorForm />
                <OldForm />
            </React.Fragment>
        );
    }
}

export default Home;
