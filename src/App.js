import {useState} from "react";
import InputForm from "./components/InputForm/InputForm";
import {ReactComponent as Logo} from './logo.svg';
import './App.css';
import NetworksTabs from "./components/NetworksTabs/NetworksTabs";


function App() {
    // const [NetworksTabs, setNetworks] = useState([
    //     {
    //         id: 1,
    //         name: 'stable diffusion v1.4',
    //         url: 'https://nonexistentusername-compvis-stable-diffusion-v1-4.hf.space/run/predict',
    //         image: '',
    //         isActive: true,
    //         status: null,
    //     },
    //     {
    //         id: 2,
    //         name: 'stable diffusion v2',
    //         url: "https://nonexistentusername-stabilityai-stable-diffusion-2-1.hf.space/run/predict",
    //         image: '',
    //         isActive: false,
    //         status: null,
    //     },
    //     {
    //         id: 3,
    //         name: 'photorealistic-fuen',
    //         url: "https://nonexistentusername-claudfuen-photorealistic-fuen-v1.hf.space/run/predict",
    //         image: '',
    //         isActive: false,
    //         status: null,
    //     },
    //     {
    //         id: 4,
    //         name: 'analog-diffusion',
    //         url: "https://nonexistentusername-wavymulder-analog-diffusion.hf.space/run/predict",
    //         image: '',
    //         isActive: false,
    //         status: null,
    //     }
    // ])

    return (

        <div className="App">
            {/*<Logo className='App-logo'/>*/}

            <InputForm/>
            <NetworksTabs/>
            {/*<NeuroImage imgStr={imgStr}/>*/}
        </div>


    );
}

export default App;
