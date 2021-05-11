


export default class ListOfWords extends React.PureComponent {
    render() {
        return <div>{this.props.words.join(',')}</div>;
    }
}