import { code } from '../../config';

export const uploadFile = (req,res) => {
    console.log("Upload file controller route");
    res.status(code.ok).json({data : "Yo,what's up?"});
};