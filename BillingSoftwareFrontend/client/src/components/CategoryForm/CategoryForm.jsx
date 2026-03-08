import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import { AddCategory, fetchCategories } from '../../Service/Category';
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

function CategoryForm() {
    const [loading, setLoading] = useState(false);
      let { searchByName } = useContext(AppContext)
    const [image, setImage] = useState("");
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#ffffff",
    });
    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", image);
        formData.append(
            "category",
            JSON.stringify(data)
        );
        console.log("This is",formData);
        
       
        AddCategory(formData).subscribe({
            next: (res) => {
                searchByName()
                toast.success("Category added successfully")
            },
            error: (error) => console.log(error),
            complete: console.log("complete")
        })
    }


    return (
        <div className="item-form-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-12 form-container">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        <img src={image ? URL.createObjectURL(image) : assets.uploadsLogo} width={48} />

                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="form-control"
                                            hidden
                                            onChange={(e) => {
                                               
                                                setImage(e.target.files[0])
                                            }}
                                        />

                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        placeholder="Category Name"
                                        value={data?.name}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        rows="5"
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder="Write content here.."
                                        onChange={onChangeHandler}
                                        value={data.description}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bgcolor" className="form-label">Background color</label>
                                    <br />
                                    <input
                                        type="color"
                                        name="bgColor"
                                        id="bgcolor"
                                        placeholder="#ffffff"
                                        onChange={onChangeHandler}
                                        value={data.bgColor}
                                    />
                                </div>
                                <button type="submit" className="btn btn-warning w-100">Save</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CategoryForm
