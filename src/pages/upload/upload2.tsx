import './upload.css';
import FileUpload from '../../images/upload.png'
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc, collection} from 'firebase/firestore';
import {auth, db} from '../../config/firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from 'react-router-dom'
import {useState} from 'react';

interface CreateFormData {
    title: string;
    file: FileList;
}


export const Upload = () =>{
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        file: yup
        .mixed<FileList>()
        .required('A PDF file is required')
        .test('fileType', 'The file must be a PDF', (value: FileList | undefined) => {
            if (!value || value.length === 0) return false;
            return value[0].type === 'application/pdf';
        })
        });

    const{register, handleSubmit, formState: {errors},} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    const postsRef = collection(db, "posts")

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            title: data.title,
            file: data.file
        });

        navigate("/");
    }

    const deleteInput = (e: React.MouseEvent<HTMLButtonElement>) =>{
        setSelectedFileName(null);
    }
    
    return(
        <div className="upload-container">
            <h1 className="uploadheader">Upload</h1>
            <div className="fileupload-container">
            <form onSubmit={handleSubmit(onCreatePost)} className="forms-wrapper">
                <h2>Title</h2>
                <input placeholder="Add a title here" className="uploadinput" {...register("title")}></input>
                <input type="file" {...register("file", { required: "Title is required" })} accept=".pdf" style={{display:'none'}} id="file-input" />
                <button className="file-button"><img src={FileUpload} alt="upload" className="upload"/></button>

                <input type="file" {...register("file")} {...register("file", { onChange: (e: React.ChangeEvent<HTMLInputElement>) => { 
                    const file = e.target.files?.[0];
                    if (file){
                        setSelectedFileName(file.name);
                    } else {
                        setSelectedFileName(null);
                    }
                }
            })} accept=".pdf" style={{display:'none'}} id="file-input" />
                <button type="button" className="browsefiles-button" onClick={() => document.getElementById('file-input')?.click()}>
                    Browse Files
                </button>

                {selectedFileName && (
                    <div>
                    <div className="selected-file">
                        <p>Selected file: {selectedFileName}</p>
                    </div>
                    <div className="fileremove">
                        <button onClick={deleteInput} className="deletebutton">X</button>
                        </div>
                    </div>
                )}
                <br />
                <button type="submit" className="postbutton">Post</button>
                </form>
            </div>
        </div>
    );
}