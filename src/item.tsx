import * as React from 'react';
import * as PropTypes from 'prop-types';
import Factory from './ItemFactory';

export default class SingleItem extends React.PureComponent<any> {

    static propTypes = {
        config: PropTypes.shape({
            colProps: PropTypes.shape({
                show: PropTypes.bool
            }),
            formItemProps: PropTypes.object,
            item: PropTypes.shape({
                id: PropTypes.string.isRequired,
                label: PropTypes.string,
                type: PropTypes.string,
                template: PropTypes.oneOfType([
                    PropTypes.node,
                    PropTypes.element,
                    PropTypes.string
                ]),
                options: PropTypes.object,
                props: PropTypes.object,
                params: PropTypes.object,
                data: PropTypes.oneOfType([
                    PropTypes.object,
                    PropTypes.array
                ])
            })
        })
    };

    static defaultProps = {
        config: {
            colProps: {
                show: true
            },
            formItemProps: {},
            item: {
                label: 'title',
                type: 'text',
                options: {},
                props: {
                    content: ''
                },
                data: []
            }
        }
    };

    render() {
        return Factory(this);
    }
}
