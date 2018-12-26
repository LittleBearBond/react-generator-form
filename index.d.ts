import * as React from 'react';
import { ItemGeneratorProp } from './src/interface';
export default class ItemGenerator extends React.PureComponent<ItemGeneratorProp, any> {
    static defaultProps: ItemGeneratorProp;
    static propTypes: ItemGeneratorProp;
    render(): JSX.Element | null;
}
