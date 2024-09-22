import DefaultImage from '../../images/default.png'
import './assignments.css'
import { useCollapse } from 'react-collapsed';


export const Assignments = () =>{
    
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    
    return(
        <div className="largecontainer">
            <h1>Assignments Board</h1>
        <div className="assignment-container">
            <div className="closedcontainer" {...getToggleProps()}>
            <h2 className="exampleassignment">example assignment</h2>
            </div>
        </div>
         <div {...getCollapseProps()}>
            <p className="examplecontents">
                <div className="pdfcontainer">Unit 1 Notes<br />PDF</div>
                <div className="grid-container">
                    <h1 className="grid-grid">voice</h1>
                    <h1 className="grid-grid">read</h1>
                </div>
                </p>
         </div>
       
         </div>
    );

}



const DefaultScreen = () =>{
    return(
        <div>
        <div className="defaultscreen">
        <div className="post-home-container">
        <img src={DefaultImage} alt="original post" className="default-image-size"/>
        <h1 className="mb-4 text-4xl font-inter leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"><span className="gradient-text-ace">Welcome to the Posts page!</span></h1>
                <div className="/underlined">
                <p className="mb-6 text-lg font-inter text-gray-300 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Select a school and a class to get started.</p>
                </div>
        </div>
    </div>
    </div>
    );
}

export const PostsPage = () =>{
    return(
        <div>

        </div>
    );
}