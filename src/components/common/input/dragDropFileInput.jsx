import { useState, useRef } from 'react';
import PlaceholderImage from '../../../assets/images/placeholder.webp'
import { AiOutlineCloudUpload } from "react-icons/ai";

const DragDropFileUploader = ({ onFileAccepted }) => {
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    processFiles(e.target.files);
  };

  const processFiles = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      onFileAccepted(file); // Call the parent's callback function
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  }

  return (
    <div className="w-full h-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full h-96 md:h-full flex justify-center relative overflow-hidden items-center px-6 pt-5 pb-6 border-2 ${dragging ? 'border-green-500' : 'border-gray-300'} ${dragging ? 'bg-green-100' : 'bg-gray-100'} ${ imagePreview ? 'bg-white' : ''} rounded-md cursor-pointer`}
      >
        {!imagePreview && <img src={ PlaceholderImage } alt='placeholder' className="w-full absolute top-0 z-0 h-full object-cover object-center" />} {/* shows placeholder when no image is placed */}
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full absolute top-0 z-0 h-full object-contain object-center" />}
        <input 
          type="file"
          ref={fileInputRef} 
          onChange={handleChange} 
          accept="image/*"
          className="hidden"
        />
        <div className={`absolute bottom-0 bg-white w-full flex flex-col justify-center items-center py-4`}
          onClick={handleClickUpload}
        >
          <AiOutlineCloudUpload />
          <p className={`text-sm font-semibold text-gray-700`}>
            {dragging ? 'Drop your image ...' : (<span><span className='underline hidden md:inline-block'>Browse</span> <span className='underline inline-block md:hidden'>Upload</span> <span className='hidden md:inline-block'>or Drag an</span> image</span>)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DragDropFileUploader;