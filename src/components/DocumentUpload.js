import React, { useState } from 'react'
import { Button } from '@material-ui/core';


function DocumentUpload({setFlow, flow}) {
    const [adhaar, setAdhaar] = useState(null);
    function selectFile(e) {
        if (e.target.files.length !== 0) {
            const file = e.target.files[0];
            if (URL) setAdhaar(URL.createObjectURL(file));
            else setAdhaar(null);
            console.log(adhaar);    
        }
        else setAdhaar(null);
    }

    return (
        <>
            <div className="row ai-c">
                <form onSubmit={() => setFlow(flow+1)} className="column">
                    <h3>Select Adhaar</h3>
                    <input type="file" className="input-large shadow mv" onChange={selectFile} />

                    {/* <h3>Select Pan Card</h3>
                    <input type="file" className="input-large shadow mv" onChange={selectFile} /> */}
                    <div className="row jc-sb">
                        <Button variant="contained" color="primary" onClick={() => setFlow(flow-1)} style={{marginBottom: 10, width: '45%'}}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" type="submit" style={{marginBottom: 10, width: '45%'}}>
                            Verify
                        </Button>
                    </div>
                </form>
                {adhaar ? <img alt="document_image" src={adhaar} style={{ height: 100, width: 100, borderRadius: 10 }} className="mh" /> : null}
            </div>
        </>
    )
}

export default DocumentUpload