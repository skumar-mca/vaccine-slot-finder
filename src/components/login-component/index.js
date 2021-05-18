import { useEffect, useState } from 'react';
import { SECRET_CODE, SECRET_KEY } from '../../util';
function LoginComponent(props) {
    const { onHandleSubmit } = props;

    const [isError, setIsError] = useState(false);

    const [formValues, setFormValues] = useState({
        secretCode: null,
        secretKey: null
    });

    const handleChange = (evt) => {
        const { id, value } = evt.target;
        setFormValues((prev) => {
            return {
                ...prev,
                [id]: value
            }
        })
    }

    const handleSubmit = () => {
        setIsError(false);

        const { secretCode, secretKey } = formValues;
        if (!secretCode || !secretKey) {
            return false;
        }
        const flag = SECRET_KEY === secretKey && SECRET_CODE === secretCode;

        if (!flag) {
            setIsError(true);
            return;
        }

        onHandleSubmit && onHandleSubmit(true);
    }

    return (
        <div className="login-wrapper">
            <div class="mb-3">
                <label for="secretCode" class="form-label">Code</label>
                <input type="password" class="form-control" id="secretCode" placeholder="Enter code" onChange={handleChange} />
            </div>
            <div class="mb-3">
                <label for="secretKey" class="form-label">Secret Key</label>
                <input type="password" class="form-control" id="secretKey" placeholder="Enter secret key" onChange={handleChange} />
            </div>


            {isError && <div className='text-danger'>Invalid code and key. Please try with valid credentials. </div>}
            <br />
            <button type="button" class="btn btn-primary btn-block" disabled={!formValues.secretCode || !formValues.secretKey} onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default LoginComponent;
