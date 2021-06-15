import React from 'react'
import { Button } from '@material-ui/core';
import "../App.css"

function SignupDoctor({ setFlow }) {
    // const [degree, setDegree] = React.useState([{ name: "" }]);
    // const [clinic, setClinic] = useState([{ name: "" }]);

    return (
        <>
            <form className="column" onSubmit={() => setFlow(1)}>
                {/* <div>
                    <select id="gender" name="gender" className="input-small shadow mh mv" style={{ backgroundColor: 'white', height: 60, width: 165 }} placeholder="Degree" >
                        <option value="mbbs">MBBS</option>
                        <option value="bds">BDS</option>
                        <option value="bams">BAMS</option>
                        <option value="bums">BUMS</option>
                        <option value="bhms">BHMS</option>
                        <option value="byns">BYNS</option>
                    </select>
                    <select id="specialisation" name="specialisation" className="input-small shadow mh mv" style={{ backgroundColor: 'white', height: 60, width: 165 }} placeholder="specialisation" >
                        <option value="cardiology">Cardiology</option>
                        <option value="oncology">Oncology</option>
                        <option value="neurology">Neurology</option>
                        <option value="psychiatry">Psychiatry</option>
                        <option value="pathology">Pathology</option>
                    </select>
                </div> */}
                {/* {clinic.map((x, i) => {
                    return (
                        <div className="box">
                            <input type="text" placeholder="Clinic" className="input-large shadow mh mv" />
                            <div className="btn-box">
                                {clinic.length !== 1 && <Button
                                    className="mr10"
                                    onClick={() => alert('hi')}
                                >X</Button>}
                                {clinic.length - 1 === i && <Button onClick={() => alert('hi')}>+</Button>}
                            </div>
                        </div>
                    );
                })} */}

                <input type="string" placeholder="Registration No." className="input-large shadow mv" />
                <Button variant="contained" color="primary" type="submit" style={{ marginBottom: 10 }}>
                    Next
                </Button>
            </form>
        </>
    )
}

export default SignupDoctor
