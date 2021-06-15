import React, { useState } from 'react'
import { Button } from '@material-ui/core';


function DocumentUpload({setFlow}) {
    const [adhaar, setAdhaar] = useState(null);
    function selectFile(e) {
        if (e.target.files.length !== 0) {
            const file = e.target.files[0];
            if (URL) setAdhaar(URL.createObjectURL(file));
            else setAdhaar(null);
        }
        else setAdhaar(null);
    }
    return (
        <>
            <div className="row ai-c">
                <form onSubmit={() => setFlow(3)} className="column">
                    <h3>Select Adhaar</h3>
                    <input type="file" className="input-large shadow mv" onChange={selectFile} />

                    <h3>Select Pan Card</h3>
                    <input type="file" className="input-large shadow mv" onChange={selectFile} />
                    <Button variant="contained" color="primary" type="submit">
                        Upload Documents
                    </Button>
                </form>
                {adhaar ? <img alt="document_image" src={adhaar} style={{ height: 100, width: 100, borderRadius: 10 }} className="mh" /> : null}
            </div>
        </>
    )
}

export default DocumentUpload