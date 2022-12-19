import {useState} from "react";
import Input from "./components/Input/Input";
import NeuroImage from "./components/NeuroImage/NeuroImage";
import {ReactComponent as Logo} from './logo.svg';
import './App.css';


function App() {
    const [imgStr, setImgStr] = useState('')

    const changeImage = (neuroAnswer) => {
        setImgStr(neuroAnswer.data)
    }
    return (

        <div className="App">
            <Logo className='App-logo'/>
            <h1>сгенерировать картинку</h1>
            <Input changeImage={changeImage}/>
            <NeuroImage imgStr={imgStr}/>
        </div>


    );
}

export default App;
