class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: 'Alex',
            appVersion: ''
        }
    }

    render() {
        return(
            <>
                <h1>Welcome to my app, {this.state.name || 'Friend'}</h1>
                {
                    this.state.appVersion && this.state.appVersion < 2
                    ? <p>Version is lower than 2</p>
                    : ''

                }
                <Button customText="descargar"/>
            </>
        )
    }
}



// import { createRoot } from 'react-dom/client';

// console.log('root', root);

// // Clear the existing HTML content
// document.body.innerHTML = '<div id="app"></div>';

// // Render your React component instead
// const root = createRoot(document.getElementById('app'));
// console.log('root', root);
// root.render(<h1>Hello, world alex</h1>);


// function MyButton() {
//     return (
//       <button>
//         I'm a button
//       </button>
//     );
//   }
  
//   export default function MyApp() {
//     return (
//       <div>
//         <h1>Welcome to my app</h1>
//         <MyButton />
//       </div>
//     );
//   }
  

{/* <script>
    class HolaMundo extends React.Component{
      
      render() {
        return return <h1>Hello, {this.props.name}</h1>;
      }
    }

    const domContainer = document.querySelector('#app');
    const root = ReactDOM.createRoot(domContainer);
    root.render(React.createElement(MyApp))
  </script> */}