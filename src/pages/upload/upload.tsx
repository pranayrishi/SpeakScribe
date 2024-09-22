import './upload.css';
import FileUpload from '../../images/upload.png'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../config/firebase'; 

interface CreateFormData {
    title: string;
    file: FileList;
}

export const Upload = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    
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

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        if (!user) {
            console.error("User not authenticated");
            return;
        }

        setIsUploading(true);

        try {
            const file = data.file[0];
            const storageRef = ref(storage, `pdfs/${user.uid}/${file.name}`);
            
            
            const snapshot = await uploadBytes(storageRef, file);
            
      
            const downloadURL = await getDownloadURL(snapshot.ref);

        
            await addDoc(postsRef, {
                title: data.title,
                fileUrl: downloadURL,
                fileName: file.name,
                createdAt: new Date(),
                createdBy: user.uid
            });

            navigate("/");
        } catch (error) {
            console.error("Error uploading file: ", error);
        } finally {
            setIsUploading(false);
        }
    };

    const deleteInput = () => {
        setSelectedFileName(null);
    };
    
    return (
        <div className="upload-container">
            <h1 className="uploadheader">Upload</h1>
            <div className="fileupload-container">
                <form onSubmit={handleSubmit(onCreatePost)} className="forms-wrapper">
                    <h2>Title</h2>
                    <input placeholder="Add a title here" className="uploadinput" {...register("title")} />
                    <input 
    type="file" 
    accept=".pdf" 
    style={{ display: 'none' }} 
    id="file-input"
    {...register("file", {
        onChange: (e) => {
            const file = e.target.files?.[0];
            if (file) {
                setSelectedFileName(file.name);
            } else {
                setSelectedFileName(null);
            }
        },
    })}
/>

                    <button className="file-button"><img src={FileUpload} alt="upload pic" className="upload"/></button>
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
                    <button type="submit" className="postbutton" disabled={isUploading}>
                        {isUploading ? 'Uploading...' : 'Post'}
                    </button> 
                </form>
            </div>
        </div>
    );
};