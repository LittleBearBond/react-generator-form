import ReactDOM from 'react-dom';
import React from 'react';
import 'antd/dist/antd.css'

import GeneratorForm from './GeneratorForm'
import OldForm from './OldForm'

const Home = () => <React.Fragment>
    <GeneratorForm />
    <OldForm />
</React.Fragment>

ReactDOM.render(<Home />, document.getElementById('root'));
