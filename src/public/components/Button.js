class Button extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            downloading: false
        }
    }

    render () {
        if(this.state.downloading){
            return(<><p className="downloading">downloading....</p></>)
        }
        return(<>
            <button onClick={() => this.setState({ downloading: true })}>
                {this.props.customText}
            </button>
        </>)
    }
}