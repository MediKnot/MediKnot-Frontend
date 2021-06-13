import React, { useState } from 'react'
import { Button } from '@material-ui/core';


function AdhaarUpload() {
    const [adhaar, setAdhaar] = useState(null);
    function selectFile(e) {
        if (e.target.files.length !== 0) {
            const file = e.target.files[0];
            if(URL) setAdhaar(URL.createObjectURL(file));
            else setAdhaar(null);
        }
        else setAdhaar(null);
    }
    return (
        <>
            <h3>Select Adhaar</h3>
            <div className="row ai-c">
                <form onSubmit={() => alert("working...")} className="column">
                    <input type="file" className="input-large shadow mv" onChange={selectFile} />
                    <Button variant="contained" color="primary" type="submit">
                        Upload Adhaar
                    </Button>
                </form>
                {adhaar ? <img src={adhaar} style={{ height: 100, width: 100, borderRadius: 10 }} className="mh" /> : null}
            </div>
        </>
    )
}

export default AdhaarUpload
