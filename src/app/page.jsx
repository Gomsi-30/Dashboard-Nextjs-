'use client'
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [images, setImages] = useState([]);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    socialMediaHandle: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleUpload = async () => {
    console.log('sending...');
    const uploadFormData = new FormData();
    images.forEach((image) => {
      uploadFormData.append('images', image);
    });

    uploadFormData.append('name', formData.name);
    uploadFormData.append('socialMediaHandle', formData.socialMediaHandle);

    try {
      const response = await axios.post('http://localhost:3001/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Files uploaded successfully');

      setFetchedImages(response.data.imageUrls);
      setImages([]);
      setFormData({ name: '', socialMediaHandle: '' });
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">User Submission Form</h1>

  
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

 
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Social Media Handle:</label>
        <input
          type="text"
          name="socialMediaHandle"
          value={formData.socialMediaHandle}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>


      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Upload Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

   
      <div className="flex flex-wrap mb-4">
        {images.map((image, index) => (
          <div key={index} className="m-2 text-sm">
            {image.name}
          </div>
        ))}
      </div>

     
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>

     
      <h2 className="text-xl font-bold mt-8 mb-4">Uploaded Images</h2>
      <div className="flex flex-wrap">
        {fetchedImages.map((imageUrl, index) => (
          <div key={index} className="m-2">
            <img
              src={imageUrl}
              alt={`Uploaded ${index}`}
              className="w-24 h-24 object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
